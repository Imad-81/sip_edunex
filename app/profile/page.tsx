"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const STEPS = ["Basic Info", "Academic Profile", "Interest Mapping", "Context & Risk", "Review"];

const INTEREST_CLUSTERS = [
    {
        key: "analytical",
        label: "Analytical / Logical",
        desc: "Math puzzles, data patterns, logical systems",
    },
    {
        key: "creative",
        label: "Creative / Design",
        desc: "Art, design, writing, storytelling, aesthetics",
    },
    {
        key: "social",
        label: "Social / Service",
        desc: "Helping people, teaching, counseling, community work",
    },
    {
        key: "business",
        label: "Business / Entrepreneurship",
        desc: "Markets, strategy, leadership, building ventures",
    },
    {
        key: "technical",
        label: "Technical / Engineering",
        desc: "Building systems, coding, machines, electronics",
    },
    {
        key: "research",
        label: "Research / Academic",
        desc: "Deep study, experimentation, publishing knowledge",
    },
    {
        key: "publicService",
        label: "Public Service",
        desc: "Government, policy, civil service, national impact",
    },
];

const SUBJECTS = [
    { key: "maths", label: "Mathematics" },
    { key: "physics", label: "Physics" },
    { key: "chemistry", label: "Chemistry" },
    { key: "biology", label: "Biology" },
    { key: "commerce", label: "Commerce / Accounts" },
    { key: "arts", label: "Arts / Humanities" },
];

function ScoreBar({
    label,
    value,
    max = 100,
}: {
    label: string;
    value: number;
    max?: number;
}) {
    return (
        <div style={{ marginBottom: 8 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                }}
            >
                <span>{label}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {value}/{max}
                </span>
            </div>
            <div
                style={{
                    height: 5,
                    background: "var(--border)",
                    borderRadius: 100,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: `${(value / max) * 100}%`,
                        background: "var(--text-primary)",
                        borderRadius: 100,
                        transition: "width 0.4s ease",
                    }}
                />
            </div>
        </div>
    );
}

function Slider({
    label,
    desc,
    name,
    value,
    max = 10,
    onChange,
}: {
    label: string;
    desc?: string;
    name: string;
    value: number;
    max?: number;
    onChange: (n: string, v: number) => void;
}) {
    return (
        <div style={{ marginBottom: 20 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 6,
                }}
            >
                <div>
                    <div
                        style={{
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            color: "var(--text-primary)",
                        }}
                    >
                        {label}
                    </div>
                    {desc && (
                        <div
                            style={{
                                fontSize: "0.8125rem",
                                color: "var(--text-tertiary)",
                                marginTop: 2,
                            }}
                        >
                            {desc}
                        </div>
                    )}
                </div>
                <span
                    style={{
                        background: "var(--surface-raised)",
                        border: "1px solid var(--border)",
                        borderRadius: 8,
                        padding: "2px 10px",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        minWidth: 36,
                        textAlign: "center",
                    }}
                >
                    {value}
                </span>
            </div>
            <input
                type="range"
                name={name}
                min={1}
                max={max}
                value={value}
                onChange={(e) => onChange(name, Number(e.target.value))}
                style={{
                    width: "100%",
                    appearance: "none",
                    WebkitAppearance: "none",
                    height: 5,
                    borderRadius: 100,
                    background: `linear-gradient(to right, var(--text-primary) 0%, var(--text-primary) ${((value - 1) / (max - 1)) * 100
                        }%, var(--border) ${((value - 1) / (max - 1)) * 100}%, var(--border) 100%)`,
                    cursor: "pointer",
                    outline: "none",
                }}
            />
        </div>
    );
}

