import styled from "@emotion/styled";
import type { FormEvent } from "react";
import { useCallback, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Label,
} from "../../components";
import { useDidMount } from "../../hooks";

const Form = styled.form({ width: "15rem" });

export const RoomLogin = ({ dispatchLogin }: { dispatchLogin: (user: { name: string }) => void }): JSX.Element => {
  const formName = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (typeof formName.current?.value === "string" && formName.current.value !== "") {
      dispatchLogin({ name: formName.current.value });
    }
  }, [dispatchLogin]);

  // Autofocus form control
  useDidMount(() => void formName.current?.focus());

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
            ref={formName}
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
