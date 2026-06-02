import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(94%,1100px)]"
      >
        <div className="glass rounded-2xl px-5 py-3 flex items-center justify-between relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 seam-gold" />
          <a href="#hero" className="font-mono text-sm tracking-widest">
            <span className="text-gradient-gold font-bold">ALEN.V</span>
            <span className="text-muted-foreground">/portfolio</span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-gold transition-colors rounded-md hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex text-xs font-mono tracking-wider px-3 py-1.5 rounded-md border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground transition-all"
          >
            HIRE ME
          </a>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-gold p-1"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden bg-black/80 backdrop-blur-xl"
            style={{ perspective: 1200 }}
          >
            <motion.div
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top center" }}
              className="absolute inset-x-4 top-4 glass glass-gold rounded-2xl p-6"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-mono text-gradient-gold font-bold">ALEN.V</span>
                <button onClick={() => setOpen(false)} className="text-gold">
                  <X className="size-6" />
                </button>
              </div>
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={l.href}
                      className="block py-4 text-2xl font-display border-b border-border/40 hover:text-gold transition-colors"
                    >
                      <span className="font-mono text-xs text-gold/60 mr-3">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
