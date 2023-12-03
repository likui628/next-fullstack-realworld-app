import { User } from ".prisma/client";
import { defaultImage } from "@/utils/constants";

export function userMapper(user: User) {
  const { id, username, bio, image } = user;
  return {
    id,
    username,
    bio,
    image: image || defaultImage,
    following: false,
  };
}

export function dateMapper(obj: { createdAt?: Date; updatedAt?: Date }) {
  const { createdAt, updatedAt } = obj;
  return {
    createdAt: createdAt && createdAt.toISOString(),
    updatedAt: updatedAt && updatedAt.toISOString(),
  };
}
