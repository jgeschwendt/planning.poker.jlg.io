import type Pusher from "pusher-js";
import { useContext } from "react";
import { PusherContext } from "./Pusher";

export const usePusher = (): Pusher => {
  const context = useContext(PusherContext);

  if (typeof context === "undefined") {
    throw new TypeError("usePusher must be used within a PusherProvider");
  }

  return context as Pusher;
};
