import styled from "@emotion/styled";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useCallback, useRef } from "react";
import { Flex, Box, Label, Input, Button } from "../components";
import { useDidMount } from "../hooks";

const Form = styled.form({ width: "15rem" });

// eslint-disable-next-line max-lines-per-function -- @
const Home = (): JSX.Element => {
  const router = useRouter();

  const formChannel = useRef<HTMLInputElement>(null);

  const handleOnSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeof formChannel.current?.value !== "undefined") {
      void router.push(`/${formChannel.current.value}`);
    }
  }, [router]);

  // Autofocus form control
  useDidMount(() => void formChannel.current?.focus());

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box>
        <Form onSubmit={handleOnSubmit}>
          <Label
            htmlFor="name"
            sx={{ letterSpacing: 1, textTransform: "uppercase" }}
          >
            Room name
          </Label>

          <Input
            id="name"
            mb={3}
            p={3}
            ref={formChannel}
            type="text"
          />

          <Button
            id="submit"
            sx={{
              letterSpacing: 1,
              py: ".75rem",
              textTransform: "uppercase",
              width: "100%",
            }}
            type="submit"
            variant="outline-primary"
          >
            Login
          </Button>
        </Form>
      </Box>
    </Flex>
  );
};

export default Home;
