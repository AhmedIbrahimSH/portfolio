import { useState, useEffect } from "react";

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
    hash: "d91b4e7", company: "Notion", role: "Software Engineer II",
    start: "2021-06", end: "2023-02", type: "full-time",
    stack: ["TypeScript", "React", "Node.js", "CockroachDB", "gRPC"],
    bullets: [
      "Built real-time collaborative editing engine used by 20M+ users daily",
      "Refactored block rendering pipeline, cutting initial load time by 60%",
      "Designed and shipped Notion AI integration as founding engineer on the feature",
      "Migrated core data layer from DynamoDB to CockroachDB with zero downtime",
      "Contributed to open-source CRDT library adopted by 3 other startups",
    ],
  },
  {
    hash: "7c23a8f", company: "Palantir", role: "Forward Deployed Engineer",
    start: "2019-08", end: "2021-05", type: "full-time",
    stack: ["Java", "Python", "Spark", "Foundry", "TypeScript"],
    bullets: [
      "Embedded with US DoD teams to deploy Gotham for logistics optimization",
      "Built data pipelines ingesting 500GB+ daily from satellite imagery feeds",
      "Reduced supply chain analysis time from 2 weeks to 4 hours for a NATO client",
      "Led workshop trainings for 200+ government analysts on Foundry platform",
      "Developed custom graph algorithm for network anomaly detection (classified)",
    ],
  },
  {
    hash: "2e56d3c", company: "Scale AI", role: "ML Infrastructure Engineer",
    start: "2018-06", end: "2019-07", type: "full-time",
    stack: ["Python", "Kubernetes", "PyTorch", "Redis", "FastAPI"],
    bullets: [
      "Built annotation pipeline infrastructure that scaled from 1k to 1M tasks/day",
      "Designed active learning system that cut labeling cost by 40% for vision tasks",
      "Shipped internal ML evaluation dashboard used by research and product teams",
      "Automated QA workflows saving 800+ human-hours per month",
    ],
  },
  {
    hash: "f10e9a2", company: "Twitch", role: "Software Engineering Intern",
    start: "2017-06", end: "2017-08", type: "internship",
    stack: ["React", "Go", "DynamoDB", "GraphQL"],
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
    logo: "asu.png",
    logoType: "img",
    color: "#A31F34",
    highlights: [
      "Dean's List all 8 semesters",
      "Thesis: 'Distributed Consensus in Adversarial Network Conditions'",
      "TA for 6.006 Algorithms — taught recitations to 60 students",
      "President of MIT Competitive Programming Club (ICPC regionals 2017)",
      "Coursework: Distributed Systems, Compilers, Machine Learning, Computer Architecture",
    ],
    courses: ["6.824 Distributed Systems", "6.035 Compilers", "6.867 Machine Learning", "6.004 Computation Structures", "6.046 Algorithms"],
  },
  {
    id: "stanford-cert",
    school: "University of East London (Dual Degree)",
    degree: "B.S. Computer Engineering",
    start: "2021", end: "2025",
    gpa: null,
    location: "Remote London , UK",
    logo: "📐",
    color: "#8C1515",
    highlights: [
      "Completed CS229 Machine Learning with distinction",
      "Final project: Novel architecture for few-shot learning on tabular data",
      "Attended virtual seminars with researchers from Google Brain and DeepMind",
    ],
    courses: ["CS229 Machine Learning", "CS231n Computer Vision", "CS224n NLP with Deep Learning"],
  },
  {
    id: "highschool",
    school: "Phillips Exeter Academy",
    degree: "High School Diploma",
    start: "2010", end: "2014",
    gpa: null,
    location: "Exeter, NH",
    logo: "🏫",
    color: "#003087",
    highlights: [
      "Valedictorian — top of class of 1,080 students",
      "USACO Gold division — top 2% of competitive programmers nationally",
      "Founded robotics club, won regional championship 2013 & 2014",
      "Captain, varsity cross-country and track teams",
    ],
    courses: [],
  },
];

const stackColors = {
  TypeScript: "#3178C6", Go: "#00ADD8", React: "#61DAFB", PostgreSQL: "#336791",
  Kafka: "#231F20", "Node.js": "#339933", CockroachDB: "#6933FF", gRPC: "#244C5A",
  Java: "#ED8B00", Python: "#3776AB", Spark: "#E25A1C", Foundry: "#1A1A2E",
  Kubernetes: "#326CE5", PyTorch: "#EE4C2C", Redis: "#DC382D", FastAPI: "#009688",
  DynamoDB: "#4053D6", GraphQL: "#E10098", C: "#555555", Haskell: "#5D4F85",
  MATLAB: "#0076A8", "x86 ASM": "#666666",
};

const typeLabel = {
  "full-time": { label: "full-time", color: "#00ff88" },
  internship: { label: "internship", color: "#ffaa00" },
};

const NAV_ITEMS = [
  { id: "work", label: "work history" },
  { id: "oss", label: "open source" },
  { id: "videos", label: "videos" },
  { id: "projects", label: "side projects" },
  { id: "education", label: "education" },
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

// ─── WORK PAGE ────────────────────────────────────────────────────────────────

function WorkPage({ t }) {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.type === filter);

  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00ff88", animation: "blink 2s infinite", boxShadow: "0 0 8px #00ff88" }} />
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>git log --all --oneline</span>
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>work history</h1>
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

      <div style={{ marginTop: "32px", fontFamily: "monospace", fontSize: "12px", color: t.textFaint, textAlign: "center" }}>
        (END) — press <span style={{ color: t.textMuted }}>q</span> to quit
      </div>

      {selected && <WorkModal job={selected} onClose={() => setSelected(null)} t={t} />}
    </>
  );
}

