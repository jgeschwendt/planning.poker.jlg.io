import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Label,
} from '../../components';
import { useDidMount } from '../../hooks';

const Form = styled.form({ width: '15rem' });

const shakeAnimation = keyframes`
  0%, 100% { 
    transform: translateX(0px); 
  }
  25% {
    transform: translateX(-5px); 
  }
  50% {
    transform: translateX(0px); 
  }
  75% { 
    transform: translateX(5px); 
  }
`;

// eslint-disable-next-line max-lines-per-function -- @
export const RoomLogin = ({
  dispatchLogin,
}: {
  dispatchLogin: (user: { name: string }) => void;
}): JSX.Element => {
  const [name, setName] = useState('');
  const [nameAnimation, setNameAnimation] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);

  const triggerNameShakeAnimation = useCallback(() => {
    setNameAnimation(false);
    setTimeout(() => {
      setNameAnimation(true);
    });
  }, []);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setNameError(null);
    // If the value contains non word chars or `_`, `-`
    if ((/[^A-Za-z0-9_-]/gu).test(event.target.value)) {
      triggerNameShakeAnimation();
    }

    // Remove anything thats not a word char or `_`, `-`
    setName((event.target.value.replace((/\s+/gu), '').replace((/[^A-Za-z0-9_-]/gu), '')));
  }, [triggerNameShakeAnimation]);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    // Prevent form submit
    event.preventDefault();

    if (name === '') {
      setNameError('Name is Required');
      triggerNameShakeAnimation();
    } else {
      dispatchLogin({ name });
    }
  }, [dispatchLogin, name, triggerNameShakeAnimation]);

  // Autofocus form control
  useDidMount(() => {
    void nameRef.current?.focus();
  });

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box>
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor="name"
            sx={{
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Username
          </Label>

          <Input
            // eslint-disable-next-line react/forbid-component-props -- twbs
            className={nameError === null ? void 0 : 'is-invalid'}
            id="name"
            mb={3}
            onChange={handleOnChange}
            p={3}
            ref={nameRef}
            sx={{
              animation: nameAnimation ? `${shakeAnimation} 100ms linear 0ms normal 2` : null,
              // Hide twbs error icon
              backgroundImage: 'none !important',
              transform: 'translateX(0px)',
            }}
            type="text"
            value={name}
          />

          <Button
            id="submit"
            sx={{
              letterSpacing: 1,
              py: '.75rem',
              textTransform: 'uppercase',
              width: '100%',
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
