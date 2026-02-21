"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      el.style.setProperty("--rx", `${y}deg`);
      el.style.setProperty("--ry", `${-x}deg`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    setMounted(true);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* NAV */}
      <nav
        className="glass-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 60,
        }}
      >
        <span
          style={{
            fontSize: "1.0625rem",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          EduNex
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ThemeToggle variant="nav" />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/sign-in" className="btn btn-ghost" style={{ fontSize: "0.875rem" }}>
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-primary" style={{ fontSize: "0.875rem", padding: "9px 20px" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background grid */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.6,
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", maxWidth: 840 }}
        >
          {/* eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              padding: "6px 16px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 100,
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              letterSpacing: "0.01em",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#34c759",
                flexShrink: 0,
                boxShadow: "0 0 8px #34c759",
              }}
            />
            AI-Powered · India-Specific · Grades 9–College
          </div>

          <h1
            className="display"
            style={{
              color: "var(--text-primary)",
              marginBottom: 24,
            }}
          >
            Your career,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--text-primary) 0%, var(--text-tertiary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              mapped precisely.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.0625rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
              maxWidth: 560,
              margin: "0 auto 40px",
              letterSpacing: "-0.01em",
            }}
          >
            Not generic advice. A structured compatibility engine that converts your academics,
            interests, and context into ranked career blueprints built for Indian students.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/sign-up" className="btn btn-primary" style={{ padding: "15px 32px", fontSize: "1rem" }}>
              Build My Blueprint
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/sign-in" className="btn btn-secondary" style={{ padding: "15px 32px", fontSize: "1rem" }}>
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
          }}
        >
          {[
            { value: "200+", label: "Career Paths Mapped" },
            { value: "4-Phase", label: "Student Intelligence System" },
            { value: "SDG 4 & 10", label: "Socially Aligned Design" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                padding: "40px 32px",
                textAlign: "center",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div className="caption" style={{ color: "var(--text-secondary)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="caption" style={{ color: "var(--text-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              The System
            </p>
            <h2 className="headline" style={{ color: "var(--text-primary)" }}>
              Four phases, one blueprint.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {[
              {
                num: "01",
                title: "Student Intelligence Profiling",
                body: "We build your Academic Vector, Interest Compatibility Matrix, Socio-Economic Context, and Risk Appetite into a multi-factor score.",
                icon: "◈",
              },
              {
                num: "02",
                title: "Ranked Career Engine",
                body: "Gemini AI receives your structured vector and returns 10 ranked career paths with compatibility scores, entrance exams, and salary data.",
                icon: "◉",
              },
              {
                num: "03",
                title: "Deep Blueprint Mode",
                body: "Year-by-year strategic plans, exam intelligence, scholarship filters, and career risk maps built for your exact profile.",
                icon: "◆",
              },
              {
                num: "04",
                title: "Persistent Dashboard",
                body: "Your profile, rankings, saved careers, and progress milestones stored and updated over time — not a one-time report.",
                icon: "◇",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "var(--shadow-lg)" }}
                style={{
                  padding: "32px 28px",
                  cursor: "default",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {step.num}
                  </span>
                  <span style={{ fontSize: "1.25rem", color: "var(--text-tertiary)" }}>
                    {step.icon}
                  </span>
                </div>
                <h3 className="title" style={{ marginBottom: 12 }}>
                  {step.title}
                </h3>
                <p className="body" style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SCORING */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ padding: "80px 24px", background: "var(--surface-raised)" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p className="caption" style={{ color: "var(--text-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            The Model
          </p>
          <h2
            className="headline"
            style={{ color: "var(--text-primary)", marginBottom: 48 }}
          >
            Weighted compatibility scoring.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            {[
              { factor: "Subject Alignment", weight: "30%" },
              { factor: "Interest Alignment", weight: "25%" },
              { factor: "Risk Match", weight: "15%" },
              { factor: "Accessibility", weight: "15%" },
              { factor: "Market Growth", weight: "15%" },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: "24px 20px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.03em",
                    marginBottom: 6,
                  }}
                >
                  {f.weight}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  {f.factor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SDG CALLOUT */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ padding: "100px 24px" }}
      >
        <div
          className="container"
          style={{ maxWidth: 680, textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: 8,
              marginBottom: 28,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {["SDG 4 — Quality Education", "SDG 10 — Reduced Inequality"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    background: "var(--surface-raised)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <h2 className="headline" style={{ marginBottom: 20 }}>
            Bridging the information gap.
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              letterSpacing: "-0.01em",
            }}
          >
            Rural students, first-generation college aspirants, and those without access to
            coaching deserve the same quality of career intelligence as anyone else.
            EduNex accounts for your real context — not an ideal one.
          </p>
        </div>
      </motion.section>

      {/* CTA STRIP */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          borderTop: "1px solid var(--border)",
          padding: "100px 24px",
          background: "var(--surface)",
          textAlign: "center",
        }}
      >
        <h2 className="headline" style={{ marginBottom: 16 }}>
          Ready to map your path?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 36, fontSize: "1.0625rem" }}>
          Takes 3 minutes. No generic advice.
        </p>
        <Link href="/sign-up" className="btn btn-primary" style={{ padding: "16px 40px", fontSize: "1rem" }}>
          Start Free
        </Link>
      </motion.section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
          EduNex
        </span>
        <span className="caption" style={{ color: "var(--text-tertiary)" }}>
          © 2025 EduNex. AI Career Intelligence for Indian Students.
        </span>
      </footer>
    </div>
  );
}
