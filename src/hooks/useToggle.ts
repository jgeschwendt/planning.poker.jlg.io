import { useCallback, useState } from "react";

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [toggle, setToggle] = useState(initialState);

  const flipToggle = useCallback(() => {
    setToggle(!toggle);
  }, [toggle, setToggle]);

  return [toggle, flipToggle];
};
