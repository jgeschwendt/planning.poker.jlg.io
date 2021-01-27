import type { Members, PresenceChannel } from "pusher-js";
import { useEffect, useState } from "react";
import { useChannel } from "./useChannel";

type Member = {
  id: string;
  info?: Record<string, unknown>;
};

export const usePresenceChannel = (channelName: string): [PresenceChannel | null, Members | null] => {
  if (!channelName.includes("presence-")) {
    throw new Error("Presence channels must use the 'presence-' prefix");
  }

  const channel = useChannel<PresenceChannel>(channelName);

  const [members, setMembers] = useState<Members | null>(channel?.members ?? null);

  useEffect((): (() => void) => {
    if (channel) {
      const pusherSubscriptionSucceeded = (membersRecord: Members): void => {
        window.console.log("[Members]: ", membersRecord);
        setMembers(channel.members);
      };

      const pusherMemberAdded = (member: Member): void => {
        window.console.log("[MemberAdded]: ", member);
        setMembers(channel.members);
      };

      const pusherMemberRemoved = (member: Member): void => {
        window.console.log("[MemberRemoved]: ", member);
        setMembers(channel.members);
      };

      channel.bind("pusher:member_added", pusherMemberAdded);
      channel.bind("pusher:member_removed", pusherMemberRemoved);
      channel.bind("pusher:subscription_succeeded", pusherSubscriptionSucceeded);

      return (): void => {
        channel.unbind("pusher:member_added", pusherMemberAdded);
        channel.unbind("pusher:member_removed", pusherMemberRemoved);
        channel.unbind("pusher:subscription_succeeded", pusherSubscriptionSucceeded);
      };
    }

    return (): void => void 0;
  }, [channel]);

  return [channel, members];
};
