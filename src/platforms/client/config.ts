/* eslint-disable node/no-process-env -- config */
if (typeof process.env.NEXT_PUBLIC_PUSHER_KEY !== "string") {
  throw new TypeError("Missing: process.env.NEXT_PUBLIC_PUSHER_KEY");
}

if (typeof process.env.NEXT_PUBLIC_PUSHER_CLUSTER !== "string") {
  throw new TypeError("Missing: process.env.NEXT_PUBLIC_PUSHER_CLUSTER");
}

export const config = {
  pusher: {
    appKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
    options: {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    },
  },
};
/* eslint-enable node/no-process-env -- config */
