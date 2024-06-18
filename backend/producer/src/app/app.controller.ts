import { Body, Controller, Get, Inject, Param, Post, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { ClientProxy } from "@nestjs/microservices";
import { RepositoryEntity } from "src/domain/entities/repository.entity";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject("GIT_SERVICE") private readonly client: ClientProxy
  ) {}

  @Post("findUser")
  async findByGitUsername(@Body("username") username: string) {
    const response = await this.client.send("fetch", { username }).toPromise();
    this.appService.processAndSaveUser(response);
    return { username };
  }

  @Get("get-userProfile")
  async getUserData() {
    return this.appService.getUserData();
  }

  @Get("get-userRepos")
  async getUserRepos() {
    return this.appService.getUserRepositories();
  }

  @Get(':username/repositories')
  async getUserRepositories(@Param('username') username: string): Promise<RepositoryEntity[]> {
    return this.appService.getUserRepositoriesByUsername(username);
  }
}
