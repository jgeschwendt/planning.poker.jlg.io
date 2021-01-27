import styled from "@emotion/styled";
import { useRouter } from "next/router";
import type { FormEvent } from "react";
import { useRef } from "react";
import { Flex, Box, Label, Input, Button } from "../components";

const Form = styled.form({ width: "15rem" });

const Home = (): JSX.Element => {
  const router = useRouter();

  const form = {
    channel: useRef<HTMLInputElement>(null),
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeof form.channel.current?.value !== "undefined") {
      void router.push(`/${form.channel.current.value}`);
    }
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", width: "100%" }}
    >
      <Box>
        <Form onSubmit={handleOnSubmit}>
          <Label htmlFor="name" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
            Username
          </Label>

          <Input id="name" mb={3} p={3} ref={form.channel} type="text" />

          <Button
            id="submit"
            py={"12px"}
            sx={{ letterSpacing: 1, textTransform: "uppercase" }}
            type="submit"
            variant="outline-primary"
            width="100%"
          >Login
          </Button>
        </Form>
      </Box>
    </Flex>
  );
};

export default Home;
