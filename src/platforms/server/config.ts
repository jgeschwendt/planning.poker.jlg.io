import type { Options } from "pusher";
import { config as clientConfig } from "../client/config";

/* eslint-disable node/no-process-env -- config */
if (typeof process.env.PUSHER_APP_ID !== "string") {
  throw new Error("Missing: process.env.PUSHER_APP_ID");
}

if (typeof process.env.PUSHER_SECRET !== "string") {
  throw new Error("Missing: process.env.PUSHER_SECRET");
}

if (typeof process.env.REDIS_HOST !== "string") {
  throw new Error("Missing: process.env.REDIS_HOST");
}

if (typeof process.env.REDIS_PASSWORD !== "string") {
  throw new Error("Missing: process.env.REDIS_PASSWORD");
}

if (typeof process.env.REDIS_PORT !== "string") {
  throw new Error("Missing: process.env.REDIS_PORT");
}

export const config = {
  pusher: {
    appId: process.env.PUSHER_APP_ID,
    cluster: clientConfig.pusher.options.cluster,
    key: clientConfig.pusher.appKey,
    secret: process.env.PUSHER_SECRET,
  } as Options,
  redis: {
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
  },
};
/* eslint-enable node/no-process-env -- config */
