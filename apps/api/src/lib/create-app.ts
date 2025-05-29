import type { Schema } from "hono";

import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { pinoLogger } from "@/middlewares/pino-logger";

import type { AppOpenAPI } from "./types";

import { auth } from "./auth";
import createRouter from "./create-router";

export default function createApp() {
  const app = createRouter();

  // Configure CORS for auth routes
  app.use(
    "*",
    cors({
      origin: ["http://localhost:3000", "http://localhost:5173"], // Add frontend URLs
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  );

  // Mount Better Auth's built-in handler for core auth endpoints
  // This handles /api/auth/sign-in, /api/auth/sign-up, /api/auth/sign-out, /api/auth/session, etc.
  app.on(["POST", "GET"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

  app.get("/session", (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!user)
      return c.body(null, 401);

    return c.json({
      session,
      user,
    });
  });

  app
    .use(requestId())
    .use(serveEmojiFavicon("📝"))
    .use(pinoLogger())
    .use(authMiddleware);

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<S extends Schema>(router: AppOpenAPI<S>) {
  return createApp().route("/", router);
}
