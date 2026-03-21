import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const jobs = [
  {
    hash: "a3f8c21", company: "Stripe", role: "Senior Software Engineer",
    start: "2023-03", end: "present", type: "full-time",
    stack: ["TypeScript", "Go", "React", "PostgreSQL", "Kafka"],
    bullets: [
      "Led redesign of payment retry logic, reducing failed transaction rate by 34%",
      "Architected real-time fraud detection pipeline processing 2M+ events/day using Kafka",
      "Mentored 4 junior engineers, running weekly code review sessions and 1:1s",
      "Shipped Stripe Tax v2 serving 40k+ merchants across 30 countries",
      "Reduced p99 API latency from 420ms to 85ms via query optimization and caching layer",
    ],
  },
  {
    hash: "f10e9a2", company: "Siemens DISW", role: "Software Engineering Long term Intern",
    start: "2024-02", end: "2025-08", type: "internship",
    stack: ["Python", "Cpp", "Bash", "Jenkins"],
    bullets: [
      "Shipped Clip Discovery feature seen by 15M+ users within first week",
      "Built GraphQL schema for clips recommendation service from scratch",
      "Fixed 12 high-priority bugs in the live video player pipeline",
    ],
  },
];

const education = [
  {
    id: "mit-bs",
    school: "Ain Shams University",
    degree: "B.S. Computer Engineering",
    start: "2020", end: "2025",
    gpa: "3.34 / 4.0",
    location: "Cairo, Egypt",
    logo: "/images/asu.png",
    logoType: "img",
    color: "#00ff88",
    highlights: [
      "Dean's List all 8 semesters",
      "Thesis: 'Using GANs AI model to generate HANDWRITTEN Arabic text images using semi supervised approach'",
      "TA for 6.006 Algorithms — taught recitations to 60 students",
      "President of Competitive Programming Club (ICPC regionals 2017)",
      "Coursework: Distributed Systems, Compilers, Machine Learning, Computer Architecture",
    ],
    courses: ["6.824 Distributed Systems", "6.035 Compilers internals", "6.002 Database Systems", "6.867 Machine Learning", "6.004 Operating Systems", "6.046 Algorithms and Data Structures"],
  },
  {
    id: "stanford-cert",
    school: "University of East London (Dual Degree)",
    degree: "B.S. Computer Engineering",
    start: "2021", end: "2025",
    gpa: null,
    location: "Remote London, UK",
    logo: "/images/uel-removebg-preview.png",
    logoType: "img",
    color: "#00ff88",
    highlights: [
      "Completed CS229 Machine Learning with distinction",
      "Final project: Novel architecture for few-shot learning on tabular data",
      "Attended virtual seminars with researchers from Google Brain and DeepMind",
    ],
    courses: ["CS229 Machine Learning", "CS231n Computer Vision", "CS224n NLP with Deep Learning"],
  },
  {
    id: "highschool",
    school: "Manaret Elfarouk IGCSE school",
    degree: "IGCSE",
    start: "2018", end: "2020",
    gpa: null,
    location: "New Cairo, Egypt",
    logo: "/images/mf.png",
    logoType: "img",
    color: "#003087",
    highlights: [
      "Final Score of 110% (All stars)",
      "Academic Assistant — in Mathematics OL / AL Level [2019 - 2020]",
      "Top of class — in Mathematics OL / AL Level",
    ],
    courses: [],
  },
];

const stackColors = {
  TypeScript: "#3178C6", Go: "#00ADD8", React: "#61DAFB", PostgreSQL: "#336791",
  Kafka: "#231F20", "Node.js": "#339933", CockroachDB: "#6933FF", gRPC: "#244C5A",
  Cpp: "#ED8B00", Python: "#3776AB", Bash: "#E25A1C", Foundry: "#1A1A2E",
  Kubernetes: "#326CE5", Jenkins: "#EE4C2C", Redis: "#DC382D", FastAPI: "#009688",
  DynamoDB: "#4053D6", GraphQL: "#E10098", C: "#555555", Java: "#5D4F85",
  MATLAB: "#0076A8", "x86 ASM": "#666666",
};

