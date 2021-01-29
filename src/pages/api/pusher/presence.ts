import type { NextApiHandler, NextApiRequest } from "next";
import { pollDefault } from "../../../blocks/PlanningPoker/reducer";
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
      pList.push((async (): Promise<void> => {
        const response = await pusher.get({ path: `/channels/${event.channel}/users` }) as Response;

        if (response.status === 200) {
          const poll = await rGet<typeof pollDefault>(event.channel) ?? pollDefault;

          poll.users = (await response.json() as typeof poll).users;

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
