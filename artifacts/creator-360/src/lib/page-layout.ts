/**
 * Shared AppLayout page containers — responsive horizontal padding and min-w-0
 * so flex children truncate/scroll instead of overflowing on small viewports.
 */
export const PAGE_SHELL =
  "mx-auto w-full min-w-0 max-w-5xl px-4 py-6 sm:px-6 sm:py-8 md:px-8";

export const PAGE_SHELL_WIDE =
  "mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8 md:px-8";

export const PAGE_SHELL_XL =
  "mx-auto flex w-full min-w-0 max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 md:px-8";
