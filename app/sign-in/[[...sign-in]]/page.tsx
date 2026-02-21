import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg)",
                padding: "24px",
            }}
        >
            <div style={{ marginBottom: 32, textAlign: "center" }}>
                <span
                    style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                    }}
                >
                    EduNex
                </span>
                <p
                    style={{
                        marginTop: 8,
                        fontSize: "0.875rem",
                        color: "var(--text-secondary)",
                    }}
                >
                    Sign in to your career dashboard
                </p>
            </div>
            <SignIn routing="path" path="/sign-in" />
        </div>
    );
}