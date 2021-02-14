import { StatusCodes } from "http-status-codes";
import type { NextApiHandler } from "next";
import type { socketStateSlice } from "../../../blocks/PlanningPoker/reducer";
import { socketStateDefault, socketStateReducer } from "../../../blocks/PlanningPoker/reducer";
import { pusher } from "../../../platforms/server/pusher";
import { rGet, rSet } from "../../../platforms/server/redis";

type Body = [
  channelName: string,
  event: string,
  payload: Record<string, unknown> | undefined,
];

const processBody = (body: unknown): Body => {
  if (!Array.isArray(body)) {
    throw new TypeError("Body should be an Array");
  }

  if (typeof body[0] === "undefined") {
    throw new TypeError("Missing `body[channelName,,]`");
  }

  if (typeof body[1] === "undefined") {
    throw new TypeError("Missing `body[,event,]`");
  }

  return [body[0], body[1], body[2]] as Body;
};

const handler: NextApiHandler = async (req, res) => {
  let [channelName, event, payload] = [void 0, void 0, void 0] as Partial<Body>;

  try {
    [channelName, event, payload] = processBody(req.body);
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error);
    return;
  }

  const socketState = socketStateReducer(
    (await rGet(channelName)) ?? socketStateDefault,
    event as keyof typeof socketStateSlice,
    payload as unknown as Parameters<
      typeof socketStateSlice[(keyof typeof socketStateSlice)]
    >[number],
  );

  await rSet(channelName, socketState);

  await pusher.trigger(channelName, "update", socketState);

  res.send(StatusCodes.OK);
};

export {
  handler as default,
  processBody,
};
