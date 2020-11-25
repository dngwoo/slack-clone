import {
  useState, useCallback, Dispatch, SetStateAction, SyntheticEvent,
} from 'react';

const useInput = <T = any>
/* eslint-disable no-unused-vars */
  (initialValue: T): [T, (e: SyntheticEvent<HTMLInputElement>)
    => void, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
