import type { MetadataRoute } from 'next';
import { getPublicSiteUrl } from '../lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();

  return siteUrl ? [{ url: siteUrl.toString() }] : [];
}
