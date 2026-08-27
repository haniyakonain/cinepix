import { useEffect, useState } from "react";
import useInterval from "./useInterval";

const format = (timestamp) => {
  if (!timestamp) return null;
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 5) return "just now";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  return `${hours}h ago`;
};

// Re-renders every few seconds so a "last updated Xs ago" label keeps
// ticking forward without the parent needing its own timer.
const useRelativeTime = (timestamp) => {
  const [label, setLabel] = useState(() => format(timestamp));

  useEffect(() => {
    setLabel(format(timestamp));
  }, [timestamp]);

  useInterval(() => setLabel(format(timestamp)), timestamp ? 5000 : null);

  return label;
};

export default useRelativeTime;
