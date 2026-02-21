# EduNex 🚀 
### **Redefining Career Mapping for the Next Generation of India**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Convex](https://img.shields.io/badge/Convex-FFD700?style=for-the-badge&logo=convex&logoColor=black)](https://www.convex.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

EduNex is a high-fidelity career mapping engine designed specifically for the Indian academic landscape. Unlike generic platforms, EduNex uses a proprietary **Student Intelligence System (SIS)** to convert academic performance, interest vectors, and socio-economic context into precise, actionable career blueprints.

---

## ✨ Key Features

- **🌐 Student Intelligence Profiling**: Builds a multi-factor profile using deep data points:
  - **Academic Vector**: Subject-specific performance analysis.
  - **Interest Compatibility Matrix**: Maps 7 core interest clusters (Analytical, Creative, Technical, etc.).
  - **Socio-Economic Engine**: Adjusts recommendations based on location (Urban/Rural) and financial context.
  - **Risk Appetite Matching**: Aligns paths with the student's preference for stability vs. high-growth.
- **🤖 Ranked Career Engine**: Powered by Groq AI, returning top-tier career paths with granular compatibility scores.
- **🗺️ Deep Blueprint Mode**: Provides strategic year-by-year plans, including entrance exam intelligence (JEE, NEET, CAT, etc.) and college recommendations.
- **📊 Persistent Dashboard**: Real-time tracking of milestones, updated rankings, and profile evolution.
- **🌍 Social Impact (SDG 4 & 10)**: Bridges the information gap for rural and first-generation students, democratizing access to expert career guidance.

---

## 🛠️ The Intelligence Model

EduNex isn't just a survey; it's a weighted analysis engine. Our **Compatibility Scoring Matrix** calculates fit across five dimensions:

| Dimension | Weight | Description |
| :--- | :--- | :--- |
| **Subject Alignment** | 30% | Match between academic strengths and career requirements. |
| **Interest Alignment** | 25% | Correlation with the student's genuine passion clusters. |
| **Risk Match** | 15% | Alignment with preferred career stability levels. |
| **Accessibility** | 15% | Realism based on family income and physical location. |
| **Market Growth** | 15% | Projected demand and salary trends in the Indian market. |

---

## 💻 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router) with [Framer Motion](https://www.framer.com/motion/) for premium micro-animations.
- **Database & Backend**: [Convex](https://www.convex.dev/) for real-time reactivity and state management.
- **Auth**: [Clerk](https://clerk.com/) for secure, seamless student authentication.
- **Intelligence Layer**: [Groq API](https://groq.com/) (LLaMA-3) for lightning-fast career mapping.
- **Styling**: Modern CSS/Tailwind with a custom dark-mode-first aesthetic.

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or [Node.js](https://nodejs.org/)
- [Convex](https://www.convex.dev/) account
- [Clerk](https://clerk.com/) account
- [Groq AI](https://groq.com/) API Key

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Imad-81/sip_edunex.git
   cd sip_edunex
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure Environment**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_key
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   GROQ_API_KEY=your_groq_key
   ```

4. **Launch Development Environment**:
   ```bash
   # Terminal 1: Next.js Frontend
   bun run dev

   # Terminal 2: Convex Backend
   bunx convex dev
   ```

---

## 🗺️ Roadmap

- [ ] **AI-Powered Scholarship Matching**: Automated filtering of scholarships based on student intelligence profiles.
- [ ] **College Predictor Engine**: Direct integration with entrance exam results to predict admissions.
- [ ] **Mentorship Gateway**: Connecting students with professionals in their top-ranked career paths.
- [ ] **Regional Language Support**: Expanding SIS to support Hindi, Telugu, and other major Indian languages.

---

## 🎯 Our Mission

To empower every Indian student, regardless of their zip code or family background, with the intelligence they need to navigate the hyper-competitive academic landscape and build a future they truly deserve.

---

## 📄 License

This project is private and proprietary. © 2026 EduNex. All rights reserved.
Developed with ❤️ by [Shaik Imaduddin](https://github.com/Imad-81).
