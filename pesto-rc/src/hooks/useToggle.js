import { useState } from "react";

/**
 * `useToggle` is a custom React hook that manages a boolean state with a toggle function.
 *
 * - The hook returns the current state value and a function to toggle the state.
 * - The `toggleValue` function can either set the state to a specific boolean value or toggle it.
 * - The initial state value can be set with the `defaultValue` parameter.
 *
 * @param {boolean} [defaultValue=false] - The initial state value.
 * @returns {[boolean, function]} An array containing the current state value and the toggle function.
 */
const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);
  const toggleValue = (value) => {
    setValue((currentValue) =>
      typeof value === "boolean" ? value : !currentValue
    );
  };

  return [value, toggleValue];
};

export default useToggle;
