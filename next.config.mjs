/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Supabase Storage (remplacer <project> par le ref de projet Supabase)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
