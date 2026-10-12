/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Stops `next dev` from regenerating AGENTS.md / CLAUDE.md.
  agentRules: false,
  images: {
    // `search` is left open because the Unsplash URLs carry their own
    // resize params (w, q, fit).
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
    ],
  },
};

export default nextConfig;
