import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import createRouter from "@/lib/create-router";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("UIST Project"),
          "Tasks API Index",
        ),
      },
    }),
    (c) => {
      return c.json(
        {
          message: "UIST Project",
        },
        HttpStatusCodes.OK,
      );
    },
  );

export default router;
