import type { Channel } from 'pusher-js';
import { useEffect } from 'react';
import { usePusher } from './usePusher';

export const useChannel = (channelName: string): Channel => {
  const pusher = usePusher();

  const channel = pusher.subscribe(channelName);

  useEffect(() => (): void => {
    pusher.unsubscribe(channelName);
  }, [channelName, pusher]);

  return channel;
};
