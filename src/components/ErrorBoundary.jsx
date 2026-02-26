// src/components/ErrorBoundary.jsx

"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { accent } from "@/lib/accent";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
              <AlertTriangle className="text-red-400" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-400 mb-6">
              {this.props.fallbackMessage ||
                "We encountered an error loading this section. Please try refreshing the page."}
            </p>
            {this.state.error && (
              <details className="text-left mb-6 bg-gray-800/50 rounded-lg p-4">
                <summary className="text-sm text-gray-300 cursor-pointer mb-2">
                  Technical details
                </summary>
                <p className="text-xs text-gray-500 font-mono overflow-auto">
                  {this.state.error.toString()}
                </p>
              </details>
            )}
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className={`inline-flex items-center gap-2 px-6 py-3 ${accent.bg} text-black rounded-full font-semibold ${accent.bgHover} transition-colors`}
            >
              <RefreshCw size={16} />
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
