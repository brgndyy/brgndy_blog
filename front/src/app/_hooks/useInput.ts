import { useState } from 'react';

const useInput = <T extends object>(initialState: T) => {
  const [inputState, setInputState] = useState(initialState);

  const inputStateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return { inputState, inputStateHandler };
};

export default useInput;
