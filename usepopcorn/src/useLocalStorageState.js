import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValues = localStorage.getItem(key);
    return storedValues ? JSON.parse(storedValues) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("value", JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}
