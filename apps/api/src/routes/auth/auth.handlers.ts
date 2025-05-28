import * as HttpStatusCodes from "stoker/http-status-codes";

import type { IUser } from "@/db/schemas/auth-schema";
import type { AppRouteHandler } from "@/lib/types";

import { auth } from "@/lib/auth";

import type {
  GetProfileRoute,
  GetSessionRoute,
  IAuthUserResponse,
  ISessionResponse,
  SignInRoute,
  SignOutRoute,
  SignUpRoute,
} from "./auth.routes";

export const signUp: AppRouteHandler<SignUpRoute> = async (c) => {
  try {
    const { name, email, password } = c.req.valid("json");

    const result = await auth.api.signUpEmail({
      body: { name, email, password },
      headers: c.req.raw.headers,
    });

    if (!result) {
      return c.json(
        {
          error: "Registration failed",
          message: "Unable to create account",
        },
        HttpStatusCodes.CONFLICT,
      );
    }

    const response: IAuthUserResponse = {
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
        image: result.user.image ?? null,
        createdAt: result.user.createdAt.toISOString(),
        updatedAt: result.user.updatedAt.toISOString(),
      },
      token: result.token ?? undefined,
    };

    return c.json(response, HttpStatusCodes.CREATED);
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique")) {
      return c.json(
        {
          error: "User already exists",
          message: "An account with this email already exists",
        },
        HttpStatusCodes.CONFLICT,
      );
    }

    return c.json(
      {
        error: "Registration failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export const signIn: AppRouteHandler<SignInRoute> = async (c) => {
  try {
    const { email, password } = c.req.valid("json");

    const result = await auth.api.signInEmail({
      body: { email, password },
      headers: c.req.raw.headers,
    });

    if (!result) {
      return c.json(
        {
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    const response: IAuthUserResponse = {
      user: {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        emailVerified: result.user.emailVerified,
        image: result.user.image ?? null,
        createdAt: result.user.createdAt.toISOString(),
        updatedAt: result.user.updatedAt.toISOString(),
      },
      token: result.token || undefined,
    };

    return c.json(response, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        error: "Authentication failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }
};

export const signOut: AppRouteHandler<SignOutRoute> = async (c) => {
  try {
    await auth.api.signOut({
      headers: c.req.raw.headers,
    });

    return c.json({ message: "Successfully signed out" }, HttpStatusCodes.OK);
  } catch {
    return c.json({ message: "Successfully signed out" }, HttpStatusCodes.OK);
  }
};

export const getSession: AppRouteHandler<GetSessionRoute> = async (c) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json(
        {
          error: "No active session",
          message: "User is not authenticated",
        },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    const response: ISessionResponse = {
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        emailVerified: session.user.emailVerified,
        image: session.user.image ?? null,
        createdAt: session.user.createdAt.toISOString(),
        updatedAt: session.user.updatedAt.toISOString(),
      },
      session: {
        id: session.session.id,
        createdAt: session.session.createdAt.toISOString(),
        updatedAt: session.session.updatedAt.toISOString(),
        userId: session.session.userId,
        expiresAt: session.session.expiresAt.toISOString(),
        token: session.session.token,
        ipAddress: session.session.ipAddress ?? null,
        userAgent: session.session.userAgent ?? null,
      },
    };

    return c.json(response, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        error: "Session retrieval failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }
};

export const getProfile: AppRouteHandler<GetProfileRoute> = async (c) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json(
        {
          error: "Authentication required",
          message: "You must be logged in to access this resource",
        },
        HttpStatusCodes.UNAUTHORIZED,
      );
    }

    const user: IUser = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      emailVerified: session.user.emailVerified,
      image: session.user.image ?? null,
      createdAt: session.user.createdAt.toISOString(),
      updatedAt: session.user.updatedAt.toISOString(),
    };

    return c.json(user, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        error: "Profile retrieval failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      HttpStatusCodes.UNAUTHORIZED,
    );
  }
};
