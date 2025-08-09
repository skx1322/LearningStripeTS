import { Elysia } from "elysia";
import { SERVER_CONFIG } from "./config/env.global";
import connectDB from "./config/db";
import { router } from "./router/router";
import { CorsConfig } from "./config/access";

const app = new Elysia().use(CorsConfig);

app.get("/", () => {
  return {
    success: true,
    message: `Elysia's server is operating as usual 💖!`,
    port: app.server?.port,
    frontend: SERVER_CONFIG.FRONTEND_URL
  }
});

app.use(router);

connectDB().then(() => {
  app.listen({
    port: SERVER_CONFIG.PORT,
    hostname: "0.0.0.0",
  }, () => {
    console.log(`Elysia's server running, 💖 http://localhost:${app.server?.port} 💖`);
  })
});
