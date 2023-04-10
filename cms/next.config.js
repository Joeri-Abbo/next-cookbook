/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        COOKBOOK_URL: process.env.COOKBOOK_URL,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        const alias = {...config.resolve.alias}

        delete alias.url // alias to native-url

        return config;
    },
}

module.exports = nextConfig
