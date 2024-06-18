import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { RepositoryService } from "./repository.service";
import { RepositoryEntity } from "../entities/repository.entity";

@Controller("repositories")
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Delete(":repoId")
  async removeRepository(@Param("repoId") repoId: number): Promise<void> {
    return this.repositoryService.removeRepository(repoId);
  }

  @Get(":userId")
  async filterRepositories(
    @Param("userId") userId: number,
    @Query("language") language?: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
    @Query("name") name?: string
  ): Promise<RepositoryEntity[]> {
    return this.repositoryService.filterRepositories(
      userId,
      language,
      startDate,
      endDate,
      name
    );
  }
}
