import { chain } from '@/middlewares/chain'
import { withFeed } from '@/middlewares/withFeed'
import { withIntl } from '@/middlewares/withIntl'
import { withAuth } from '@/middlewares/withAuth'

export default chain([withFeed, withAuth, withIntl])

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
