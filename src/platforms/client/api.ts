import type { SocketState } from "../../blocks/PlanningPoker/types";

const sendMessage = async (channelName: string, event: string, data: unknown): Promise<unknown> => {
  const response = await fetch("/api/state", {
    body: JSON.stringify([channelName, event, data]),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

const getSocketState = async (channelName: string): Promise<SocketState> => {
  const response = await fetch(`/api/state/${channelName}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<SocketState>;
};

export {
  getSocketState,
  sendMessage,
};
