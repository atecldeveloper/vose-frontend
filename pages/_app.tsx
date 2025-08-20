import '../styles/globals.css'
import * as React from 'react';
import { NextIntlProvider } from "next-intl";
import Head from 'next/head';
import type { AppProps } from 'next/app'
import {CacheProvider} from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import {AppWrapper} from "../src/context/state";
import {SnackbarWrapper} from "../src/context/snackbar";
// Material UI
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ConsecutiveSnackbars from "../components/CustomSnackbar";
import { theme } from '../src/config/theme';
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: AppProps) {
  // @ts-ignore
  const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            // @ts-ignore
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

  return (
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=0;"/>
          <title>VOSE</title>
        </Head>
          <NextIntlProvider messages={pageProps.messages}>
              <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                <AppWrapper>
                    <SnackbarWrapper>
                        <Component {...pageProps} />
                        <ConsecutiveSnackbars />
                    </SnackbarWrapper>
                </AppWrapper>
              </ThemeProvider>
          </NextIntlProvider>
      </CacheProvider>
  );
}

