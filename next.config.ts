import path from 'path';
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname, 'yarn.lock'),
  reactStrictMode: true,
  transpilePackages: [
    'ckeditor5',
    '@ckeditor/ckeditor5-react'
  ],
  webpack: (config) => {
    // SVG handling for CKEditor icons
    config.module.rules.push({
      test: /\.svg$/,
      include: [
        path.resolve(__dirname, 'node_modules/@ckeditor'),
        path.resolve(__dirname, 'node_modules/ckeditor5')
      ],
      use: ['raw-loader']
    });
    
    return config;
  }
};

export default nextConfig;
