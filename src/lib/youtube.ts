const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

export function isValidYoutubeId(id: string): boolean {
  return YOUTUBE_ID_REGEX.test(id);
}

export function extractYoutubeVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (YOUTUBE_ID_REGEX.test(trimmed)) {
    return trimmed;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();
  let candidate: string | null = null;

  if (host === 'youtu.be') {
    const seg = parsed.pathname.split('/').filter(Boolean)[0];
    candidate = seg ?? null;
  } else if (
    host === 'youtube.com' ||
    host === 'www.youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'music.youtube.com'
  ) {
    if (parsed.pathname === '/watch') {
      candidate = parsed.searchParams.get('v');
    } else {
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (
        parts.length >= 2 &&
        (parts[0] === 'shorts' || parts[0] === 'embed' || parts[0] === 'live' || parts[0] === 'v')
      ) {
        candidate = parts[1] ?? null;
      }
    }
  }

  if (!candidate || !YOUTUBE_ID_REGEX.test(candidate)) {
    return null;
  }

  return candidate;
}

export function buildShortsUrl(videoId: string): string {
  if (!isValidYoutubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  return `https://youtube.com/shorts/${videoId}`;
}

export function buildLongVideoUrl(videoId: string, seconds?: number | null): string {
  if (!isValidYoutubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  const safeSeconds = typeof seconds === 'number' && Number.isFinite(seconds) && seconds > 0
    ? Math.floor(seconds)
    : 0;
  return `https://youtu.be/${videoId}?t=${safeSeconds}`;
}

export function buildTopicVideoUrl(videoId: string): string {
  if (!isValidYoutubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  return `https://youtu.be/${videoId}`;
}

export function parseTimeToSeconds(timeInput: string): number | null {
  const cleaned = timeInput.trim();
  if (!cleaned) return 0;

  if (/^\d+$/.test(cleaned)) {
    return Number.parseInt(cleaned, 10);
  }

  const parts = cleaned.split(':');
  if (parts.length === 2) {
    const [mm, ss] = parts;
    if (!/^\d+$/.test(mm ?? '') || !/^\d{1,2}$/.test(ss ?? '')) return null;
    const minutes = Number.parseInt(mm!, 10);
    const seconds = Number.parseInt(ss!, 10);
    if (seconds >= 60) return null;
    return minutes * 60 + seconds;
  }

  if (parts.length === 3) {
    const [hh, mm, ss] = parts;
    if (!/^\d+$/.test(hh ?? '') || !/^\d{1,2}$/.test(mm ?? '') || !/^\d{1,2}$/.test(ss ?? '')) {
      return null;
    }
    const hours = Number.parseInt(hh!, 10);
    const minutes = Number.parseInt(mm!, 10);
    const seconds = Number.parseInt(ss!, 10);
    if (minutes >= 60 || seconds >= 60) return null;
    return hours * 3600 + minutes * 60 + seconds;
  }

  return null;
}

export function formatSecondsToTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;

  const pad = (n: number) => String(n).padStart(2, '0');
  if (hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  return `${pad(minutes)}:${pad(seconds)}`;
}
