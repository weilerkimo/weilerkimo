import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // QV 27 Key Visual: nur auf grafikzuerich.ch (und Squarespace-Editor) einbettbar
        source: "/qv27/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://grafikzuerich.ch https://*.grafikzuerich.ch https://*.squarespace.com",
          },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
