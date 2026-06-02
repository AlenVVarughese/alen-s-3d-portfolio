import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Check, Send } from "lucide-react";
import { SectionLabel } from "./About";
import { Magnetic } from "./Magnetic";

const socials = [
  {
    label: "GitHub",
    handle: "@alenvvarughese",
    href: "https://github.com/alenvvarughese",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "alen-v-varughese",
    href: "https://linkedin.com/in/alen-v-varughese-a035b424b",
    icon: Linkedin,
  },
  {
    label: "Email",
    handle: "alenvarughese25@gmail.com",
    href: "mailto:alenvarughese25@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    handle: "+91 97903 84795",
    href: "tel:+919790384795",
    icon: Phone,
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", msg: "" });
    }, 3500);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <SectionLabel index="05" title="CONNECT / TRANSMIT" />
        <h2 className="mt-8 text-4xl md:text-5xl font-display font-bold mb-12">
          Let's build something <span className="text-gradient-gold">intelligent</span>.
        </h2>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Networks */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-mono text-xs tracking-widest text-muted-foreground mb-3">
              ◆ NETWORKS
            </div>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 6 }}
                className="group glass rounded-2xl p-4 flex items-center gap-4 hover:glass-gold transition-all"
              >
                <div className="size-11 rounded-xl bg-gold/10 border border-gold/30 grid place-items-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all">
                  <s.icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    {s.label.toUpperCase()}
                  </div>
                  <div className="font-medium truncate group-hover:text-gold transition-colors">
                    {s.handle}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Form Console */}
          <div className="lg:col-span-3">
            <div className="glass glass-teal rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 seam-gold" />
              <div className="flex justify-between items-center mb-6 font-mono text-[10px] tracking-widest text-muted-foreground">
                <span>◆ SECURE.CONSOLE</span>
                <span className="text-teal">● ENCRYPTED</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatingInput
                  label="YOUR NAME"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <FloatingInput
                  label="EMAIL ADDRESS"
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <FloatingInput
                  label="MESSAGE"
                  textarea
                  value={form.msg}
                  onChange={(v) => setForm({ ...form, msg: v })}
                />

                <Magnetic strength={0.2}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={sent}
                    className="relative w-full py-4 rounded-xl bg-gold text-primary-foreground font-mono text-sm tracking-widest font-bold overflow-hidden shadow-[0_20px_50px_-12px] shadow-gold/50"
                  >
                    <AnimatePresence mode="wait">
                      {sent ? (
                        <motion.span
                          key="ok"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          <Check className="size-5" /> TRANSMISSION COMPLETE
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          className="flex items-center justify-center gap-2"
                        >
                          TRANSMIT MESSAGE <Send className="size-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Magnetic>

                <AnimatePresence>
                  {sent && (
                    <>
                      {[...Array(10)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                          animate={{
                            opacity: 0,
                            x: (Math.random() - 0.5) * 200,
                            y: (Math.random() - 0.5) * 200,
                            scale: 0,
                          }}
                          transition={{ duration: 1.2 }}
                          className="pointer-events-none absolute left-1/2 bottom-12 size-2 rounded-full bg-gold"
                        />
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-8 border-t border-border/40 text-center font-mono text-xs text-muted-foreground">
        <p>© 2026 ALEN V VARUGHESE — Architecturalizing Intelligence.</p>
      </footer>
    </section>
  );
}

function FloatingInput({
  label,
  value,
  onChange,
  type = "text",
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
}) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="relative group">
      <Comp
        {...(textarea ? { rows: 4 } : { type })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder=" "
        className="peer w-full bg-transparent border border-border rounded-xl px-4 pt-6 pb-2 text-sm focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 transition-all"
      />
      <label className="absolute left-4 top-2 text-[10px] font-mono tracking-widest text-muted-foreground peer-focus:text-gold transition-colors">
        {label}
      </label>
    </div>
  );
}
