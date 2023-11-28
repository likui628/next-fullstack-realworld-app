import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const basicOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};

export enum StatusEnum {
  error,
  success,
}

export function useFetch<T = any>() {
  const [status, setStatus] = useState<StatusEnum>();
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
      const resp = await fetch(`${BASE_URL}${url}`, {
        ...basicOptions,
        method,
        ...options,
        body: body && JSON.stringify(body),
      });
      const data = await resp.json();
      if (resp.ok) {
        setStatus(StatusEnum.success);
        setData(data);
      } else {
        setStatus(StatusEnum.error);
        setErrors(data.errors);
      }
    } catch (e: any) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return { status, loading, data, errors, request };
}
