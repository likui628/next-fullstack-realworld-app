import { useState } from "react";

export enum StatusEnum {
  error,
  success,
}

export function useFetch<T = any>() {
  const [status, setStatus] = useState<StatusEnum>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [errors, setErrors] = useState<string[]>([]);

  const request = async (api: () => Promise<Response>): Promise<void> => {
    try {
      setLoading(true);
      const resp = await api();
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
