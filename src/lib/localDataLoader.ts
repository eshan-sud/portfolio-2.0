// src/lib/localDataLoader.js

// ONLY FOR MAINTENACE MODE OR LOCAL DEVELOPMENT

// let projectsData, experiencesData, educationData, patentsData;
// let publicationsData, awardsData, techStackData, userDataData;

// try {
//   projectsData = require("../../scripts/database/data/json/projects.json");
// } catch (e) {
//   console.warn("⚠️ projects.json not found. Run 'npm run db:export' first.");
//   projectsData = [];
// }

// try {
//   experiencesData = require("../../scripts/database/data/json/experiences.json");
// } catch (e) {
//   console.warn("⚠️ experiences.json not found. Run 'npm run db:export' first.");
//   experiencesData = [];
// }

// try {
//   educationData = require("../../scripts/database/data/json/education.json");
// } catch (e) {
//   console.warn("⚠️ education.json not found. Run 'npm run db:export' first.");
//   educationData = [];
// }

// try {
//   patentsData = require("../../scripts/database/data/json/patents.json");
// } catch (e) {
//   console.warn("⚠️ patents.json not found. Run 'npm run db:export' first.");
//   patentsData = [];
// }

// try {
//   publicationsData = require("../../scripts/database/data/json/publications.json");
// } catch (e) {
//   console.warn(
//     "⚠️ publications.json not found. Run 'npm run db:export' first.",
//   );
//   publicationsData = [];
// }

// try {
//   awardsData = require("../../scripts/database/data/json/awards.json");
// } catch (e) {
//   console.warn("⚠️ awards.json not found. Run 'npm run db:export' first.");
//   awardsData = [];
// }

// try {
//   techStackData = require("../../scripts/database/data/json/tech_stack.json");
// } catch (e) {
//   console.warn("⚠️ tech_stack.json not found. Run 'npm run db:export' first.");
//   techStackData = [];
// }

// try {
//   userDataData = require("../../scripts/database/data/json/user_data.json");
// } catch (e) {
//   console.warn("⚠️ user_data.json not found. Run 'npm run db:export' first.");
//   userDataData = {
//     username: "Eshan Sud",
//     profile_pic_url: "https://placehold.co/400x400/1a2b4c/ffffff?text=ES",
//     resume_url: "/documents/resume_eshan_sud.pdf",
//     profile_pic_description: "",
//     socials: [],
//   };
// }

// // --- Sort helpers (mimic Supabase ORDER BY behaviour) ---
// const sortByDate = (arr, field, ascending = false) =>
//   [...arr].sort((a, b) => {
//     const da = a[field] ? new Date(a[field]).getTime() : 0;
//     const db = b[field] ? new Date(b[field]).getTime() : 0;
//     return ascending ? da - db : db - da;
//   });

// const sortByDisplayOrder = (arr, ascending = false) =>
//   [...arr].sort((a, b) =>
//     ascending
//       ? (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
//       : (b.displayOrder ?? 0) - (a.displayOrder ?? 0),
//   );

// const sortByYear = (arr, ascending = false) =>
//   [...arr].sort((a, b) =>
//     ascending ? (a.year ?? 0) - (b.year ?? 0) : (b.year ?? 0) - (a.year ?? 0),
//   );

// const sortByCreatedAt = (arr, ascending = true) =>
//   sortByDate(arr, "createdAt", ascending);

// /**
//  * Simulates async data fetching with local data
//  * Returns data in the same format as Supabase responses
//  */
// export const loadLocalData = async () => {
//   // Simulate network delay (optional - remove in production)
//   await new Promise((resolve) => setTimeout(resolve, 300));

//   // user_data is a single-row object (or the first element if exported as array)
//   const userData = Array.isArray(userDataData)
//     ? (userDataData[0] ?? {})
//     : (userDataData ?? {});

//   return {
//     projects: { data: projectsData, error: null },
//     experiences: { data: experiencesData, error: null },
//     education: { data: educationData, error: null },
//     patents: { data: patentsData, error: null },
//     publications: { data: publicationsData, error: null },
//     awards: { data: awardsData, error: null },
//     techStack: { data: techStackData, error: null },
//     userData: { data: userData, error: null },
//   };
// };

// /**
//  * Fetch data with sorting (mimics Supabase query behavior)
//  */
// export const fetchLocalData = async () => {
//   const data = await loadLocalData();

//   return {
//     projects: {
//       ...data.projects,
//       data: sortByDisplayOrder(data.projects.data, false),
//     },
//     experiences: {
//       ...data.experiences,
//       data: sortByDate(data.experiences.data, "startDate", false),
//     },
//     education: {
//       ...data.education,
//       data: sortByDate(data.education.data, "startDate", false),
//     },
//     patents: {
//       ...data.patents,
//       data: sortByDate(data.patents.data, "filingDate", false),
//     },
//     publications: {
//       ...data.publications,
//       data: sortByYear(data.publications.data, false),
//     },
//     awards: {
//       ...data.awards,
//       data: sortByDate(data.awards.data, "date", false),
//     },
//     techStack: {
//       ...data.techStack,
//       data: sortByCreatedAt(data.techStack.data, true),
//     },
//     userData: data.userData,
//   };
// };
