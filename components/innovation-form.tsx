"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import BorderGlow from "@/components/border-glow";
import ConfettiBurst, { type ConfettiBurstRef } from "@/components/confetti-burst";
import { Reveal } from "@/components/reveal";
import Stepper, { Step } from "@/components/stepper";
import { Particles } from "@/components/ui/particles";

const inputClassName =
  "h-14 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#ff4d6d]/60 disabled:cursor-not-allowed disabled:opacity-45";

const platformOptions = [
  "Mobil uygulama",
  "Web uygulaması",
  "Masaüstü uygulaması",
  "Otomasyon sistemi",
  "Yönetim paneli",
  "SaaS platformu",
];

export function InnovationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState("Mobil uygulama");
  const [idea, setIdea] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const confettiRef = useRef<ConfettiBurstRef>(null);

  useEffect(() => {
    if (isComplete) confettiRef.current?.fire();
  }, [isComplete]);

  return (
    <Reveal className="flex w-full">
      <BorderGlow
        className="flex w-full overflow-hidden rounded-[2.25rem]"
        edgeSensitivity={32}
        glowColor="345 88 72"
        backgroundColor="#09070b"
        borderRadius={36}
        glowRadius={36}
        glowIntensity={0.95}
        coneSpread={22}
        animated={false}
        colors={["#975984", "#ff4d6d", "#4f7cff"]}
        fillOpacity={0.34}
      >
        <div className="surface-noise relative flex min-h-[88svh] w-full flex-col bg-[linear-gradient(140deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)_45%,rgba(79,124,255,0.05)_72%,rgba(255,77,109,0.05))] p-6 lg:p-10">
          <Particles className="opacity-60" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff4d6d] to-transparent" />
          <div className="relative z-[1] mx-auto flex w-full max-w-5xl flex-1 flex-col">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs uppercase tracking-[0.42em] text-white/38">
                Fikir Alanı
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.8rem,6vw,5rem)] uppercase leading-[0.92] text-white">
                Bir sonraki fikri buraya bırak.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
                Uygulama fikri, otomasyon ihtiyacı veya dijital ürün düşüncesi.
                Kısa yaz, net yaz, gerisini ben çözerim.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mt-10 flex w-full max-w-4xl flex-1 flex-col justify-center"
            >
              <ConfettiBurst ref={confettiRef} className="z-[2]" />
              {!isComplete ? (
                <Stepper
                  initialStep={1}
                  onFinalStepCompleted={() => setIsComplete(true)}
                  backButtonText="Geri"
                  nextButtonText="İleri"
                  completeButtonText="Gönder"
                  stepCircleContainerClassName="bg-transparent"
                >
                  <Step>
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 text-left">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                        01 / Fikir
                      </p>
                      <h3 className="mt-3 font-display text-3xl uppercase text-white">
                        Fikrini kısaca yaz.
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/60">
                        Aklındaki fikri kısaca buraya yaz.
                      </p>
                      <textarea
                        name="idea"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Örnek: Sipariş takibi yapan, sade arayüzlü bir mobil uygulama istiyorum."
                        rows={6}
                        className="mt-6 w-full rounded-[2rem] border border-white/10 bg-white/[0.04] px-5 py-5 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/25 focus:border-[#ff4d6d]/60"
                      />
                    </div>
                  </Step>

                  <Step>
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 text-left">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                        02 / Platform
                      </p>
                      <h3 className="mt-3 font-display text-3xl uppercase text-white">
                        Hangi platformda olsun?
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/60">
                        En uygun ürün yüzeyini seç.
                      </p>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {platformOptions.map((option) => {
                          const selected = platform === option;

                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setPlatform(option)}
                              className={`rounded-[1.4rem] border px-4 py-4 text-left text-sm transition ${
                                selected
                                  ? "border-[#ff4d6d]/60 bg-[linear-gradient(135deg,rgba(255,77,109,0.16),rgba(151,89,132,0.18))] text-white"
                                  : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <span className="block text-xs uppercase tracking-[0.24em] text-white/35">
                                Seçenek
                              </span>
                              <span className="mt-2 block font-medium">{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </Step>

                  <Step>
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 text-left">
                      <p className="text-xs uppercase tracking-[0.35em] text-white/38">
                        03 / İletişim
                      </p>
                      <h3 className="mt-3 font-display text-3xl uppercase text-white">
                        Adını ve mailini bırak.
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/60">
                        İstersen anonim olarak gönderebilirsin. O durumda isim ve
                        mail alanları kapanır, fikir bana anonim olarak ulaşır.
                      </p>
                      <div className="mt-6 grid gap-4">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Adın veya markan"
                          disabled={anonymous}
                          className={inputClassName}
                        />
                        <input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Mail adresin"
                          disabled={anonymous}
                          className={inputClassName}
                        />
                        <label className="flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white/75">
                          <span>Anonim olarak gönder</span>
                          <input
                            type="checkbox"
                            name="anonymous"
                            checked={anonymous}
                            onChange={(e) => setAnonymous(e.target.checked)}
                            className="h-5 w-5 rounded border-white/20 bg-transparent accent-[#ff4d6d]"
                          />
                        </label>
                      </div>
                    </div>
                  </Step>
                </Stepper>
              ) : (
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#ff8ea2]">
                    Gönderim tamamlandı
                  </p>
                  <h3 className="mt-4 font-display text-4xl uppercase text-white">
                    Fikrin alındı.
                  </h3>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/60">
                    {anonymous
                      ? "Bu fikir anonim olarak iletilecek."
                      : `${name || "Gönderen"} ve ${email || "mail bilgisi"} not edildi.`}{" "}
                    Seçilen platform: {platform || "Belirtilmedi"}.
                  </p>
                  <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5 text-left text-sm text-white/70">
                    {idea || "Henüz bir fikir girilmedi."}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </BorderGlow>
    </Reveal>
  );
}
