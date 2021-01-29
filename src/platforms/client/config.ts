if (typeof process.env.NEXT_PUBLIC_PUSHER_KEY !== "string") {
  throw new Error("Missing: process.env.NEXT_PUBLIC_PUSHER_KEY");
}

if (typeof process.env.NEXT_PUBLIC_PUSHER_CLUSTER !== "string") {
  throw new Error("Missing: process.env.NEXT_PUBLIC_PUSHER_CLUSTER");
}

export const config = {
  pusher: {
    appKey: process.env.NEXT_PUBLIC_PUSHER_KEY,
    options: {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    },
  },
};
