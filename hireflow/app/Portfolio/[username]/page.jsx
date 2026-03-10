"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getPortfolio } from "../../../services/portfolioService";
import { FormatDate } from "../../../utils/formatdates";
import Navbar from "../../../components/common/navbar";
import { toast } from "sonner";
import Spinner from "../../../components/ui/spinner";

/* ─────────────────────────────────────────────────────────
   Reveal — scroll-triggered fade + slide-up using
   IntersectionObserver. Fires once per element.
   This replaces the old single-`vis`-boolean approach
   which caused sections to "uplift" when data arrived
   after the flag was already set.
───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.07 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

/* ── Skill category config ── */
const CATS = {
  technical:  { label: "Languages",      box: "bg-blue-50/60 border-blue-100",       title: "text-blue-500",   chip: "bg-white border-blue-200 text-blue-800"     },
  frameworks: { label: "Frameworks",     box: "bg-violet-50/60 border-violet-100",   title: "text-violet-500", chip: "bg-white border-violet-200 text-violet-800"  },
  databases:  { label: "Databases",      box: "bg-emerald-50/60 border-emerald-100", title: "text-emerald-600",chip: "bg-white border-emerald-200 text-emerald-800" },
  tools:      { label: "Tools & DevOps", box: "bg-amber-50/60 border-amber-100",     title: "text-amber-600",  chip: "bg-white border-amber-200 text-amber-800"   },
};

function SectionLabel({ text, index }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-blue-600 shrink-0">{text}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
      <span className="text-[11px] font-black text-slate-300 shrink-0 tabular-nums">{index}</span>
    </div>
  );
}

