import { useEffect, useState } from 'react';

type FetchParam<T> = {
  url: string | URL | globalThis.Request;
  options?: RequestInit;
  dependencies?: unknown[];
  defaultData?: T;
  enable: boolean;
};

export default function useFetch<T>({
  url,
  options = {},
  dependencies = [],
  defaultData,
  enable = true,
}: FetchParam<T>) {
  const [isLoading, setLoding] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<T | undefined>(defaultData);

  useEffect(() => {
    if (!enable) return;

    const controller = new AbortController();
    options.signal = controller.signal;

    (async function () {
      setLoding(true);
      setError('');

      try {
        const res = await fetch(url, options);
        const data = (await res.json()) as T;
        setData(data);
      } catch (err) {
        err instanceof Error &&
          err.name !== 'AbortError' &&
          setError(err.message);
      } finally {
        setLoding(false);
      }
    })();

    return () => controller.abort();
  }, dependencies);

  return { data, isLoading, error };
}
