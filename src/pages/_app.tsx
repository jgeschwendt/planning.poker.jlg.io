import './_app.scss';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { theme } from '../styles/theme';

const App = ({
  // eslint-disable-next-line @typescript-eslint/naming-convention -- next api
  Component,
  pageProps,
}: AppProps): JSX.Element => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
