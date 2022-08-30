export interface Config {
  logging: LoggingConfig;
  database?: DatabaseConnectionConfig;
  microServices: MicroServicesConfig;
  cors: CorsConfig;
}

export interface LoggingConfig {
  basePath: string;
  fileName: string;
}

export interface MicroServicesConfig {
  users: UsersMicroServiceConfig;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface MicroServiceConfig {
  port: number;
  swagger?: SwaggerConfig;
}

export interface DatabaseConnectionConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface UsersMicroServiceConfig extends MicroServiceConfig {
}
