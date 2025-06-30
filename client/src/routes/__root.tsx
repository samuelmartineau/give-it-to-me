import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { store } from '../store'
import theme from '../components/Toolkit/theme'
import ServerSentEventDispatcher from '../store/ServerSentEventDispatcher'
import * as Sentry from '@sentry/react'

// Initialize Sentry
Sentry.init({
  enabled: import.meta.env.PROD,
  dsn: import.meta.env.VITE_SENTRY_DSN,
})

export const Route = createRootRoute({
  component: () => (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <>
            <ServerSentEventDispatcher />
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
          </>
        </Provider>
      </ThemeProvider>
    </HelmetProvider>
  ),
})