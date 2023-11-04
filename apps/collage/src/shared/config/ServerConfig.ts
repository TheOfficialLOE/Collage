import "dotenv/config";
import { get } from "env-var";

export class ServerConfig {
    public static readonly DATABASE_URL: string = get('DATABASE_URL')
        .required()
        .asString();

    public static readonly PG_USER: string = get('PG_USER')
        .required()
        .asString();

    public static readonly PG_PASSWORD: string = get('PG_PASSWORD')
        .required()
        .asString();

    public static readonly PG_HOST: string = get('PG_HOST')
        .required()
        .asString();

    public static readonly PG_PORT: number = get('PG_PORT')
        .required()
        .asPortNumber();

    public static readonly REDIS_HOST: string = get('REDIS_HOST')
        .required()
        .asString();

    public static readonly REDIS_PORT: number = get('REDIS_PORT')
        .required()
        .asPortNumber();

    public static readonly REDIS_PASSWORD: string = get('REDIS_PASSWORD')
        .required()
        .asString();

    public static readonly ACCESS_TOKEN_SECRET: string = get('ACCESS_TOKEN_SECRET')
        .required()
        .asString();

    public static readonly BUCKET_ENDPOINT: string = get('BUCKET_ENDPOINT')
        .required()
        .asString();

    public static readonly BUCKET_NAME: string = get('BUCKET_NAME')
        .required()
        .asString();

    public static readonly BUCKET_ACCESS_KEY: string = get('BUCKET_ACCESS_KEY')
        .required()
        .asString();

    public static readonly BUCKET_SECRET_KEY: string = get('BUCKET_SECRET_KEY')
        .required()
        .asString();
}