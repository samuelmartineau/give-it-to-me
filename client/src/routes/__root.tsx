import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../components/Toolkit/theme';
import ServerSentEventDispatcher from '../store/ServerSentEventDispatcher';
import * as Sentry from '@sentry/react';
import { store, getCellar, getWineFamilies } from '@/store';

// Initialize Sentry
Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: import.meta.env.SENTRY_DSN,
});

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider theme={theme}>
      <>
        <ServerSentEventDispatcher />
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </>
    </ThemeProvider>
  ),
});
