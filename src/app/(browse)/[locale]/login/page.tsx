import { Metadata, NextPage } from 'next'
import Link from 'next/link'
import SignForm from '@/components/user/SignForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Login',
}

const Login: NextPage = () => {
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/register">Need an account?</Link>
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
