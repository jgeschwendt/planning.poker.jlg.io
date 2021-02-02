import { useReducer } from "react";

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [toggle, flipToggle] = useReducer<(state: boolean) => boolean>((toggleState) => !toggleState, initialState);

  return [toggle, flipToggle];
};
