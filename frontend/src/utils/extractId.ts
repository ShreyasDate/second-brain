// Helper functions to extract IDs from URLs
  export const extractYouTubeId = (url: string): string | undefined => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : undefined
  }

  export const extractTweetId = (url?: string | null): string | undefined => {
  if (!url) return undefined;

  // quick numeric-only case: if user passed the id itself
  const numericOnly = url.trim();
  if (/^\d{6,30}$/.test(numericOnly)) {
    return numericOnly;
  }

  // Normalize and try to extract id from common URL patterns:
  // - https://twitter.com/user/status/123
  // - https://x.com/user/status/123
  // - https://mobile.twitter.com/user/status/123
  // - https://twitter.com/i/web/status/123
  // Variants: with or without protocol, with query params.
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:mobile\.|m\.)?(?:twitter\.com|x\.com)\/(?:i\/web\/)?[^\/?#]+\/status\/(\d+)/i;
  const match = url.match(regex);
  if (match && match[1]) return match[1];

  // Fallback: try to find any "/status/<id>" anywhere in the string
  const fallback = url.match(/status\/(\d+)/i);
  if (fallback && fallback[1]) return fallback[1];

  return undefined;
};