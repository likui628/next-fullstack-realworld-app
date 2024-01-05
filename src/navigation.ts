import { createSharedPathnamesNavigation } from 'next-intl/navigation'

export const locales = ['en', 'zh', 'ja', 'ko']

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales })
