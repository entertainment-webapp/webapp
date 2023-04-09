export interface ConfigInterface {
    APP_PORT: number;
    NODE_ENV: string;
    DB_HOST?: string;
    DB_PORT?: number;
    DB_USERNAME?: string;
    DB_PASSWORD?: string;
    DB_DATABASE?: string;
    TEST_DATABASE_URI?: string;
    SECRET_KEY: string;
    JWT_TOKEN_EXPIRATION: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
    MAIL_PORT: number;
    MAIL_HOST: string;
    MAIL_USE_TLS: boolean;
    MAIL_DEFAULT_SENDER: string;
    ACCOUNT_CONFIRMATION_URL: string;
}