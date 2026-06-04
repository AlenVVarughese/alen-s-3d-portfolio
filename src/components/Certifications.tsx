import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SectionLabel } from "./About";
import { usePortfolio } from "@/lib/portfolio-store";

export function Certifications() {
  const { data } = usePortfolio();
  const items = data.certifications || [];

  if (items.length === 0) return null;

  return (
    <section id="certifications" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionLabel index="05" title="CERTIFICATIONS" />
        <h2 className="mt-8 text-4xl md:text-5xl font-display font-bold mb-12">
          Verified <span className="text-gradient-gold">Credentials</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((c, i) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 24, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -6, rotateX: 4, rotateY: 4 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative glass glass-gold rounded-2xl p-5 h-full overflow-hidden group"
              >
                <div className="absolute inset-x-0 top-0 seam-gold" />
                <div className="flex items-start justify-between mb-4">
                  <div className="size-10 rounded-xl bg-gold/15 border border-gold/30 grid place-items-center">
                    <Award className="size-5 text-gold" />
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-teal/80">
                    {c.year}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg leading-snug mb-1">
                  {c.title}
                </h3>
                <div className="text-sm text-muted-foreground">{c.issuer}</div>
                {c.link && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-gold opacity-80 group-hover:opacity-100">
                    VERIFY <ExternalLink className="size-3" />
                  </div>
                )}
              </motion.div>
            );
            return c.link ? (
              <a key={c.id} href={c.link} target="_blank" rel="noreferrer" className="block">
                {card}
              </a>
            ) : (
              <div key={c.id}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
