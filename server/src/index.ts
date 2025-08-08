import { Elysia } from "elysia";
import { SERVER_CONFIG } from "./config/env.global";
import connectDB from "./config/db";

const app = new Elysia();

app.get("/", () => {
  return {
    success: true,
    message: `Elysia's server is operating as usual 💖!`,
    port: app.server?.port,
    frontend: SERVER_CONFIG.FRONTEND_URL
  }
})

connectDB().then(() => {
  app.listen({
    port: SERVER_CONFIG.PORT,
    hostname: "0.0.0.0",
  }, () => {
    console.log(`Elysia's server running, 💖 http://localhost:${app.server?.port} 💖`);
  })
});
