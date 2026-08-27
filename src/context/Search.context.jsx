import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { searchMovies } from "../services/api.config";

const SearchContext = createContext(null);

// Single shared source of truth for the navbar search box, so any page
// (currently the Home hero) can react to what's being searched without the
// two components needing to know about each other directly.
export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const runSearch = useCallback(async (value) => {
    if (!value.trim()) {
      setResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const movies = await searchMovies(value);
      setResults(movies);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => runSearch(query), 300);
    return () => clearTimeout(timeoutId);
  }, [query, runSearch]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        isSearching,
        clearSearch,
        // TMDB returns results ranked by relevance/popularity, so the first
        // hit is a reasonable stand-in for "the movie you're searching for".
        topResult: results[0] || null,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default SearchContext;
