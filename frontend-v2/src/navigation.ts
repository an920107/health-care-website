import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales: ["en", "zh"] });