const typeLabel = {
  "full-time": { label: "full-time", color: "#00ff88" },
  internship: { label: "internship", color: "#ffaa00" },
};

const NAV_ITEMS = [
  { id: "hero", label: "home" },
  { id: "work", label: "work history" },
  { id: "education", label: "education" },
  { id: "oss", label: "open source" },
  { id: "projects", label: "side projects" },
  { id: "courses", label: "courses / certs" },
];

// ─── THEMES ──────────────────────────────────────────────────────────────────

const themes = {
  dark: {
    bg: "#010409", surface: "#0d1117", surfaceAlt: "#161b22",
    border: "#21262d", borderAlt: "#30363d",
    text: "#c9d1d9", textBright: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
    hash: "#79c0ff", rowHover: "#161b22", navBg: "rgba(13,17,23,0.92)", navBorder: "#21262d",
  },
  light: {
    bg: "#ffffff", surface: "#ffffff", surfaceAlt: "#f6f8fa",
    border: "#d0d7de", borderAlt: "#d0d7de",
    text: "#24292f", textBright: "#1f2328", textMuted: "#656d76", textFaint: "#adb5bd",
    hash: "#0969da", rowHover: "#f6f8fa", navBg: "rgba(255,255,255,0.92)", navBorder: "#d0d7de",
  },
};

// ─── WORK MODAL ───────────────────────────────────────────────────────────────

function WorkModal({ job, onClose, t }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(6px)", animation: "fadeIn 0.15s ease" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: t.surface, border: `1px solid ${t.borderAlt}`, borderRadius: "12px", padding: "32px", maxWidth: "560px", width: "90%", boxShadow: "0 24px 80px rgba(0,0,0,0.8)", animation: "slideUp 0.2s cubic-bezier(0.34,1.56,0.64,1)", position: "relative" }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ fontFamily: "monospace", fontSize: "11px", color: t.textMuted, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#f78166" }}>commit</span>
            <span style={{ color: t.hash }}>{job.hash}</span>
            <span>·</span>
            <span>{job.start} → {job.end}</span>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: t.textBright, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>{job.role}</div>
          <div style={{ fontSize: "16px", color: t.hash, fontFamily: "'Syne', sans-serif", marginTop: "2px" }}>@ {job.company}</div>
        </div>
        <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {job.bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.text, lineHeight: "1.6" }}>
              <span style={{ color: "#00ff88", marginTop: "3px", flexShrink: 0, fontSize: "10px" }}>▸</span>{b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {job.stack.map((s) => (
            <span key={s} style={{ fontFamily: "monospace", fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: `${stackColors[s] || "#333"}22`, border: `1px solid ${stackColors[s] || "#555"}55`, color: stackColors[s] || t.textMuted }}>{s}</span>
          ))}
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: `1px solid ${t.borderAlt}`, borderRadius: "6px", color: t.textMuted, cursor: "pointer", padding: "4px 10px", fontFamily: "monospace", fontSize: "12px" }}>esc</button>
      </div>
    </div>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

function HeroSection({ t }) {
  return (
    <section id="hero" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00ff88", animation: "blink 2s infinite", boxShadow: "0 0 8px #00ff88" }} />
        <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>ahmed.sharaf ~ available for work</span>
      </div>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(48px,9vw,96px)", fontWeight: "800", color: t.textBright, letterSpacing: "-4px", lineHeight: 0.95, marginBottom: "28px" }}>
        Ahmed<br />
        <span >Sharaf</span>
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px,2vw,18px)", color: t.textMuted, maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}>
        Software Engineer · Cairo, Egypt · Building scalable systems and beautiful interfaces. Currently open to new opportunities.
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work").scrollIntoView({ behavior: "smooth" }); }}
          style={{ fontFamily: "monospace", fontSize: "13px", padding: "10px 22px", borderRadius: "8px", background: "#00ff88", color: "#010409", border: "none", cursor: "pointer", fontWeight: "600", textDecoration: "none" }}>
          view work →
        </a>
        <a href="#education" onClick={(e) => { e.preventDefault(); document.getElementById("education").scrollIntoView({ behavior: "smooth" }); }}
          style={{ fontFamily: "monospace", fontSize: "13px", padding: "10px 22px", borderRadius: "8px", background: "transparent", color: t.textMuted, border: `1px solid ${t.border}`, cursor: "pointer", textDecoration: "none" }}>
          education
        </a>
      </div>

      {/* scroll indicator */}
      <div style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "8px", color: t.textFaint, fontFamily: "monospace", fontSize: "11px" }}>
        <div style={{ width: "24px", height: "1px", background: t.border }} />
        scroll to explore
      </div>
    </section>
  );
}

