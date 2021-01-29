import type Pusher from "pusher-js";
import { useContext } from "react";
import { PusherContext } from "./Pusher";

export const usePusher = (): Pusher => {
  const context = useContext(PusherContext);

  if (typeof context === "undefined") {
    throw new Error("usePusher must be used within a PusherContext");
  }

  return context as Pusher;
};