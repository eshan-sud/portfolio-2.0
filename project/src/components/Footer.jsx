// project/src/components/Footer.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { iconMap } from "@/utility/helper";

const Footer = () => {
  const [socials, setSocials] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSocials = async () => {
      const { data, error } = await supabase
        .from("socials")
        .select("name, url")
        .order("displayOrder");

      if (error) {
        console.error("Error fetching socials for footer:", error);
      } else {
        setSocials(data);
      }
    };
    fetchSocials();
  }, []);

  return (
    <footer className="w-full pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl 2xl:max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 2xl:gap-15 text-center lg:text-left lg:scale-120 transition-transform duration-500 ease-in-out ">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="font-bold text-white text-xl lg:text-2xl 2xl:text-5xl whitespace-nowrap"
          >
            Eshan Sud.
          </Link>
          <span className="hidden sm:block text-gray-500 text-xl lg:text-2xl 2xl:text-5xl font-bold">
            /
          </span>
          <p className="text-gray-400 text-sm lg:text-base 2xl:text-5xl whitespace-nowrap">
            © {currentYear} Eshan Sud.
          </p>
        </div>
        <div className="flex items-center gap-5 2xl:gap-8">
          {socials.map((social) => {
            const Icon = iconMap[social.name];
            return Icon ? (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="h-6 w-6 2xl:h-10 2xl:w-10" />
                {/* <Icon size={24} /> */}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
