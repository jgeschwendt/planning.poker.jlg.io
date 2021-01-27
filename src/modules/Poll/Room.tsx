import { RoomConnected } from "./RoomConnected";
import { usePresenceChannel } from "../../hooks";

export const Room = ({ channelName }: { channelName: string }): JSX.Element | null => {
  const [channel] = usePresenceChannel(channelName);

  if (!channel) {
    return null;
  }

  return (
    <RoomConnected channel={channel} />
  );
};
