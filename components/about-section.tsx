use client;

import Image from "next/image";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSpotify,
  FaXTwitter,
} from "react-icons/fa6";

import { Reveal } from "@/components/reveal";
import { aboutHighlights, aboutParagraphs, socialLinks } from "@/components/site-data";
import { Spotlight } from "@/components/ui/spotlight-new";

const iconMap = {
  GitHub: FaGithub,
  Instagram: FaInstagram,
  X: FaXTwitter,
  LinkedIn: FaLinkedinIn,
  Spotify: FaSpotify,
  "E-posta": FaEnvelope,
} as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-y border-white/8 bg-[#060606] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <Spotlight />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_28%,transparent_72%,rgba(255,77,109,0.08))]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal className="mx-auto w-full max-w-md lg:mx-0">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.28))]" />
            <Image
              src="/omer-portrait.png"
              alt="Ömer Uzunsoy portresi"
              width={960}
              height={1440}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.42em] text-white/38">
            Hakkımda
          </p>
          <h2 className="mt-4 pt-[0.14em] font-display text-[clamp(2.9rem,6vw,5.6rem)] uppercase leading-[1.08] tracking-[-0.03em] text-white">
  Kodu ürüne, <br />
  fikri deneyime dönüştürüyorum.
</h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-white/64 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {aboutHighlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/56"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.label];

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
                  className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72 backdrop-blur-md transition-colors duration-300 hover:border-white/18 hover:text-white"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/78 transition-transform duration-300 group-hover:scale-105">
                    <Icon size={15} />
                  </span>
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/35">
                      {link.label}
                    </span>
                    <span>{link.handle}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
