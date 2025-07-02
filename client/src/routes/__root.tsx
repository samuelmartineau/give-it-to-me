import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { HelmetProvider } from 'react-helmet-async'
import theme from '../components/Toolkit/theme'
import ServerSentEventDispatcher from '../store/ServerSentEventDispatcher'
import * as Sentry from '@sentry/react'

// Initialize Sentry
Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: import.meta.env.SENTRY_DSN,
})

export const Route = createRootRoute({
  component: () => (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
          <>
            <ServerSentEventDispatcher />
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
          </>
      </ThemeProvider>
    </HelmetProvider>
  ),
})