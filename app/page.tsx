"use client";

import { useEffect, useMemo, useState } from "react";

import { AboutSection } from "@/components/about-section";
import BorderGlow from "@/components/border-glow";
import ClickSpark from "@/components/click-spark";
import FloatingLines from "@/components/floating-lines";
import GooeyNav from "@/components/gooey-nav";
import { InnovationForm } from "@/components/innovation-form";
import { Reveal } from "@/components/reveal";
import ScrollVelocity from "@/components/scroll-velocity";
import ShinyText from "@/components/shiny-text";
import { stackItems } from "@/components/site-data";
import { useGitHubProjects } from "@/components/use-github-projects";

const navItems = [
  { label: "Vitrin", href: "#" },
  { label: "Hakkımda", href: "#about" },
  { label: "Yetenekler", href: "#capabilities" },
  { label: "Projeler", href: "/projects/" },
  { label: "Fikirler", href: "#innovation-hub" },
];

export default function Home() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const { featuredProjects } = useGitHubProjects();

  const visibleProjects = useMemo(() => featuredProjects.slice(0, 4), [featuredProjects]);

  const handleNavClick = (href: string) => {
    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const sections = [
      { selector: "hero", index: 0 },
      { selector: "about", index: 1 },
      { selector: "capabilities", index: 2 },
      { selector: "projects", index: 3 },
      { selector: "innovation-hub", index: 4 },
    ];

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let currentIndex = 0;

      for (const section of sections) {
        const element =
          section.selector === "hero"
            ? document.querySelector("main section")
            : document.getElementById(section.selector);

        if (!element) continue;

        const top = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= top) currentIndex = section.index;
      }

      setActiveNavIndex(currentIndex);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  return (
    <ClickSpark
      sparkColor="#f8d9ff"
      sparkSize={10}
      sparkRadius={18}
      sparkCount={10}
      duration={420}
      className="bg-background"
    >
      <main className="relative min-h-screen overflow-x-clip bg-background">
        <div className="relative z-10 flex w-full flex-col pb-12 pt-0">
          <div className="fixed inset-x-0 top-6 z-30 flex justify-center px-4 sm:top-8">
            <div className="w-full max-w-fit">
              <GooeyNav
                items={navItems}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                activeIndex={activeNavIndex}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                onItemClick={handleNavClick}
              />
            </div>
          </div>

          <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-y border-white/10 bg-black px-6 py-12 shadow-panel sm:px-8 lg:px-12">
            <div className="absolute inset-0 opacity-95">
              <FloatingLines
                enabledWaves={["top", "middle", "bottom"]}
                lineCount={[5, 6, 5]}
                lineDistance={[4, 5, 6]}
                bendRadius={5}
                bendStrength={-0.5}
                interactive
                parallax
                topWavePosition={{ x: 8, y: 0.52, rotate: -0.32 }}
                middleWavePosition={{ x: 3.8, y: 0.02, rotate: 0.08 }}
                bottomWavePosition={{ x: 1.25, y: -0.65, rotate: 0.28 }}
                linesGradient={["#4510a8", "#ff4d6d", "#ed1c24", "#ff7a1a", "#4f7cff"]}
                className="h-full w-full"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_10%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0.9)_100%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(79,124,255,0.08),transparent_18%,transparent_72%,rgba(255,77,109,0.08))]" />
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-60" />

            <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-5xl translate-y-4 flex-col items-center text-center sm:translate-y-6">
              <h1 className="overflow-visible pt-8 font-display text-[clamp(4.2rem,12.5vw,9.8rem)] uppercase leading-[0.88] tracking-[-0.06em] sm:pt-10">
                <span className="block overflow-visible">
                  <ShinyText
                    text="ÖMER"
                    speed={1.8}
                    delay={0}
                    color="#ffffff"
                    shineColor="#975984"
                    spread={115}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="block"
                  />
                </span>
                <span className="block overflow-visible">
                  <ShinyText
                    text="UZUNSOY"
                    speed={1.8}
                    delay={0}
                    color="#ffffff"
                    shineColor="#975984"
                    spread={115}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                    className="block"
                  />
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                Minimal arayüzler, akışkan deneyimler ve güçlü altyapılarla
                premium dijital ürünler geliştiriyorum.
              </p>

              <div className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="/projects/"
                  className="rounded-full bg-[linear-gradient(90deg,#ffffff,#f3d8ff)] px-7 py-3 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Projeleri Gör
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition-colors duration-300 hover:border-[#ff4d6d]/40 hover:text-white"
                >
                  CV İndir
                </a>
              </div>

              <div className="mt-12 grid w-full max-w-3xl gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    Odak
                  </p>
                  <p className="mt-2 text-lg text-white">Ürün seviyesinde işler</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    Altyapı
                  </p>
                  <p className="mt-2 text-lg text-white">Çok katmanlı sistemler</p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    Sonuç
                  </p>
                  <p className="mt-2 text-lg text-white">Bitmiş hissi veren ürünler</p>
                </div>
              </div>
            </div>
          </section>

          <AboutSection />

          <section className="relative -mt-8 overflow-hidden border-y border-white/8 bg-[linear-gradient(180deg,rgba(28,10,18,0.18),rgba(12,9,13,0.72)_16%,rgba(10,8,12,0.9)_46%,rgba(14,8,12,0.96)_100%)] py-14 backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(79,124,255,0.12),transparent_18%,transparent_82%,rgba(255,77,109,0.14))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,77,109,0.1),transparent)] blur-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_42%),radial-gradient(circle_at_center,rgba(255,77,109,0.08),transparent_62%)] blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <ScrollVelocity
              texts={[
                "MOBİL UYGULAMALAR • REST API • ASP.NET CORE • MASAÜSTÜ ARAÇLAR • OTOMASYON SİSTEMLERİ",
                "PYTHON BOTLARI • KOTLIN • C# • JWT DOĞRULAMA • YÖNETİM PANELLERİ • ÜRÜN DENEYİMİ",
              ]}
              velocity={100}
              numCopies={5}
              className="px-5 text-[1.05rem] font-medium uppercase tracking-[0.08em] text-white/22 sm:text-[1.45rem] md:text-[1.8rem]"
              parallaxClassName="py-1"
              scrollerClassName="font-display"
            />
          </section>

          <section
            id="capabilities"
            className="relative mt-0 overflow-hidden bg-[#080808] px-4 pt-24 sm:px-6 lg:px-8 lg:pt-28"
          >
            <div className="mx-auto max-w-6xl">
              <Reveal className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.42em] text-white/38">
                  Yetenekler
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.25rem)] uppercase leading-[1.08] tracking-[-0.03em] text-white">
                  Ürettiğim sistemlerin ana katmanları.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg">
                  GitHub tarafındaki iş akışımı temel alan, otomasyondan
                  backend&apos;e ve ürün yüzeyine uzanan çalışma alanlarımı burada
                  daha net gösteriyorum.
                </p>
              </Reveal>

              <div className="mt-12 space-y-4">
                {stackItems.map((item, index) => (
                  <Reveal
                    key={item.title}
                    delay={index * 0.06}
                    className="overflow-visible"
                  >
                    <BorderGlow
                      className="group overflow-hidden rounded-[2rem]"
                      edgeSensitivity={30}
                      glowColor="345 88 72"
                      backgroundColor="#09070b"
                      borderRadius={32}
                      glowRadius={28}
                      glowIntensity={0.7}
                      coneSpread={20}
                      colors={["#975984", "#ff4d6d", "#4f7cff"]}
                      fillOpacity={0.28}
                    >
                      <div className="relative bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_55%,rgba(255,77,109,0.05))] p-6 shadow-panel backdrop-blur-md lg:p-8">
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#ff4d6d] to-transparent opacity-80" />
                        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr_1fr] lg:items-center">
                          <div>
                            <p className="text-xs uppercase tracking-[0.35em] text-[#ff8ea2]">
                              {item.label}
                            </p>
                            <h3 className="mt-3 font-display text-3xl uppercase text-white sm:text-4xl">
                              {item.title}
                            </h3>
                          </div>
                          <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                            {item.description}
                          </p>
                          <BorderGlow
                            className="justify-self-start rounded-full"
                            edgeSensitivity={22}
                            glowColor="345 88 72"
                            backgroundColor="#120d12"
                            borderRadius={999}
                            glowRadius={16}
                            glowIntensity={0.5}
                            coneSpread={18}
                            colors={["#975984", "#ff4d6d", "#4f7cff"]}
                            fillOpacity={0.22}
                          >
                            <div className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/44">
                              0{index + 1}
                            </div>
                          </BorderGlow>
                        </div>
                      </div>
                    </BorderGlow>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="relative mt-20 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <Reveal className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.42em] text-white/38">
                  Projeler
                </p>
                <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5.25rem)] uppercase leading-[1.1] tracking-[-0.03em] text-white">
                  Seçili işler kısa vitrinde.
                </h2>
                <p className="mt-5 text-base leading-7 text-white/58 sm:text-lg">
                  Ana sayfada seçtiğim birkaç proje görünüyor. Tüm arşiv,
                  filtreleme ve arama ile ayrı proje sayfasında.
                </p>
              </Reveal>

              <div className="mt-12 space-y-4">
                {visibleProjects.map((project, index) => (
                  <Reveal
                    key={project.slug}
                    delay={index * 0.08}
                    className="overflow-visible"
                  >
                    <BorderGlow
                      className="group overflow-hidden rounded-[2.2rem]"
                      edgeSensitivity={30}
                      glowColor="345 88 72"
                      backgroundColor="#09070b"
                      borderRadius={35}
                      glowRadius={30}
                      glowIntensity={0.72}
                      coneSpread={22}
                      colors={["#975984", "#ff4d6d", "#4f7cff"]}
                      fillOpacity={0.3}
                    >
                      <div className="relative overflow-hidden bg-[linear-gradient(120deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02)_42%,rgba(79,124,255,0.05)_72%,rgba(255,77,109,0.04))] p-6 shadow-panel backdrop-blur-md lg:p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,77,109,0.12),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="relative grid gap-8 lg:grid-cols-[120px_1.2fr_0.9fr]">
                          <div className="flex items-start justify-between lg:block">
                            <span className="font-display text-5xl leading-none text-white/16">
                              0{index + 1}
                            </span>
                            <BorderGlow
                              className="rounded-full"
                              edgeSensitivity={22}
                              glowColor="345 88 72"
                              backgroundColor="#120d12"
                              borderRadius={999}
                              glowRadius={14}
                              glowIntensity={0.5}
                              coneSpread={18}
                              colors={["#975984", "#ff4d6d", "#4f7cff"]}
                              fillOpacity={0.18}
                            >
                              <span className="block rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/44">
                                {project.year}
                              </span>
                            </BorderGlow>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-[0.36em] text-[#ff8ea2]">
                              {project.kind}
                            </p>
                            <h3 className="mt-3 font-display text-4xl uppercase leading-[0.94] tracking-[-0.03em] text-white sm:text-5xl">
                              {project.title}
                            </h3>
                            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex h-full flex-col justify-between gap-6">
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <BorderGlow
                                  key={tag}
                                  className="rounded-full"
                                  edgeSensitivity={20}
                                  glowColor="345 88 72"
                                  backgroundColor="#120d12"
                                  borderRadius={999}
                                  glowRadius={12}
                                  glowIntensity={0.42}
                                  coneSpread={18}
                                  colors={["#975984", "#ff4d6d", "#4f7cff"]}
                                  fillOpacity={0.15}
                                >
                                  <span className="block rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/50">
                                    {tag}
                                  </span>
                                </BorderGlow>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                              <a
                                href={project.downloadUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-[linear-gradient(90deg,#ed1c24,#ff4d6d)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                              >
                                {project.downloadLabel}
                              </a>
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/88 backdrop-blur-md transition-colors duration-300 hover:border-[#4f7cff]/40 hover:text-white"
                              >
                                GitHub&apos;a Git
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </BorderGlow>
                  </Reveal>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <a
                  href="/projects/"
                  className="rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/88 backdrop-blur-md transition-colors duration-300 hover:border-[#ff4d6d]/35 hover:text-white"
                >
                  Tüm Projeleri Aç
                </a>
              </div>
            </div>
          </section>

          <section
            id="innovation-hub"
            className="mt-20 flex min-h-[92svh] items-stretch px-4 pb-2 sm:px-6 lg:px-8"
          >
            <InnovationForm />
          </section>
        </div>
      </main>
    </ClickSpark>
  );
}
