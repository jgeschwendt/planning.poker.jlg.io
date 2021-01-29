// eslint-disable-next-line import/no-unassigned-import -- todo
import "./_app.scss";

import { ThemeProvider } from "@emotion/react";
import type { AppProps } from "next/app";
import { StrictMode } from "react";
import { theme } from "../styles/theme";

// eslint-disable-next-line @typescript-eslint/naming-convention -- next api
const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </StrictMode>
);

export default App;
