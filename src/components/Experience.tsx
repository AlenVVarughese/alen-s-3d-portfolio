import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionLabel } from "./About";

const experience = [
  {
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
    role: "Mobile Application Development Intern",
    company: "Accent Techno Soft",
    period: "Earlier",
    points: [
      "Gained foundational knowledge in mobile app design and development",
      "Worked across testing and debugging cycles for production-ready builds",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <SectionLabel index="04" title="EXPERIENCE PIPELINE" />
        <h2 className="mt-8 text-4xl md:text-5xl font-display font-bold mb-12">
          Data-bus <span className="text-gradient-gold">Route</span>
        </h2>

        <div className="relative pl-8 md:pl-12">
          {/* vertical pipeline */}
          <div className="absolute left-2 md:left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold via-teal to-transparent" />

          {experience.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative mb-10"
            >
              <div className="absolute -left-[28px] md:-left-[40px] top-6">
                <div className="size-4 rounded-full bg-gold shadow-[0_0_20px] shadow-gold animate-pulse" />
                <div className="absolute inset-0 size-4 rounded-full bg-gold/30 animate-ping" />
              </div>

              <div className="glass rounded-2xl p-6 hover:glass-gold transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="font-mono text-xs text-teal tracking-widest mb-1">
                      {e.period.toUpperCase()}
                    </div>
                    <h3 className="text-xl font-display font-bold">{e.role}</h3>
                    <div className="text-gold font-medium">{e.company}</div>
                  </div>
                  <Briefcase className="size-5 text-gold/60" />
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="text-teal mt-1">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
