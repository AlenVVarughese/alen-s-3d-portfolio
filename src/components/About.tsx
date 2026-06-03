import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { TiltCard } from "./TiltCard";
import { usePortfolio } from "@/lib/portfolio-store";

export function About() {
  const { data } = usePortfolio();
  const education = data.education;
  const skills = data.skills;
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionLabel index="02" title="ABOUT / ACADEMIC CROWN" />

        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <TiltCard className="lg:col-span-3" intensity={6}>
            <div className="glass rounded-3xl p-8 h-full relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 seam-gold" />
              <GraduationCap className="size-8 text-gold mb-4" />
              <h3 className="text-2xl font-display font-bold mb-3">
                {data.aboutHeading}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {data.aboutBody1}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                {data.aboutBody2}
              </p>
            </div>
          </TiltCard>

          <div className="lg:col-span-2 space-y-3">
            {education.map((e, i) => (
              <motion.div
                key={e.school}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-5 hover:glass-teal transition-all"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <div className="text-xs font-mono text-teal tracking-widest">
                      {e.period}
                    </div>
                    <div className="mt-1 font-semibold">{e.degree}</div>
                    <div className="text-sm text-muted-foreground">{e.school}</div>
                  </div>
                  <div className="text-gradient-gold font-display font-bold text-xl">
                    {e.score}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Constellation */}
        <div className="mt-16">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-2xl font-display font-bold">
              Skills <span className="text-gold">Constellation</span>
            </h3>
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              TECH.STACK
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {skills.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="group relative glass rounded-xl p-4 text-center cursor-default hover:glass-gold transition-all"
              >
                <div className="font-mono text-sm group-hover:text-gold transition-colors">
                  {s.name}
                </div>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-gold/10 to-teal/10 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4"
    >
      <span className="font-mono text-gold text-sm">{index}</span>
      <div className="h-px flex-1 max-w-[80px] bg-gold/40" />
      <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
        {title}
      </span>
    </motion.div>
  );
}
