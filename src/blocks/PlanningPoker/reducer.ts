import immer from "immer";
import type { SocketState } from "./types";

// Alias immer as produce
const produce = immer;

const socketStateDefault: SocketState = {
  results: {
    public: false,
  },
  users: [],
  votes: {},
};

type StateUpdate = ((socketState: SocketState) => SocketState);

/* eslint-disable @typescript-eslint/no-dynamic-delete -- immer scope */
const socketStateSlice = {
  "reset": (): StateUpdate => (
    produce((socketState: SocketState) => {
      socketState.results.public = false;

      for (const username in socketState.votes) {
      // Check if the user is online
        if (socketState.users.some(({ id }) => id === socketState.votes[username].socketID)) {
        // Check if the user is not taking coffee break.
          if (socketState.votes[username].vote !== "☕") {
            socketState.votes[username] = {
              socketID: socketState.votes[username].socketID,
              vote: void 0,
            };
          }
        // Otherwise remove them from the room state
        } else {
          delete socketState.votes[username];
        }
      }
    })),
  "results.public.set": (flag: boolean): StateUpdate => (
    produce((socketState: SocketState) => {
      socketState.results.public = flag;
    })
  ),
  "vote": ([from, data]: [string, unknown]): StateUpdate => (
    produce((socketState: SocketState) => {
      socketState.votes[from] = {
        ...socketState.votes[from],
        ...data as Record<string, unknown>,
      };
    })
  ),
};
/* eslint-enable @typescript-eslint/no-dynamic-delete -- immer scope */

type StateSlice = typeof socketStateSlice;

const socketStateReducer = <Reducer extends StateSlice, Action extends keyof StateSlice>(
  socketState: SocketState,
  event: Action,
  payload: Parameters<Reducer[Action]>[number],
): SocketState => {
  if (!(event in socketStateSlice)) {
    throw new TypeError(`\`socketStateSlice\` does not have key: ${event}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- handled by fn signature
  const state = socketStateSlice[event](payload as any)(socketState);

  // Add room side-effects
  return produce(state, (draft) => {
    const usersWithoutVotes = Object
      .keys(draft.votes)
      .filter((username) => typeof draft.votes[username].vote === "undefined");

    // If all the votes have been submitted set the results to public
    if ((usersWithoutVotes).length === 0) {
      draft.results.public = true;
    }
  });
};

export {
  socketStateDefault,
  socketStateReducer,
  socketStateSlice,
};

export type {
  StateSlice as SocketStateSlice,
};
