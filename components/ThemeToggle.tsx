"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
    variant?: "floating" | "nav";
}

export function ThemeToggle({ variant = "floating" }: ThemeToggleProps) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const isDark = theme === "dark";

    const buttonStyle: React.CSSProperties = variant === "floating" ? {
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 1000,
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        color: "var(--text-primary)",
        outline: "none",
    } : {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        color: "var(--text-secondary)",
        outline: "none",
        padding: 0,
    };

    return (
        <motion.button
            whileHover={{
                scale: 1.05,
                background: variant === "floating" ? "var(--surface)" : "var(--surface-raised)",
                color: "var(--text-primary)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`theme-toggle-${variant}`}
            style={buttonStyle}
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isDark ? "dark" : "light"}
                    initial={{ y: 10, opacity: 0, rotate: -45 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -10, opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {isDark ? (
                        <Sun size={variant === "floating" ? 20 : 18} strokeWidth={2.5} />
                    ) : (
                        <Moon size={variant === "floating" ? 20 : 18} strokeWidth={2.5} />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}
