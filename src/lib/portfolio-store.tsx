import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getPortfolioSettings, savePortfolioSettings } from "@/lib/portfolio.functions";

export interface EduItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  score: string;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Data Engineering" | "Data Analytics/BI" | "Web Development";
  stack: string[];
  desc: string;
  metrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface SkillItem {
  id: string;
  name: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
  phone: string;
}

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link: string;
}

export interface PortfolioData {
  profileVideoUrl: string;
  profileName: string;
  profileAudio: boolean;
  resumeUrl: string;

  // Hero content
  tagline: string;
  subtitle: string;
  availability: string;
  footerText: string;

  // About content
  aboutHeading: string;
  aboutBody1: string;
  aboutBody2: string;

  heroStats: HeroStat[];
  education: EduItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  socials: Socials;
  emailjs: EmailJsConfig;
}

const DEFAULT_VIDEO =
  "https://res.cloudinary.com/dsjstkis8/video/upload/v1780502351/2c8fba70f3fa45309db0f1abb94145de_pwsopf.webm";

const DEFAULT_DATA: PortfolioData = {
  profileVideoUrl: DEFAULT_VIDEO,
  profileName: "ALEN.V.VARUGHESE",
  profileAudio: false,
  resumeUrl: "https://res.cloudinary.com/dsjstkis8/image/upload/v1780593624/ALEN_V_Resume_bnnxbe.pdf",


  tagline:
    "Transforming Raw Data into Meaningful Business Decisions.",
  subtitle:
    "Junior Data Analyst passionate about analytics, visualization, and AI.",
  availability: "AVAILABLE FOR JUNIOR DATA ANALYST ROLES",
  footerText: "© 2026 ALEN V VARUGHESE — Transforming Data into Decisions.",

  aboutHeading: "Junior Data Analyst with an architect's mindset.",
  aboutBody1:
    "I'm pursuing my M.Sc. in Data Science & Business Analytics, building end-to-end pipelines, dashboards, and predictive models. I turn raw, messy datasets into clean, actionable intelligence — and I love designing the systems that make it repeatable.",
  aboutBody2:
    "Strong in Python, SQL, Power BI, and PySpark on Databricks; comfortable with the full Medallion Architecture and modern BI workflows.",

  heroStats: [
    { id: "s1", value: "8+", label: "PROJECTS" },
    { id: "s2", value: "2", label: "INTERNSHIPS" },
    { id: "s3", value: "77.5%", label: "M.SC SCORE" },
  ],
  education: [
    {
      id: "e1",
      school: "Rathinam College of Arts & Science",
      degree: "M.Sc — Data Science & Business Analytics",
      period: "2025 – 2027",
      score: "77.5%",
    },
    {
      id: "e2",
      school: "Sri Ramakrishna College of Arts & Science",
      degree: "Bachelor of Computer Applications",
      period: "2022 – 2025",
      score: "80.2%",
    },
    {
      id: "e3",
      school: "Sri Ramakrishna Matric. Hr. Sec. School",
      degree: "Higher Secondary (Class XII)",
      period: "2021 – 2022",
      score: "92.2%",
    },
  ],
  skills: [
    "Python", "SQL", "R", "PySpark",
    "Power BI", "Delta Lake", "Databricks", "AI-Prompting",
    "Excel", "Pandas", "Matplotlib", "Seaborn",
  ].map((n, i) => ({ id: `sk${i}`, name: n })),
  projects: [
    {
      id: "p1",
      title: "Real-Time Weather Data Pipeline",
      category: "Data Engineering",
      stack: ["Databricks", "PySpark", "Delta Lake", "REST API", "SQL"],
      desc: "End-to-end Medallion Architecture pipeline ingesting hourly weather data with incremental jobs, monitoring, and optimized Delta tables.",
      metrics: [
        { label: "Architecture", value: "Medallion" },
        { label: "Cadence", value: "Hourly" },
      ],
    },
    {
      id: "p2",
      title: "Sales & Revenue Analysis Dashboard",
      category: "Data Analytics/BI",
      stack: ["Power BI", "DAX", "SQL"],
      desc: "Interactive Power BI dashboard with custom DAX measures for revenue, sales quantity, tax and reward points across product categories.",
      metrics: [
        { label: "Measures", value: "12+ DAX" },
        { label: "Slicers", value: "Multi-dim" },
      ],
    },
    {
      id: "p3",
      title: "Library Management ERP System",
      category: "Web Development",
      stack: ["Flask", "MySQL", "Chart.js"],
      desc: "Full-stack ERP with CRUD, issue/return workflow, real-time analytics dashboard, automated fine calculation and glassmorphism UI.",
      metrics: [
        { label: "Stack", value: "Full-Stack" },
        { label: "UI", value: "Glass" },
      ],
    },
    {
      id: "p4",
      title: "Customer Segmentation",
      category: "Data Analytics/BI",
      stack: ["Python", "K-Means", "EDA", "Elbow Method"],
      desc: "Unsupervised segmentation on income and spending behaviour with full EDA, feature selection, and targeted marketing recommendations.",
      metrics: [
        { label: "Model", value: "K-Means" },
        { label: "Workflow", value: "Full EDA" },
      ],
    },
    {
      id: "p5",
      title: "Predictive Analytics — House Prices",
      category: "Data Analytics/BI",
      stack: ["Linear Regression", "Python", "Pandas"],
      desc: "Forecasting model with feature selection, correlation analysis and evaluation via MAE, RMSE, and R² alongside actual-vs-predicted visualizations.",
      metrics: [
        { label: "Algorithm", value: "Linear Reg" },
        { label: "Metrics", value: "MAE/RMSE/R²" },
      ],
    },
    {
      id: "p6",
      title: "Data Cleaning & Reporting Automation",
      category: "Data Engineering",
      stack: ["Pandas", "Matplotlib", "Seaborn"],
      desc: "Automated preprocessing workflow handling missing values, duplicates, formatting — with auto-generated visual reports and exports.",
      metrics: [
        { label: "Mode", value: "Automated" },
        { label: "Output", value: "Reports + CSV" },
      ],
    },
    {
      id: "p7",
      title: "Kubernetes Deployment on AWS EKS",
      category: "Web Development",
      stack: ["Jenkins", "Docker", "Kubernetes", "AWS EKS"],
      desc: "CI/CD pipeline with Jenkins and Docker for automated, scalable application deployment on Kubernetes (EKS).",
      metrics: [
        { label: "CI/CD", value: "Jenkins" },
        { label: "Scale", value: "Auto" },
      ],
    },
    {
      id: "p8",
      title: "Student Login Form",
      category: "Web Development",
      stack: ["HTML", "CSS", "JavaScript"],
      desc: "Responsive student login form featuring interactive animations and modern UI/UX design principles.",
      metrics: [
        { label: "Design", value: "Responsive" },
        { label: "Motion", value: "Animated" },
      ],
    },
  ],
  experience: [
    {
      id: "x1",
      role: "Data Analytics & BI Intern",
      company: "Thiranex Technologies",
      period: "Recent",
      points: [
        "Built Power BI dashboards and automated reporting workflows in Python",
        "Developed customer segmentation models and predictive analytics solutions",
        "Improved data visualization, preprocessing, and statistical analysis skills on real-world datasets",
      ],
    },
    {
      id: "x2",
      role: "Mobile Application Development Intern",
      company: "Accent Techno Soft",
      period: "Earlier",
      points: [
        "Gained foundational knowledge in mobile app design and development",
        "Worked across testing and debugging cycles for production-ready builds",
      ],
    },
  ],
  certifications: [
    { id: "c1", title: "Data Analytics with Python", issuer: "NPTEL", year: "2024", link: "" },
    { id: "c2", title: "Power BI Data Analyst", issuer: "Microsoft Learn", year: "2024", link: "" },
    { id: "c3", title: "Databricks Lakehouse Fundamentals", issuer: "Databricks", year: "2025", link: "" },
  ],
  socials: {
    github: "https://github.com/AlenVVarughese",
    linkedin: "https://www.linkedin.com/in/alen-v-varughese-a035b424b/",
    email: "alenvarughese25@gmail.com",
    phone: "+91 97903 84795",
  },
  emailjs: {
    serviceId: "service_kinhg51",
    templateId: "template_3b1difg",
    publicKey: "frVODCn-1Ih8InFwy",
    toEmail: "alenvarughese25@gmail.com",
  },
};

