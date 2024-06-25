import { createRoute, z } from "@hono/zod-openapi";
import type { App } from "@pkg/app";
import { openapiErrorResponses, zBase } from "@pkg/types";


const zKeyInit = z.object({
  name: z.string().default("API Key").openapi({
    description: "Human readable key name",
    example: "test key"
  }),
  scopes: z.array(z.string()).openapi({
    description: "An array of scopes this key has access to.",
    example: ["keys/create", "docs/*"]
  }),
  prefix: z.string().default("ak").openapi({
    description: "Key prefix.",
    example: "ak"
  }),
});

const zKey = z.object({
  id: z.string().openapi({
    description: "Key identifier.",
    example: "xxxxx"
  }),
  sig: z.string().optional().openapi({
    description: "Key signature that is shown to the client only once.",
    example: "xxxxx"
  }),
}).merge(zBase.merge(zKeyInit));

type Key = z.infer<typeof zKey>;

const route = createRoute({
  operationId: "keys-create",
  method: "post",
  path: "/v1/keys",
  request: {
    body: {
      content: {
        "application/json": {
          schema: zKeyInit
        }
      }
    }
  },
  responses: {
    200: {
      description: "The `Key` object",
      content: {
        "application/json": {
          schema: zKey
        }
      }
    },
    ...openapiErrorResponses,
  }
});

export function registerV1_keyCreate(app: App) {
  app.openapi(route, async (ctx) => {
    // TODO
  })
}
