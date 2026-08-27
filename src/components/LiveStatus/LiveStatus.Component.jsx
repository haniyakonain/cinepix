import React from "react";
import { BiRefresh } from "react-icons/bi";
import useRelativeTime from "../../hooks/useRelativeTime";

// Small status pill used by any section that polls for fresh data
// (showtimes, reviews, ...). Shows a pulsing "Live" dot, how long ago the
// data last changed, and a manual refresh button that spins while fetching.
const LiveStatus = ({ lastUpdated, isRefreshing, onRefresh, label = "Live" }) => {
  const relativeTime = useRelativeTime(lastUpdated);

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="flex items-center gap-1.5 text-green-400 font-medium">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        {label}
      </span>
      {relativeTime && (
        <span className="text-gray-400">Updated {relativeTime}</span>
      )}
      {onRefresh && (
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh now"
          className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BiRefresh className={isRefreshing ? "animate-spin" : ""} size={18} />
          <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
        </button>
      )}
    </div>
  );
};

export default LiveStatus;
