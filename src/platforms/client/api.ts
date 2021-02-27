import type { ReasonPhrases } from 'http-status-codes';
import type { SocketState } from '../../blocks/PlanningPoker/types';

const sendMessage = async (channelName: string, event: string, data: unknown): Promise<ReasonPhrases.OK> => {
  const response = await fetch(`/api/state/${channelName}`, {
    body: JSON.stringify([event, data]),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.text() as Promise<ReasonPhrases.OK>;
};

const getSocketState = async (channelName: string): Promise<SocketState> => {
  const response = await fetch(`/api/state/${channelName}`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
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
