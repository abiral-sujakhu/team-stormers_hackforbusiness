import withPWA from 'next-pwa';

const runtimeCaching = [
  {
    urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'google-fonts',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      },
    },
  },
  {
    urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'jsdelivr-cdn',
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      },
    },
  },
  {
    urlPattern: /^\/$/, // Home page
    handler: 'NetworkFirst',
    options: {
      cacheName: 'start-url',
    },
  },
  {
    urlPattern: /^\/(login|signup)$/, // ✅ Cache /login and /signup
    handler: 'NetworkFirst',
    options: {
      cacheName: 'auth-pages',
      expiration: {
        maxEntries: 2,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      },
    },
  },
];

const withPwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  buildExcludes: [
    /middleware-manifest\.json$/,
    /app-build-manifest\.json$/,
    /_middleware\.js$/,
    /_middleware\.js.map$/,
  ],
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default withPwaConfig(nextConfig);
