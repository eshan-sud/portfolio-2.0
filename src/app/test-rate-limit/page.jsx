// src/app/test-rate-limit/page.jsx

"use client";

import { useState } from "react";
import { accent } from "@/lib/accent";

export default function TestRateLimitPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const testRateLimit = async () => {
    setLoading(true);
    setResults([]);
    const newResults = [];
    // Make 15 rapid requests (limit is 10 per 10 seconds)
    for (let i = 1; i <= 15; i++) {
      try {
        const startTime = Date.now();
        const response = await fetch("/api/test-endpoint", {
          method: "GET",
        });
        const endTime = Date.now();
        const duration = endTime - startTime;
        const headers = {
          limit: response.headers.get("X-RateLimit-Limit"),
          remaining: response.headers.get("X-RateLimit-Remaining"),
          reset: response.headers.get("X-RateLimit-Reset"),
        };
        newResults.push({
          request: i,
          status: response.status,
          statusText: response.statusText,
          duration: `${duration}ms`,
          headers,
          success: response.ok,
        });
        setResults([...newResults]);
        // Small delay to see results update
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        newResults.push({
          request: i,
          error: error.message,
          success: false,
        });
        setResults([...newResults]);
      }
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Rate Limiter Test</h1>
        <p className="text-gray-400 mb-6">
          Current limit:
          <span className={accent.text}>10 requests per 10 seconds</span>
        </p>
        <button
          onClick={testRateLimit}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : `${accent.bg} text-black ${accent.bgHoverDark}`
          }`}
        >
          {loading ? "Testing..." : "Test Rate Limiter (15 requests)"}
        </button>
        {results.length > 0 && (
          <div className="mt-8 space-y-2">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            {results.map((result, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  result.success
                    ? "bg-green-900/20 border-green-700"
                    : "bg-red-900/20 border-red-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">Request #{result.request}</span>
                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      result.success ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {result.status || "ERROR"}
                  </span>
                </div>
                {result.headers && (
                  <div className="mt-2 text-sm text-gray-400 space-y-1">
                    <div>Limit: {result.headers.limit}</div>
                    <div>Remaining: {result.headers.remaining}</div>
                    <div>Duration: {result.duration}</div>
                  </div>
                )}
                {result.error && (
                  <div className="mt-2 text-red-400">{result.error}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
