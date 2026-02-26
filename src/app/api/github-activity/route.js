// src/app/api/github-activity/route.js

import { NextResponse } from "next/server";

export const revalidate = 3600; // cache for 1 hour

const GITHUB_USERNAME = "eshan-sud";
const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured." },
      { status: 500 },
    );
  }
  try {
    const response = await fetch(GITHUB_GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username: GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status },
      );
    }
    const data = await response.json();
    if (data.errors) {
      return NextResponse.json(
        { error: data.errors[0]?.message || "GraphQL error" },
        { status: 400 },
      );
    }
    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return NextResponse.json(
        { error: "No contribution data found." },
        { status: 404 },
      );
    }
    return NextResponse.json(calendar);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub activity." },
      { status: 500 },
    );
  }
}
