import { cors } from "hono/cors";

import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter();

// Configure CORS for auth routes
router.use(
  "/api/auth/*",
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
router.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Add custom OpenAPI documented routes for additional functionality
router.openapi(routes.signUp, handlers.signUp);
router.openapi(routes.signIn, handlers.signIn);
router.openapi(routes.signOut, handlers.signOut);
router.openapi(routes.getSession, handlers.getSession);
router.openapi(routes.getProfile, handlers.getProfile);

export default router;
