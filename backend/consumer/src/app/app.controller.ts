import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
  ) {}

  @EventPattern('fetch')
  async getRequestFromProducer(payload: { username: string }) {
    const { username } = payload;
    const responseData = await this.appService.searchGitHubRepos(username);
    return responseData;
  }
}
