import { useReducer } from "react";

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [toggle, flipToggle] = useReducer((toggleState: boolean) => !toggleState, initialState);

  return [toggle, flipToggle];
};
