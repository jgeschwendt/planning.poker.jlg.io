import type { Members, PresenceChannel } from "pusher-js";
import { useEffect, useRef, useState } from "react";
import { usePusher } from "./usePusher";

type Member = {
  id: string;
  info?: Record<string, unknown>;
};

export const usePresenceChannel = (channelName: string): [PresenceChannel, Members] => {
  if (!channelName.includes("presence-")) {
    throw new Error("Presence channels must use the 'presence-' prefix");
  }

  const pusher = usePusher();

  const channel = useRef(pusher.subscribe(channelName) as PresenceChannel);

  const [members, setMembers] = useState(channel.current.members);

  useEffect(() => {
    const currentChannel = channel.current;

    const pusherSubscriptionSucceeded = (membersRecord: Members): void => {
      window.console.log("[Members]: ", membersRecord);
      setMembers(currentChannel.members);
    };

    const pusherMemberAdded = (member: Member): void => {
      window.console.log("[MemberAdded]: ", member);
      setMembers(currentChannel.members);
    };

    const pusherMemberRemoved = (member: Member): void => {
      window.console.log("[MemberRemoved]: ", member);
      setMembers(currentChannel.members);
    };

    currentChannel.bind("pusher:member_added", pusherMemberAdded);
    currentChannel.bind("pusher:member_removed", pusherMemberRemoved);
    currentChannel.bind("pusher:subscription_succeeded", pusherSubscriptionSucceeded);

    return (): void => {
      currentChannel.unbind("pusher:member_added", pusherMemberAdded);
      currentChannel.unbind("pusher:member_removed", pusherMemberRemoved);
      currentChannel.unbind("pusher:subscription_succeeded", pusherSubscriptionSucceeded);

      pusher.unsubscribe(channelName);
    };
  }, [channelName, pusher]);

  return [channel.current, members];
};
