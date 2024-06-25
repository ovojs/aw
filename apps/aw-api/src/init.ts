import type { MiddlewareHandler } from "hono";
import type { Env } from "./types";

export function init(): MiddlewareHandler<Env> {
  return async function (ctx, next) {
    const trace_id = crypto.randomUUID();
    ctx.set("traceID", trace_id);
    ctx.res.headers.set("x-trace-id", trace_id);
    await next();
  }
}
