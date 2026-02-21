"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Career {
  rank: number;
  careerName: string;
  compatibilityScore: number;
  subjectAlignment: number;
  interestAlignment: number;
  riskMatch: number;
  accessibility: number;
  marketGrowth: number;
  whyItMatches: string;
  requiredStream: string;
  entranceExams: string[];
  topCollegesIndia: string[];
  skillsRequired: string[];
  salaryRangeIndia: string;
  fiveYearOutlook: string;
  riskLevel: string;
  backupPathways: string[];
  alternativeRoutes: string;
}

function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const filled = (score / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--border)"
        strokeWidth={4}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth={4}
        strokeDasharray={`${filled} ${c - filled}`}
        strokeDashoffset={c / 4}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size === 64 ? "14" : "11"}
        fontWeight="700"
        fill="var(--text-primary)"
        fontFamily="Inter, sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "var(--text-tertiary)",
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{value}</span>
      </div>
      <div
        style={{
          height: 3,
          background: "var(--border)",
          borderRadius: 100,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: "var(--text-primary)",
            borderRadius: 100,
          }}
        />
      </div>
    </div>
  );
}

function CareerCard({
  career,
  expanded,
  onToggle,
}: {
  career: Career;
  expanded: boolean;
  onToggle: () => void;
}) {
  const riskColor =
    career.riskLevel === "Low"
      ? "#34c759"
      : career.riskLevel === "High"
        ? "#ff3b30"
        : "#ff9500";

  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        marginBottom: 12,
        transition: "box-shadow 0.25s",
      }}
    >
      {/* Card header */}
      <div
        onClick={onToggle}
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          cursor: "pointer",
          background: expanded ? "var(--surface-raised)" : "var(--surface)",
          transition: "background 0.2s",
        }}
      >
        {/* Rank */}
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: career.rank <= 3 ? "var(--text-primary)" : "var(--surface-raised)",
            color: career.rank <= 3 ? "#fff" : "var(--text-tertiary)",
            border: career.rank > 3 ? "1px solid var(--border)" : "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8125rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          #{career.rank}
        </div>

        {/* Name + tags */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              marginBottom: 6,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {career.careerName}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <span
              style={{
                padding: "2px 10px",
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
              }}
            >
              {career.requiredStream}
            </span>
            <span
              style={{
                padding: "2px 10px",
                background: "transparent",
                border: `1px solid ${riskColor}`,
                borderRadius: 100,
                fontSize: "0.75rem",
                color: riskColor,
              }}
            >
              {career.riskLevel} Risk
            </span>
            <span
              style={{
                padding: "2px 10px",
                background: "var(--surface-raised)",
                border: "1px solid var(--border)",
                borderRadius: 100,
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
              }}
            >
              {career.salaryRangeIndia}
            </span>
          </div>
        </div>

        {/* Score ring */}
        <div style={{ flexShrink: 0 }}>
          <ScoreRing score={career.compatibilityScore} />
        </div>

        {/* Chevron */}
        <div
          style={{
            color: "var(--text-tertiary)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div
          style={{
            padding: "0 24px 24px",
            borderTop: "1px solid var(--border)",
            animation: "fadeIn 0.3s ease both",
          }}
        >
          {/* Why it matches */}
          <div style={{ padding: "16px 0", borderBottom: "1px solid var(--border-subtle)" }}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.65, fontSize: "0.9375rem" }}>
              {career.whyItMatches}
            </p>
          </div>

          {/* Score breakdown */}
          <div style={{ paddingTop: 20, paddingBottom: 4 }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Score Breakdown
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
              <MiniBar label="Subject Alignment" value={career.subjectAlignment} />
              <MiniBar label="Interest Alignment" value={career.interestAlignment} />
              <MiniBar label="Risk Match" value={career.riskMatch} />
              <MiniBar label="Accessibility" value={career.accessibility} />
              <MiniBar label="Market Growth" value={career.marketGrowth} />
            </div>
          </div>

          {/* Details grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 20,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Entrance Exams
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {career.entranceExams.map((e) => (
                  <span
                    key={e}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Top Colleges
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {career.topCollegesIndia.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Skills Required
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {career.skillsRequired.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "3px 10px",
                      background: "var(--surface-raised)",
                      border: "1px solid var(--border)",
                      borderRadius: 100,
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Backup Paths
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {career.backupPathways.map((b) => (
                  <span
                    key={b}
                    style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}
                  >
                    → {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Outlook & alternatives */}
          <div
            style={{
              marginTop: 20,
              display: "grid",
              gap: 12,
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                background: "var(--surface-raised)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                5-Year Market Outlook
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {career.fiveYearOutlook}
              </p>
            </div>
            <div
              style={{
                padding: "14px 16px",
                background: "var(--surface-raised)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Alternative Routes
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {career.alternativeRoutes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const profile = useQuery(
    api.students.getStudentProfile,
    user ? { userId: user.id } : "skip"
  );

  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate-careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setCareers(data.careers);
        setExpandedCard(1);
      }
    } catch {
      setError("Failed to reach the AI engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (profile === undefined) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: "2px solid var(--border)",
            borderTopColor: "var(--text-primary)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (profile === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
          background: "var(--bg)",
          padding: 24,
          textAlign: "center",
        }}
      >
        <h2 className="headline" style={{ fontSize: "1.5rem" }}>
          Complete your profile first
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 400 }}>
          You need to fill out your student profile before we can generate career recommendations.
        </p>
        <Link href="/onboarding" className="btn btn-primary" style={{ marginTop: 8 }}>
          Go to Onboarding
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Top Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 32px",
          height: 56,
          background: "rgba(250,250,250,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          EduNex
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {user?.firstName || "Student"}
          </span>
          <Link href="/onboarding" className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "8px 14px" }}>
            Edit Profile
          </Link>
        </div>
      </nav>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          gap: 0,
          padding: "32px 24px",
          alignItems: "start",
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            position: "sticky",
            top: 80,
            paddingRight: 24,
          }}
        >
          {/* Profile card */}
          <div
            className="card"
            style={{ padding: "20px", marginBottom: 16 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
                paddingBottom: 16,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--text-primary)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  flexShrink: 0,
                }}
              >
                {user?.firstName?.[0] ?? "S"}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.9375rem", letterSpacing: "-0.01em" }}>
                  {user?.firstName} {user?.lastName}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                  {profile.classLevel} · {profile.stream}
                </div>
              </div>
            </div>

            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Interest Vector
            </div>
            {Object.entries(profile.interestVector).map(([key, val]) => {
              const labels: Record<string, string> = {
                analytical: "Analytical",
                creative: "Creative",
                social: "Social",
                business: "Business",
                technical: "Technical",
                research: "Research",
                publicService: "Public Service",
              };
              return (
                <div key={key} style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.8125rem",
                      marginBottom: 4,
                    }}
                  >
                    <span style={{ color: "var(--text-secondary)" }}>{labels[key] ?? key}</span>
                    <span style={{ fontWeight: 600, fontSize: "0.8125rem" }}>
                      {val as number}/10
                    </span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      background: "var(--border)",
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${((val as number) / 10) * 100}%`,
                        background: "var(--text-primary)",
                        borderRadius: 100,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Context card */}
          <div className="card" style={{ padding: "16px 20px" }}>
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "var(--text-tertiary)",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Context
            </div>
            {[
              { label: "Location", value: profile.socioEconomic.locationType },
              { label: "Income", value: profile.socioEconomic.incomeBracket || "—" },
              {
                label: "First Gen",
                value: profile.socioEconomic.firstGenCollege ? "Yes" : "No",
              },
              {
                label: "Risk",
                value: profile.riskAppetite.charAt(0).toUpperCase() + profile.riskAppetite.slice(1),
              },
            ].map((r) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontSize: "0.875rem",
                }}
              >
                <span style={{ color: "var(--text-tertiary)" }}>{r.label}</span>
                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main>
          {careers.length === 0 ? (
            /* Empty state */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 480,
                textAlign: "center",
                padding: 40,
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--surface-raised)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.75rem",
                  marginBottom: 24,
                }}
              >
                ◈
              </div>
              <h2
                className="headline"
                style={{ fontSize: "1.75rem", marginBottom: 12 }}
              >
                Ready to map your careers
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  lineHeight: 1.65,
                  maxWidth: 440,
                  marginBottom: 32,
                  fontSize: "0.9375rem",
                }}
              >
                Your student profile is saved. Click below to run the AI compatibility
                engine and get your 10 ranked career paths with full blueprints.
              </p>

              {error && (
                <div
                  style={{
                    marginBottom: 20,
                    padding: "12px 20px",
                    background: "#fff5f5",
                    border: "1px solid #fecaca",
                    borderRadius: "var(--radius-sm)",
                    color: "#b91c1c",
                    fontSize: "0.875rem",
                    maxWidth: 420,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                className="btn btn-primary"
                onClick={handleAnalyze}
                disabled={loading}
                style={{ padding: "16px 40px", fontSize: "1rem", minWidth: 220 }}
              >
                {loading ? (
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Analyzing Profile...
                  </span>
                ) : (
                  "Analyze My Careers →"
                )}
              </button>

              {loading && (
                <p
                  style={{
                    marginTop: 16,
                    fontSize: "0.875rem",
                    color: "var(--text-tertiary)",
                  }}
                >
                  Building your compatibility vector — this takes 10–15 seconds
                </p>
              )}
            </div>
          ) : (
            /* Career cards */
            <div style={{ animation: "fadeUp 0.5s ease both" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <h2
                    className="title"
                    style={{ fontSize: "1.25rem", marginBottom: 4 }}
                  >
                    Career Compatibility Rankings
                  </h2>
                  <p className="caption" style={{ color: "var(--text-tertiary)" }}>
                    10 paths ranked by multi-factor compatibility score · Click any card to expand
                  </p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={handleAnalyze}
                  disabled={loading}
                  style={{ fontSize: "0.875rem" }}
                >
                  {loading ? "Re-analyzing..." : "↺ Re-analyze"}
                </button>
              </div>

              {careers.map((career) => (
                <CareerCard
                  key={career.rank}
                  career={career}
                  expanded={expandedCard === career.rank}
                  onToggle={() =>
                    setExpandedCard(
                      expandedCard === career.rank ? null : career.rank
                    )
                  }
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}