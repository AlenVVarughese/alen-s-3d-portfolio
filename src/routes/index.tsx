import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { AdminPanel } from "@/components/AdminPanel";
import { PortfolioProvider } from "@/lib/portfolio-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alen V Varughese — Aspiring Data Analyst" },
      {
        name: "description",
        content:
          "Portfolio of Alen V Varughese — M.Sc. Data Science & Business Analytics student. Python, SQL, Power BI, Databricks, PySpark.",
      },
      { property: "og:title", content: "Alen V Varughese — Aspiring Data Analyst" },
      {
        property: "og:description",
        content:
          "Deciphering Data, Architecturalizing Intelligence. Projects in Databricks, Power BI, predictive analytics and more.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PortfolioProvider>
      <main className="relative bg-background text-foreground">
        <div className="fixed inset-0 -z-10 grid-bg opacity-20 pointer-events-none" />
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <AdminPanel />
      </main>
    </PortfolioProvider>
  );
}

