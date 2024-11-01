import useSWR from "swr";

export type NextDnsQueriesResponse = {
  data: {
    status: string;
    queries: number[];
  }[];
  meta: {
    series: {
      times: string[];
      interval: number;
    };
    pagination: {
      cursor: string | null;
    };
  };
};

export type NextDnsDevicesData = {
  id: string;
  name?: string;
  model?: string;
  queries: number;
}[];

export function fetchNextDnsClient<TResponse = any>(path: string, init?: RequestInit): Promise<TResponse> {
  return fetch(`/api/nextdns/${path}`, init).then((response) => response.json());
}

export function useNextDns<TData = any, TResponse extends {data?: TData} = any>(path: string): {
  data?: TData | null,
  response?: TResponse,
  error: string | null,
  isLoading: boolean,
  mutate: () => void
} {
  const { data: response, error, isLoading, mutate } = useSWR(
    `nextdns-${path}`,
    async () => {
      return fetchNextDnsClient<TResponse>(path);
    }
  );

  return {
      data: response?.data,
      response,
      error,
      isLoading, 
      mutate
  };
}
