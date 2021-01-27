import type { GetServerSideProps } from "next";
import { useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Poll } from "../modules/Poll";
import type { User } from "../modules/Poll/types";

const Page = (props: { query: { channel: string } }): JSX.Element | null => {
  const channelName = `presence-${props.query.channel}`;

  const [user, setUser] = useLocalStorage<{ name?: string } | null | undefined>(channelName);

  const handleOnLogin = useCallback((userUpdate: User) => {
    setUser(userUpdate);
  }, [setUser]);

  const handleOnLogout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  // Check if the user has been loaded from localStorage yet (the value is null if loaded and empty).
  if (typeof user !== "undefined") {
    return (
      <Poll
        channelName={channelName}
        onLogin={handleOnLogin}
        onLogout={handleOnLogout}
        user={user}
      />
    );
  }

  return null;
};

const getServerSideProps: GetServerSideProps = async (props) => Promise.resolve({
  props: {
    query: props.query,
  },
});

export {
  Page as default,
  getServerSideProps,
};
