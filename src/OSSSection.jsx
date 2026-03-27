import { useState, useEffect } from "react";

const GITHUB_USER = "AhmedIbrahimSH";

async function fetchAllPRs() {
  const res = await fetch(
    `https://api.github.com/search/issues?q=author:${GITHUB_USER}+type:pr+is:merged+-user:${GITHUB_USER}&per_page=100&sort=created&order=desc`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data.items || [];
}

function groupByRepo(prs) {
  const map = {};
  for (const pr of prs) {
    const repoUrl = pr.repository_url;
    const repoName = repoUrl.replace("https://api.github.com/repos/", "");
    const repoHtml = `https://github.com/${repoName}`;
    if (!map[repoName]) {
      map[repoName] = { repoName, repoHtml, prs: [], latestDate: pr.created_at };
    }
    map[repoName].prs.push(pr);
    if (pr.created_at > map[repoName].latestDate) {
      map[repoName].latestDate = pr.created_at;
    }
  }
  return Object.values(map).sort((a, b) => b.latestDate.localeCompare(a.latestDate));
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

const t = {
  bg: "#010409", surface: "#0d1117", surfaceAlt: "#161b22",
  border: "#21262d", borderAlt: "#30363d",
  text: "#c9d1d9", textBright: "#e6edf3", textMuted: "#8b949e", textFaint: "#484f58",
  hash: "#79c0ff", green: "#00ff88",
};

function RepoNode({ group, isLast }) {
  const [expanded, setExpanded] = useState(true);
  const shortName = group.repoName.split("/")[1] || group.repoName;
  const org = group.repoName.split("/")[0];

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
      {/* Vertical line + branch */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 }}>
        <div style={{ width: 2, height: 22, background: t.border }} />
        <div style={{ width: 16, height: 2, background: t.border, alignSelf: "flex-start", marginLeft: 0 }} />
        {!isLast && <div style={{ width: 2, flex: 1, minHeight: 20, background: t.border }} />}
      </div>

      {/* Repo card + children */}
      <div style={{ flex: 1, marginBottom: 16 }}>
        {/* Repo header */}
        <div
          onClick={() => setExpanded((e) => !e)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: t.surfaceAlt, border: `1px solid ${t.borderAlt}`,
            borderRadius: 8, padding: "8px 14px", cursor: "pointer",
            transition: "border-color 0.15s",
          }}
        >
          <span style={{ fontFamily: "monospace", fontSize: 12, color: t.textFaint }}>{org}/</span>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: t.green }}>
            {shortName}
          </span>
          <a
            href={group.repoHtml}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ color: t.hash, fontFamily: "monospace", fontSize: 11, textDecoration: "none", borderBottom: `1px solid ${t.hash}40` }}
          >
            ↗
          </a>
          <span style={{
            fontFamily: "monospace", fontSize: 10, padding: "2px 8px", borderRadius: 20,
            background: `${t.green}15`, border: `1px solid ${t.green}40`, color: t.green,
          }}>
            {group.prs.length} PR{group.prs.length > 1 ? "s" : ""}
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 12, color: t.textMuted, transition: "transform 0.2s", display: "inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}>›</span>
        </div>

        {/* PR children */}
        {expanded && (
          <div style={{ marginLeft: 20, marginTop: 4 }}>
            {group.prs.map((pr, i) => {
              const isLastPR = i === group.prs.length - 1;
              return (
                <div key={pr.id} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 24, flexShrink: 0 }}>
                    <div style={{ width: 2, height: 16, background: t.border }} />
                    <div style={{ width: 14, height: 2, background: t.border, alignSelf: "flex-start" }} />
                    {!isLastPR && <div style={{ width: 2, flex: 1, minHeight: 12, background: t.border }} />}
                  </div>
                  <div style={{ flex: 1, padding: "8px 0 8px 8px", marginBottom: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#f78166" }}>PR #{pr.number}</span>
                      <a
                        href={pr.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: t.text, textDecoration: "none", lineHeight: 1.5 }}
                        onMouseEnter={(e) => { e.target.style.color = t.textBright; }}
                        onMouseLeave={(e) => { e.target.style.color = t.text; }}
                      >
                        {pr.title}
                      </a>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: t.textFaint }}>{formatDate(pr.created_at)}</span>
                      <span style={{
                        fontFamily: "monospace", fontSize: 10, padding: "1px 7px", borderRadius: 3,
                        background: pr.state === "closed" ? "#238636" + "20" : "#1f6feb20",
                        border: `1px solid ${pr.state === "closed" ? "#238636" : "#1f6feb"}40`,
                        color: pr.state === "closed" ? "#3fb950" : "#79c0ff",
                      }}>
                        merged
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OSSSection({ t: outerT }) {
  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [totalPRs, setTotalPRs] = useState(0);

  useEffect(() => {
    fetchAllPRs()
      .then((prs) => {
        setTotalPRs(prs.length);
        setGroups(groupByRepo(prs));
        setStatus("done");
      })
      .catch((e) => {
        setError(e.message);
        setStatus("error");
      });
  }, []);

  const th = outerT || t;

  return (
    <section id="oss" style={{ paddingTop: "100px", paddingBottom: "80px", borderTop: `1px solid ${th.border}` }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');
      `}</style>

      <div style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {/* <span style={{ fontFamily: "monospace", fontSize: 13, color: th.textMuted }}>git log --author="open-source"</span> */}
        </div>
        <h2 style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "clamp(32px,6vw,54px)", fontWeight: 800, color: th.textBright, letterSpacing: "-2px", lineHeight: 1 }}>
          Open source
        </h2>
        {status === "done" && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: th.textMuted, marginTop: 10, fontSize: 15 }}>
            {totalPRs} merged PRs across {groups.length} repo{groups.length !== 1 ? "s" : ""} · sorted by latest activity
          </p>
        )}
      </div>

      {status === "loading" && (
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: th.textMuted, fontFamily: "monospace", fontSize: 13 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.green, animation: "blink 1s infinite" }} />
          fetching contributions from GitHub API...
        </div>
      )}

      {status === "error" && (
        <div style={{ color: "#f78166", fontFamily: "monospace", fontSize: 13 }}>
          GitHub API error: {error}
        </div>
      )}

      {status === "done" && groups.length === 0 && (
        <div style={{ color: th.textMuted, fontFamily: "monospace", fontSize: 13 }}>
          {"// no merged PRs to external repos found"}
        </div>
      )}

      {status === "done" && groups.length > 0 && (
        <div style={{ paddingLeft: 8 }}>
          {/* Root node */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 0 }}>
            <div style={{
              background: t.green, borderRadius: 8, padding: "8px 16px",
              fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: "#010409",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontFamily: "monospace", fontSize: 12 }}>~/</span>
              <a href="https://github.com/AhmedIbrahimSH" target = "_blank">AhmedIbrahimSH</a>
            </div>
          </div>

          <div style={{ marginLeft: 14, marginTop: 0 }}>
            {groups.map((group, i) => (
              <RepoNode key={group.repoName} group={group} isLast={i === groups.length - 1} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}