import { OpenAPIHono } from "@hono/zod-openapi";
import type { Env, Error } from "./types";
import { HTTPException } from "hono/http-exception";


export function newApp() {
  const app = new OpenAPIHono<Env>({
    defaultHook: async (res, ctx) => {
      if (!res.success) {
        return ctx.json<Error>({
          message: res.error.message,
          cause: res.error.cause,
          stack: res.error.stack,
          trace_id: ctx.get("traceID")
        }, 400);
      }
    }
  });

  app.onError((err, ctx) => {
    if (err instanceof HTTPException) {
      return ctx.json<Error>({
        message: err.message,
        cause: err.cause,
        stack: err.stack,
        trace_id: ctx.get("traceID"),
      }, err.status);
    }
    return ctx.json<Error>({
      message: "aw: internal server error",
      trace_id: ctx.get("traceID"),
    });
  });

  app.doc31("/openapi.json", (ctx) => ({
    openapi: "3.1.0",
    info: {
      title: "AW API",
      version: "1.0.0",
    },
    servers: [
      {
        url: new URL(ctx.req.url).origin,
        description: "Aw API built with Hono :)",
      },
    ]
  }));

  app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer"
  });

  return app;
}

export type App = ReturnType<typeof newApp>;
