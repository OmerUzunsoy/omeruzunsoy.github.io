"use client";

import { useEffect, useMemo, useState } from "react";

import {
  featuredProjectSlugs,
  getFallbackProjects,
  GITHUB_USERNAME,
  mergeGitHubProjects,
  type GitHubReleaseAsset,
  type GitHubRepo,
} from "@/components/site-data";

async function fetchRepos() {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("GitHub repo listesi alınamadı.");
  }

  return (await response.json()) as GitHubRepo[];
}

async function fetchLatestRelease(repoName: string) {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/releases/latest`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  );

  if (response.status === 404) return null;
  if (!response.ok) return null;

  const release = await response.json();
  const assets = (release.assets ?? []) as GitHubReleaseAsset[];
  return assets;
}

export function useGitHubProjects() {
  const [projects, setProjects] = useState(getFallbackProjects);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const syncProjects = async () => {
      try {
        const repos = await fetchRepos();
        const releaseEntries = await Promise.all(
          repos.map(async (repo) => [repo.name, (await fetchLatestRelease(repo.name)) ?? []] as const),
        );

        if (!mounted) return;

        const releasesByRepo = Object.fromEntries(releaseEntries);
        setProjects(mergeGitHubProjects(repos, releasesByRepo));
      } catch {
        // Fallback to static local data when GitHub rate limits or network issues occur.
      } finally {
        if (mounted) setIsSyncing(false);
      }
    };

    void syncProjects();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredProjects = useMemo(
    () =>
      featuredProjectSlugs
        .map((slug) => projects.find((project) => project.slug === slug))
        .filter((project): project is (typeof projects)[number] => Boolean(project)),
    [projects],
  );

  return { projects, featuredProjects, isSyncing };
}
