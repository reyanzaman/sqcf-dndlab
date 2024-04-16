/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'sqcf.s3.ap-southeast-1.amazonaws.com',
            },
        ],
    },
    webpack(config, options) {
        config.resolve.alias['@'] = path.resolve(__dirname, './app');
        return config;
    },
};

export default nextConfig;