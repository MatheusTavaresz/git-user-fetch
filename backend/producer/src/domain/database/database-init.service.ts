import { Injectable, OnModuleInit } from "@nestjs/common";
import { createConnection } from "mysql2/promise";

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  async onModuleInit() {
    await this.createDatabaseIfNotExists();
  }

  async createDatabaseIfNotExists() {
    const connection = await createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      multipleStatements: true,
    });

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS github_repositories;`
    );
    await connection.end();
  }
}
