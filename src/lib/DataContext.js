// src/lib/DataContext.js

"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

const DataContext = createContext(null);

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    profilePicUrl: "https://placehold.co/400x400/1a2b4c/ffffff?text=ES",
    resumeUrl: "/documents/resume_eshan_sud.pdf",
    orcidUrl: "https://orcid.org/my-orcid?orcid=0009-0002-5030-0186",
    description: "",
    projects: [],
    experiences: [],
    education: [],
    patents: [],
    publications: [],
    awards: [],
    techStack: [],
    socials: [],
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          projectsRes,
          experiencesRes,
          educationRes,
          patentsRes,
          publicationsRes,
          awardsRes,
          techStackRes,
          resumeRes,
          profilePicRes,
          socialsRes,
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
            .from("resume")
            .select("url")
            .order("createdAt", { ascending: false })
            .limit(1)
            .single(),
          supabase
            .from("profile_picture")
            .select("url, description")
            .order("createdAt", { ascending: false })
            .limit(1)
            .single(),
          supabase.from("socials").select("name, url").order("displayOrder"),
        ]);

        setData((prevState) => ({
          ...prevState,
          projects: projectsRes.data || [],
          experiences: experiencesRes.data || [],
          education: educationRes.data || [],
          patents: patentsRes.data || [],
          publications: publicationsRes.data || [],
          awards: awardsRes.data || [],
          techStack: techStackRes.data || [],
          socials: socialsRes.data || [],
          resumeUrl: resumeRes.data?.url || "/documents/resume_eshan_sud.pdf",
          profilePicUrl:
            profilePicRes.data?.url ||
            "https://placehold.co/400x400/1a2b4c/ffffff?text=ES",
          description:
            profilePicRes.data?.description ||
            "Description not available. Please try again later.",
        }));
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setData((prevState) => ({ ...prevState, error: error }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider value={{ isLoading, ...data }}>
      {children}
    </DataContext.Provider>
  );
};
