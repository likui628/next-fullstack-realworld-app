import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const basicOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function useFetch<T = any>() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errors, setErrors] = useState<string[]>([]);

  const request = async (
    url: string,
    method: string = "GET",
    body?: any,
    options?: RequestInit
  ): Promise<void> => {
    try {
      setLoading(true);
      setErrors([]);
      const resp = await fetch(`${BASE_URL}${url}`, {
        ...basicOptions,
        method,
        ...options,
        body: body && JSON.stringify(body),
      });
      const data = await resp.json();
      if (resp.ok) {
        setData(data);
      } else {
        setErrors(data.errors);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, errors, request };
}