function Pill({ children, icon, href }) {
  const icons = {
    email: (
      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    phone: (
      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    pin: (
      <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  };

  const base =
    "inline-flex items-center gap-2 bg-[var(--color-background)]/80 border border-[var(--color-border)] rounded-full px-3.5 py-1.5 text-[13px] text-[var(--color-foreground)] font-medium transition-all duration-200";
  const hover = href ? "hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer" : "";

  if (href) return <a href={href} className={`${base} ${hover}`}>{icons[icon]}{children}</a>;
  return <span className={base}>{icons[icon]}{children}</span>;
}

function LinkArrow() {
  return (
    <svg className="w-3 h-3 group-hover/lnk:translate-x-0.5 group-hover/lnk:-translate-y-0.5 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function BadgeCheck() {
  return (
    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
export default function Portfolio() {
  const params = useParams();
  const { username } = params;
  const [Data, setData]      = useState(null);
  const [isLoading, setLoad] = useState(false);

  useEffect(() => {
    if (!username) return;
    setLoad(true);
    getPortfolio(username)
      .then((res) => {
        if (res?.success) {
          setData(res);
          localStorage.setItem("userId", res?.portfolio?.userId);
        } else {
          toast.error("No User Found");
        }
      })
      .catch(() => toast.error("No User Found"))
      .finally(() => setLoad(false));
  }, [username]);

  /* ── Not-found / loading state ── */
  if (!Data && !isLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
        <div className="bg-[var(--color-background)]/80 backdrop-blur-sm rounded-3xl p-12 border border-[var(--color-border)] text-center max-w-xs w-full">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold text-[var(--color-foreground)] mb-1.5">User not found</h1>
          <p className="text-sm text-[var(--color-gray)] leading-relaxed">This profile doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const p = Data?.portfolio;
  const r = p?.resume;

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[var(--color-background)]">

      {isLoading && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <Spinner className="w-9 h-9 text-blue-600" />
        </div>
      )}

      {/* ── Mesh Gradient + Grid Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-gray) 0%, transparent 70%)" }} />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-gray) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-gray) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(var(--color-gray) 1px, transparent 1px), linear-gradient(90deg, var(--color-gray) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-24 space-y-6">

        <Navbar />

        {/* ═══ HERO ═══ */}
        <Reveal delay={60}>
          <div className="backdrop-blur-sm bg-[var(--color-background)]/80 rounded-3xl border border-[var(--color-border)] overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400" />
            <div className="relative p-8 sm:p-12 overflow-hidden">

              {/* Dot cluster */}
              <div className="absolute top-8 right-10 pointer-events-none flex flex-col gap-2">
                {[0,1,2,3].map((row) => (
                  <div key={row} className="flex gap-2">
                    {[0,1,2,3,4].map((col) => (
                      <div key={col} className="w-[3px] h-[3px] rounded-full bg-blue-200/50" />
                    ))}
                  </div>
                ))}
              </div>

              <h1 className="relative z-10 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-[var(--color-foreground)] leading-[0.92] mb-5">
                {r?.fullname ?? "—"}
              </h1>

              <div className="flex items-center gap-3 mb-7">
                <div className="h-[3px] w-12 rounded-full bg-blue-600" />
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-border)] to-transparent" />
              </div>

              {(r?.email || r?.phone || r?.address) && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {r?.email   && <Pill icon="email" href={`mailto:${r.email}`}>{r.email}</Pill>}
                  {r?.phone   && <Pill icon="phone" href={`tel:${r.phone}`}>{r.phone}</Pill>}
                  {r?.address && <Pill icon="pin">{r.address}</Pill>}
                </div>
              )}

              {r?.summary && (
                <p className="relative z-10 text-[var(--color-gray)] leading-relaxed text-[15px] max-w-xl">
                  {r.summary}
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* ═══ SKILLS ═══ */}
        {p?.skills?.length > 0 && (
          <Reveal>
            <SectionLabel text="Skills & Expertise" index="01" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["technical", "frameworks", "databases", "tools"].map((cat) => {
                const items = p.skills.filter((s) => s.category === cat);
                if (!items.length) return null;
                const c = CATS[cat];
                return (
                  <div key={cat} className={`${c.box} border rounded-2xl p-5 backdrop-blur-sm`}>
                    <p className={`text-[10px] font-bold tracking-[0.22em] uppercase ${c.title} mb-3`}>{c.label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span key={s.id} className={`${c.chip} border text-[12px] font-medium px-3 py-[5px] rounded-full`}>
                          {s.skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        )}

        {/* ═══ EXPERIENCE ═══ */}
        {p?.experiences?.length > 0 && (
          <Reveal>
            <SectionLabel text="Work Experience" index="02" />
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 rounded-3xl border border-[var(--color-border)] overflow-hidden">
              {p.experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  className={`flex gap-5 p-6 sm:p-7 hover:bg-[var(--color-border)]/20 transition-colors ${
                    i < p.experiences.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-sm">
                    {exp.company?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <p className="font-bold text-[var(--color-foreground)] text-[15px] leading-snug">{exp.jobTitle}</p>
                        <p className="text-blue-500 text-sm font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right shrink-0">
                        {exp.startDate && (
                          <span className="bg-[var(--color-border)]/40 text-[var(--color-gray)] text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
                            {FormatDate(exp.startDate)} – {exp.endDate ? FormatDate(exp.endDate) : "Present"}
                          </span>
                        )}
                        {exp.location && <p className="text-[11px] text-[var(--color-gray)] mt-1">{exp.location}</p>}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-[var(--color-gray)] text-sm leading-relaxed mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ═══ PROJECTS ═══ */}
        {p?.projects?.length > 0 && (
          <Reveal>
            <SectionLabel text="Projects" index="03" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.projects.map((proj, i) => (
                <div
                  key={proj.id}
                  className="group relative backdrop-blur-sm bg-[var(--color-background)]/80 rounded-2xl border border-[var(--color-border)] p-6 hover:border-blue-400/50 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <span className="absolute bottom-3 right-4 text-[80px] font-black leading-none text-[var(--color-border)]/60 group-hover:text-blue-500/10 transition-colors duration-300 pointer-events-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative z-10 flex flex-col flex-1">
                    <h3 className="font-bold text-[var(--color-foreground)] text-[15px] mb-2">{proj.projectName}</h3>
                    <p className="text-[var(--color-gray)] text-sm leading-relaxed mb-4 flex-1">{proj.description}</p>
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.technologies.split(",").map((t, j) => (
                          <span key={j} className="bg-blue-500/10 border border-blue-400/30 text-blue-400 text-[11px] font-semibold px-2.5 py-[3px] rounded-full">
                            {t.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer"
                        className="group/lnk inline-flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-xs font-bold transition-colors">
                        View project <LinkArrow />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ═══ EDUCATION ═══ */}
        {p?.educations?.length > 0 && (
          <Reveal>
            <SectionLabel text="Education" index="04" />
            <div className="space-y-3">
              {p.educations.map((edu) => (
                <div key={edu.id} className="backdrop-blur-sm bg-[var(--color-background)]/80 rounded-2xl border border-[var(--color-border)] p-5 sm:p-6 flex gap-4 hover:border-blue-400/30 transition-colors">
                  <div className="w-[3px] self-stretch rounded-full bg-gradient-to-b from-blue-600 via-blue-400 to-blue-100/30 shrink-0" />
                  <div className="flex-1 flex flex-wrap justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="font-bold text-[var(--color-foreground)] text-[15px]">{edu.degree}</p>
                      {edu.fieldOfStudy && <p className="text-blue-500 text-sm font-semibold mt-0.5">{edu.fieldOfStudy}</p>}
                      <p className="text-[var(--color-gray)] text-sm mt-0.5">{edu.institution}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {edu.startDate && (
                        <span className="bg-[var(--color-border)]/40 text-[var(--color-gray)] text-[11px] font-medium px-2.5 py-1 rounded-full inline-block whitespace-nowrap">
                          {FormatDate(edu.startDate)} – {edu.endDate ? FormatDate(edu.endDate) : "Present"}
                        </span>
                      )}
                      {edu.grade && <p className="text-blue-500 text-xs font-bold mt-2">GPA {edu.grade}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ═══ CERTIFICATIONS ═══ */}
        {p?.certifications?.length > 0 && (
          <Reveal>
            <SectionLabel text="Certifications" index="05" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {p.certifications.map((cert) => (
                <div key={cert.id} className="backdrop-blur-sm bg-[var(--color-background)]/80 rounded-2xl border border-[var(--color-border)] p-4 sm:p-5 flex gap-3.5 items-start hover:border-blue-400/30 hover:bg-blue-500/5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center shrink-0">
                    <BadgeCheck />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--color-foreground)] text-sm leading-snug">{cert.certificationName}</p>
                    {cert.issuingOrganization && <p className="text-[var(--color-gray)] text-xs mt-0.5">{cert.issuingOrganization}</p>}
                    {cert.issueDate && <p className="text-blue-500 text-xs font-semibold mt-1">{FormatDate(cert.issueDate)}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* ═══ ACHIEVEMENTS ═══ */}
        {p?.achievements?.length > 0 && (
          <Reveal>
            <SectionLabel text="Achievements" index="06" />
            <div className="backdrop-blur-sm bg-[var(--color-background)]/80 rounded-3xl border border-[var(--color-border)] overflow-hidden">
              {p.achievements.map((a, i) => (
                <div
                  key={a.id}
                  className={`flex items-start gap-4 px-6 py-4 sm:px-8 sm:py-5 hover:bg-[var(--color-border)]/20 transition-colors ${
                    i < p.achievements.length - 1 ? "border-b border-[var(--color-border)]" : ""
                  }`}
                >
                  <span className="text-[22px] font-black text-blue-500/20 leading-none shrink-0 w-8 text-right tabular-nums pt-px">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="w-px self-stretch bg-[var(--color-border)] shrink-0" />
                  <p className="text-[var(--color-gray)] text-sm leading-relaxed flex-1">{a.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <p className="text-center text-[11px] font-semibold tracking-[0.25em] uppercase text-[var(--color-border)] pt-4">
          ✦ Portfolio · {new Date().getFullYear()} ✦
        </p>

      </div>
    </div>
  );
}