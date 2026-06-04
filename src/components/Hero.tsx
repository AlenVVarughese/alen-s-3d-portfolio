import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Magnetic } from "./Magnetic";
import { ArrowDown, Sparkles, Download } from "lucide-react";
import { usePortfolio } from "@/lib/portfolio-store";
import { ProfileMedia } from "./ProfileMedia";

export function Hero() {
  const { data } = usePortfolio();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const xs = useSpring(mx, { stiffness: 80, damping: 20 });
  const ys = useSpring(my, { stiffness: 80, damping: 20 });

  const rotateY = useTransform(xs, [-1, 1], [-18, 18]);
  const rotateX = useTransform(ys, [-1, 1], [14, -14]);
  const gridX = useTransform(xs, [-1, 1], [-30, 30]);
  const gridY = useTransform(ys, [-1, 1], [-30, 30]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
    >
      {/* 3D perspective grid */}
      <div className="absolute inset-0" style={{ perspective: 1000 }}>
        <motion.div
          style={{ x: gridX, y: gridY, rotateX: 55 }}
          className="absolute inset-0 grid-bg opacity-60"
        />
        <motion.div
          style={{ x: gridX, y: gridY, rotateX: 55 }}
          className="absolute inset-0 grid-bg-fine opacity-40"
        />
      </div>
      <div className="absolute inset-0 radial-glow pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Small floating stage — orbital video */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="hidden sm:flex absolute top-28 right-6 lg:right-12 z-20 items-center gap-2"
      >
        <div className="text-right">
          <div className="font-mono text-[9px] tracking-widest text-teal/80">◆ LIVE.STAGE</div>
          <div className="font-mono text-[9px] text-muted-foreground">SIGNAL_01</div>
        </div>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative size-20 lg:size-24 rounded-2xl overflow-hidden border border-gold/40 shadow-[0_15px_40px_-10px] shadow-gold/30"
        >
          <ProfileMedia url={data.profileVideoUrl} className="absolute inset-0" withAudioToggle />
          <div className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-2xl pointer-events-none" />
          <div className="absolute top-1 left-1 size-1.5 rounded-full bg-teal animate-pulse" />
        </motion.div>
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-7 flex flex-col items-center lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs font-mono tracking-wider"
          >
            <span className="size-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-muted-foreground">{data.availability}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold leading-[0.95] tracking-tight text-5xl sm:text-6xl lg:text-7xl text-center"
          >
            ALEN V <br />
            <span className="text-gradient-gold">VARUGHESE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl text-center mx-auto"
          >
            {data.tagline}
            <span className="block mt-2 text-sm font-mono text-teal/80">
              {data.subtitle}
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold text-primary-foreground font-mono text-sm tracking-wider font-semibold shadow-[0_20px_50px_-12px] shadow-gold/50 hover:shadow-gold/70 transition-shadow"
              >
                EXPLORE PROJECTS
                <ArrowDown className="size-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass glass-teal font-mono text-sm tracking-wider text-teal hover:text-foreground transition-colors"
              >
                <Sparkles className="size-4" />
                CONNECT
              </a>
            </Magnetic>
            {data.resumeUrl && (
              <Magnetic>
                <a
                  href={
                    data.resumeUrl.includes("res.cloudinary.com") &&
                    !data.resumeUrl.includes("fl_attachment")
                      ? data.resumeUrl.replace("/upload/", "/upload/fl_attachment/")
                      : data.resumeUrl
                  }
                  target="_blank"
                  rel="noreferrer"
                  download="Alen_V_Varughese_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold font-mono text-sm tracking-wider hover:bg-gold hover:text-primary-foreground transition-all"
                >
                  <Download className="size-4" />
                  DOWNLOAD CV
                </a>
              </Magnetic>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 pt-6 font-mono text-xs flex-wrap justify-center"
          >
            {data.heroStats.map((s) => (
              <div key={s.id}>
                <div className="text-2xl font-bold text-gradient-gold">{s.value}</div>
                <div className="text-muted-foreground tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Profile Exhibit */}
        <div className="lg:col-span-5 perspective-scene flex justify-center">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-sm aspect-[3/4]"
          >
            <div className="absolute inset-0 glass glass-gold rounded-3xl p-6 flex flex-col">
              <div className="absolute inset-x-0 top-0 seam-gold" />
              <div className="flex justify-between items-center text-[10px] font-mono text-gold/80 tracking-widest">
                <span>ID_CARD</span>
                <span>● LIVE</span>
              </div>

              <div
                className="mt-4 flex-1 rounded-2xl bg-gradient-to-br from-midnight via-background to-midnight relative overflow-hidden border border-gold/20"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="absolute inset-0 grid-bg-fine opacity-50" />
                <ProfileMedia url={data.profileVideoUrl} className="absolute inset-0" withAudioToggle />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between font-mono text-[9px] text-teal/70">
                  <span>Hello! Welcome to my portfolio.</span>
                  <span>Explore my portfolio</span>
                </div>
                <div className="absolute bottom-8 left-3 right-3 font-mono text-[10px] text-muted-foreground text-center">
                  {data.profileName}
                </div>
              </div>

              <div
                className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono"
                style={{ transform: "translateZ(20px)" }}
              >
                {["PYTHON", "SQL", "POWER BI"].map((t) => (
                  <div
                    key={t}
                    className="px-2 py-1.5 rounded-md border border-teal/30 bg-teal/5 text-teal text-center"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
