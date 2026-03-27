import { useState, useEffect, useRef } from "react";
import OSSSection from "./OSSSection";

// ─── DATA ────────────────────────────────────────────────────────────────────

const jobs = [
  {
    hash: "a3f8c21", 
    company: "Valeo", 
    logo: "/images/v.png", 
    role: "Software Engineer Contractor",
    start: "Feb 2026", end: "present", type: "full-time",
    stack: ["C++", "Python", "AUTOSAR"],
    bullets: [
    
    ],
  },
  {
    hash: "f10e9a2", 
    company: "Siemens DISW", 
    logo: "/images/s.png", 
    role: "Software Engineering Long term Intern",
    start: "Feb 2024", end: "Aug 2025", type: "internship",
    stack: ["Python", "C++", "Bash", "Jenkins" , "Java"],
    bullets: [
      "OTN Protocol Implementation: Developed features for an OTN tool processing millions of frames, using CPP and \
Python including Forward Error Correction (FEC), frame parsing, Cyclic Redundancy Check (CRC), and internal \
frame handling in compliance with the OTN standard",
"Distributed Build System Engineering: Architected a high-performance build automation engine using Python , Jenkins \
and Bash, optimizing resource allocation to reduce build latency by 60%. This system eliminated 90% of manual \
deployment errors and reclaimed 20+ hours of engineering time monthly.",
"Developer Tools Design: Spearheaded the development of a cross-platform automation suite using Python and PyQt, \
translating complex GUI-based manual workflows into efficient programmatic APIs. The tool achieved a 75% reduction in task \
execution time by abstracting low-level system interactions." 
    ],
  },
   {
    hash: "e88f21", 
    company: "Optima Professional Services", 
    logo: "/images/opt.png", 
    role: "Software Engineer Intern",
    start: "Aug 2023", end: "Sep 2023", type: "internship",
    stack: ["C++", "Python", "AUTOSAR"],
    bullets: [
    
    ],
  },
   {
    hash: "g3f8r21", 
    company: "Credit Agricole", 
    logo: "/images/ca.png", 
    role: "Software Engineer Intern",
    start: "Jul 2023", end: "Aug 2023", type: "internship",
    stack: ["C++", "Python", "AUTOSAR"],
    bullets: [
     
    ],
  }
 
];

