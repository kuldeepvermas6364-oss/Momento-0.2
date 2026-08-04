/**
 * /constants/regex.ts
 * Central registry of regular expression patterns.
 * Used by validators and input formatters.
 */

export const Regex = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^()_+\-=]{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  HASHTAG: /#[\w]+/g,
  MENTION: /@[\w]+/g,
  URL_IN_TEXT: /https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*/g,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
} as const;