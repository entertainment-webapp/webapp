import * as dotenv from "dotenv";
import { ConfigInterface } from "../interfaces/configInterface";

dotenv.config();

const mainConfig: ConfigInterface = {
  APP_PORT: Number(process.env.APP_PORT) || 3001,
  NODE_ENV: process.env.NODE_ENV || "development",
  SECRET_KEY: process.env.SECRET_KEY || "hello",
  JWT_TOKEN_EXPIRATION: process.env.JWT_TOKEN_EXPIRATION || "1h",

  // Email Configuration
  MAIL_USERNAME: process.env.MAIL_USERNAME || "",
  MAIL_PASSWORD: process.env.MAIL_PASSWORD || "test",
  MAIL_PORT: Number(process.env.MAIL_PORT) || 587,
  MAIL_HOST: process.env.MAIL_HOST || "",
  MAIL_USE_TLS: Boolean(process.env.MAIL_USE_TLS),
  MAIL_DEFAULT_SENDER: process.env.MAIL_DEFAULT_SENDER || "noreply@email.com",

  // Account Confirmation Url
  ACCOUNT_CONFIRMATION_URL: process.env.ACCOUNT_CONFIRMATION_URL || "http://localhost:3001/auth/confirm-account",
};

const developmentConfig: ConfigInterface = {
  ...mainConfig,
  // Database Configurations
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "dbpassword",
  DB_DATABASE: process.env.DB_DATABASE || "webappdb",
};

const testingConfig: ConfigInterface = {
  ...mainConfig,
  TEST_DATABASE_URI: "postgress",
};

const productionConfig: ConfigInterface = {
  ...mainConfig,
  DB_HOST: process.env.DB_HOST || "",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USERNAME || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DATABASE: process.env.DB_DATABASE || "",
};

let configValues: ConfigInterface;

switch (process.env.NODE_ENV) {
  case "development":
    configValues = developmentConfig;
    break;
  case "testing":
    configValues = testingConfig;
    break;
  case "production":
    configValues = productionConfig;
    break;
  default:
    console.warn("Invalid NODE_ENV value. Defaulting to development configuration.");
    configValues = developmentConfig;
    break;
}

export default configValues;
