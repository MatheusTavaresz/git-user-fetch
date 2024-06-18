import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { UserEntity } from "./domain/entities/user.entity";
import { RepositoryEntity } from "./domain/entities/repository.entity";
import { DatabaseInitService } from "./domain/database/database-init.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RepositoryService } from "./domain/repositories/repository.service";
import { RepositoryController } from "./domain/repositories/repositories.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "github_repositories",
      entities: [UserEntity, RepositoryEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, RepositoryEntity]),
    ClientsModule.register([
      {
        name: "GIT_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqp://guest:guest@rabbitmq:5672",
          ],
          queue: "main_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AppController, RepositoryController],
  providers: [
    AppService,
    RepositoryService,
    DatabaseInitService,
    RepositoryEntity,
  ],
})
export class AppModule {}
