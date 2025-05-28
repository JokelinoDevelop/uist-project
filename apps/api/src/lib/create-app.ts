import type { Schema } from "hono";

import { requestId } from "hono/request-id";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { authMiddleware } from "@/middlewares/auth.middleware";
import { pinoLogger } from "@/middlewares/pino-logger";

import type { AppOpenAPI } from "./types";

import createRouter from "./create-router";

export default function createApp() {
  const app = createRouter();
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
