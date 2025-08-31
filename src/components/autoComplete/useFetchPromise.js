import { useEffect, useState, useCallback } from "react";
import { debounce } from 'lodash';

const useFetchPromise = (
  query,
  transformData,
  promise,
  debounceWait,
  autoComplete
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    debounce(async (query, transformData, signal) => {
      try {
        const response = await promise(query, signal);
        if (!response.ok) throw new Error(response.statusText);
        const data = await response.json();
        console.log(data);
        setData(transformData(data));
      } catch (e) {
        console.log(e);
        if (!signal.aborted) setError(e);
      }
    }, debounceWait),
    []  //because I'm calling debounce decoaratorand I only want to do it once, so use [] here, therefore nothing in the function should reference to outside variable, only local passed variables
  );

  useEffect(() => {
    if (!query || !autoComplete) {
      setData(null);
      setError(null);
      return;
    }
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(query, transformData, signal);

    return () => {
      controller.abort();
    };
  }, [query, transformData, fetchData, autoComplete]);  //whatever references to the outside variable in the above function should be here in the dep array

  return [data, setData, error];
};

export default useFetchPromise;
