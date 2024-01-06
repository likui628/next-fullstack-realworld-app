import { Metadata, NextPage } from 'next'
import { Link } from '@/navigation'
import SignForm from '@/components/user/SignForm'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Register',
}

const Register: NextPage = () => {
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link href="/login"> Have an account?</Link>
              </p>
              <SignForm isRegister={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Register
