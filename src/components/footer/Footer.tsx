import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

const Footer = async () => {
  const t = useTranslations('Footer')

  return (
    <footer>
      <div className="container">
        <Link href="/" className="logo-font">
          conduit
        </Link>
        <span className="attribution">
          {t('about')}
          <a href="https://thinkster.io">Thinkster</a>.{t('licence')}
        </span>
      </div>
    </footer>
  )
}
export default Footer
