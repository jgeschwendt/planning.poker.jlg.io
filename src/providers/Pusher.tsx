import type { Options } from "pusher-js";
import Pusher from "pusher-js";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const PusherContext = createContext<Pusher | null>(null);

const usePusher = (): Pusher | null => {
  const context = useContext(PusherContext);

  if (typeof context === "undefined") {
    throw new Error("usePusher must be used within a PusherContext");
  }

  return context;
};

const PusherProvider = ({
  appKey,
  children,
  options,
}: { appKey: string; children: ReactNode; options: Options }): JSX.Element => (
  <PusherContext.Provider value={new Pusher(appKey, options)}>
    {children}
  </PusherContext.Provider>
);

export {
  PusherProvider,
  usePusher,
};
