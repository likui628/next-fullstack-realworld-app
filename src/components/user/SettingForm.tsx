'use client'

import { CurrentUser } from '@/types/response'
import React, { useState } from 'react'
import { fetchWrapper } from '@/utils/fetch'
import { useRouter } from '@/navigation'
import ListErrors from '@/components/common/ListErrors'

interface SettingFormProps {
  user: CurrentUser
}

interface UserInfoForm {
  id: string
  image?: string
  username?: string
  bio?: string
  email?: string
  password?: string
}

const SettingForm = ({ user }: SettingFormProps) => {
  const [userInfo, setUserInfo] = useState<UserInfoForm>({
    ...user,
    bio: user.bio || '',
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const handleChange = (val: Record<string, string>) => {
    setUserInfo({ ...userInfo, ...val })
  }

  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setLoading(true)

      const data = await fetchWrapper('/user', 'PUT', { user: userInfo })
      router.push(`/profile/@${data.user.username}`)
    } catch (e: any) {
      setErrors(e.errors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ListErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={userInfo.image}
              onChange={(e) => handleChange({ image: e.target.value })}
              disabled={loading}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              value={userInfo.username}
              onChange={(e) => handleChange({ username: e.target.value })}
              disabled={loading}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={userInfo.bio || ''}
              onChange={(e) => handleChange({ bio: e.target.value })}
              disabled={loading}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => handleChange({ email: e.target.value })}
              disabled={loading}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => handleChange({ password: e.target.value })}
              disabled={loading}
            />
          </fieldset>
          <button
            type="submit"
            className="btn btn-lg btn-primary pull-xs-right"
            disabled={loading}
          >
            Update Settings
          </button>
        </fieldset>
      </form>
    </>
  )
}

export default SettingForm
