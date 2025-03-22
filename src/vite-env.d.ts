/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_API_URL: string;
  readonly VITE_REACT_APP_COOKIE_PATH: string;
  readonly VITE_REACT_APP_COOKIE_DOMAIN: string;
  readonly VITE_REACT_APP_COOKIE_EXPIRES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