const education = [
  {
    id: "mit-bs",
    school: "Ain Shams University",
    degree: "B.S. Computer Engineering",
    start: "2020", end: "2025",
    gpa: "3.34 / 4.0",
    location: "Cairo, Egypt",
    logo: process.env.PUBLIC_URL + "/images/asu.png",
    logoType: "img",
    color: "#00ff88",
    highlights: [
      "Thesis: 'Using GANs AI model to generate HANDWRITTEN Arabic text images using semi supervised approach'",
      "TA for 6.006 Algorithms — taught recitations to 60 students",
      "Member of student activites : Google Developer Student Club , Enactus , Cairo Runners",
      "Coursework: Distributed Systems, Compilers, Machine Learning, Computer Architecture",
    ],
    courses: ["6.824 Distributed Systems", "6.035 Compilers internals", "6.002 Database Systems", "6.867 Machine Learning", "6.004 Operating Systems", "6.046 Algorithms and Data Structures"],
  },
  {
    id: "stanford-cert",
    school: "University of East London (Dual Degree)",
    degree: "B.S. Computer Engineering ",
    start: "2021", end: "2025",
    gpa: "First Class Honours Degree",
    location: "Remote London, UK",
    logo: "/images/uel-removebg-preview.png",
    logoType: "img",
    color: "#00ff88",
    highlights: [
      "Thesis: 'Using GANs AI model to generate HANDWRITTEN Arabic text images using semi supervised approach'",
      "TA for 6.006 Algorithms — taught recitations to 60 students",
      "Member of a lot of student activites : Google Developer Student Club , Enactus",
      "Coursework: Distributed Systems, Compilers, Machine Learning, Computer Architecture",
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
  Kafka: "#231F20", "Node.js": "#339933", AUTOSAR: "#6933FF", gRPC: "#244C5A",
  "C++": "#ED8B00", Python: "#3776AB", Bash: "#E25A1C", Foundry: "#1A1A2E",
  Kubernetes: "#326CE5", Jenkins: "#EE4C2C", Redis: "#DC382D", FastAPI: "#009688",
  DynamoDB: "#4053D6", GraphQL: "#E10098", C: "#555555", Java: "#5D4F85",
  MATLAB: "#0076A8", "x86 ASM": "#666666",
};

const typeLabel = {
  "full-time": { label: "full-time", color: "#00ff88" },
  internship: { label: "internship", color: "#ffaa00" },
};

const NAV_ITEMS = [
  { id: "blog", label: "blog", isExternal: true, href: "https://your-blog-link.com" }, 
  { id: "work", label: "work history" },
  { id: "education", label: "education" },
  { id: "oss", label: "open source" },
  { id: "projects", label: "side projects" },
  // { id: "courses", label: "courses" },
  { id: "certified", label: "certified" },
];

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
        
        <div style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
            <div style={{ width: "60px", height: "60px", borderRadius: "10px", background: t.bg, border: `1px solid ${t.borderAlt}`, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px", flexShrink: 0 }}>
                <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
                <div style={{ fontFamily: "monospace", fontSize: "11px", color: t.textMuted, marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#f78166" }}>commit</span>
                    <span style={{ color: t.hash }}>{job.hash}</span>
                    <span>·</span>
                    <span>{job.start} → {job.end}</span>
                </div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: t.textBright, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>{job.role}</div>
                <div style={{ fontSize: "16px", color: t.hash, fontFamily: "'Syne', sans-serif", marginTop: "2px" }}>@ {job.company}</div>
            </div>
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

function HeroSection({ t, scrollToFooter }) {
  return (
    <section id="hero" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00ff88", animation: "blink 2s infinite", boxShadow: "0 0 8px #00ff88" }} />
        <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>ahmed.sharaf ~ available for work</span>
      </div>
      <h1 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(48px,9vw,96px)", fontWeight: "800", color: t.textBright, letterSpacing: "-4px", lineHeight: 0.95, marginBottom: "28px" }}>
        Ahmed<br />
        <span>Sharaf</span>
      </h1>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px,2vw,18px)", color: t.textMuted, maxWidth: "520px", lineHeight: 1.7, marginBottom: "" }}>
        Software Engineer · Cairo, Egypt.
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px,2vw,18px)", color: t.textMuted, maxWidth: "520px", lineHeight: 1.7, marginBottom: "" }}>
        Building scalable systems and beautiful interfaces.
      </p>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px,2vw,18px)", color: t.textMuted, maxWidth: "520px", lineHeight: 1.7, marginBottom: "40px" }}>
        Previously worked @<strong style={{ fontWeight: 'bold', color: 'white' }}>Valeo</strong> & @<strong style={{color: 'white', fontWeight: 'bold' }}>Siemens DISW</strong>
      </p>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a href="#work" onClick={(e) => { e.preventDefault(); document.getElementById("work").scrollIntoView({ behavior: "smooth" }); }}
          style={{ fontFamily: "monospace", fontSize: "13px", padding: "10px 22px", borderRadius: "8px", background: "#00ff88", color: "#010409", border: "none", cursor: "pointer", fontWeight: "600", textDecoration: "none" }}>
          view work →
        </a>
        <button onClick={scrollToFooter}
          style={{ fontFamily: "monospace", fontSize: "13px", padding: "10px 22px", borderRadius: "8px", background: "transparent", color: t.textMuted, border: `1px solid ${t.border}`, cursor: "pointer", textDecoration: "none" }}>
          contact me
        </button>
      </div>
      <div style={{ marginTop: "80px", display: "flex", alignItems: "center", gap: "8px", color: t.textFaint, fontFamily: "monospace", fontSize: "11px" }}>
        <div style={{ width: "24px", height: "1px", background: t.border }} />
        scroll to explore
      </div>
    </section>
  );
}

// ─── WORK SECTION ─────────────────────────────────────────────────────────────


function WorkSection({ t }) {
  const [expanded, setExpanded] = useState(null);
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
        <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>Work history</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>{jobs.length} commits · click any row to expand</p>
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {["all", "full-time", "internship"].map((f) => (
          <button key={f} className="pill-btn" onClick={() => setFilter(f)} style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 14px", borderRadius: "20px", border: `1px solid ${filter === f ? "#00ff88" : t.border}`, background: filter === f ? "#00ff8815" : "transparent", color: filter === f ? "#00ff88" : t.textMuted, cursor: "pointer" }}>{f}</button>
        ))}
      </div>

      <div style={{ border: `1px solid ${t.border}`, borderRadius: "10px", overflow: "hidden" }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 220px 120px", padding: "10px 20px", background: t.surfaceAlt, borderBottom: `1px solid ${t.border}`, fontFamily: "monospace", fontSize: "11px", color: t.textMuted, userSelect: "none" }}>
          <span>org</span><span>role</span><span>tech stack</span><span>period</span>
        </div>

        {filtered.map((job, i) => {
          const isOpen = expanded === job.hash;
          return (
            <div key={job.hash} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none" }}>

              {/* ── Summary row ── */}
              <div
                onClick={() => setExpanded(isOpen ? null : job.hash)}
                onMouseEnter={() => setHovered(job.hash)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "70px 1fr 220px 120px",
                  padding: "14px 20px",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "12px",
                  background: isOpen ? t.rowHover : hovered === job.hash ? t.rowHover : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {/* Logo */}
                <div style={{ width: "40px", height: "40px", background: t.surface, border: `1px solid ${t.border}`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px", overflow: "hidden" }}>
                  <img src={job.logo} alt={job.company} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>

                {/* Role + company */}
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "600", fontSize: "15px", color: isOpen || hovered === job.hash ? t.textBright : t.text, marginBottom: "2px", transition: "color 0.15s" }}>
                    {job.role}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "12px", color: t.textMuted }}>
                    @ {job.company} · <span style={{ color: t.hash }}>{job.hash}</span> · <span style={{ color: typeLabel[job.type].color }}>{typeLabel[job.type].label}</span>
                  </div>
                </div>

                {/* Stack tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {job.stack.slice(0, 3).map((s) => (
                    <span key={s} className="stack-tag" style={{ fontFamily: "monospace", fontSize: "10px", padding: "2px 7px", borderRadius: "3px", background: `${stackColors[s] || "#333"}18`, border: `1px solid ${stackColors[s] || "#555"}40`, color: stackColors[s] || t.textMuted }}>{s}</span>
                  ))}
                  {job.stack.length > 3 && <span style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, padding: "2px 4px" }}>+{job.stack.length - 3}</span>}
                </div>

                {/* Period + chevron */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: t.textMuted, whiteSpace: "nowrap" }}>
                    {job.start}{job.end !== "present" ? ` – ${job.end}` : " – now"}
                  </span>
                  <span style={{ color: t.textMuted, fontFamily: "monospace", fontSize: "18px", transition: "transform 0.25s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", userSelect: "none" }}>›</span>
                </div>
              </div>

             {/* ── Expanded detail panel ── */}
{isOpen && (
  <div style={{
    padding: "20px 20px 24px 90px",
    borderTop: `1px solid ${t.border}`,
    background: t.surfaceAlt,
    animation: "fadeIn 0.2s ease",
  }}>
    {/* Bullets */}
    <ul style={{ margin: "0 0 16px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
      {job.bullets.map((b, idx) => (
        <li key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.text, lineHeight: "1.6" }}>
          <span style={{ color: "#00ff88", marginTop: "4px", flexShrink: 0, fontSize: "8px" }}>▸</span>{b}
        </li>
      ))}
    </ul>

    {/* Stack tags — horizontal wrap, max 4 per row */}
    <div>
      <div style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "8px" }}>stack</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {job.stack.map((s) => (
          <span key={s} style={{ fontFamily: "monospace", fontSize: "11px", padding: "3px 10px", borderRadius: "4px", background: `${stackColors[s] || "#333"}22`, border: `1px solid ${stackColors[s] || "#555"}55`, color: stackColors[s] || t.textMuted, whiteSpace: "nowrap" }}>{s}</span>
        ))}
      </div>
    </div>
  </div>
)}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── EDUCATION SECTION ────────────────────────────────────────────────────────

// ─── EDUCATION SECTION ────────────────────────────────────────────────────────
// Replace your existing EducationSection with this one.
// Changes: logo 52px → 40px, header padding 20/24px → 14/20px, font sizes
// brought in line with the work table rows, gap reduced from 20px → 14px.

function EducationSection({ t }) {
  const [expanded, setExpanded] = useState("mit-bs");

  // Define the grid layout once for consistency: logo(70px), info(1fr), period(100px)
  const gridLayout = "70px 1fr 100px";

  return (
    <section id="education" style={{ paddingTop: "100px", paddingBottom: "80px", borderTop: `1px solid ${t.border}` }}>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          {/* <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>git log --author="academia"</span> */}
        </div>
        <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>Education</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>{education.length} institutions · click to expand</p>
      </div>

      <div style={{ border: `1px solid ${t.border}`, borderRadius: "10px", overflow: "hidden" }}>
        {/* Column headers — Adjusted to 3 columns */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: gridLayout, 
          padding: "10px 20px", 
          background: t.surfaceAlt, 
          borderBottom: `1px solid ${t.border}`, 
          fontFamily: "monospace", 
          fontSize: "11px", 
          color: t.textMuted, 
          userSelect: "none" 
        }}>
          <span>org</span>
          <span>degree</span>
          <span style={{ textAlign: "right", paddingRight: "20px" }}>period</span>
        </div>

        {education.map((edu, i) => {
          const isOpen = expanded === edu.id;
          return (
            <div key={edu.id} style={{ borderBottom: i < education.length - 1 ? `1px solid ${t.border}` : "none" }}>

              {/* ── Summary row – Adjusted to 3 columns ── */}
              <div
                onClick={() => setExpanded(isOpen ? null : edu.id)}
                style={{
                  display: "grid",
                  gridTemplateColumns: gridLayout,
                  padding: "14px 20px",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "12px",
                  background: isOpen ? t.rowHover : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {/* LOGO */}
                <div style={{
                  width: "40px", height: "40px",
                  background: t.surface,
                  border: `1px solid ${t.border}`,
                  borderRadius: "8px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "4px", overflow: "hidden", flexShrink: 0,
                }}>
                  {edu.logoType === "img" ? (
                    <img
                      src={edu.logo}
                      alt={edu.school}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <span style={{ fontSize: "20px" }}>{edu.logo}</span>
                  )}
                </div>

                {/* School + degree */}
                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "600", fontSize: "15px", color: isOpen ? t.textBright : t.text, marginBottom: "2px", transition: "color 0.15s" }}>
                    {edu.school}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: "12px", color: t.textMuted }}>
                    {edu.degree}
                    {edu.gpa && (
                      <> · <span style={{ color: "#00ff88" }}>{edu.gpa}</span></>
                    )}
                  </div>
                </div>

                {/* Period + chevron */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "15px" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: t.textMuted, whiteSpace: "nowrap" }}>
                    {edu.start}–{edu.end}
                  </span>
                  <span style={{
                    color: t.textMuted, fontFamily: "monospace", fontSize: "18px",
                    transition: "transform 0.25s",
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    userSelect: "none",
                  }}>›</span>
                </div>
              </div>

              {/* ── Expanded detail panel ── */}
              {isOpen && (
                <div style={{
                  padding: "20px 20px 20px 82px", // Aligns content with the school name
                  borderTop: `1px solid ${t.border}`,
                  background: t.surfaceAlt,
                  animation: "fadeIn 0.2s ease",
                }}>
                  <div style={{ display: "grid", gridTemplateColumns: edu.courses.length > 0 ? "1fr 1fr" : "1fr", gap: "28px" }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>highlights</div>
                      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {edu.highlights.map((h, idx) => (
                          <li key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: t.text, lineHeight: "1.6" }}>
                            <span style={{ color: "#00ff88", flexShrink: 0, marginTop: "5px", fontSize: "8px" }}>▸</span>{h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {edu.courses.length > 0 && (
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: "10px", color: t.textMuted, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1.5px" }}>key courses</div>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "6px" }}>
                          {edu.courses.map((c, idx) => (
                            <div key={idx} style={{ fontFamily: "monospace", fontSize: "11px", padding: "4px 10px", borderRadius: "4px", background: `${edu.color}0e`, border: `1px solid ${edu.color}28`, color: t.text }}>{c}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── COMING SOON SECTION ──────────────────────────────────────────────────────

function ComingSoonSection({ id, label, t }) {
  return (
    <section id={id} style={{ paddingTop: "100px", paddingBottom: "80px", borderTop: `1px solid ${t.border}` }}>
      <div style={{ marginBottom: "48px" }}>
        <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>{label}</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "16px", textAlign: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: "48px", opacity: 0.1, lineHeight: 1 }}>⬡</div>
        <div style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>{"// not yet committed to this branch"}</div>
      </div>
    </section>
  );
}

// ─── CONTACT LINKS ────────────────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    
  label: "LinkedIn",
  href: "https://www.linkedin.com/in/ahmed-ibrahim-sharaf-eldin-a43778222/",
  color: "#0A66C2",
  icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.93-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.13-.92 2.06-2.06 2.06zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28z" />
    </svg>
  ),
  },
  {
    label: "Email",
    href: "mailto:your@email.com",
    color: "#f78166",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/AhmedIbrahimSH",
    color: "#e6edf3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  
  {
  label: "Google Drive",
  href: "https://drive.google.com/",
  color: "#4285F4",
  icon: (
    <img 
      src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" 
      alt="Google Drive"
      style={{ 
        width: "22px", 
        height: "22px", 
        display: "block",
        objectFit: "contain" 
      }} 
    />
  ),
},
  {
  label: "YouTube",
  href: "https://youtube.com/@YOUR_CHANNEL",
  color: "#FF0000",
  icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
},
];

// ─── FLOATING CONTACT BUTTON ──────────────────────────────────────────────────

function FloatingContactButton({ t, scrollToFooter }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button onClick={scrollToFooter} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 100, display: "flex", alignItems: "center", gap: hovered ? "10px" : "0px", padding: hovered ? "12px 20px 12px 16px" : "12px 16px", borderRadius: "50px", background: "#00ff88", color: "#010409", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "13px", fontWeight: "700", boxShadow: hovered ? "0 8px 32px rgba(0,255,136,0.45)" : "0 4px 20px rgba(0,255,136,0.25)", opacity: visible ? 1 : 0, transform: visible ? (hovered ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)") : "translateY(16px) scale(0.9)", pointerEvents: visible ? "auto" : "none", transition: "all 0.25s ease", overflow: "hidden", whiteSpace: "nowrap" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      <span style={{ maxWidth: hovered ? "80px" : "0px", overflow: "hidden", transition: "max-width 0.2s ease" }}>contact</span>
    </button>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [mode, setMode] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredNav, setHoveredNav] = useState(null);
  const t = themes[mode];

  const scrollToFooter = () => document.getElementById("site-footer")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
  // Filter for items that have a corresponding element on the page
  const sectionIds = NAV_ITEMS
    .filter(item => !item.isExternal) 
    .map((n) => n.id);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // If the section is taking up a significant portion of the screen
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, { 
    // Adjusting rootMargin to trigger the highlight 
    // when the section is near the top of the viewport
    rootMargin: "-20% 0px -70% 0px" 
  });

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

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
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, color: t.text, transition: "background 0.2s, color 0.2s" }}>
        
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: t.navBg, borderBottom: `1px solid ${t.navBorder}`, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: "52px" }}>
            <div onClick={() => scrollTo("hero")} style={{ fontFamily: "'Syne', sans-serif", fontWeight: "800", fontSize: "15px", color: t.textBright, cursor: "pointer", marginRight: "16px" }}>Ahmed Sharaf</div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, overflowX: "auto" }}>
              {NAV_ITEMS.map((item) => {
  const isActive = activeSection === item.id;

  if (item.isExternal) {
    return (
      <a 
        key={item.id} 
        href={item.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{ 
          textDecoration: "none", 
          fontFamily: "monospace", 
          fontSize: "12px", 
          padding: "5px 11px", 
          color: t.textMuted, // External links stay muted unless hovered
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }}
      >
        {item.label} <span style={{ fontSize: "10px", opacity: 0.6 }}>↗</span>
      </a>
    );
  }

  return (
    <button 
      key={item.id} 
      onClick={() => scrollTo(item.id)} 
      style={{ 
        fontFamily: "monospace", 
        fontSize: "12px", 
        padding: "6px 12px", 
        borderRadius: "6px", 
        border: "none", 
        // Background change for the active pill
        background: isActive ? t.border : "transparent", 
        // THIS IS THE IMPORTANT PART: Highlight color
        color: isActive ? t.textBright : t.textMuted, 
        fontWeight: isActive ? "700" : "400",
        cursor: "pointer", 
        transition: "all 0.2s ease", // Smooth transition for the highlight
        position: "relative" 
      }}
    >
      {item.label}
      {/* Optional: Add a small green dot or underline for extra flair when active */}
      {isActive && (
        <span style={{ 
          position: "absolute", 
          bottom: "2px", 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: "4px", 
          height: "4px", 
          background: "#00ff88", 
          borderRadius: "50%" 
        }} />
      )}
    </button>
  );
})}
            </div>
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")} style={{ fontFamily: "monospace", padding: "5px 12px", borderRadius: "6px", border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textMuted, cursor: "pointer", marginLeft: "8px" }}>{mode === "dark" ? "☀" : "●"}</button>
          </div>
        </nav>

        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <HeroSection t={t} scrollToFooter={scrollToFooter} />
          <WorkSection t={t} />
          <EducationSection t={t} />
          <OSSSection id="oss" label="open source" t={t} />
          <ComingSoonSection id="projects" label="Side projects" t={t} />
          <ComingSoonSection id="certified" label="Certified" t={t} />
          {/* <ComingSoonSection id="courses" label="courses" t={t} /> */}

          <div id="site-footer" style={{ borderTop: `1px solid ${t.border}`, padding: "32px 0", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "20px" }}>
              {CONTACT_LINKS.map(({ label, href, color, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color, opacity: 0.5 }}>{icon}</a>
              ))}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "12px", color: t.textFaint }}>ahmed.sharaf · cairo, egypt</div>
          </div>
        </div>
      </div>
      <FloatingContactButton t={t} scrollToFooter={scrollToFooter} />
    </>
  );
}