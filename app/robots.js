export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wandernestvillas.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/dashboard',
          '/private/',
          '/_next/',
        ],
      },
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'Bingbot',
          'Claude-Web',
          'ClaudeBot',
          'Anthropic-ai',
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Applebot',
        ],
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/dashboard',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
