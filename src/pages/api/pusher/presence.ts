import type { NextApiHandler, NextApiRequest } from "next";
import { pollDefault } from "../../../modules/Poll/reducer";
import type { Poll } from "../../../modules/Poll/types";
import { pusher } from "../../../platforms/server/lib/pusher";
import { rGet, rSet } from "../../../platforms/server/lib/redis";

type APIRequest = Omit<NextApiRequest, "body"> & {
  body: {
    events?: Record<string, string>[];
  };
};

const handler: NextApiHandler = async (req: APIRequest, res) => {
  if (req.body.events) {
    const pList: Promise<unknown>[] = [];

    for (const event of req.body.events) {
      pList.push((async (): Promise<void> => {
        const response = await pusher.get({ path: `/channels/${event.channel}/users` }) as Response;

        if (response.status === 200) {
          const poll = await rGet<Poll>(event.channel) ?? pollDefault;

          poll.users = (await response.json() as Poll).users;

          await rSet(event.channel, poll);

          await pusher.trigger(event.channel, "update", poll);
        }
      })());
    }

    await Promise.all(pList);
  }

  res.send(200);
};

export default handler;
