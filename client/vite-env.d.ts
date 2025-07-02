/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}