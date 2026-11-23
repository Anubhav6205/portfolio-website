import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/resume", destination: "/Anubhav_Gupta_Resume.pdf", permanent: false },
      { source: "/resume.pdf", destination: "/Anubhav_Gupta_Resume.pdf", permanent: false },
      { source: "/myresume.pdf", destination: "/Anubhav_Gupta_Resume.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
