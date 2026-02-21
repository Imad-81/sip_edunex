# EduNex 🚀

**AI-Powered · India-Specific · Grades 9–College**

EduNex is a high-fidelity career mapping engine designed specifically for the Indian academic landscape. It moves beyond generic advice by using a structured **Student Intelligence System** to convert academic data, personal interests, and socio-economic context into ranked career blueprints.

---

## ✨ Key Features

- **🌐 Student Intelligence Profiling**: Builds a multi-factor profile including:
  - Academic Vector (Subjects & Performance)
  - Interest Compatibility Matrix
  - Socio-Economic Context & Accessibility
  - Risk Appetite
- **🤖 Ranked Career Engine**: Powered by advanced AI to return ranked career paths with compatibility scores, relevant entrance exams, and projected salary data.
- **🗺️ Deep Blueprint Mode**: Provides year-by-year strategic plans, including exam intelligence, scholarship filters, and career risk maps.
- **📊 Persistent Dashboard**: Store and update your profile, rankings, and progress milestones over time.
- **🌍 Socially Aligned Design**: Directly tackles **SDG 4 (Quality Education)** and **SDG 10 (Reduced Inequality)** by bridging the information gap for rural and first-generation students.

---

## 🛠️ The Model: Weighted Compatibility Scoring

EduNex uses a precise weighting system to ensure accuracy:
- **30%** - Subject Alignment
- **25%** - Interest Alignment
- **15%** - Risk Match
- **15%** - Accessibility
- **15%** - Market Growth

---

## 💻 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/) (App Router)
- **Backend / Database**: [Convex](https://www.convex.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Integration**: AI-powered career matching (Groq API)
- **Styling**: Modern CSS with a focus on high-end aesthetics and responsiveness.

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/)
- [Convex](https://www.convex.dev/) account
- [Clerk](https://clerk.com/) account
- [Groq API](https://groq.com/) key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Imad-81/sip_edunex.git
    cd sip_edunex
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    ```

3.  **Set up environment variables**:
    Create a `.env.local` file and add your credentials:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
    CLERK_SECRET_KEY=...
    NEXT_PUBLIC_CONVEX_URL=...
    GROQ_API_KEY=...
    ```

4.  **Start the development server**:
    ```bash
    bun run dev
    ```

5.  **Run Convex dev server**:
    ```bash
    bunx convex dev
    ```

---

## 📄 License

This project is private and proprietary. © 2025 EduNex.
