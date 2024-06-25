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
  message: z.string().openapi({ example: "aw(xxx): error message" }),
  cause: z.any().optional(),
  stack: z.string().optional(),
  trace_id: z.string().optional(),
});

export type Error = z.infer<typeof zError>;

export const zBase = z.object({
  user_id: z.string().openapi({
    description: "Identifier of the user who owns the resource.",
    example: "xxxxx",
  }),
  created_at: z.string().datetime().openapi({
    description: "Datetime the resources is created at.",
    example: "2024-06-11T17:49:01.298061Z",
  }),
  updated_at: z.string().datetime().openapi({
    description: "Datetime the resource is updated at.",
    example: "2024-06-11T17:49:01.298061Z",
  }),
});

export const openapiErrorResponses = {
  400: {
    description: "Malformed request syntax.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  401: {
    description: "Unauthorized request.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  403: {
    description: "Access denied.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  404: {
    description: "Resource not found.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  409: {
    description: "Request conflicts with the current state of the server.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  429: {
    description: "Too many requests in a given amount of time.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  },
  500: {
    description: "Internal server error.",
    content: {
      "application/json": {
        schema: zError
      }
    }
  }
};
