const FALLBACK_BASE_URL = 'http://localhost:3000';

export function getBaseUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL;

  if (!envUrl) {
    return FALLBACK_BASE_URL;
  }

  const normalized = envUrl.replace(/\/+$/, '');
  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    return normalized;
  }

  return `https://${normalized}`;
}
