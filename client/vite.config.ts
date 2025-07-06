import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import commonjs from 'vite-plugin-commonjs';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env variables from .env files into process.env
  const env = loadEnv(mode, process.cwd(), '');
  console.log({ env });

  const isProduction = mode === 'production';

  return {
    plugins: [
      // TanStack Router plugin for file-based route generation
      tanstackRouter(),
      commonjs(),
      react({
        // Add babel plugin for styled-components to replace Next.js's SWC transform
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                ssr: false, // We are doing client-side rendering
                displayName: !isProduction, // Show component names in dev for easier debugging
                pure: true,
              },
            ],
          ],
        },
      }),
      // Sentry plugin for uploading source maps.
      // This is only run for production builds and if Sentry variables are set.
      isProduction &&
        env.SENTRY_ORG &&
        env.SENTRY_PROJECT &&
        env.SENTRY_AUTH_TOKEN &&
        sentryVitePlugin({
          org: env.SENTRY_ORG,
          project: env.SENTRY_PROJECT,
          authToken: env.SENTRY_AUTH_TOKEN,
          sourcemaps: {
            // Specify the assets to include in the Sentry release.
            assets: './dist/**',
          },
        }),
    ],
    // Configure path aliases for imports
    resolve: {
      alias: {
        '~': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'),
        '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'src'),
      },
    },

    // Replaces the `rewrites` option in next.config.js
    server: {
      // Next.js runs on 3000 by default, let's keep it consistent
      port: 3000,
      // Proxy API requests to the backend server during development
      proxy: {
        '/api': {
          target: `http://localhost:${env.GITM_SERVER_PORT}`,
          changeOrigin: true,
        },
        '/sse': {
          target: `http://localhost:${env.GITM_SERVER_PORT}`,
          changeOrigin: true,
        },
        '/files': {
          target: 'http://localhost:3005',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/files/, ''),
        },
      },
    },
    // Replaces `withSourceMaps` and enables hidden source maps for Sentry
    build: {
      sourcemap: 'hidden',
    },
    // Replaces the `env` block in next.config.js
    define: {
      'import.meta.env.SENTRY_DSN': JSON.stringify(env.SENTRY_DSN),
      'import.meta.env.GITM_OWNER': JSON.stringify(env.GITM_OWNER),
      global: 'globalThis',
    },
  };
});
