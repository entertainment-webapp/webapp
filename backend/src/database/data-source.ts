import "reflect-metadata"
import { DataSource } from "typeorm";
import configValues from "../configs/config";
import { CreateRolesTable1680894214505 } from "./migrations/1680894214505-CreateRolesTable";
import { CreateUsersTable1680895101523 } from "./migrations/1680895101523-CreateUsersTable";

let AppDataSource: DataSource;

if (configValues.NODE_ENV == "testing") {
  AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "testdb",
    logging: false,
    synchronize: true,
  });
} else {
  AppDataSource = new DataSource({
    type: "postgres",
    host: configValues.DB_HOST,
    username: configValues.DB_USERNAME,
    password: configValues.DB_PASSWORD,
    database: configValues.DB_DATABASE,
    logging: true,
    entities: [],
    migrations: [
      CreateRolesTable1680894214505,
      CreateUsersTable1680895101523,
    ],
  });
}


export default AppDataSource
