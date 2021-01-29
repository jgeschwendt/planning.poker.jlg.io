type Poll = {
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
  Poll,
  User,
};