// ─── WORK SECTION ─────────────────────────────────────────────────────────────

function WorkSection({ t }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.type === filter);

  return (
    <section id="work" style={{ paddingTop: "100px", paddingBottom: "80px" }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00ff88", animation: "blink 2s infinite", boxShadow: "0 0 8px #00ff88" }} />
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>git log --all --oneline</span>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>work history</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>{jobs.length} commits · click any row to expand</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {["all", "full-time", "internship"].map((f) => (
          <button key={f} className="pill-btn" onClick={() => setFilter(f)} style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", border: `1px solid ${filter === f ? "#00ff88" : t.border}`, background: filter === f ? "#00ff8815" : "transparent", color: filter === f ? "#00ff88" : t.textMuted, cursor: "pointer" }}>{f}</button>
        ))}
      </div>

      <div style={{ border: `1px solid ${t.border}`, borderRadius: "10px", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 220px 80px", padding: "10px 20px", background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, fontFamily: "monospace", fontSize: "11px", color: t.textMuted, userSelect: "none" }}>
          <span>hash</span><span>commit</span><span>tech stack</span><span>period</span>
        </div>
        {filtered.map((job, i) => (
          <div key={job.hash} onClick={() => setSelected(job)} onMouseEnter={() => setHovered(job.hash)} onMouseLeave={() => setHovered(null)}
            style={{ display: "grid", gridTemplateColumns: "90px 1fr 220px 80px", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none", cursor: "pointer", alignItems: "center", gap: "8px", background: hovered === job.hash ? t.rowHover : "transparent", transition: "background 0.15s" }}>
            <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.hash, letterSpacing: "0.5px" }}>{job.hash}</span>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "600", fontSize: "15px", color: hovered === job.hash ? t.textBright : t.text, marginBottom: "2px", transition: "color 0.15s" }}>{job.role}</div>
              <div style={{ fontFamily: "monospace", fontSize: "12px", color: t.textMuted }}>@ {job.company} · <span style={{ color: typeLabel[job.type].color }}>{typeLabel[job.type].label}</span></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {job.stack.slice(0, 3).map((s) => (
                <span key={s} className="stack-tag" style={{ fontFamily: "monospace", fontSize: "10px", padding: "2px 7px", borderRadius: "3px", background: `${stackColors[s] || "#333"}18`, border: `1px solid ${stackColors[s] || "#555"}40`, color: stackColors[s] || t.textMuted }}>{s}</span>
              ))}
              {job.stack.length > 3 && <span style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, padding: "2px 4px" }}>+{job.stack.length - 3}</span>}
            </div>
            <span style={{ fontFamily: "monospace", fontSize: "11px", color: t.textMuted, whiteSpace: "nowrap" }}>{job.start.slice(0,4)}{job.end !== "present" ? `–${job.end.slice(0,4)}` : "–now"}</span>
          </div>
        ))}
      </div>

      {selected && <WorkModal job={selected} onClose={() => setSelected(null)} t={t} />}
    </section>
  );
}

// ─── EDUCATION SECTION ────────────────────────────────────────────────────────

