import { z } from "zod";


const zBindings = z.object({
  VERSION: z.string().default("unknown")
})

export type Env = {
  Bindings: z.infer<typeof zBindings>,
  Variables: {
    traceID: string
  },
};

export const zError = z.object({
  message: z.string().openapi({example: "aw(xxx): error message"}),
  cause: z.any().optional(),
  stack: z.string().optional(),
  trace_id: z.string().optional(),
});

export type Error = z.infer<typeof zError>;
