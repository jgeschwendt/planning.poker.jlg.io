import { useCallback, useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue?: T): [T | undefined, (value: T) => void] => {
  const [state, setState] = useState(initialValue ?? void 0);

  const setLocalStorageItem = useCallback((value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));

    setState(JSON.parse(window.localStorage.getItem(key) ?? "null"));
  }, [key, setState]);

  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem(key) ?? "null"));
  }, [key, setState]);

  return [state, setLocalStorageItem];
};

export {
  useLocalStorage,
};
