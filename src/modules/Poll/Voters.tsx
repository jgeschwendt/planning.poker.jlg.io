import styled from "@emotion/styled";
import css from "@styled-system/css";
import type { Poll } from "./types";
import { Text } from "../../components";

const List = styled.ul({
  listStyleType: "none",
  margin: 0,
  padding: 0,
});

const Item = styled.li(css({
  alignItems: "center",
  display: "flex",
  lineHeight: 1,
  px: 2,
  py: 3,
}));

const Dot = styled.div(({ color }) => css({
  backgroundColor: color,
  border: "2px solid black",
  borderRadius: 8,
  height: 16,
  mr: 2,
  width: 16,
}));

const selectColor = (vote?: string): string => {
  if (typeof vote === "undefined") {
    return "yellow";
  }

  if (isNaN(parseFloat(vote))) {
    if (vote === "☕") {
      return "orange";
    }
  }

  return "green";
};

export const Voters = ({ poll }: { poll: Poll }): JSX.Element => (
  <List>
    {Object.keys(poll.votes).map((username) => (
      <Item key={username}>
        <Dot color={selectColor(poll.votes[username].vote)} />
        <Text>{username}</Text>
      </Item>
    ))}
  </List>
);
