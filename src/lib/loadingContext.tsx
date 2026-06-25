// src/lib/LoadingContext.js

"use client";

import { createContext, useState, useContext, useCallback } from "react";

const LoadingContext = createContext({
  isLoading: true,
  startLoading: () => {},
  finishLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loadingOperations, setLoadingOperations] = useState(0);

  const startLoading = useCallback(() => {
    setLoadingOperations((count) => count + 1);
  }, []);

  const finishLoading = useCallback(() => {
    setLoadingOperations((count) => Math.max(0, count - 1));
  }, []);

  const isLoading = loadingOperations > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
