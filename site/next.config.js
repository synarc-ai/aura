/** @type {import('next').NextConfig} */
const isProduction = process.env.DEPLOY_TARGET === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProduction ? '/synarc' : '',
  assetPrefix: isProduction ? '/synarc/' : '',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
}

module.exports = nextConfig