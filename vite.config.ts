import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// Link previews need absolute URLs. Netlify sets URL (the site's primary URL)
// during builds; SITE_URL can override it. Falls back to relative paths locally.
function siteUrl(): Plugin {
  const url = (process.env.SITE_URL || process.env.URL || "").replace(/\/$/, "");
  return {
    name: "site-url",
    transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", url),
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrl()],
});
