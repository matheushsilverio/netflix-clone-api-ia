declare global {
  declare module "express" {
    export interface Request {
      loggedContext?: {
        userId: number;
      };
    }

    export interface Response {
      error: (error: Error | string) => Response;
      created: (value: any) => Response;
      success: (value: any) => Response;
      forbidden: (message?: string) => Response;
      internalError: (message?: string) => Response;
      badRequest: (message?: string) => Response;
      notFound: (message?: string) => Response;
    }
  }
}
