import Elysia, { t } from "elysia";
import { SERVER_CONFIG } from "./env.global";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";

export const CorsConfig = new Elysia()
    .use(cors({
        origin: SERVER_CONFIG.FRONTEND_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        credentials: true,
    }))

export const JWTDefault = new Elysia()
    .use(jwt({
        name: 'JWTDefault',
        schema: t.Object({
            userID: t.String(),
        }),
        secret: <string>SERVER_CONFIG.JWTKey,
        exp: "24h",
    }))

export const JWTRefresh = new Elysia()
    .use(jwt({
        name: 'JWTRefresh',
        schema: t.Object({
            userID: t.String(),
        }),
        secret: <string>SERVER_CONFIG.JWTKey,
        exp: "7d",
    }))