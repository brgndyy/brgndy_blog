declare module 'types' {
  export interface CustomError extends Error {
    status?: number;
    code?: number;
  }

  export interface EnvConfig {
    database: string;
    username: string;
    password: string | null | undefined;
    host: string;
  }

  export interface Config {
    [env: string]: EnvConfig;
  }
}
