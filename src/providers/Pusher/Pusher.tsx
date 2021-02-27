import type { Options } from 'pusher-js';
import Pusher from 'pusher-js';
import type { ReactNode } from 'react';
import { createContext, useMemo } from 'react';

const PusherContext = createContext<Pusher | null>(null);

const PusherProvider = ({
  appKey,
  children,
  options,
}: {
  appKey: string;
  children: ReactNode;
  options: Options;
}): JSX.Element => {
  const optionsToken = JSON.stringify(options);

  const pusher = useMemo(() => (
    new Pusher(appKey, JSON.parse(optionsToken))
  ), [appKey, optionsToken]);

  return (
    <PusherContext.Provider value={pusher}>
      {children}
    </PusherContext.Provider>
  );
};

export {
  PusherContext,
  PusherProvider,
};
