import type { NextConfig } from "next";

// const createNextIntlPlugin = require("next-intl/plugin");
// const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
};

module.exports = {
  allowedDevOrigins: ["192.168.80.136"],
};

// export default withNextIntl(nextConfig);
export default nextConfig;
