/** @type {import('next').NextConfig} */
const nextConfig = {
  // i write this code
  output: "standalone",
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: "referrer-policy", value: "no-referrer" }
        ]
      }
    ]
  }
}

module.exports = nextConfig