export default function ProfilePage() {
    const { user } = useUser();
    const router = useRouter();
    const saveProfile = useMutation(api.students.saveStudentProfile);
    const profile = useQuery(api.students.getStudentProfile, user ? { userId: user.id } : "skip");

    const [step, setStep] = useState(0);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        preferredName: "",
        classLevel: "",
        stream: "",
        maths: 0,
        physics: 0,
        chemistry: 0,
        biology: 0,
        commerce: 0,
        arts: 0,
        analytical: 5,
        creative: 5,
        social: 5,
        business: 5,
        technical: 5,
        research: 5,
        publicService: 5,
        locationType: "urban",
        incomeBracket: "",
        firstGenCollege: false,
        riskAppetite: "balanced",
    });

    useEffect(() => {
        if (profile) {
            setForm({
                preferredName: profile.preferredName || "",
                classLevel: profile.classLevel || "",
                stream: profile.stream || "",
                maths: profile.subjectScores?.maths || 0,
                physics: profile.subjectScores?.physics || 0,
                chemistry: profile.subjectScores?.chemistry || 0,
                biology: profile.subjectScores?.biology || 0,
                commerce: profile.subjectScores?.commerce || 0,
                arts: profile.subjectScores?.arts || 0,
                analytical: profile.interestVector?.analytical || 5,
                creative: profile.interestVector?.creative || 5,
                social: profile.interestVector?.social || 5,
                business: profile.interestVector?.business || 5,
                technical: profile.interestVector?.technical || 5,
                research: profile.interestVector?.research || 5,
                publicService: profile.interestVector?.publicService || 5,
                locationType: profile.socioEconomic?.locationType || "urban",
                incomeBracket: profile.socioEconomic?.incomeBracket || "",
                firstGenCollege: profile.socioEconomic?.firstGenCollege || false,
                riskAppetite: profile.riskAppetite || "balanced",
            });
        }
    }, [profile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    };

    const handleSlider = (name: string, value: number) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!user) return;
        setSaving(true);
        try {
            await saveProfile({
                userId: user.id,
                preferredName: form.preferredName,
                clerkName: user.fullName || user.username || "Anonymous",
                classLevel: form.classLevel,
                stream: form.stream,
                subjectScores: {
                    maths: Number(form.maths),
                    physics: Number(form.physics),
                    chemistry: Number(form.chemistry),
                    biology: Number(form.biology),
                    commerce: Number(form.commerce),
                    arts: Number(form.arts),
                },
                interestVector: {
                    analytical: Number(form.analytical),
                    creative: Number(form.creative),
                    social: Number(form.social),
                    business: Number(form.business),
                    technical: Number(form.technical),
                    research: Number(form.research),
                    publicService: Number(form.publicService),
                },
                socioEconomic: {
                    locationType: form.locationType as "urban" | "rural",
                    incomeBracket: form.incomeBracket,
                    firstGenCollege: form.firstGenCollege,
                },
                riskAppetite: form.riskAppetite as "safe" | "balanced" | "high",
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error saving profile:", error);
            setSaving(false);
        }
    };

    const canProceedStep0 = form.classLevel && form.stream;

    if (profile === undefined) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
                <div style={{ width: 32, height: 32, border: "2px solid var(--border)", borderTopColor: "var(--text-primary)", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--bg)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Top bar */}
            <div
                className="glass-nav"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    padding: "16px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Link href="/dashboard" className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: "0.875rem" }}>
                        ← Back to Dashboard
                    </Link>
                    <span
                        style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Edit Profile
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <ThemeToggle variant="nav" />
                    <span
                        style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-tertiary)",
                        }}
                    >
                        Step {step + 1} of {STEPS.length}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ background: "var(--border)", height: 3 }}>
                <div
                    style={{
                        height: "100%",
                        width: `${((step + 1) / STEPS.length) * 100}%`,
                        background: "var(--text-primary)",
                        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                    }}
                />
            </div>

            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "48px 24px 80px",
                }}
            >
                <div style={{ width: "100%", maxWidth: 600, animation: "fadeUp 0.45s ease both" }}>
                    {/* Step labels */}
                    <div
                        style={{
                            display: "flex",
                            gap: 24,
                            marginBottom: 40,
                            overflowX: "auto",
                        }}
                    >
                        {STEPS.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    opacity: i === step ? 1 : 0.35,
                                    flexShrink: 0,
                                    transition: "opacity 0.3s",
                                }}
                            >
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: "50%",
                                        background: i <= step ? "var(--text-primary)" : "var(--border)",
                                        color: i <= step ? "var(--bg)" : "var(--text-tertiary)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "0.6875rem",
                                        fontWeight: 700,
                                        transition: "background 0.3s",
                                    }}
                                >
                                    {i < step ? "✓" : i + 1}
                                </div>
                                <span
                                    style={{
                                        fontSize: "0.8125rem",
                                        fontWeight: i === step ? 600 : 400,
                                        color: i === step ? "var(--text-primary)" : "var(--text-tertiary)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {s}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* STEP 0: Basic Info */}
                    {step === 0 && (
                        <div key="step0" style={{ animation: "fadeUp 0.4s ease both" }}>
                            <h1
                                className="headline"
                                style={{ marginBottom: 8, fontSize: "1.875rem" }}
                            >
                                Your Profile
                            </h1>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: 36,
                                    fontSize: "0.9375rem",
                                }}
                            >
                                Update your details below.
                            </p>

                            <div style={{ display: "grid", gap: 16 }}>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 8,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        What should we call you?
                                    </label>
                                    <input
                                        type="text"
                                        name="preferredName"
                                        placeholder="Enter your name"
                                        value={form.preferredName}
                                        onChange={handleChange}
                                        className="input"
                                        autoFocus
                                    />
                                    <p style={{ marginTop: 8, fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
                                        Signed in as: <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>{user?.fullName || user?.username || "..."}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: Academic Profile */}
                    {step === 1 && (
                        <div key="step1" style={{ animation: "fadeUp 0.4s ease both" }}>
                            <h1
                                className="headline"
                                style={{ marginBottom: 8, fontSize: "1.875rem" }}
                            >
                                Academic Profile
                            </h1>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: 36,
                                    fontSize: "0.9375rem",
                                }}
                            >
                                Tell us where you are in your academic journey.
                            </p>

                            <div style={{ display: "grid", gap: 16 }}>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 8,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Current Class / Year
                                    </label>
                                    <select
                                        name="classLevel"
                                        value={form.classLevel}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="">Select your class</option>
                                        <option value="9th">9th Grade</option>
                                        <option value="10th">10th Grade</option>
                                        <option value="11th">11th Grade</option>
                                        <option value="12th">12th Grade</option>
                                        <option value="1st Year College">1st Year College</option>
                                        <option value="2nd Year College">2nd Year College</option>
                                        <option value="3rd Year College">3rd Year College</option>
                                        <option value="Final Year College">Final Year College</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 8,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Stream
                                    </label>
                                    <select
                                        name="stream"
                                        value={form.stream}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="">Select your stream</option>
                                        <option value="Science (PCM)">Science — PCM (Physics, Chemistry, Maths)</option>
                                        <option value="Science (PCB)">Science — PCB (Physics, Chemistry, Biology)</option>
                                        <option value="Science (PCMB)">Science — PCMB (All four)</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Arts / Humanities">Arts / Humanities</option>
                                        <option value="Not yet decided">Not yet decided (9th/10th)</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 4,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Subject Scores{" "}
                                        <span style={{ color: "var(--text-tertiary)", fontWeight: 400 }}>
                                            (out of 100 — enter 0 for subjects you don't study)
                                        </span>
                                    </label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                                        {SUBJECTS.map((s) => (
                                            <div key={s.key}>
                                                <label
                                                    style={{
                                                        display: "block",
                                                        fontSize: "0.75rem",
                                                        color: "var(--text-tertiary)",
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {s.label}
                                                </label>
                                                <input
                                                    type="number"
                                                    name={s.key}
                                                    min={0}
                                                    max={100}
                                                    placeholder="0"
                                                    value={
                                                        (form as Record<string, unknown>)[s.key] as number || ""
                                                    }
                                                    onChange={handleChange}
                                                    className="input"
                                                    style={{ padding: "10px 14px" }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: Interest Mapping */}
                    {step === 2 && (
                        <div key="step2" style={{ animation: "fadeUp 0.4s ease both" }}>
                            <h1
                                className="headline"
                                style={{ marginBottom: 8, fontSize: "1.875rem" }}
                            >
                                Interest Mapping
                            </h1>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: 36,
                                    fontSize: "0.9375rem",
                                }}
                            >
                                Rate your genuine interest in each cluster. Be honest — this shapes your compatibility matrix.
                            </p>

                            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "28px 24px" }}>
                                {INTEREST_CLUSTERS.map((cluster) => (
                                    <Slider
                                        key={cluster.key}
                                        label={cluster.label}
                                        desc={cluster.desc}
                                        name={cluster.key}
                                        value={(form as Record<string, unknown>)[cluster.key] as number}
                                        onChange={handleSlider}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Context & Risk */}
                    {step === 3 && (
                        <div key="step3" style={{ animation: "fadeUp 0.4s ease both" }}>
                            <h1
                                className="headline"
                                style={{ marginBottom: 8, fontSize: "1.875rem" }}
                            >
                                Your Context
                            </h1>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: 36,
                                    fontSize: "0.9375rem",
                                }}
                            >
                                This makes our recommendations socially aware and realistic for your situation.
                            </p>

                            <div style={{ display: "grid", gap: 20 }}>
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 8,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Location Type
                                    </label>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                        {["urban", "rural"].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() =>
                                                    setForm((p) => ({ ...p, locationType: opt }))
                                                }
                                                style={{
                                                    padding: "14px 20px",
                                                    border: `1.5px solid ${form.locationType === opt ? "var(--text-primary)" : "var(--border)"}`,
                                                    borderRadius: "var(--radius-sm)",
                                                    background: form.locationType === opt ? "var(--text-primary)" : "var(--surface)",
                                                    color: form.locationType === opt ? "var(--bg)" : "var(--text-secondary)",
                                                    fontFamily: "inherit",
                                                    fontSize: "0.9375rem",
                                                    fontWeight: 500,
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 8,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Annual Family Income
                                    </label>
                                    <select
                                        name="incomeBracket"
                                        value={form.incomeBracket}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="">Select income bracket</option>
                                        <option value="below_3L">Below ₹3 Lakh</option>
                                        <option value="3L_8L">₹3L – ₹8L</option>
                                        <option value="8L_15L">₹8L – ₹15L</option>
                                        <option value="above_15L">Above ₹15L</option>
                                    </select>
                                </div>

                                <div
                                    style={{
                                        padding: "16px 20px",
                                        border: "1.5px solid var(--border)",
                                        borderRadius: "var(--radius-sm)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        background: "var(--surface)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        setForm((p) => ({ ...p, firstGenCollege: !p.firstGenCollege }))
                                    }
                                >
                                    <div>
                                        <div style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
                                            First Generation College Student
                                        </div>
                                        <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: 2 }}>
                                            No one in your family has attended college before
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            width: 44,
                                            height: 26,
                                            borderRadius: 100,
                                            background: form.firstGenCollege ? "var(--text-primary)" : "var(--border)",
                                            position: "relative",
                                            transition: "background 0.2s",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: 3,
                                                left: form.firstGenCollege ? 21 : 3,
                                                width: 20,
                                                height: 20,
                                                borderRadius: "50%",
                                                background: "var(--bg)",
                                                transition: "left 0.2s",
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            marginBottom: 12,
                                            color: "var(--text-secondary)",
                                        }}
                                    >
                                        Risk Appetite
                                    </label>
                                    <div style={{ display: "grid", gap: 10 }}>
                                        {[
                                            {
                                                value: "safe",
                                                label: "Safe & Stable",
                                                desc: "Government jobs, PSUs, steady career paths",
                                            },
                                            {
                                                value: "balanced",
                                                label: "Balanced",
                                                desc: "Mix of stability and growth potential",
                                            },
                                            {
                                                value: "high",
                                                label: "High Growth & Competitive",
                                                desc: "IITs, top-tier consulting, startups, high-skill tech",
                                            },
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() =>
                                                    setForm((p) => ({ ...p, riskAppetite: opt.value }))
                                                }
                                                style={{
                                                    padding: "14px 20px",
                                                    border: `1.5px solid ${form.riskAppetite === opt.value ? "var(--text-primary)" : "var(--border)"}`,
                                                    borderRadius: "var(--radius-sm)",
                                                    background: form.riskAppetite === opt.value ? "var(--text-primary)" : "var(--surface)",
                                                    color: form.riskAppetite === opt.value ? "var(--bg)" : "var(--text-primary)",
                                                    fontFamily: "inherit",
                                                    cursor: "pointer",
                                                    transition: "all 0.2s",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <div style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                                                    {opt.label}
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "0.8125rem",
                                                        marginTop: 3,
                                                        opacity: 0.7,
                                                    }}
                                                >
                                                    {opt.desc}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Review */}
                    {step === 4 && (
                        <div key="step4" style={{ animation: "fadeUp 0.4s ease both" }}>
                            <h1
                                className="headline"
                                style={{ marginBottom: 8, fontSize: "1.875rem" }}
                            >
                                Review Profile
                            </h1>
                            <p
                                style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: 36,
                                    fontSize: "0.9375rem",
                                }}
                            >
                                Everything looks good? Submit to generate your Career Compatibility Vector.
                            </p>

                            <div style={{ display: "grid", gap: 16 }}>
                                {/* Academic */}
                                <div
                                    className="card"
                                    style={{ padding: "20px 24px" }}
                                >
                                    <div style={{ display: "grid", gap: 12, marginBottom: 20 }}>
                                        <div>
                                            <div className="caption" style={{ color: "var(--text-tertiary)" }}>Preferred Name</div>
                                            <div style={{ fontWeight: 600, fontSize: "1.125rem", marginTop: 2 }}>{form.preferredName || "—"}</div>
                                        </div>
                                    </div>

                                    <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-tertiary)", marginBottom: 14, textTransform: "uppercase" }}>
                                        Academic
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
                                        <div>
                                            <div className="caption" style={{ color: "var(--text-tertiary)" }}>Class</div>
                                            <div style={{ fontWeight: 500, marginTop: 2 }}>{form.classLevel || "—"}</div>
                                        </div>
                                        <div>
                                            <div className="caption" style={{ color: "var(--text-tertiary)" }}>Stream</div>
                                            <div style={{ fontWeight: 500, marginTop: 2 }}>{form.stream || "—"}</div>
                                        </div>
                                    </div>
                                    {SUBJECTS.map((s) => {
                                        const val = (form as Record<string, unknown>)[s.key] as number;
                                        if (!val) return null;
                                        return (
                                            <ScoreBar key={s.key} label={s.label} value={val} />
                                        );
                                    })}
                                </div>

                                {/* Interests */}
                                <div className="card" style={{ padding: "20px 24px" }}>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-tertiary)", marginBottom: 14, textTransform: "uppercase" }}>
                                        Interest Vector
                                    </div>
                                    {INTEREST_CLUSTERS.map((c) => (
                                        <ScoreBar
                                            key={c.key}
                                            label={c.label}
                                            value={(form as Record<string, unknown>)[c.key] as number}
                                            max={10}
                                        />
                                    ))}
                                </div>

                                {/* Context */}
                                <div className="card" style={{ padding: "20px 24px" }}>
                                    <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", color: "var(--text-tertiary)", marginBottom: 14, textTransform: "uppercase" }}>
                                        Context
                                    </div>
                                    <div style={{ display: "grid", gap: 8 }}>
                                        {[
                                            { label: "Location", value: form.locationType },
                                            { label: "Income", value: form.incomeBracket || "Not specified" },
                                            { label: "First Gen", value: form.firstGenCollege ? "Yes" : "No" },
                                            { label: "Risk Appetite", value: form.riskAppetite },
                                        ].map((r) => (
                                            <div
                                                key={r.label}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    fontSize: "0.9rem",
                                                }}
                                            >
                                                <span style={{ color: "var(--text-secondary)" }}>{r.label}</span>
                                                <span style={{ fontWeight: 500, textTransform: "capitalize" }}>
                                                    {r.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: 40,
                            gap: 12,
                        }}
                    >
                        <button
                            className="btn btn-secondary"
                            style={{ visibility: step === 0 ? "hidden" : "visible" }}
                            onClick={() => setStep((s) => Math.max(0, s - 1))}
                        >
                            ← Back
                        </button>

                        {step < STEPS.length - 1 ? (
                            <button
                                className="btn btn-primary"
                                disabled={(step === 0 && !form.preferredName) || (step === 1 && !canProceedStep0) || (step === 3 && !form.incomeBracket)}
                                style={{ opacity: ((step === 0 && !form.preferredName) || (step === 1 && !canProceedStep0) || (step === 3 && !form.incomeBracket)) ? 0.4 : 1 }}
                                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                            >
                                Continue →
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={saving}
                                style={{ minWidth: 180, gap: 10 }}
                            >
                                {saving ? (
                                    <>
                                        <div
                                            style={{
                                                width: 16,
                                                height: 16,
                                                border: "2px solid transparent",
                                                borderTopColor: "currentColor",
                                                borderRadius: "50%",
                                                animation: "spin 0.7s linear infinite",
                                            }}
                                        />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Profile →"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          border: 2px solid var(--surface);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        input[type=range]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          cursor: pointer;
          border: 2px solid var(--surface);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}