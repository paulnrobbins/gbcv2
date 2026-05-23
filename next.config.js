/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // R3F + drei need transpile for ESM packages
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Vercel Blob / Cloudflare R2 for large HDRIs and GLB hero models
      { protocol: 'https', hostname: '**.public.blob.vercel-storage.com' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      // YouTube thumbnails for sermon archive
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  // Asset CDN base URL for HDRIs / large GLBs that don't live in /public
  env: {
    NEXT_PUBLIC_ASSET_CDN: process.env.NEXT_PUBLIC_ASSET_CDN ?? '',
  },
};

module.exports = nextConfig;
