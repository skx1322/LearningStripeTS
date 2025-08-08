export const SERVER_CONFIG = {
    PORT: Bun.env.PORT as string,
    FRONTEND_URL: JSON.parse(Bun.env.FRONTEND_URL as string) as string[],
    JWTKey: Bun.env.JWT_SECRETKEY,
    CIPHER: Bun.env.CIPHER_KEY
}

export const BUCKET_CONFIG = {
    accessKeyId: Bun.env.DO_ACCESS_KEY_ID as string,
    secretAccessKey: Bun.env.DO_SECRET_ACCESS_KEY as string,
    bucket: Bun.env.DO_BUCKET as string,
    region: Bun.env.DO_REGION as string, 
    endpoint: Bun.env.ENDPOINT as string,
}

export const STRIPE_CONFIG = {
    STRIPE_PUBKEY: Bun.env.STRIPE_PUBKEY,
    STRIPE_SECKEY: Bun.env.STRIPE_SECKEY
}

export const DB = {
    DBAPI: Bun.env.DB_API
}

export const OAUTH_CONFIG = {
    GOOGLE_CLIENT: Bun.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: Bun.env.GOOGLE_CLIENT_SECRET
}

