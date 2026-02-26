// src/components/DevTools.jsx
// Development tools - only visible in development mode

"use client";

import { useState } from "react";
import { clearDataCache } from "@/lib/DataContext";

export default function DevTools() {
  const [show, setShow] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  const handleClearCache = () => {
    clearDataCache();
    alert("✅ Cache cleared! Refresh page to fetch fresh data.");
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setShow(!show)}
        className="fixed bottom-4 left-4 z-[100] w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center text-xs font-mono transition-all"
        title="Dev Tools"
      >
        🛠️
      </button>
      {/* Dev panel */}
      {show && (
        <div className="fixed bottom-16 left-4 z-[100] bg-gray-900 border border-purple-600 rounded-lg p-4 shadow-xl w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-bold text-sm">Dev Tools</h3>
            <button
              onClick={() => setShow(false)}
              className="text-gray-400 hover:text-white text-lg leading-none"
            >
              ×
            </button>
          </div>
          <div className="space-y-2">
            <button
              onClick={handleClearCache}
              className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
            >
              🗑️ Clear Data Cache
            </button>

            <button
              onClick={() => window.location.reload()}
              className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
            >
              🔄 Hard Refresh
            </button>
            <div className="pt-2 border-t border-gray-700 text-xs text-gray-400">
              <div>
                Mode: <span className="text-purple-400">Development</span>
              </div>
              <div>
                Source:
                <span className="text-purple-400">
                  {process.env.NEXT_PUBLIC_DATA_SOURCE || "supabase"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
