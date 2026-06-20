/** @type {import('next').NextConfig} */
const nextConfig = {
  // sharp runs in the image-upload server action; keep it external (not bundled).
  serverExternalPackages: ["sharp"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "yywqmbyymfdxaqtfvanc.supabase.co" },
    ],
  },
};

export default nextConfig;
