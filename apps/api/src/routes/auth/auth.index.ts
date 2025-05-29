import createRouter from "@/lib/create-router";

import * as handlers from "./auth.handlers";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.signUp, handlers.signUp)
  .openapi(routes.signIn, handlers.signIn)
  .openapi(routes.signOut, handlers.signOut)
  .openapi(routes.getSession, handlers.getSession)
  .openapi(routes.getProfile, handlers.getProfile);

export default router;
