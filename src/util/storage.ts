export function getStorage<T>(key: string, defaultValue: T): T {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData) as T;
  }

  setStorage<T>(key, defaultValue);
  return defaultValue;
}

export function setStorage<T>(key: string, item: T) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function removeStorageItem(key: string) {
  localStorage.removeItem(key);
}
