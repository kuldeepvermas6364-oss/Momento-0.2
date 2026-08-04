/**
 * /utils/string.ts
 * String manipulation utilities.
 */

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert string to title case.
 */
export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, capitalize);
}

/**
 * Truncate string to max length with ellipsis.
 */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 3) + "...";
}

/**
 * Generate a slug from a string.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract hashtags from text.
 */
export function extractHashtags(text: string): string[] {
  const matches = text.match(/#[\w]+/g);
  return matches ? matches.map((tag) => tag.slice(1).toLowerCase()) : [];
}

/**
 * Extract mentions from text.
 */
export function extractMentions(text: string): string[] {
  const matches = text.match(/@[\w]+/g);
  return matches ? matches.map((m) => m.slice(1)) : [];
}

/**
 * Convert links in text to clickable anchors.
 */
export function linkifyUrls(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener">$1</a>');
}

/**
 * Generate a random string of specified length.
 */
export function randomString(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Mask sensitive data (e.g. email, phone).
 */
export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return email;
  const maskedUser = user.length > 2
    ? user[0] + "*".repeat(user.length - 2) + user[user.length - 1]
    : user;
  return `${maskedUser}@${domain}`;
}