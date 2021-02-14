type Me = {
  id: string;
  info: {
    name: string;
  };
};

type SocketState = {
  results: {
    public: boolean;
  };
  users: {
    id: string;
  }[];
  votes: Record<string, {
    socketID: string;
    vote?: string;
  }>;
};

type User = {
  name: string;
};

export type {
  Me,
  SocketState,
  User,
};
