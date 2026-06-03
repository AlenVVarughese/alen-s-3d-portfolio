import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
}

export interface PortfolioData {
  profileVideoUrl: string;
  profileName: string;
  heroStats: HeroStat[];
  education: EduItem[];
  projects: ProjectItem[];
  emailjs: EmailJsConfig;
}

const DEFAULT_VIDEO =
  "https://res.cloudinary.com/dsjstkis8/video/upload/v1780502351/2c8fba70f3fa45309db0f1abb94145de_pwsopf.webm";

const DEFAULT_DATA: PortfolioData = {
  profileVideoUrl: DEFAULT_VIDEO,
  profileName: "ALEN.V.VARUGHESE",
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
  emailjs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
    toEmail: "alenvarughese25@gmail.com",
  },
};

const STORAGE_KEY = "alenv_portfolio_v1";

type Ctx = {
  data: PortfolioData;
  setData: (d: PortfolioData) => void;
  reset: () => void;
  editMode: boolean;
  setEditMode: (b: boolean) => void;
};

const PortfolioCtx = createContext<Ctx | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<PortfolioData>(DEFAULT_DATA);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setDataState({ ...DEFAULT_DATA, ...parsed, emailjs: { ...DEFAULT_DATA.emailjs, ...(parsed.emailjs || {}) } });
      }
    } catch {}
  }, []);

  const setData = (d: PortfolioData) => {
    setDataState(d);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    } catch {}
  };

  const reset = () => {
    setDataState(DEFAULT_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <PortfolioCtx.Provider value={{ data, setData, reset, editMode, setEditMode }}>
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
