import { useState } from 'react'
import { fetchWrapper } from '@/utils/fetch'

export function useFetch<T = any>() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<T>()
  const [errors, setErrors] = useState<string[]>([])

  const request = async (
    url: string,
    method?: string,
    body?: any,
    options?: RequestInit,
  ): Promise<void> => {
    try {
      setLoading(true)
      setErrors([])
      const data = await fetchWrapper<T>(url, method, body, options)
      setData(data)
    } catch (e: any) {
      setErrors(e)
    } finally {
      setLoading(false)
    }
  }

  return { loading, data, errors, request }
}
