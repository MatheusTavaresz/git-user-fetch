import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { RepositoryEntity } from "../entities/repository.entity";

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RepositoryEntity)
    private readonly repoRepository: Repository<RepositoryEntity>
  ) {}

  async getAllRepositories(): Promise<RepositoryEntity[]> {
    const data = await this.repoRepository.find();
    return data;
  }

  async addRepository(
    userId: number,
    repoData: Partial<RepositoryEntity>
  ): Promise<RepositoryEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("User not found");
    }

    const repository = this.repoRepository.create({
      ...repoData,
      user,
    });

    return this.repoRepository.save(repository);
  }

  async removeRepository(repoId: number): Promise<void> {
    await this.repoRepository.delete({ id: repoId });
  }

  async removeAllRepositories(): Promise<void> {
    await this.repoRepository.delete({});
  }

  async filterRepositories(
    userId: number,
    language?: string,
    startDate?: string,
    endDate?: string,
    name?: string
  ): Promise<RepositoryEntity[]> {
    const query = this.repoRepository
      .createQueryBuilder("repository")
      .where("repository.userId = :userId", { userId });

    if (language) {
      query.andWhere("repository.language = :language", { language });
    }

    if (startDate) {
      query.andWhere("repository.createdAt >= :startDate", { startDate });
    }

    if (endDate) {
      query.andWhere("repository.createdAt <= :endDate", { endDate });
    }

    if (name) {
      query.andWhere("repository.title LIKE :name", { name: `%${name}%` });
    }

    return query.getMany();
  }
}
