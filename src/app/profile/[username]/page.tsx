import getUserProfile from '@/app/actions/getUserProfile'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import QueryLink from '@/components/common/QueryLink'
import ProfileTab from '@/components/profile/ProfileTab'

interface ProfilePageProps {
  params: { username: string }
  searchParams: {
    tab?: 'my' | 'favorited'
  }
}

const profilePage = async ({ params, searchParams }: ProfilePageProps) => {
  const username = decodeURIComponent(params.username).replace(/@/, '')
  const profile = await getUserProfile(username)
  if (!profile) {
    redirect('/')
  }

  const tab = searchParams.tab || 'my'

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Image
                src={profile.image}
                alt={profile.username}
                width={100}
                height={100}
                className="user-img"
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <button className="btn btn-sm btn-outline-secondary action-btn">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <QueryLink
                    query={{ tab: 'my' }}
                    className={
                      tab !== 'favorited' ? 'nav-link active' : 'nav-link'
                    }
                  >
                    My Articles
                  </QueryLink>
                </li>
                <li className="nav-item">
                  <QueryLink
                    query={{ tab: 'favorited' }}
                    className={
                      tab === 'favorited' ? 'nav-link active' : 'nav-link'
                    }
                  >
                    Favorited Articles
                  </QueryLink>
                </li>
              </ul>
            </div>
            <ProfileTab tab={tab} username={username} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default profilePage
