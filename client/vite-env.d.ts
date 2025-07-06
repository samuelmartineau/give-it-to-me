/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SENTRY_DSN: string;
  readonly GITM_OWNER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
