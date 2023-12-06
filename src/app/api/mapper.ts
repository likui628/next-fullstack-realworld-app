import { User } from '.prisma/client'
import { defaultImage } from '@/utils/constants'

export function userMapper(user: User) {
  const { id, username, email, bio, image } = user
  return {
    id,
    username,
    email,
    bio,
    image: image || defaultImage,
    following: false,
  }
}
