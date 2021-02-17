import { ReasonPhrases, StatusCodes } from "http-status-codes";
import type { NextApiHandler, NextApiRequest } from "next";
import type { SocketStateSlice } from "../../../blocks/PlanningPoker/reducer";
import { socketStateDefault, socketStateReducer } from "../../../blocks/PlanningPoker/reducer";
import type { SocketState } from "../../../blocks/PlanningPoker/types";
import { log } from "../../../lib";
import { pusher } from "../../../platforms/server/pusher";
import { rGet, rSet } from "../../../platforms/server/redis";

const GET = {
  handler: async (req: NextApiRequest): Promise<SocketState> => (
    await rGet<SocketState>(req.query.channel as string) ?? socketStateDefault
  ),
  process: (req: NextApiRequest): void => {
    if (typeof req.query.channel !== "string") {
      throw new TypeError("Missing `query.channel`");
    }
  },
};

const POST = {
  handler: async (req: NextApiRequest): Promise<void> => {
    const [event, payload] = req.body as [
      keyof SocketStateSlice,
      Parameters<SocketStateSlice[keyof SocketStateSlice]>[number],
    ];

    const socketState = socketStateReducer(
      (await rGet(req.query.channel as string)) ?? socketStateDefault,
      event,
      payload,
    );

    await rSet(req.query.channel as string, socketState);

    await pusher.trigger(req.query.channel as string, "update", socketState);
  },
  process: (req: NextApiRequest): void => {
    if (typeof req.query.channel !== "string") {
      throw new TypeError("Missing `query.channel`");
    }

    if (!Array.isArray(req.body)) {
      throw new TypeError("Body should be an Array");
    }

    if (typeof (req.body as unknown[])[0] === "undefined") {
      throw new TypeError("Missing `body[event,]`");
    }
  },
};

// eslint-disable-next-line max-statements -- controller
const handler: NextApiHandler = async (req, res): Promise<void> => {
  try {
    switch (req.method?.toUpperCase()) {
      case "GET":
        try {
          GET.process(req);
        } catch (error) {
          if (error instanceof Error) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error);
            return;
          }
          throw error;
        }

        res.json(await GET.handler(req));
        return;

      case "POST":
        try {
          POST.process(req);
        } catch (error) {
          if (error instanceof Error) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).send((error).message);
            return;
          }
          throw error;
        }

        await POST.handler(req);
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        return;

      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).send(ReasonPhrases.METHOD_NOT_ALLOWED);
        return;
    }
  } catch (error) {
    log.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
};

export {
  handler as default,
};
