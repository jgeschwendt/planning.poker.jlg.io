import { StatusCodes } from "http-status-codes";
import type { NextApiHandler, NextApiRequest } from "next";
import retry from "p-retry";
import { socketStateDefault } from "../../../blocks/PlanningPoker/reducer";
import { pusher } from "../../../platforms/server/pusher";
import { rGet, rSet } from "../../../platforms/server/redis";

type APIRequest = Omit<NextApiRequest, "body"> & {
  body: {
    events?: Record<string, string>[];
  };
};

const handler: NextApiHandler = async (req: APIRequest, res) => {
  if (req.body.events) {
    const pList: Promise<void>[] = [];

    for (const event of req.body.events) {
      pList.push(retry(async (): Promise<void> => {
        const response = await pusher.get({ path: `/channels/${event.channel}/users` }) as Response;

        if (response.status === StatusCodes.OK) {
          const socketState = await rGet<typeof socketStateDefault>(event.channel) ?? socketStateDefault;

          socketState.users = (await response.json() as typeof socketState).users;

          await rSet(event.channel, socketState);

          await pusher.trigger(event.channel, "update", socketState);
        }
      }));
    }

    await Promise.all(pList);
  }

  res.send(StatusCodes.OK);
};

export {
  handler as default,
};
