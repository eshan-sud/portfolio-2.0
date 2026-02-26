// src/components/Skeletons.jsx

"use client";

import React from "react";
import { accent } from "@/lib/accent";

// Generic card skeleton
export const CardSkeleton = ({ className = "" }) => (
  <div
    className={`bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/50 ${className}`}
  >
    <div className="animate-pulse">
      <div className="w-full h-40 bg-gray-700/50"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full mb-3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-gray-700/50 rounded w-16"></div>
          <div className="h-6 bg-gray-700/50 rounded w-16"></div>
        </div>
      </div>
    </div>
  </div>
);

// Project card skeleton
export const ProjectCardSkeleton = () => (
  <div className="bg-[#16224c] rounded-lg overflow-hidden border border-gray-700/50">
    <div className="animate-pulse">
      <div className="w-full h-40 bg-gray-700/30"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-700/50 rounded w-full mb-3"></div>
        <div className="flex gap-2">
          <div className="h-5 bg-gray-700/50 rounded w-20"></div>
        </div>
      </div>
    </div>
  </div>
);

// Research card skeleton
export const ResearchCardSkeleton = () => (
  <div className="bg-[#16224c] rounded-lg p-8 border border-gray-700/50">
    <div className="animate-pulse">
      <div className="flex justify-between items-start gap-4 mb-2">
        <div className="flex-1">
          <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2"></div>
        </div>
        <div className="h-6 bg-gray-700/50 rounded w-20"></div>
      </div>
      <div className="h-5 bg-gray-700/50 rounded w-2/3 mb-1"></div>
      <div className="h-4 bg-gray-700/50 rounded w-32 mb-4"></div>
      <div className="h-4 bg-gray-700/50 rounded w-full mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-5 bg-gray-700/50 rounded w-24"></div>
        <div className="h-5 bg-gray-700/50 rounded w-24"></div>
      </div>
    </div>
  </div>
);

// Experience timeline skeleton
export const ExperienceCardSkeleton = () => (
  <div className="relative flex gap-4 md:gap-6">
    <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-gray-700"></div>
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gray-800 rounded-full border-4 border-[#0D1A3C]"></div>
    </div>
    <div className="mb-12 w-full animate-pulse">
      <div className="h-6 bg-gray-700/50 rounded w-1/2 mb-2"></div>
      <div className="h-5 bg-gray-700/50 rounded w-1/3 mb-1"></div>
      <div className="h-4 bg-gray-700/50 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700/50 rounded w-5/6 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
        <div className="h-6 bg-gray-700/50 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Education card skeleton
export const EducationCardSkeleton = () => (
  <div className="relative flex gap-4 md:gap-6">
    <div className="absolute left-[22px] top-12 bottom-0 w-0.5 bg-gray-700"></div>
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-gray-800 rounded-full border-4 border-[#0D1A3C]"></div>
    </div>
    <div className="mb-12 w-full animate-pulse">
      <div className="flex justify-between items-start mb-1">
        <div className="h-6 bg-gray-700/50 rounded w-1/3"></div>
        <div className="h-4 bg-gray-700/50 rounded w-32"></div>
      </div>
      <div className="h-5 bg-gray-700/50 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
    </div>
  </div>
);

// Profile/About section skeleton
export const ProfileSkeleton = () => (
  <div className="max-w-6xl mx-auto animate-pulse">
    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
      <div className="w-64 h-64 bg-gray-700/50 rounded-full"></div>
      <div className="flex-1">
        <div className="h-8 bg-gray-700/50 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-700/50 rounded w-1/2 mb-6"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-700/50 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-700/50 rounded w-4/6 mb-6"></div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-gray-700/50 rounded-full"></div>
          <div className="w-12 h-12 bg-gray-700/50 rounded-full"></div>
          <div className="w-12 h-12 bg-gray-700/50 rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
);

// Grid of skeletons
export const SkeletonGrid = ({ count = 6, SkeletonComponent = CardSkeleton }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonComponent key={i} />
    ))}
  </div>
);

// Loading state for full pages
export const PageSkeleton = ({ title, subtitle, showSearch = false }) => (
  <div className="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
    <div className="max-w-6xl mx-auto">
      <div className="animate-pulse">
        <div className="h-12 bg-gray-700/50 rounded w-1/2 mb-4"></div>
        <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-12"></div>
        {showSearch && (
          <div className="h-12 bg-gray-700/50 rounded-full w-full mb-12"></div>
        )}
      </div>
      <SkeletonGrid count={6} />
    </div>
  </div>
);

// Inline loading spinner
export const LoadingSpinner = ({ size = 24, className = "" }) => (
  <div className={`inline-block ${className}`}>
    <div
      className={`animate-spin rounded-full border-4 border-gray-700 ${accent.borderTop}`}
      style={{ width: size, height: size }}
    />
  </div>
);

// Shimmer effect skeleton
export const ShimmerSkeleton = ({ className = "" }) => (
  <div className={`relative overflow-hidden bg-gray-700/30 ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"></div>
  </div>
);
