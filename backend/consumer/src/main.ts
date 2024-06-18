import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
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
  });

  app.listen();
}
bootstrap();
