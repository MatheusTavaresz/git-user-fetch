import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RepositoryEntity } from "src/domain/entities/repository.entity";
import { UserEntity } from "src/domain/entities/user.entity";
import { UserGateway } from "src/domain/gateways/gateway";
import { Repository } from "typeorm";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RepositoryEntity)
    private readonly repoRepository: Repository<RepositoryEntity>
  ) {}

  async processAndSaveUser(
    data
  ): Promise<{ user: UserEntity; repositories: RepositoryEntity[] }> {
    const { user, repositories } = data;
    let verifyIfUserExists = await this.userRepository.findOne({
      where: { username: user.username },
      relations: ["repositories"],
    });

    if (!verifyIfUserExists) {
      const savedUser = await this.userRepository.save({
        username: user.username,
        avatar_url: user.avatar_url,
      });

      const savedRepositories = await Promise.all(
        repositories.map((repoData) => {
          return this.repoRepository.save({
            name: repoData.name,
            description: repoData.description,
            repositoryUrl: repoData.repositoryUrl,
            language: repoData.language,
            createdAt: new Date(repoData.createdAt),
            user: savedUser,
          });
        })
      );

      return { user: savedUser, repositories: savedRepositories };
    }
  }

  async getUserData() {
    return this.userRepository.find();
  }

  async getUserRepositories() {
    return this.repoRepository.find();
  }

  async getUserRepositoriesByUsername(
    username: string
  ): Promise<RepositoryEntity[]> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ["repositories"],
    });
    if (user) {
      return user.repositories;
    } else {
      return [];
    }
  }
}
