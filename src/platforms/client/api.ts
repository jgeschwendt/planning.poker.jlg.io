import type { Poll } from "../../modules/Poll/types";

const sendMessage = async (channelName: string, event: string, data: unknown): Promise<unknown> => {
  const response = await fetch("/api/poll", {
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

const getPollChannel = async (channelName: string): Promise<Poll> => {
  const response = await fetch(`/api/poll/${channelName}`, {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json() as Promise<Poll>;
};

export {
  getPollChannel,
  sendMessage,
};
