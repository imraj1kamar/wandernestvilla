export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.wandernestvillas.com';
  const currentDate = new Date().toISOString();

  // 1. Core Hub & Landing Routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // 2. Dynamic Luxury Villa Detail Routes
  // (In production, replace or augment this array with a direct CMS or database fetch)
  const villaIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const villaRoutes = villaIds.map((id) => ({
    url: `${baseUrl}/villas/${id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Featured Slug-Based Aliases for Enhanced SEO
  const slugRoutes = [
    'the-cloud-retreat-lonavla',
    'oceanic-whisper-alibaug',
    'heritage-estate-karjat',
    'marigold-estate-udaipur',
    'the-glasshouse-goa',
  ].map((slug) => ({
    url: `${baseUrl}/villas/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...villaRoutes, ...slugRoutes];
}
