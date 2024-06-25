import type { App } from "../app";

export function registerV1Zen(app: App) {
  app.get("/v1/zen", (ctx) => {
    return ctx.text(`
   __ ___ __ __
  / _\` \\ V  V /
  \\__,_|\\_/\\_/ 
  
  TRACE ID: ${ctx.get("traceID")}\n`);
  });
}
