import { useLocalStorage } from "@uidotdev/usehooks";

const STORAGE_KEY = 'networkMonitorStorage';

export function useStorage<T = any>(key: string, defaultValue: any): [T, (value: T) => void] {
    const [storage, setStorage] = useLocalStorage<Record<string, any>>(STORAGE_KEY, {});

    const set = (value: any) => {
        setStorage({ ...storage, [key]: value });
    };

    const value = (Object.hasOwnProperty.call(storage, key) ? storage[key] : defaultValue) as T;

    return [value, set];
}
