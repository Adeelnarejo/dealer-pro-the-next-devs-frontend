/**
 * DealerPro Signing Link Utilities
 *
 * Helpers for generating, validating, and formatting
 * agreement signing links.
 */

/**
 * Generate a standard signing link for authenticated users.
 *
 * @param agreementId - Unique agreement ID
 * @returns Relative URL for authenticated signing
 */
export const generateRegularSigningLink = (
  agreementId: string | number
): string => {
  return `/sign-agreement/${encodeURIComponent(String(agreementId))}`;
};

/**
 * Generate a public signing link with an access token and expiration time.
 *
 * @param agreementId - Unique agreement ID
 * @param token - Public access token
 * @param expiryHours - Number of hours before the link expires
 * @returns Full public signing URL
 */
export const generatePublicSigningLink = (
  agreementId: string | number,
  token: string,
  expiryHours = 1
): string => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "";

  const safeExpiryHours =
    Number.isFinite(expiryHours) && expiryHours > 0
      ? expiryHours
      : 1;

  const expiryTimestamp =
    Math.floor(Date.now() / 1000) +
    safeExpiryHours * 60 * 60;

  const params = new URLSearchParams({
    token,
    expires: String(expiryTimestamp),
  });

  return `${baseUrl}/agreement-sign/${encodeURIComponent(
    String(agreementId)
  )}?${params.toString()}`;
};

/**
 * Generate an agreement signing link based on the current context.
 *
 * When public signing is enabled and a token is provided,
 * a public expiring link is generated.
 *
 * Otherwise, a standard authenticated signing link is returned.
 *
 * @param agreementId - Unique agreement ID
 * @param options - Signing link configuration
 * @returns Signing URL
 */
export const generateSigningLink = (
  agreementId: string | number,
  options?: {
    isPublic?: boolean;
    token?: string;
    expiryHours?: number;
  }
): string => {
  if (options?.isPublic && options.token?.trim()) {
    return generatePublicSigningLink(
      agreementId,
      options.token.trim(),
      options.expiryHours
    );
  }

  return generateRegularSigningLink(agreementId);
};

/**
 * Convert an expiration value into a valid Unix timestamp.
 *
 * @param expiryTimestamp - Unix timestamp as a number or string
 * @returns Valid timestamp or null when invalid
 */
const parseExpiryTimestamp = (
  expiryTimestamp: string | number
): number | null => {
  const expiry =
    typeof expiryTimestamp === "string"
      ? Number(expiryTimestamp)
      : expiryTimestamp;

  if (!Number.isFinite(expiry)) {
    return null;
  }

  return expiry;
};

/**
 * Check whether a public signing link has expired.
 *
 * @param expiryTimestamp - Unix expiration timestamp
 * @returns true when the link has expired
 */
export const isLinkExpired = (
  expiryTimestamp: string | number
): boolean => {
  const expiry = parseExpiryTimestamp(expiryTimestamp);

  if (expiry === null) {
    return true;
  }

  const currentTimestamp = Math.floor(
    Date.now() / 1000
  );

  return currentTimestamp >= expiry;
};

/**
 * Get the remaining time before a public signing link expires.
 *
 * @param expiryTimestamp - Unix expiration timestamp
 * @returns Remaining hours, minutes, seconds, and expiration status
 */
export const getRemainingTime = (
  expiryTimestamp: string | number
): {
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
} => {
  const expiry = parseExpiryTimestamp(expiryTimestamp);

  if (expiry === null) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const currentTimestamp = Math.floor(
    Date.now() / 1000
  );

  const remainingSeconds =
    Math.max(0, expiry - currentTimestamp);

  if (remainingSeconds <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      expired: true,
    };
  }

  const hours = Math.floor(
    remainingSeconds / 3600
  );

  const minutes = Math.floor(
    (remainingSeconds % 3600) / 60
  );

  const seconds = remainingSeconds % 60;

  return {
    hours,
    minutes,
    seconds,
    expired: false,
  };
};

/**
 * Format the remaining expiration time into
 * a user-friendly English message.
 *
 * Examples:
 * - "2h 15m remaining"
 * - "45 minutes remaining"
 * - "20 seconds remaining"
 * - "Link expired"
 *
 * @param expiryTimestamp - Unix expiration timestamp
 * @returns Formatted expiration message
 */
export const formatRemainingTime = (
  expiryTimestamp: string | number
): string => {
  const {
    hours,
    minutes,
    seconds,
    expired,
  } = getRemainingTime(expiryTimestamp);

  if (expired) {
    return "Link expired";
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  if (minutes > 0) {
    return `${minutes} minute${
      minutes === 1 ? "" : "s"
    } remaining`;
  }

  return `${seconds} second${
    seconds === 1 ? "" : "s"
  } remaining`;
};
