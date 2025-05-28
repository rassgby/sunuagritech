/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore les erreurs ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore les erreurs TypeScript pendant le build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Désactive l’optimisation automatique des images (utile pour certains environnements comme Docker ou Vercel Free Tier)
  images: {
    unoptimized: true,
  },
}

export default nextConfig
