import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Database, BarChart3, Code2 } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { SectionLabel } from "./About";
import { usePortfolio, type ProjectItem } from "@/lib/portfolio-store";

type Category = "All" | ProjectItem["category"];
const categories: Category[] = ["All", "Data Engineering", "Data Analytics/BI", "Web Development"];

const iconFor = (c: ProjectItem["category"]) =>
  c === "Data Engineering" ? Database : c === "Web Development" ? Code2 : BarChart3;

export function Projects() {
  const { data } = usePortfolio();
  const [filter, setFilter] = useState<Category>("All");
  const filtered = filter === "All" ? data.projects : data.projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionLabel index="03" title="PROJECTS DECK" />

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6 mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Selected <span className="text-gradient-gold">Work</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                  filter === c
                    ? "bg-gold text-primary-foreground"
                    : "glass text-muted-foreground hover:text-gold"
                }`}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 perspective-scene">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => {
              const Icon = iconFor(p.category);
              return (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <TiltCard intensity={8}>
                    <motion.div
                      whileHover={{ z: 60, scale: 1.02 }}
                      style={{ transformStyle: "preserve-3d" }}
                      className="group glass rounded-2xl p-6 h-full relative overflow-hidden hover:glass-gold transition-all"
                    >
                      <div className="absolute inset-x-0 top-0 seam-gold opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-start justify-between mb-4">
                        <div className="size-12 rounded-xl glass-teal grid place-items-center text-teal">
                          <Icon className="size-5" />
                        </div>
                        <span className="font-mono text-[10px] tracking-widest text-muted-foreground px-2 py-1 rounded border border-border">
                          {p.category.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-xl font-display font-bold group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-teal/10 text-teal/90 border border-teal/20"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 pt-5 border-t border-border/50 flex justify-between items-end">
                        <div className="flex gap-4 flex-wrap">
                          {p.metrics.map((m, i) => (
                            <div key={i}>
                              <div className="text-[10px] font-mono text-muted-foreground tracking-wider">
                                {m.label.toUpperCase()}
                              </div>
                              <div className="text-sm font-semibold text-gold">{m.value}</div>
                            </div>
                          ))}
                        </div>
                        <ArrowUpRight className="size-5 text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </div>
                    </motion.div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
