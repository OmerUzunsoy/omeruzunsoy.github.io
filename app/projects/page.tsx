"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import BorderGlow from "@/components/border-glow";
import ClickSpark from "@/components/click-spark";
import GooeyNav from "@/components/gooey-nav";
import LightPillar from "@/components/light-pillar";
import { Reveal } from "@/components/reveal";
import Silk from "@/components/silk";
import {
  projectPlatforms,
  projectStatuses,
  type Project,
} from "@/components/site-data";
import { useGitHubProjects } from "@/components/use-github-projects";
import { cn } from "@/components/utils";

type PlatformFilter = (typeof projectPlatforms)[number];
type StatusFilter = (typeof projectStatuses)[number];

const navItems = [
  { label: "Vitrin", href: "/" },
  { label: "Hakkımda", href: "/#about" },
  { label: "Yetenekler", href: "/#capabilities" },
  { label: "Projeler", href: "/projects/" },
  { label: "Fikirler", href: "/#innovation-hub" },
];

function matches(project: Project, query: string, platform: PlatformFilter, status: StatusFilter) {
  const normalized = query.trim().toLowerCase();
  const queryMatch =
    normalized.length === 0 ||
    project.title.toLowerCase().includes(normalized) ||
    project.kind.toLowerCase().includes(normalized) ||
    project.description.toLowerCase().includes(normalized) ||
    project.tags.some((tag) => tag.toLowerCase().includes(normalized));

  const platformMatch = platform === "Hepsi" || project.platform === platform;
  const statusMatch = status === "Hepsi" || project.status === status;

  return queryMatch && platformMatch && statusMatch;
}

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<PlatformFilter>("Hepsi");
  const [status, setStatus] = useState<StatusFilter>("Hepsi");
  const { projects, isSyncing } = useGitHubProjects();

  const filteredProjects = useMemo(
    () => projects.filter((project) => matches(project, query, platform, status)),
    [platform, projects, query, status],
  );

  return (
    <ClickSpark
      sparkColor="#f8d9ff"
      sparkSize={9}
      sparkRadius={16}
      sparkCount={8}
      duration={360}
      className="bg-background"
    >
      <main className="min-h-screen bg-background pb-12">
        <div className="fixed inset-x-0 top-6 z-30 flex justify-center px-4 sm:top-8">
          <GooeyNav
            items={navItems}
            initialActiveIndex={3}
            activeIndex={3}
            onItemClick={(href) => {
              window.location.href = href;
            }}
          />
        </div>

        <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-32 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <LightPillar
              topColor="#5227FF"
              bottomColor="#FF9FFC"
              intensity={0.9}
              rotationSpeed={0.22}
              glowAmount={0.002}
              pillarWidth={3}
              pillarHeight={0.4}
              noiseIntensity={0.35}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="medium"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,77,109,0.12),transparent_30%),linear-gradient(180deg,rgba(79,124,255,0.08),transparent_22%,transparent_72%,rgba(255,77,109,0.08))]" />
          <div className="relative mx-auto max-w-6xl">
            <Reveal className="max-w-4xl">
              <p className="text-xs uppercase tracking-[0.4em] text-white/38">
                Proje Arşivi
              </p>
              <h1 className="mt-4 font-display text-[clamp(3.4rem,8vw,7rem)] uppercase leading-[0.9] text-white">
                Tüm projeleri
                <br />
                tek yüzeyde tara.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/60 sm:text-lg">
                Bu sayfa GitHub tarafındaki public repoları ve son release
                dosyalarını canlı okur. Yeni bir release yüklersen indirme
                butonu otomatik olarak son asset&apos;e döner.
              </p>
            </Reveal>

            <Reveal delay={0.06} className="mt-10">
              <BorderGlow
                className="overflow-hidden rounded-[2rem]"
                edgeSensitivity={28}
                glowColor="345 88 72"
                backgroundColor="#09070b"
                borderRadius={32}
                glowRadius={24}
                glowIntensity={0.72}
                coneSpread={20}
                colors={["#975984", "#ff4d6d", "#4f7cff"]}
                fillOpacity={0.22}
              >
                <div className="grid gap-5 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02)_42%,rgba(79,124,255,0.05)_72%,rgba(255,77,109,0.04))] p-5 backdrop-blur-md lg:grid-cols-[1.4fr_1fr_1fr]">
                  <div>
                    <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/38">
                      Arama
                    </label>
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Proje, etiket veya kategori ara..."
                      className="h-14 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#ff4d6d]/60"
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/38">
                      Platform
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projectPlatforms.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPlatform(item)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition",
                            platform === item
                              ? "border-[#ff4d6d]/60 bg-[#ff4d6d]/15 text-white"
                              : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/38">
                      Durum
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {projectStatuses.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setStatus(item)}
                          className={cn(
                            "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition",
                            status === item
                              ? "border-[#4f7cff]/60 bg-[#4f7cff]/15 text-white"
                              : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white",
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden px-4 pt-10 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-55">
            <Silk
              speed={4.2}
              scale={1}
              color="#7B7481"
              noiseIntensity={1.1}
              rotation={0.1}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.82),rgba(8,8,8,0.92))]" />
          <div className="mx-auto max-w-6xl">
            <div className="relative z-[1] mb-8 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-white/45">{filteredProjects.length} proje bulundu</p>
                <p className="text-xs uppercase tracking-[0.22em] text-white/28">
                  {isSyncing ? "GitHub senkronu yapılıyor" : "GitHub senkronu tamamlandı"}
                </p>
              </div>
              <Link
                href="/"
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/65 transition hover:text-white"
              >
                Ana sayfaya dön
              </Link>
            </div>

            <div className="relative z-[1] space-y-4">
              {filteredProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.04} className="overflow-visible">
                  <BorderGlow
                    className="group overflow-hidden rounded-[2.2rem]"
                    edgeSensitivity={30}
                    glowColor="345 88 72"
                    backgroundColor="#09070b"
                    borderRadius={35}
                    glowRadius={28}
                    glowIntensity={0.72}
                    coneSpread={22}
                    colors={["#975984", "#ff4d6d", "#4f7cff"]}
                    fillOpacity={0.28}
                  >
                    <div className="grid gap-8 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02)_42%,rgba(79,124,255,0.05)_72%,rgba(255,77,109,0.04))] p-6 backdrop-blur-md lg:grid-cols-[140px_1.2fr_0.9fr] lg:p-8">
                      <div className="flex items-start justify-between lg:block">
                        <span className="font-display text-5xl leading-none text-white/16">
                          0{index + 1}
                        </span>
                        <div className="mt-2 flex flex-wrap gap-2 lg:mt-6">
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/44">
                            {project.year}
                          </span>
                          <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/44">
                            {project.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full border border-[#ff4d6d]/25 bg-[#ff4d6d]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#ff9daf]">
                            {project.kind}
                          </span>
                          <span className="rounded-full border border-[#4f7cff]/25 bg-[#4f7cff]/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-[#9eb8ff]">
                            {project.platform}
                          </span>
                        </div>
                        <h2 className="mt-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
                          {project.title}
                        </h2>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex h-full flex-col justify-between gap-6">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <a
                            href={project.downloadUrl}
                            className="rounded-full bg-[linear-gradient(90deg,#ed1c24,#ff4d6d)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            {project.downloadLabel}
                          </a>
                          <a
                            href={project.githubUrl}
                            className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/88 backdrop-blur-md transition-colors duration-300 hover:border-[#4f7cff]/40 hover:text-white"
                          >
                            GitHub&apos;da Aç
                          </a>
                        </div>
                      </div>
                    </div>
                  </BorderGlow>
                </Reveal>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="relative z-[1] rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 text-center text-white/55">
                Bu filtrelerle eşleşen proje bulunamadı.
              </div>
            )}
          </div>
        </section>
      </main>
    </ClickSpark>
  );
}