function EducationSection({ t }) {
  const [expanded, setExpanded] = useState("mit-bs");

  return (
    <section id="education" style={{ paddingTop: "100px", paddingBottom: "80px", borderTop: `1px solid ${t.border}` }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>git log --author="academia"</span>
        </div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>education</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>{education.length} institutions · click to expand</p>
      </div>

      <div style={{ position: "relative", paddingLeft: "28px" }}>
        <div style={{ position: "absolute", left: "7px", top: "16px", bottom: "16px", width: "2px", background: `linear-gradient(to bottom, #00ff88, ${t.border})`, borderRadius: "2px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {education.map((edu) => {
            const isOpen = expanded === edu.id;
            return (
              <div key={edu.id} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: "-22px", top: "22px", width: "14px", height: "14px", borderRadius: "50%", background: isOpen ? edu.color : t.surfaceAlt, border: `2px solid ${isOpen ? edu.color : t.border}`, transition: "all 0.25s", boxShadow: isOpen ? `0 0 12px ${edu.color}66` : "none", zIndex: 1 }} />

                <div onClick={() => setExpanded(isOpen ? null : edu.id)}
                  style={{ border: `1px solid ${isOpen ? edu.color + "55" : t.border}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.25s, box-shadow 0.25s", boxShadow: isOpen ? `0 4px 32px ${edu.color}14` : "none", background: t.surface }}>

                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", background: isOpen ? `${edu.color}0a` : "transparent", transition: "background 0.25s" }}>
                    <div style={{ width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", background: `${edu.color}15`, borderRadius: "10px", border: `1px solid ${edu.color}30`, flexShrink: 0, overflow: "hidden" }}>
                      {edu.logoType === "img" ? (
                        <img src={edu.logo} alt={edu.school} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "4px" }} onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        <span style={{ fontSize: "28px" }}>{edu.logo}</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "700", fontSize: "17px", color: t.textBright, letterSpacing: "-0.3px" }}>{edu.school}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.textMuted, marginTop: "3px" }}>{edu.degree}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>{edu.start}–{edu.end}</div>
                      {edu.gpa && <div style={{ fontFamily: "monospace", fontSize: "12px", color: "#00ff88", marginTop: "4px" }}>GPA {edu.gpa}</div>}
                      <div style={{ fontFamily: "monospace", fontSize: "11px", color: t.textFaint, marginTop: "3px" }}>{edu.location}</div>
                    </div>
                    <div style={{ color: t.textMuted, fontFamily: "monospace", fontSize: "18px", marginLeft: "8px", transition: "transform 0.25s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", userSelect: "none" }}>›</div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: "24px", borderTop: `1px solid ${t.border}`, animation: "fadeIn 0.2s ease" }}>
                      <div style={{ display: "grid", gridTemplateColumns: edu.courses.length > 0 ? "1fr 1fr" : "1fr", gap: "32px" }}>
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1.5px" }}>highlights</div>
                          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                            {edu.highlights.map((h, i) => (
                              <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: t.text, lineHeight: "1.6" }}>
                                <span style={{ color: edu.color, flexShrink: 0, marginTop: "5px", fontSize: "8px" }}>▸</span>{h}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {edu.courses.length > 0 && (
                          <div>
                            <div style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, marginBottom: "14px", textTransform: "uppercase", letterSpacing: "1.5px" }}>key courses</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              {edu.courses.map((c, i) => (
                                <div key={i} style={{ fontFamily: "monospace", fontSize: "12px", padding: "9px 14px", borderRadius: "7px", background: `${edu.color}0e`, border: `1px solid ${edu.color}28`, color: t.text, lineHeight: "1.4" }}>{c}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── COMING SOON SECTION ──────────────────────────────────────────────────────

function ComingSoonSection({ id, label, t }) {
  return (
    <section id={id} style={{ paddingTop: "100px", paddingBottom: "80px", borderTop: `1px solid ${t.border}` }}>
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>{label}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "16px", textAlign: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "48px", opacity: 0.1, lineHeight: 1 }}>⬡</div>
        <div style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>{"// not yet committed to this branch"}</div>
      </div>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredNav, setHoveredNav] = useState(null);
  const t = themes[mode];

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .pill-btn { transition: all 0.15s; cursor: pointer; }
        .pill-btn:hover { opacity: 0.8; }
        .stack-tag { transition: transform 0.15s; }
        .stack-tag:hover { transform: translateY(-2px); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
        a { text-decoration: none; }
        .social-fab { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); }
        .social-fab:hover { transform: scale(1.15) translateX(-3px); box-shadow: 0 6px 28px rgba(0,0,0,0.5) !important; }
        .fab-label {
          position: absolute; right: calc(100% + 10px); top: 50%; transform: translateY(-50%);
          background: rgba(13,17,23,0.96); color: #c9d1d9; font-family: monospace;
          font-size: 11px; padding: 4px 10px; border-radius: 6px; white-space: nowrap;
          opacity: 0; pointer-events: none; transition: opacity 0.15s;
          border: 1px solid #21262d;
        }
        .social-fab:hover .fab-label { opacity: 1; }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, color: t.text, transition: "background 0.2s, color 0.2s" }}>

        {/* NAV */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: t.navBg, borderBottom: `1px solid ${t.navBorder}`, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: "4px", height: "52px" }}>

            <div onClick={() => scrollTo("hero")} style={{ fontFamily: "'Syne', sans-serif", fontWeight: "800", fontSize: "15px", color: t.textBright, letterSpacing: "-0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", marginRight: "16px", flexShrink: 0 }}>
              <span style={{ color: "#00ff88", fontFamily: "monospace", fontWeight: "400" }}></span>Ahmed Sharaf
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, overflowX: "auto" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button key={item.id} onClick={() => scrollTo(item.id)} onMouseEnter={() => setHoveredNav(item.id)} onMouseLeave={() => setHoveredNav(null)}
                    style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 11px", borderRadius: "6px", border: "none", background: isActive ? t.surfaceAlt : hoveredNav === item.id ? `${t.surfaceAlt}88` : "transparent", color: isActive ? t.textBright : t.textMuted, cursor: "pointer", transition: "all 0.15s", position: "relative", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {item.label}
                    {isActive && <div style={{ position: "absolute", bottom: "-1px", left: "11px", right: "11px", height: "2px", background: "#00ff88", borderRadius: "2px 2px 0 0" }} />}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 12px", borderRadius: "6px", border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textMuted, cursor: "pointer", transition: "all 0.2s", flexShrink: 0, marginLeft: "8px" }}>
              {mode === "dark" ? "☀" : "●"}
            </button>
          </div>
        </nav>

        {/* FLOATING SOCIAL DOCK */}
        <div style={{ position: "fixed", bottom: "28px", right: "24px", zIndex: 100, display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
          {[
            { href: "https://www.linkedin.com/in/ahmed-ibrahim-sharaf-eldin-a43778222/", label: "LinkedIn", color: "#0A66C2", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            )},
            { href: "https://github.com/AhmedIbrahimSH", label: "GitHub", color: "#e6edf3", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            )},
            { href: "mailto:your@email.com", label: "Send Mail", color: "#f78166", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            )},
            { href: "https://drive.google.com/YOUR_CV_LINK", label: "CV / Résumé", color: "#fbbc04", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 0A1.5 1.5 0 005 1.5v21A1.5 1.5 0 006.5 24h15a1.5 1.5 0 001.5-1.5V6l-6-6H6.5zM15 1.5L21 7.5H15V1.5zM8 12h8v1.5H8V12zm0 3h8v1.5H8V15zm0 3h5v1.5H8V18z"/></svg>
            )},
            { href: "https://youtube.com/@YOUR_CHANNEL", label: "YouTube", color: "#FF0000", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            )},
          ].map(({ href, label, color, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-fab"
              style={{ position: "relative", width: "42px", height: "42px", borderRadius: "12px", background: t.surface, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", color, boxShadow: "0 4px 20px rgba(0,0,0,0.4)", cursor: "pointer" }}>
              {icon}
              <span className="fab-label">{label}</span>
            </a>
          ))}
        </div>

        {/* ALL SECTIONS */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <HeroSection t={t} />
          <WorkSection t={t} />
          <EducationSection t={t} />
          <ComingSoonSection id="oss" label="open source" t={t} />
          <ComingSoonSection id="projects" label="side projects" t={t} />
          <ComingSoonSection id="courses" label="courses / certs" t={t} />

          {/* Footer */}
          <div style={{ borderTop: `1px solid ${t.border}`, padding: "32px 0", textAlign: "center", fontFamily: "monospace", fontSize: "12px", color: t.textFaint }}>
            ahmed.sharaf · cairo, egypt · built with react
          </div>
        </div>
      </div>
    </>
  );
}