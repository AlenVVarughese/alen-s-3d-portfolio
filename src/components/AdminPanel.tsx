import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Plus, Trash2, RotateCcw, Save } from "lucide-react";
import { usePortfolio, uid, type ProjectItem, type PortfolioData } from "@/lib/portfolio-store";

export function AdminPanel() {
  const { data, setData, reset, editMode, setEditMode } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [tab, setTab] = useState<"profile" | "marks" | "projects" | "email">("profile");
  const [saved, setSaved] = useState(false);

  const open = editMode;
  const setOpen = (v: boolean) => {
    if (v) setDraft(data);
    setEditMode(v);
  };

  const save = () => {
    setData(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const addProject = () => {
    const p: ProjectItem = {
      id: uid(),
      title: "New Project",
      category: "Data Analytics/BI",
      stack: ["Tool"],
      desc: "Describe your project here.",
      metrics: [{ label: "Metric", value: "Value" }],
    };
    setDraft({ ...draft, projects: [p, ...draft.projects] });
  };

  const removeProject = (id: string) =>
    setDraft({ ...draft, projects: draft.projects.filter((p) => p.id !== id) });

  const updateProject = (id: string, patch: Partial<ProjectItem>) =>
    setDraft({
      ...draft,
      projects: draft.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[80] size-14 rounded-full bg-gold text-primary-foreground shadow-[0_15px_40px_-10px] shadow-gold/70 grid place-items-center hover:scale-110 transition-transform"
        aria-label="Edit portfolio"
      >
        <Settings className="size-6" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 h-full w-full sm:max-w-xl bg-background border-l border-gold/30 overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="size-5 text-gold" />
                  <span className="font-display font-bold">Live Editor</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm("Reset all data to defaults?")) {
                        reset();
                        setDraft({ ...data });
                      }
                    }}
                    className="text-xs font-mono px-2 py-1.5 rounded border border-border text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    title="Reset"
                  >
                    <RotateCcw className="size-3" /> RESET
                  </button>
                  <button
                    onClick={save}
                    className="text-xs font-mono px-3 py-1.5 rounded bg-gold text-primary-foreground font-bold inline-flex items-center gap-1"
                  >
                    <Save className="size-3" /> {saved ? "SAVED" : "SAVE"}
                  </button>
                  <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="px-5 pt-4 flex gap-1 border-b border-border">
                {(["profile", "marks", "projects", "email"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-2 text-xs font-mono tracking-wider uppercase rounded-t-md ${
                      tab === t
                        ? "bg-gold/10 text-gold border-b-2 border-gold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="p-5 space-y-6">
                {tab === "profile" && (
                  <div className="space-y-4">
                    <Field
                      label="Profile Name"
                      value={draft.profileName}
                      onChange={(v) => setDraft({ ...draft, profileName: v })}
                    />
                    <Field
                      label="Profile Video/Image URL (webm, mp4, png, jpg)"
                      value={draft.profileVideoUrl}
                      onChange={(v) => setDraft({ ...draft, profileVideoUrl: v })}
                    />
                    <div className="rounded-xl border border-border p-3">
                      <div className="text-[10px] font-mono text-muted-foreground mb-2">PREVIEW</div>
                      <ProfilePreview url={draft.profileVideoUrl} />
                    </div>

                    <div>
                      <div className="text-xs font-mono text-muted-foreground mb-2">HERO STATS</div>
                      <div className="space-y-2">
                        {draft.heroStats.map((s) => (
                          <div key={s.id} className="grid grid-cols-[1fr,1fr,auto] gap-2">
                            <input
                              className="bg-muted/30 border border-border rounded px-2 py-1.5 text-sm"
                              value={s.value}
                              placeholder="Value"
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  heroStats: draft.heroStats.map((x) =>
                                    x.id === s.id ? { ...x, value: e.target.value } : x,
                                  ),
                                })
                              }
                            />
                            <input
                              className="bg-muted/30 border border-border rounded px-2 py-1.5 text-sm"
                              value={s.label}
                              placeholder="Label"
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  heroStats: draft.heroStats.map((x) =>
                                    x.id === s.id ? { ...x, label: e.target.value } : x,
                                  ),
                                })
                              }
                            />
                            <button
                              onClick={() =>
                                setDraft({
                                  ...draft,
                                  heroStats: draft.heroStats.filter((x) => x.id !== s.id),
                                })
                              }
                              className="text-destructive p-1"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            setDraft({
                              ...draft,
                              heroStats: [...draft.heroStats, { id: uid(), value: "0", label: "NEW" }],
                            })
                          }
                          className="text-xs font-mono text-gold inline-flex items-center gap-1"
                        >
                          <Plus className="size-3" /> ADD STAT
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {tab === "marks" && (
                  <div className="space-y-3">
                    {draft.education.map((e) => (
                      <div key={e.id} className="glass rounded-xl p-3 space-y-2">
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              setDraft({
                                ...draft,
                                education: draft.education.filter((x) => x.id !== e.id),
                              })
                            }
                            className="text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <Field label="School" value={e.school} onChange={(v) => updateEdu(draft, setDraft, e.id, { school: v })} />
                        <Field label="Degree" value={e.degree} onChange={(v) => updateEdu(draft, setDraft, e.id, { degree: v })} />
                        <div className="grid grid-cols-2 gap-2">
                          <Field label="Period" value={e.period} onChange={(v) => updateEdu(draft, setDraft, e.id, { period: v })} />
                          <Field label="Score / Marks" value={e.score} onChange={(v) => updateEdu(draft, setDraft, e.id, { score: v })} />
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setDraft({
                          ...draft,
                          education: [
                            ...draft.education,
                            { id: uid(), school: "School", degree: "Degree", period: "Year – Year", score: "0%" },
                          ],
                        })
                      }
                      className="text-xs font-mono text-gold inline-flex items-center gap-1"
                    >
                      <Plus className="size-3" /> ADD EDUCATION
                    </button>
                  </div>
                )}

                {tab === "projects" && (
                  <div className="space-y-3">
                    <button
                      onClick={addProject}
                      className="w-full py-2 rounded-lg bg-gold/10 text-gold border border-gold/30 font-mono text-xs inline-flex items-center justify-center gap-1"
                    >
                      <Plus className="size-3" /> ADD NEW PROJECT
                    </button>
                    {draft.projects.map((p) => (
                      <div key={p.id} className="glass rounded-xl p-3 space-y-2">
                        <div className="flex justify-end">
                          <button onClick={() => removeProject(p.id)} className="text-destructive">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                        <Field label="Title" value={p.title} onChange={(v) => updateProject(p.id, { title: v })} />
                        <div>
                          <label className="text-[10px] font-mono text-muted-foreground tracking-widest">CATEGORY</label>
                          <select
                            className="w-full bg-muted/30 border border-border rounded px-2 py-1.5 text-sm"
                            value={p.category}
                            onChange={(e) => updateProject(p.id, { category: e.target.value as ProjectItem["category"] })}
                          >
                            <option>Data Engineering</option>
                            <option>Data Analytics/BI</option>
                            <option>Web Development</option>
                          </select>
                        </div>
                        <TextareaField
                          label="Description"
                          value={p.desc}
                          onChange={(v) => updateProject(p.id, { desc: v })}
                        />
                        <Field
                          label="Stack (comma separated)"
                          value={p.stack.join(", ")}
                          onChange={(v) => updateProject(p.id, { stack: v.split(",").map((s) => s.trim()).filter(Boolean) })}
                        />
                        <div>
                          <label className="text-[10px] font-mono text-muted-foreground tracking-widest">METRICS</label>
                          {p.metrics.map((m, i) => (
                            <div key={i} className="grid grid-cols-[1fr,1fr,auto] gap-2 mt-1">
                              <input
                                className="bg-muted/30 border border-border rounded px-2 py-1.5 text-sm"
                                placeholder="Label"
                                value={m.label}
                                onChange={(e) => {
                                  const metrics = [...p.metrics];
                                  metrics[i] = { ...m, label: e.target.value };
                                  updateProject(p.id, { metrics });
                                }}
                              />
                              <input
                                className="bg-muted/30 border border-border rounded px-2 py-1.5 text-sm"
                                placeholder="Value"
                                value={m.value}
                                onChange={(e) => {
                                  const metrics = [...p.metrics];
                                  metrics[i] = { ...m, value: e.target.value };
                                  updateProject(p.id, { metrics });
                                }}
                              />
                              <button
                                onClick={() =>
                                  updateProject(p.id, { metrics: p.metrics.filter((_, j) => j !== i) })
                                }
                                className="text-destructive"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() =>
                              updateProject(p.id, {
                                metrics: [...p.metrics, { label: "Metric", value: "Value" }],
                              })
                            }
                            className="mt-2 text-xs font-mono text-gold inline-flex items-center gap-1"
                          >
                            <Plus className="size-3" /> ADD METRIC
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "email" && (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Connect your EmailJS account so the contact form delivers messages to your inbox.
                      Get these from{" "}
                      <a className="text-gold underline" href="https://dashboard.emailjs.com" target="_blank" rel="noreferrer">
                        dashboard.emailjs.com
                      </a>
                      .
                    </p>
                    <Field
                      label="Service ID"
                      value={draft.emailjs.serviceId}
                      onChange={(v) => setDraft({ ...draft, emailjs: { ...draft.emailjs, serviceId: v } })}
                    />
                    <Field
                      label="Template ID"
                      value={draft.emailjs.templateId}
                      onChange={(v) => setDraft({ ...draft, emailjs: { ...draft.emailjs, templateId: v } })}
                    />
                    <Field
                      label="Public Key"
                      value={draft.emailjs.publicKey}
                      onChange={(v) => setDraft({ ...draft, emailjs: { ...draft.emailjs, publicKey: v } })}
                    />
                    <Field
                      label="To Email"
                      value={draft.emailjs.toEmail}
                      onChange={(v) => setDraft({ ...draft, emailjs: { ...draft.emailjs, toEmail: v } })}
                    />
                    <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground space-y-1 font-mono">
                      <div>Template vars to use: {"{{from_name}}, {{from_email}}, {{message}}, {{to_email}}"}</div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function updateEdu(
  draft: PortfolioData,
  setDraft: (d: PortfolioData) => void,
  id: string,
  patch: Partial<PortfolioData["education"][number]>,
) {
  setDraft({
    ...draft,
    education: draft.education.map((x) => (x.id === id ? { ...x, ...patch } : x)),
  });
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-mono text-muted-foreground tracking-widest">{label.toUpperCase()}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 border border-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] font-mono text-muted-foreground tracking-widest">{label.toUpperCase()}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted/30 border border-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}

function ProfilePreview({ url }: { url: string }) {
  const isVideo = /\.(webm|mp4|mov)(\?|$)/i.test(url);
  return (
    <div className="size-28 rounded-full overflow-hidden border-2 border-gold/60 mx-auto bg-midnight">
      {isVideo ? (
        <video src={url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
      ) : (
        <img src={url} alt="preview" className="w-full h-full object-cover" />
      )}
    </div>
  );
}
