import type { Options } from "pusher";
import type { ClientOpts } from "redis";
import { config as clientConfig } from "../client/config";

/* eslint-disable node/no-process-env -- config */
if (typeof process.env.PUSHER_APP_ID !== "string") {
  throw new TypeError("Missing: process.env.PUSHER_APP_ID");
}

if (typeof process.env.PUSHER_SECRET !== "string") {
  throw new TypeError("Missing: process.env.PUSHER_SECRET");
}

if (typeof process.env.REDIS_HOST !== "string") {
  throw new TypeError("Missing: process.env.REDIS_HOST");
}

if (typeof process.env.REDIS_PASSWORD !== "string") {
  throw new TypeError("Missing: process.env.REDIS_PASSWORD");
}

if (typeof process.env.REDIS_PORT !== "string") {
  throw new TypeError("Missing: process.env.REDIS_PORT");
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
  } as ClientOpts,
};
/* eslint-enable node/no-process-env -- config */
