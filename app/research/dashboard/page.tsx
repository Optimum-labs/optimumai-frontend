"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, BarChart3, Cpu, Trophy, User, Upload, Star, ExternalLink, LogOut, FlaskConical } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

type Tab = "publications" | "assessments" | "llms" | "collaborations" | "profile"

const TAB_CONFIG: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "publications",   label: "My Publications",    icon: <BookOpen size={13} /> },
  { key: "assessments",    label: "Assessments",        icon: <Trophy size={13} /> },
  { key: "llms",           label: "Saved LLMs",         icon: <Cpu size={13} /> },
  { key: "collaborations", label: "Collaborations",     icon: <BarChart3 size={13} /> },
  { key: "profile",        label: "Profile",            icon: <User size={13} /> },
]

export default function ResearchDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>("publications")
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/research/login")
      } else {
        setUser(data.session.user)
        setLoading(false)
      }
    })
  }, [router, supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/research")
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="opt-page" style={{ paddingTop: "80px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", color: "var(--muted-txt)" }}>Verifying session…</div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Researcher"
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page" style={{ paddingTop: "48px", paddingBottom: "80px" }}>

          {/* ── Dashboard header ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cream)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>
                {initials}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)", marginBottom: "2px" }}>Research Portal</div>
                <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                  {displayName}
                </h1>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)" }}>
                  {user?.user_metadata?.institution || "Independent"} · {user?.user_metadata?.role || "Researcher"}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link href="/research" style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", padding: "8px 14px", border: "1px solid rgba(10,10,10,0.2)", textDecoration: "none" }}>
                Research Hub
              </Link>
              <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", background: "none", border: "1px solid rgba(10,10,10,0.2)", padding: "8px 14px", cursor: "pointer" }}>
                <LogOut size={12} /> Sign Out
              </button>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "36px" }}>
            {[
              { label: "Publications", value: "0", note: "Submit your first" },
              { label: "Quizzes Taken", value: "0", note: "Start an assessment" },
              { label: "Saved LLMs",   value: "0", note: "Visit LLM dashboard" },
              { label: "Citations",    value: "0", note: "Grows with publications" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "16px 18px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)" }}>
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "28px", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", fontWeight: 700, color: "var(--ink)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", marginTop: "2px" }}>{s.note}</div>
              </div>
            ))}
          </div>

          {/* ── Tabs ── */}
          <div className="comm-tabs" style={{ marginBottom: "32px" }}>
            {TAB_CONFIG.map((t) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`comm-tab${activeTab === t.key ? " comm-tab--active" : ""}`}
                style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* ──── Publications Tab ──── */}
          {activeTab === "publications" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>My Publications</h2>
                <Link href="/research/publications" className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 16px" }}>
                  Browse All <ArrowRight size={11} />
                </Link>
              </div>

              {/* Empty state */}
              <div style={{ padding: "64px 32px", border: "1px dashed rgba(10,10,10,0.15)", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", background: "rgba(10,10,10,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Upload size={20} color="var(--muted-txt)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>No publications yet</h3>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto 24px" }}>
                  Share your research with the community. Submit a paper, project, or notebook and get discovered by researchers worldwide.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                  <Link href="/research/publications" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 20px" }}>
                    Submit a Paper <ArrowRight size={11} />
                  </Link>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "10px 20px" }}>
                    Link GitHub Repo
                  </a>
                </div>
              </div>

              {/* Submission guidelines */}
              <div style={{ marginTop: "32px", padding: "24px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)" }}>
                <h3 style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", marginBottom: "16px" }}>Submission Guidelines</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  {[
                    { step: "01", label: "Prepare your paper", desc: "PDF, Jupyter notebook, or GitHub repo. Minimum 1,000 words." },
                    { step: "02", label: "Add metadata",        desc: "Title, abstract, authors, categories, and relevant tags." },
                    { step: "03", label: "Peer review",         desc: "Community review within 1–3 days before publication." },
                    { step: "04", label: "Publish & share",     desc: "Get a DOI-like ID, citation format, and social sharing links." },
                  ].map((s, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "20px", fontWeight: 700, color: "rgba(10,10,10,0.08)", marginBottom: "4px" }}>{s.step}</div>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>{s.label}</div>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)", lineHeight: 1.6 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──── Assessments Tab ──── */}
          {activeTab === "assessments" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Assessment Results</h2>
                <Link href="/research/assessments" className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 16px" }}>
                  Take a Quiz <ArrowRight size={11} />
                </Link>
              </div>

              <div style={{ padding: "64px 32px", border: "1px dashed rgba(10,10,10,0.15)", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", background: "rgba(10,10,10,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Trophy size={20} color="var(--muted-txt)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>No assessments completed</h3>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto 24px" }}>
                  Test your knowledge across AI topics. Earn badges and track your progress on Agentic AI, LLM Engineering, and more.
                </p>
                <Link href="/research/assessments" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 20px", display: "inline-flex" }}>
                  Start an Assessment <ArrowRight size={11} />
                </Link>
              </div>

              <div style={{ marginTop: "32px" }}>
                <h3 style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", marginBottom: "16px" }}>Available Quizzes</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
                  {[
                    { title: "Agentic AI Essentials", count: 4, badge: "Beginner–Intermediate" },
                    { title: "LLM Engineering",        count: 4, badge: "Intermediate–Advanced" },
                    { title: "Advanced AI Topics",     count: 2, badge: "Advanced" },
                  ].map((c, i) => (
                    <Link key={i} href="/research/assessments" style={{ padding: "18px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)", textDecoration: "none", display: "block" }}>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--gold)", marginBottom: "4px" }}>{c.badge}</div>
                      <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>{c.title}</div>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{c.count} quizzes available</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──── Saved LLMs Tab ──── */}
          {activeTab === "llms" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>Saved LLMs</h2>
                <Link href="/research/llm-dashboard" className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 16px" }}>
                  LLM Dashboard <ArrowRight size={11} />
                </Link>
              </div>

              <div style={{ padding: "64px 32px", border: "1px dashed rgba(10,10,10,0.15)", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", background: "rgba(10,10,10,0.05)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <Cpu size={20} color="var(--muted-txt)" />
                </div>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>No saved models yet</h3>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto 24px" }}>
                  Bookmark LLMs from the dashboard to save comparison views and track pricing changes over time.
                </p>
                <Link href="/research/llm-dashboard" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 20px", display: "inline-flex" }}>
                  Browse LLM Dashboard <ArrowRight size={11} />
                </Link>
              </div>

              {/* Featured models preview */}
              <div style={{ marginTop: "32px" }}>
                <h3 style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--ink)", marginBottom: "16px" }}>Featured Models This Week</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                  {[
                    { name: "GPT-4o",             provider: "OpenAI",    color: "#10a37f", mmlu: 88.7 },
                    { name: "Claude 3.5 Sonnet",   provider: "Anthropic", color: "#d4a96a", mmlu: 88.3 },
                    { name: "DeepSeek-V3",         provider: "DeepSeek",  color: "#1a1a2e", mmlu: 88.5 },
                    { name: "Gemini 1.5 Pro",      provider: "Google",    color: "#4285f4", mmlu: 85.9 },
                  ].map((m, i) => (
                    <Link key={i} href="/research/llm-dashboard" style={{ padding: "14px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)", textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.color, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: "var(--ink)" }}>{m.name}</div>
                        <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)" }}>{m.provider} · MMLU {m.mmlu}%</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ──── Collaborations Tab ──── */}
          {activeTab === "collaborations" && (
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", marginBottom: "24px" }}>Collaborations</h2>
              <div style={{ padding: "64px 32px", border: "1px dashed rgba(10,10,10,0.15)", textAlign: "center" }}>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>Coming Soon</h3>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "360px", margin: "0 auto 8px" }}>
                  Find co-authors, join research groups, and collaborate on papers directly on the platform.
                </p>
              </div>
            </div>
          )}

          {/* ──── Profile Tab ──── */}
          {activeTab === "profile" && (
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", marginBottom: "24px" }}>Research Profile</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
                {[
                  { label: "Full Name",           value: user?.user_metadata?.full_name || "—" },
                  { label: "Email",               value: user?.email || "—" },
                  { label: "Institution",         value: user?.user_metadata?.institution || "Not set" },
                  { label: "Role",                value: user?.user_metadata?.role || "Not set" },
                  { label: "Member Since",        value: user?.created_at ? new Date(user.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "—" },
                ].map((f, i) => (
                  <div key={i} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "4px" }}>{f.label}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{f.value}</div>
                  </div>
                ))}
              </div>

              {user?.user_metadata?.research_interests?.length > 0 && (
                <div style={{ marginTop: "24px", padding: "20px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)" }}>
                  <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "12px" }}>Research Interests</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {(user?.user_metadata?.research_interests as string[]).map((item, i) => (
                      <span key={i} style={{ fontSize: "11px", fontFamily: "var(--font-dm-mono),monospace", padding: "4px 12px", background: "rgba(212,169,106,0.1)", border: "1px solid rgba(212,169,106,0.3)", color: "var(--gold)", borderRadius: "2px" }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
                <button className="opt-btn-ghost" style={{ fontSize: "11px" }}>Edit Profile</button>
                <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "#dc2626", background: "none", border: "1px solid rgba(220,38,38,0.2)", padding: "10px 18px", cursor: "pointer" }}>
                  <LogOut size={12} /> Sign Out
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
