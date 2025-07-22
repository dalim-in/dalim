import { createContentlayerPlugin } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
    },
    reactStrictMode: true,
    serverActions: {
        bodySizeLimit: '5mb',
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

const withContentlayer = createContentlayerPlugin({
    // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
