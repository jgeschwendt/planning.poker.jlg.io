import type { DependencyList } from "react";
import { useEffect, useState } from "react";

export const useDidMount = <T>(callback?: () => T, deps: DependencyList = []): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof callback === "function") {
      callback();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps -- forwarding deps
  }, deps);

  return mounted;
};
