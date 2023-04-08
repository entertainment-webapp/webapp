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
}