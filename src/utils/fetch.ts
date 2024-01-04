const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const basicOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const fetchWrapper = async <T = any>(
  url: string,
  method: string = 'GET',
  body?: any,
  options?: RequestInit,
) => {
  try {
    const resp = await fetch(`${BASE_URL}${url}`, {
      ...basicOptions,
      method,
      ...options,
      body: body && JSON.stringify(body),
    })
    const data = await resp.json()
    if (resp.ok) {
      return data as T
    } else {
      throw {
        status: resp.status,
        statusText: resp.statusText,
        errors: data.errors,
      }
    }
  } catch (e: any) {
    throw e.errors ? e : { errors: ['Something went wrong'] }
  }
}
