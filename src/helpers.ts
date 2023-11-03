export const wait = (timeout = 1000) => new Promise(resolve => setTimeout(resolve, timeout));

export const readFromStorage = <T>(key: string): T | null => {
  const raw = localStorage.getItem(key);

  if (raw) {
    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export const writeToStorage = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
}
