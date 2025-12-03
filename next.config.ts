import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/drive-storage/**'
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh5.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh6.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh*.googleusercontent.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  reactStrictMode: true,
  transpilePackages: ['ckeditor5', '@ckeditor/ckeditor5-react'],
  // Turbopack configuration for Next.js 16.0+
  turbopack: {
    rules: {
      // SVG handling for CKEditor icons
      '*.svg': {
        loaders: ['raw-loader'],
        as: '*.js'
      }
    },
    resolveAlias: {
      // Add any additional aliases if needed
    }
  }
};

export default nextConfig;
