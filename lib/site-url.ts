export function getPublicSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredUrl) return undefined;

  const siteUrl = new URL(configuredUrl);
  const hostname = siteUrl.hostname.toLowerCase().replace(/^\[|\]$/g, '');

  if (!['http:', 'https:'].includes(siteUrl.protocol)) {
    throw new Error('NEXT_PUBLIC_SITE_URL must use http or https.');
  }
  if (
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== '/' ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a public site origin without a path or credentials.');
  }
  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '::1' ||
    /^127(?:\.\d{1,3}){3}$/.test(hostname)
  ) {
    throw new Error('NEXT_PUBLIC_SITE_URL must not use a localhost or loopback address.');
  }

  return siteUrl;
}
