import { configDotenv } from "dotenv";
configDotenv();

export const env = {
  port: process.env.PORT,
  authClientId: process.env.OAUTH_CLIENT_ID,
  authClientSecret: process.env.OAUTH_CLIENT_SECRET,
  jsonWebTokenSecret: process.env.JSON_WEB_TOKEN_SECRET,
  timeOut: process.env.JSON_TOKEN_TIMEOUT,
  nodeEnv: process.env.NODE_ENV,
};
