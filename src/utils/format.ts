import { useFormatter } from 'next-intl'

export const formatTime = (time: string) => {
  const format = useFormatter()

  return format.dateTime(new Date(time), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
