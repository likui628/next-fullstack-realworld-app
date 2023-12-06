import Link from 'next/link'
import { CurrentUser } from '@/types/server'

interface HeaderProps {
  currentUser?: CurrentUser | null
}

const Header = ({ currentUser }: HeaderProps) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link href={'/'} className="navbar-brand">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link href={'/'} className="nav-link">
              Home
            </Link>
          </li>
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link href={'/editor'} className="nav-link">
                  <i className="ion-compose"></i>&nbsp;New Post
                </Link>
              </li>
              <li className="nav-item">
                <Link href={'/settings'} className="nav-link">
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href={`/profile/@${currentUser.username}`}
                  className="nav-link"
                >
                  <img src={currentUser.image || ''} className="user-pic" />
                  {currentUser.username}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link href={'/login'} className="nav-link">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link href={'/register'} className="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
export default Header
