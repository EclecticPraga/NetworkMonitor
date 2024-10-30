import { useLocalStorage } from "@uidotdev/usehooks";
import useSWR from "swr";
import { useStorage } from "../useStorage";

const STORAGE_KEY = 'networkMonitorStorage';

export function useNextDns<T = any>(path: string): {
  data?: T | null,
  response: any,
  error: string | null,
  isLoading: boolean
} {

    const [nextdnsSettings] = useStorage('nextdns', {
      apikey: ''
    });

    if(!nextdnsSettings.apikey) {
      return {
        data: null,
        response: null,
        error: 'Api Key is required',
        isLoading: false
      };
    }

    const { data: response, error, isLoading } = useSWR(
      path,
      async () => {
        const response = await fetch(
          `https://api.nextdns.io${path}`,
          {
            headers: {
              "x-api-key": nextdnsSettings.apikey,
              origin: ''
            }
          }
        );
        return response.json();
      }
    );

    return {
        data: response?.data,
        response,
        error,
        isLoading
    };
}