// ─── EDUCATION PAGE ───────────────────────────────────────────────────────────

function EducationPage({ t }) {
  const [expanded, setExpanded] = useState("mit-bs");

  return (
    <>
      <div style={{ marginBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>git log --author="academia"</span>
        </div>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>education</h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>{education.length} institutions · click to expand</p>
      </div>

      <div style={{ position: "relative", paddingLeft: "28px" }}>
        {/* vertical timeline line */}
        <div style={{ position: "absolute", left: "7px", top: "16px", bottom: "16px", width: "2px", background: `linear-gradient(to bottom, #00ff88, ${t.border})`, borderRadius: "2px" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {education.map((edu) => {
            const isOpen = expanded === edu.id;
            return (
              <div key={edu.id} style={{ position: "relative" }}>
                {/* timeline dot */}
                <div style={{ position: "absolute", left: "-22px", top: "22px", width: "14px", height: "14px", borderRadius: "50%", background: isOpen ? edu.color : t.surfaceAlt, border: `2px solid ${isOpen ? edu.color : t.border}`, transition: "all 0.25s", boxShadow: isOpen ? `0 0 12px ${edu.color}66` : "none", zIndex: 1 }} />

                <div
                  onClick={() => setExpanded(isOpen ? null : edu.id)}
                  style={{ border: `1px solid ${isOpen ? edu.color + "55" : t.border}`, borderRadius: "12px", overflow: "hidden", cursor: "pointer", transition: "border-color 0.25s, box-shadow 0.25s", boxShadow: isOpen ? `0 4px 32px ${edu.color}14` : "none", background: t.surface }}
                >
                  {/* header */}
                  <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "16px", background: isOpen ? `${edu.color}0a` : "transparent", transition: "background 0.25s" }}>
                    <div style={{ fontSize: "28px", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", background: `${edu.color}15`, borderRadius: "10px", border: `1px solid ${edu.color}30`, flexShrink: 0 }}>
                      {edu.logo}
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

                  {/* expanded body */}
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
    </>
  );
}

// ─── COMING SOON ──────────────────────────────────────────────────────────────

function ComingSoon({ label, t }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "55vh", gap: "16px", textAlign: "center" }}>
      <div style={{ fontFamily: "monospace", fontSize: "56px", opacity: 0.1, lineHeight: 1 }}>⬡</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: "800", color: t.textBright, letterSpacing: "-1px" }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: "13px", color: t.textMuted }}>{"// not yet committed to this branch"}</div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("work");
  const [mode, setMode] = useState("dark");
  const [hoveredNav, setHoveredNav] = useState(null);
  const t = themes[mode];

  const renderPage = () => {
    if (page === "work") return <WorkPage t={t} />;
    if (page === "education") return <EducationPage t={t} />;
    return <ComingSoon label={NAV_ITEMS.find((n) => n.id === page)?.label} t={t} />;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .pill-btn { transition: all 0.15s; cursor: pointer; }
        .pill-btn:hover { opacity: 0.8; }
        .stack-tag { transition: transform 0.15s; }
        .stack-tag:hover { transform: translateY(-2px); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, color: t.text, transition: "background 0.2s, color 0.2s" }}>

        {/* NAV */}
        <nav style={{ position: "sticky", top: 0, zIndex: 50, background: t.navBg, borderBottom: `1px solid ${t.navBorder}`, backdropFilter: "blur(12px)" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: "4px", height: "52px" }}>

            {/* Logo */}
            <div onClick={() => setPage("work")} style={{ fontFamily: "'Syne', sans-serif", fontWeight: "800", fontSize: "15px", color: t.textBright, letterSpacing: "-0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", marginRight: "16px", flexShrink: 0 }}>
              <span style={{ color: "#00ff88", fontFamily: "monospace", fontWeight: "400" }}></span>Ahmed Sharaf
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", alignItems: "center", gap: "2px", flex: 1, overflowX: "auto" }}>
              {NAV_ITEMS.map((item) => {
                const isActive = page === item.id;
                return (
                  <button key={item.id} onClick={() => setPage(item.id)} onMouseEnter={() => setHoveredNav(item.id)} onMouseLeave={() => setHoveredNav(null)}
                    style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 11px", borderRadius: "6px", border: "none", background: isActive ? t.surfaceAlt : hoveredNav === item.id ? `${t.surfaceAlt}88` : "transparent", color: isActive ? t.textBright : t.textMuted, cursor: "pointer", transition: "all 0.15s", position: "relative", whiteSpace: "nowrap", flexShrink: 0 }}>
                    {item.label}
                    {isActive && <div style={{ position: "absolute", bottom: "-1px", left: "11px", right: "11px", height: "2px", background: "#00ff88", borderRadius: "2px 2px 0 0" }} />}
                  </button>
                );
              })}
            </div>

            {/* Theme toggle */}
            <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              style={{ fontFamily: "monospace", fontSize: "12px", padding: "5px 12px", borderRadius: "6px", border: `1px solid ${t.border}`, background: t.surfaceAlt, color: t.textMuted, cursor: "pointer", transition: "all 0.2s", flexShrink: 0, marginLeft: "8px" }}>
              {mode === "dark" ? "☀" : "●"}
            </button>
          </div>
        </nav>

        {/* PAGE */}
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "48px 24px" }}>
          <div key={page} style={{ animation: "fadeIn 0.2s ease" }}>
            {renderPage()}
          </div>
        </div>
      </div>
    </>
  );
}