import { StatusCodes } from "http-status-codes";
import type { NextApiHandler } from "next";
import { socketStateDefault } from "../../../blocks/PlanningPoker/reducer";
import type { SocketState } from "../../../blocks/PlanningPoker/types";
import { rGet } from "../../../platforms/server/redis";

const handler: NextApiHandler = async (req, res): Promise<void> => {
  try {
    if (typeof req.query.channel === "string") {
      res.json(await rGet<SocketState>(req.query.channel) ?? socketStateDefault);
    } else {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).send("Missing `query.channel`");
    }
  } catch (error) {
    global.console.error(error);
    res.status(500);
  }
};

export {
  handler as default,
};
