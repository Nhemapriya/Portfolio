/// <reference types="vite/client" />

// The repo ships images with uppercase extensions (.JPG) which Vite's
// client types don't declare — add them so TS imports resolve.
declare module "*.JPG" {
  const src: string;
  export default src;
}
declare module "*.JPEG" {
  const src: string;
  export default src;
}
