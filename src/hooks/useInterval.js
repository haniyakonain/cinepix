import { useEffect, useRef } from "react";

// Classic Dan Abramov useInterval: keeps the latest callback in a ref so the
// interval itself never needs to be torn down and restarted just because the
// callback closed over new props/state.
const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay === undefined) return undefined;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
