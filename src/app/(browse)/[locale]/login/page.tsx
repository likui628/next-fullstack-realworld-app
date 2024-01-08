import { Metadata, NextPage } from 'next'
import { Link } from '@/navigation'
import SignForm from '@/components/user/SignForm'
import { useTranslations } from 'next-intl'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
}

const Login: NextPage = () => {
  const t = useTranslations('Auth')
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{t('sign-in')}</h1>
              <p className="text-xs-center">
                <Link href="/register">{t('need-account')}</Link>
              </p>
              <SignForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Login
