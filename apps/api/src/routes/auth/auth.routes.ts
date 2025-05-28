import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import {
  selectSessionSchema,
  selectUserSchema,
  signInSchema,
  signUpSchema,
} from "@/db/schemas/auth-schema";

const tags = ["Authentication"];

const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string().optional(),
});

const authUserResponseSchema = z.object({
  user: selectUserSchema,
  token: z.string().optional(),
});

export type IAuthUserResponse = z.infer<typeof authUserResponseSchema>;

const sessionResponseSchema = z.object({
  user: selectUserSchema,
  session: selectSessionSchema,
});

export type ISessionResponse = z.infer<typeof sessionResponseSchema>;

export const signUp = createRoute({
  path: "/auth/sign-up",
  method: "post",
  request: {
    body: jsonContentRequired(signUpSchema, "User registration data"),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      authUserResponseSchema,
      "User created successfully",
    ),
    [HttpStatusCodes.CONFLICT]: jsonContent(
      errorResponseSchema,
      "User already exists",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(signUpSchema),
      "Validation error(s)",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      errorResponseSchema,
      "Registration failed",
    ),
  },
});

export const signIn = createRoute({
  path: "/auth/sign-in",
  method: "post",
  request: {
    body: jsonContentRequired(signInSchema, "User credentials for sign in"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      authUserResponseSchema,
      "Successful sign in",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorResponseSchema,
      "Invalid credentials",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(signInSchema),
      "Validation error(s)",
    ),
  },
});

export const signOut = createRoute({
  path: "/auth/sign-out",
  method: "post",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.object({ message: z.string() }),
      "Successfully signed out",
    ),
  },
});

export const getSession = createRoute({
  path: "/auth/session",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      sessionResponseSchema.nullable(),
      "Current session information",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorResponseSchema,
      "No active session",
    ),
  },
});

export const getProfile = createRoute({
  path: "/auth/profile",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectUserSchema,
      "User profile information",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      errorResponseSchema,
      "Authentication required",
    ),
  },
});

// Export types for handlers
export type SignUpRoute = typeof signUp;
export type SignInRoute = typeof signIn;
export type SignOutRoute = typeof signOut;
export type GetSessionRoute = typeof getSession;
export type GetProfileRoute = typeof getProfile;
