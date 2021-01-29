import type { Options } from "pusher-js";
import Pusher from "pusher-js";
import type { ReactNode } from "react";
import { createContext } from "react";

const PusherContext = createContext<Pusher | null>(null);

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
  PusherContext,
  PusherProvider,
};
