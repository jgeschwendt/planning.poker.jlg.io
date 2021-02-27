import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { Box, Button, Flex, Input, Label } from '../components';
import { useDidMount } from '../hooks';

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
const Home = (): JSX.Element => {
  const [channel, setChannel] = useState('');
  const [channelAnimation, setChannelAnimation] = useState(false);
  const [channelError, setChannelError] = useState<string | null>(null);

  const router = useRouter();

  const formChannel = useRef<HTMLInputElement>(null);

  const triggerChannelShakeAnimation = useCallback(() => {
    setChannelAnimation(false);
    setTimeout(() => {
      setChannelAnimation(true);
    });
  }, []);

  const handleOnChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    setChannelError(null);
    // If the value contains non word chars or `_`, `-`
    if ((/[^A-Za-z0-9_-]/gu).test(event.target.value)) {
      triggerChannelShakeAnimation();
    }

    // Remove anything thats not a word char or `_`, `-`
    setChannel((event.target.value.replace((/\s+/gu), '').replace((/[^A-Za-z0-9_-]/gu), '')));
  }, [triggerChannelShakeAnimation]);

  const handleOnSubmit = useCallback((event: FormEvent<HTMLFormElement>): void => {
    // Prevent form submit
    event.preventDefault();

    if (channel === '') {
      setChannelError('Channel is Required');
      triggerChannelShakeAnimation();
    } else if (typeof formChannel.current?.value !== 'undefined') {
      void router.push(`/${formChannel.current.value}`);
    }
  }, [channel, router, triggerChannelShakeAnimation]);

  // Autofocus form control
  useDidMount(() => void formChannel.current?.focus());

  return (
    <Flex alignItems="center" justifyContent="center" minHeight="100vh" width="100%">
      <Box>
        <Form onSubmit={handleOnSubmit}>
          <Label
            htmlFor="Channel"
            sx={{ letterSpacing: 1, textTransform: 'uppercase' }}
          >
            Room Channel
          </Label>

          <Input
            // eslint-disable-next-line react/forbid-component-props -- twbs
            className={channelError === null ? void 0 : 'is-invalid'}
            id="Channel"
            mb={3}
            onChange={handleOnChange}
            p={3}
            ref={formChannel}
            sx={{
              animation: channelAnimation ? `${shakeAnimation} 100ms linear 0ms normal 2` : null,
              // Hide twbs error icon
              backgroundImage: 'none !important',
              transform: 'translateX(0px)',
            }}
            type="text"
            value={channel}
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

export default Home;
