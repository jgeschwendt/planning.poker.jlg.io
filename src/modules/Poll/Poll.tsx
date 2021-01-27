import type { SyntheticEvent } from "react";
import { Room } from "./Room";
import { RoomLogin } from "./RoomLogin";
import type { User } from "./types";
import { Box, Button, Flex, Relative } from "../../components";
import { useToggle } from "../../hooks";
import { PusherProvider } from "../../providers";

// https://fontawesome.com/icons/cog?style=solid
// eslint-disable-next-line max-len -- svg path
const cogPath = "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z";

// eslint-disable-next-line max-lines-per-function -- todo
export const Poll = ({
  channelName,
  onLogin,
  onLogout,
  user,
}: {
  channelName: string;
  onLogin: (user: User) => void;
  onLogout: () => void;
  user: Partial<User> | null;
}): JSX.Element => {
  const [menuOpen, toggleMenuOpen] = useToggle();

  if (typeof user?.name === "undefined") {
    return (
      <RoomLogin onLogin={onLogin} />
    );
  }

  return (
    <Flex flexDirection="column" minHeight="100vh" width="100%">
      <Box sx={{
        m: 2,
        position: ["static", null, "fixed"],
        right: [null, null, 0],
        top: [null, null, 0],
      }}>
        <Relative ml="auto" zIndex={1000}>
          <Button bg="white" display="flex" ml="auto" onClick={toggleMenuOpen} variant="outline-secondary">
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              style={{ height: 18,
                width: 18 }}
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            ><path d={cogPath} fill="currentColor" />
            </svg>
          </Button>
          {
            menuOpen &&
            <Box sx={{
              bg: "white",
              border: "1px solid #000",
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
              borderTopLeftRadius: [0, null, 4],
              borderTopRightRadius: [0, null, 4],
              mt: 6,
              p: 3,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: -1,
            }}>
              <Button variant="secondary" onClick={(event: SyntheticEvent): void => {
                event.preventDefault();
                onLogout();
                toggleMenuOpen();
              }}>Logout</Button>
            </Box>
          }
        </Relative>
      </Box>
      <PusherProvider
        appKey={process.env.NEXT_PUBLIC_PUSHER_KEY as string}
        options={{
          auth: {
            params: {
              name: user.name,
            },
          },
          authEndpoint: "/api/pusher/auth",
          cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        }}
      ><Room channelName={channelName} />
      </PusherProvider>
    </Flex>
  );
};
