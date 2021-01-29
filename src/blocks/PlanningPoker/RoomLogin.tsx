import styled from "@emotion/styled";
import type { FormEvent } from "react";
import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Label,
} from "../../components";

const Form = styled.form({ width: "15rem" });

// eslint-disable-next-line max-lines-per-function -- todo
export const RoomLogin = ({ dispatchLogin }: { dispatchLogin: (user: { name: string }) => void }): JSX.Element => {
  const form = {
    name: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeof form.name.current?.value === "string") {
      if (form.name.current.value !== "") {
        dispatchLogin({
          name: form.name.current.value,
        });
      }
    }
  };

  useEffect(() => {
    form.name.current?.focus();
  }, [form.name]);

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="name"
            sx={{ letterSpacing: 1, textTransform: "uppercase" }}
          >Username
          </Label>

          <Input
            id="name"
            mb={3}
            p={3}
            ref={form.name}
            type="text"
          />

          <Button
            id="submit"
            sx={{ letterSpacing: 1, py: ".75rem", textTransform: "uppercase" }}
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
