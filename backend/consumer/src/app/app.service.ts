import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import axios from "axios";
import { repositoryInterface } from "src/interface/repository.interface";
import { userInterface } from "src/interface/user.interface";

@Injectable()
export class AppService {
  async searchGitHubRepos(username: string): Promise<any> {
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );

      const userData = userResponse.data;
      const reposData = reposResponse.data;

      const user: userInterface = {
        username: userData.login,
        avatar_url: userData.avatar_url,
      };

      const repositories: repositoryInterface[] = reposData.map(
        (repo: any) => ({
          name: repo.name,
          description: repo.description,
          repositoryUrl: repo.html_url,
          language: repo.language,
          createdAt: repo.created_at,
        })
      );

      return { user, repositories };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new NotFoundException()
      } else {
        throw error;
      }
    }
  }
}