const STORAGE_KEY = "alenv_portfolio_v2";

type Ctx = {
  data: PortfolioData;
  setData: (d: PortfolioData, pin?: string) => Promise<{ ok: boolean; error?: string | null }>;
  reset: (pin?: string) => Promise<{ ok: boolean; error?: string | null }>;
  editMode: boolean;
  setEditMode: (b: boolean) => void;
  syncState: "loading" | "cloud" | "local" | "error";
  hasEditorPin: boolean;
};

const PortfolioCtx = createContext<Ctx | null>(null);

function mergePortfolioData(source: Partial<PortfolioData> | null | undefined): PortfolioData {
  return {
    ...DEFAULT_DATA,
    ...(source || {}),
    socials: { ...DEFAULT_DATA.socials, ...(source?.socials || {}) },
    emailjs: { ...DEFAULT_DATA.emailjs, ...(source?.emailjs || {}) },
    certifications: source?.certifications ?? DEFAULT_DATA.certifications,
  };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);
  const [syncState, setSyncState] = useState<Ctx["syncState"]>("loading");
  const [hasEditorPin, setHasEditorPin] = useState(false);
  const loadSharedPortfolio = useServerFn(getPortfolioSettings);
  const saveSharedPortfolio = useServerFn(savePortfolioSettings);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const shared = await loadSharedPortfolio();
        if (cancelled) return;
        setHasEditorPin(shared.hasPin);
        if (shared.data) {
          const merged = mergePortfolioData(shared.data as Partial<PortfolioData>);
          setDataState(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          setSyncState("cloud");
          return;
        }
      } catch {
        if (cancelled) return;
        setSyncState("error");
      }

      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setDataState(mergePortfolioData(JSON.parse(raw)));
        if (!cancelled) setSyncState("local");
      } catch {
        if (!cancelled) setSyncState("local");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [loadSharedPortfolio]);

  const setData = async (d: PortfolioData, pin?: string) => {
    setDataState(d);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    } catch {}

    if (!pin?.trim()) {
      setSyncState("local");
      return { ok: false, error: "Enter an editor PIN to save changes for every visitor." };
    }

    try {
      const result = await saveSharedPortfolio({ data: { data: d, pin } });
      if (!result.ok) return result;
      setHasEditorPin(true);
      setSyncState("cloud");
      return { ok: true, error: null };
    } catch {
      setSyncState("error");
      return { ok: false, error: "Cloud save failed. Your browser copy was saved only on this device." };
    }
  };

  const reset = async (pin?: string) => {
    return setData(DEFAULT_DATA, pin);
  };

  return (
    <PortfolioCtx.Provider value={{ data, setData, reset, editMode, setEditMode, syncState, hasEditorPin }}>
      {children}
    </PortfolioCtx.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioCtx);
  if (!ctx) throw new Error("usePortfolio must be used inside PortfolioProvider");
  return ctx;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
