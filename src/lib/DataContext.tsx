// src/lib/DataContext.tsx

"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabaseClient";
// import { fetchLocalData } from "@/lib/localDataLoader";
import { FALLBACK_PROFILE, getCloudinaryUrl } from "@/lib/constants";

// Cache configuration
const CACHE_KEY = "portfolio_data_cache";
const CACHE_VERSION = "v1.0";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes
const USE_LOCAL_DATA = process.env.NEXT_PUBLIC_DATA_SOURCE === "local";
const DataContext = createContext<any>(null);

export const useData = () => useContext(DataContext);

const getCachedEntry = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { version, timestamp, data } = JSON.parse(raw);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;
    const isOutdated = version !== CACHE_VERSION;
    if (isExpired || isOutdated) {
      sessionStorage.removeItem(CACHE_KEY);
      return null;
    }
    return { data, timestamp };
  } catch {
    return null;
  }
};

const setCachedData = (data: unknown) => {
  if (typeof window === "undefined") return;
  try {
    const cacheObject = {
      version: CACHE_VERSION,
      timestamp: Date.now(),
      data,
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(cacheObject));
  } catch {}
};

export const clearDataCache = () => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CACHE_KEY);
  }
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    username: "Eshan Sud",
    profilePicUrl: FALLBACK_PROFILE,
    resumeUrl: "",
    orcidUrl: null,
    openToWork: false,
    description: "",
    projects: [] as unknown[],
    experiences: [] as unknown[],
    education: [] as unknown[],
    patents: [] as unknown[],
    publications: [] as unknown[],
    awards: [] as unknown[],
    techStack: [] as unknown[],
    socials: [] as unknown[],
    error: undefined as unknown,
  });
  const expireTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** Schedule an automatic cache-clear + re-fetch after `delay` ms. */
  const scheduleExpiry = useCallback((delay: number, refetch: () => void) => {
    if (expireTimerRef.current) clearTimeout(expireTimerRef.current);
    expireTimerRef.current = setTimeout(
      () => {
        clearDataCache();
        refetch();
      },
      Math.max(delay, 0),
    );
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const cached = getCachedEntry();
        if (cached) {
          setData((prev) => ({ ...prev, ...cached.data }));
          setIsLoading(false);
          // Schedule expiry for the remaining TTL so a long-lived tab refetches on time
          const remaining = CACHE_DURATION - (Date.now() - cached.timestamp);
          scheduleExpiry(remaining, fetchAllData);
          return;
        }
        // const startTime = performance.now();
        let projectsRes,
          experiencesRes,
          educationRes,
          patentsRes,
          publicationsRes,
          awardsRes,
          techStackRes,
          userDataRes;

        if (!USE_LOCAL_DATA) {
          try {
            const { data: rpcData, error: rpcError } = await supabase.rpc(
              "get_all_portfolio_data",
            );
            if (rpcError || !rpcData) throw new Error("RPC unavailable");
            projectsRes = { data: rpcData.projects || [] };
            experiencesRes = { data: rpcData.experiences || [] };
            educationRes = { data: rpcData.education || [] };
            patentsRes = { data: rpcData.patents || [] };
            publicationsRes = { data: rpcData.publications || [] };
            awardsRes = { data: rpcData.awards || [] };
            techStackRes = { data: rpcData.tech_stack || [] };
            userDataRes = rpcData.user_data || null;
          } catch {
            [
              projectsRes,
              experiencesRes,
              educationRes,
              patentsRes,
              publicationsRes,
              awardsRes,
              techStackRes,
              userDataRes,
            ] = await Promise.all([
              supabase
                .from("projects")
                .select("*")
                .order("displayOrder", { ascending: false }),
              supabase
                .from("experiences")
                .select("*")
                .order("startDate", { ascending: false }),
              supabase
                .from("education")
                .select("*")
                .order("startDate", { ascending: false }),
              supabase
                .from("patents")
                .select("*")
                .order("filingDate", { ascending: false }),
              supabase
                .from("publications")
                .select("*")
                .order("year", { ascending: false })
                .order("month", { ascending: false }),
              supabase
                .from("awards")
                .select("*")
                .order("date", { ascending: false }),
              supabase.from("tech_stack").select("*").order("createdAt"),
              supabase
                .from("user_data")
                .select("*")
                .order("createdAt", { ascending: false })
                .limit(1)
                .single(),
            ]);
          }
        }
        // else {
        //   const localData = await fetchLocalData();
        //   projectsRes = localData.projects;
        //   experiencesRes = localData.experiences;
        //   educationRes = localData.education;
        //   patentsRes = localData.patents;
        //   publicationsRes = localData.publications;
        //   awardsRes = localData.awards;
        //   techStackRes = localData.techStack;
        //   userDataRes = localData.userData?.data ?? null;
        //   }
        // Fallback to hardcoded socials
        const dbSocials = [
          {
            url: "https://github.com/eshan-sud",
            name: "GitHub",
            displayOrder: 1,
          },
          {
            url: "https://linkedin.com/in/eshan-sud",
            name: "LinkedIn",
            displayOrder: 2,
          },
          {
            url: "https://leetcode.com/eshan-sud",
            name: "LeetCode",
            displayOrder: 3,
          },
          {
            url: "https://www.hackerrank.com/eshansud",
            name: "HackerRank",
            displayOrder: 4,
          },
          {
            url: "https://instagram.com/eshan_sud/",
            name: "Instagram",
            displayOrder: 5,
          },
          {
            url: "mailto:eshansud22@gmail.com",
            name: "Email",
            displayOrder: 6,
          },
          // Placeholder for future socials
          // {
          //   url: "",
          //   name: "",
          //   displayOrder: ,
          // },
          {
            url: "https://orcid.org/my-orcid?orcid=0009-0002-5030-0186",
            name: "ORCID",
            displayOrder: 7,
          },
        ];

        const fetchedData = {
          projects: projectsRes?.data || [],
          experiences: experiencesRes?.data || [],
          education: educationRes?.data || [],
          patents: patentsRes?.data || [],
          publications: publicationsRes?.data || [],
          awards: awardsRes?.data || [],
          techStack: techStackRes?.data || [],
          username: userDataRes?.username || "Eshan Sud",
          socials: userDataRes?.socials || dbSocials,
          resumeUrl: getCloudinaryUrl(userDataRes?.resume_url || ""),
          orcidUrl:
            (userDataRes?.socials || dbSocials).find(
              (s: { name?: string; url?: string }) =>
                s.name?.toLowerCase() === "orcid",
            )?.url ?? null,
          profilePicUrl:
            getCloudinaryUrl(userDataRes?.profile_pic_url) || FALLBACK_PROFILE,
          description:
            userDataRes?.profile_pic_description ||
            "Description not available. Please try again later.",
          openToWork: userDataRes?.open_to_work ?? false,
          error: null,
        };
        setCachedData(fetchedData);
        setData((prev) => ({ ...prev, ...fetchedData }));
        // For development
        // if (process.env.NODE_ENV === "development") {
        //   const duration = ((performance.now() - startTime) / 1000).toFixed(2);
        //   console.info(`[DataContext] Fetched fresh data in ${duration}s`);
        // }
        scheduleExpiry(CACHE_DURATION, fetchAllData);
      } catch (error) {
        setData((prev) => ({ ...prev, error }));
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
    return () => {
      if (expireTimerRef.current) clearTimeout(expireTimerRef.current);
    };
  }, [scheduleExpiry]);

  return (
    <DataContext.Provider value={{ isLoading, ...data }}>
      {children}
    </DataContext.Provider>
  );
};
