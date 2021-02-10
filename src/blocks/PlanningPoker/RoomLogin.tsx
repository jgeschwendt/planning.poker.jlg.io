import styled from "@emotion/styled";
import type { FormEvent } from "react";
import { useCallback, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Label,
} from "../../components";

const Form = styled.form({ width: "15rem" });

export const RoomLogin = ({ dispatchLogin }: { dispatchLogin: (user: { name: string }) => void }): JSX.Element => {
  const form = {
    name: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeof form.name.current?.value === "string" && form.name.current.value !== "") {
      dispatchLogin({
        name: form.name.current.value,
      });
    }
  }, [dispatchLogin, form.name]);

  useEffect(() => {
    form.name.current?.focus();
  }, [form.name]);

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box>
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="name" sx={{ letterSpacing: 1, textTransform: "uppercase" }}>
            Username
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
            sx={{ letterSpacing: 1, py: ".75rem", textTransform: "uppercase", width: "100%" }}
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
