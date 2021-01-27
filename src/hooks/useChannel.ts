import type { Channel } from "pusher-js";
import { useState, useEffect } from "react";
import { usePusher } from "../providers/Pusher";

export const useChannel = <T extends Channel> (channelName: string): T | null => {
  const pusher = usePusher();
  const [channel, setChannel] = useState<T | null>(null);

  useEffect(() => {
    if (!pusher) {
      return (): void => void 0;
    }

    setChannel(pusher.subscribe(channelName) as T);

    return (): void => {
      pusher.unsubscribe(channelName);
    };
  }, [channelName, pusher]);

  return channel;
};
