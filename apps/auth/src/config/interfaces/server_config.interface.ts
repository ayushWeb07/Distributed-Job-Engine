export interface IServerConfig {
  serverPort: number;
  authJwtSecret: string;
  authJwtExpires: number;
}
