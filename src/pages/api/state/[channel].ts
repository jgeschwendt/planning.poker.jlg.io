import type { NextApiHandler } from "next";
import { pollDefault } from "../../../blocks/PlanningPoker/reducer";
import type { Poll } from "../../../blocks/PlanningPoker/types";
import { rGet } from "../../../platforms/server/redis";

const handler: NextApiHandler = async (req, res): Promise<void> => {
  try {
    if (typeof req.query.channel !== "string") {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers -- todo
      res.status(401).send({
        error: "Invalid payload: req.query.channel is required",
      });

      return;
    }

    res.json(await rGet<Poll>(req.query.channel) ?? pollDefault);
  } catch (err) {
    global.console.error(err);
    res.status(500);
  }
};

export default handler;