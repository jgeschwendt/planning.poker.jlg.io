// eslint-disable-next-line import/no-named-as-default -- standard export name
import produce from "immer";
import type { Poll } from "./types";

const pollDefault: Poll = {
  results: {
    public: false,
  },
  users: [],
  votes: {},
};

const pollSlice = {
  "reset": (): ((poll: Poll) => Poll) => produce((poll: Poll) => {
    poll.results.public = false;

    // Remove user votes
    for (const username in poll.votes) {
      // Check if the user is online
      if (poll.users.find(({ id }) => id === poll.votes[username].socketID)) {
        // Check if the user on a coffee break.
        if (poll.votes[username].vote !== "☕") {
          poll.votes[username] = {
            socketID: poll.votes[username].socketID,
            vote: void 0,
          };
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- @
        delete poll.votes[username];
      }
    }
  }),
  "results.public.set": (value: boolean): ((poll: Poll) => Poll) => produce((poll: Poll) => {
    poll.results.public = value;
  }),
  "vote": ({ data, from }: { data: Record<string, unknown>; from: string }): ((poll: Poll) => Poll) => (
    produce((poll: Poll) => {
      poll.votes[from] = { ...poll.votes[from], ...data };
    })
  ),
};

const pollReducer = (poll: Poll, event: string, payload: unknown): Poll => {
  if (event in pollSlice) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- todo
    return produce(pollSlice[event as keyof typeof pollSlice](payload as any)(poll), (draft) => {
      if (
        Object.keys(draft.votes).filter((username) => typeof draft.votes[username].vote === "undefined").length === 0
      ) {
        draft.results.public = true;
      }
    });
  }

  return poll;
};

export {
  pollDefault,
  pollReducer,
  pollSlice,
};
