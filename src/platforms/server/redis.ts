import redis from "redis";
import { promisify } from "util";
import { config } from "./config";

const client = redis.createClient(config.redis);

client.on("error", (error) => {
  throw new Error(error);
});

const rGet = async <T>(key: string): Promise<T | null> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- @
  const value = await promisify(client.get).bind(client)(key);

  return typeof value === "string" ? JSON.parse(value) as T : null;
};

const rSet = async (key: string, value: unknown): Promise<boolean> => {
  // eslint-disable-next-line @typescript-eslint/unbound-method -- @
  const result = await promisify(client.set).bind(client)(key, JSON.stringify(value));

  return result as boolean;
};

export {
  client,
  rGet,
  rSet,
};
