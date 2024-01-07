import { NextMiddleware, NextRequest, NextFetchEvent } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { locales } from '@/navigation'
import { NextMiddlewareFactory } from '@/middlewares/chain'

const handleI18nRouting = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'en',
})

export const withIntl: NextMiddlewareFactory = (
  _middleware: NextMiddleware,
) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    return handleI18nRouting(request)
  }
}
