import { useEffect, useRef, useState } from "react";

export const useDidMount = <T>(onDidMount?: () => T): boolean => {
  const callback = useRef(onDidMount);

  const [mounted, setMounted] = useState(false);

  useEffect((): void => {
    setMounted(true);

    if (typeof callback.current === "function") {
      callback.current();
    }
  }, [callback, setMounted]);

  return mounted;
};
