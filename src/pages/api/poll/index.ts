import type { NextApiHandler } from "next";
import { pollDefault, pollReducer } from "../../../modules/Poll/reducer";
import { pusher } from "../../../platforms/server/lib/pusher";
import { rGet, rSet } from "../../../platforms/server/lib/redis";

// eslint-disable-next-line max-statements -- todo
const handler: NextApiHandler = async (req, res) => {
  const [channelName, event, payload] = req.body as [
    string | undefined,
    string | undefined,
    Record<string, unknown> | undefined,
  ];

  if (typeof channelName !== "string") {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- todo
    res.status(401).send("Missing `channelName`");
    return;
  }

  if (typeof event !== "string") {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- todo
    res.status(401).send("Missing `event`");
    return;
  }

  const poll = pollReducer((await rGet(channelName)) ?? pollDefault, event, payload);

  await rSet(channelName, poll);

  await pusher.trigger(channelName, "update", poll);

  res.send(200);
};

export default handler;
