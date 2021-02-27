/* eslint-disable @typescript-eslint/naming-convention -- **/
/* eslint-disable camelcase -- **/
import type { NextApiHandler } from 'next';
import { pusher } from '../../../platforms/server/pusher';

type RequestBody = {
  [key: string]: unknown;
  channel_name: string;
  socket_id: string;
  user_id: string;
};

const handler: NextApiHandler = (req, res) => {
  const { channel_name, socket_id: user_id, ...user_info } = req.body as RequestBody;

  res.send(pusher.authenticate(user_id, channel_name, { user_id, user_info }));
};

export {
  handler as default,
};
/* eslint-enable @typescript-eslint/naming-convention -- **/
/* eslint-enable camelcase -- **/
