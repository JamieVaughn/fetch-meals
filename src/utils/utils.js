import { useCallback } from 'react';
import _ from 'lodash';

const findHits = (data, string) => {
  let searchReg = new RegExp(string, 'gi');
  return data.filter((d) => {
    let ingredReg = new RegExp(d.name, 'gi');
    return d.name.match(searchReg) || string.match(ingredReg);
  });
};

function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    _.debounce((...args) => callback(...args), delay),
    [delay],
  );
  return debouncedFn;
}

export { findHits, useDebounce };
