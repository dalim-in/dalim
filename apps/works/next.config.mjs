import { createContentlayerPlugin } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
      }
    }
    return config
  },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
            },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
        ],
    },
}

const withContentlayer = createContentlayerPlugin({
    // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
