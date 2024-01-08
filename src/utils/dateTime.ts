import { useFormatter } from 'next-intl'

export const useFormatDateTime = () => {
  const formatter = useFormatter()

  return (time: string) => {
    return formatter.dateTime(new Date(time), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}
