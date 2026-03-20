"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, FlaskConical, Eye, EyeOff, Check } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"

const INTERESTS = [
  "Large Language Models", "Agentic AI", "Computer Vision", "Reinforcement Learning",
  "Natural Language Processing", "Model Compression", "AI Safety", "Causal AI",
  "Multimodal AI", "Time Series", "Recommender Systems", "Model Evaluation",
]

const ROLES = [
  "Student",
  "Researcher",
  "Industry Practitioner",
  "Academic",
  "Independent Researcher",
]

export default function ResearchSignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [institution, setInstitution] = useState("")
  const [role, setRole] = useState("")
  const [interests, setInterests] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const toggleInterest = (item: string) => {
    setInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    )
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) { setStep(2); return }
    setError("")
    setLoading(true)
    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            institution,
            role,
            research_interests: interests,
            portal: "research",
          },
        },
      })
      if (authError) {
        setError(authError.message)
      } else {
        setSuccess(true)
        setTimeout(() => router.push("/research/dashboard"), 3000)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="opt-page" style={{ maxWidth: "480px", paddingTop: "80px", paddingBottom: "80px", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", background: "rgba(42,125,79,0.1)", border: "1px solid rgba(42,125,79,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Check size={24} color="#2a7d4f" />
            </div>
            <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "28px", fontWeight: 700, color: "var(--ink)", marginBottom: "12px" }}>Welcome to the Research Portal!</h2>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", color: "var(--muted-txt)", lineHeight: 1.7, marginBottom: "24px" }}>
              Your account has been created. Check your email to confirm your address.
              Redirecting to your dashboard…
            </p>
            <Link href="/research/dashboard" className="opt-btn-primary" style={{ display: "inline-flex" }}>
              Go to Dashboard <ArrowRight size={13} />
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page" style={{ maxWidth: "520px", paddingTop: "80px", paddingBottom: "80px" }}>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "36px", height: "36px", background: "var(--opt-red)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FlaskConical size={16} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--gold)" }}>OptimumAI</div>
              <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>Research Portal</div>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            {[
              { n: 1, label: "Account details" },
              { n: 2, label: "Research profile" },
            ].map((s, i) => (
              <div key={s.n} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: step >= s.n ? "var(--ink)" : "rgba(10,10,10,0.08)", color: step >= s.n ? "var(--cream)" : "var(--muted-txt)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", fontWeight: 700, flexShrink: 0 }}>
                    {step > s.n ? <Check size={10} /> : s.n}
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: step === s.n ? "var(--ink)" : "var(--muted-txt)" }}>{s.label}</span>
                </div>
                {i === 0 && <div style={{ width: "24px", height: "1px", background: "rgba(10,10,10,0.15)" }} />}
              </div>
            ))}
          </div>

          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "30px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: "8px" }}>
            {step === 1 ? <>Join the<br /><em>Research Portal</em></> : <>Your Research<br /><em>Profile</em></>}
          </h1>
          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", color: "var(--muted-txt)", lineHeight: 1.7, marginBottom: "32px" }}>
            {step === 1
              ? "Publish papers, take AI assessments, track benchmarks, and collaborate with researchers worldwide."
              : "Help us personalise your research feed. You can update this later in your dashboard."}
          </p>

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {step === 1 && (
              <>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>Full Name</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Dr. Jane Smith"
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@institution.edu"
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="Minimum 8 characters"
                      style={{ width: "100%", padding: "12px 14px", paddingRight: "42px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }} />
                    <button type="button" onClick={() => setShowPassword((v) => !v)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--muted-txt)", display: "flex" }}>
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "6px" }}>Institution / Organisation</label>
                  <input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="MIT, Google DeepMind, Independent…"
                    style={{ width: "100%", padding: "12px 14px", border: "1px solid rgba(10,10,10,0.2)", background: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "13px", color: "var(--ink)", outline: "none", boxSizing: "border-box" }} />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "8px" }}>Your Role</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {ROLES.map((r) => (
                      <button key={r} type="button" onClick={() => setRole(r)}
                        style={{ padding: "10px 14px", border: "1px solid", borderColor: role === r ? "var(--ink)" : "rgba(10,10,10,0.15)", background: role === r ? "var(--ink)" : "transparent", color: role === r ? "var(--cream)" : "var(--muted-txt)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)", marginBottom: "8px" }}>
                    Research Interests <span style={{ color: "var(--muted-txt)", fontWeight: 400 }}>({interests.length} selected)</span>
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {INTERESTS.map((item) => {
                      const selected = interests.includes(item)
                      return (
                        <button key={item} type="button" onClick={() => toggleInterest(item)}
                          style={{ padding: "6px 12px", border: "1px solid", borderColor: selected ? "var(--gold)" : "rgba(10,10,10,0.15)", background: selected ? "rgba(212,169,106,0.1)" : "transparent", color: selected ? "var(--gold)" : "var(--muted-txt)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", cursor: "pointer", borderRadius: "2px", transition: "all 0.15s", display: "flex", alignItems: "center", gap: "5px" }}>
                          {selected && <Check size={10} />}
                          {item}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}

            {error && (
              <div style={{ padding: "10px 14px", background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.2)", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "#dc2626" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} className="opt-btn-ghost" style={{ flex: 1, justifyContent: "center" }}>
                  Back
                </button>
              )}
              <button type="submit" disabled={loading} className="opt-btn-primary" style={{ flex: 2, justifyContent: "center", opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
                {loading ? "Creating account…" : step === 1 ? <>Continue <ArrowRight size={13} /></> : <>Create Account <ArrowRight size={13} /></>}
              </button>
            </div>
          </form>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(10,10,10,0.08)", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)" }}>
              Already have an account?{" "}
              <Link href="/research/login" style={{ color: "var(--ink)", fontWeight: 700, textDecoration: "underline" }}>Sign in</Link>
            </p>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginTop: "8px" }}>
              <Link href="/research" style={{ color: "var(--muted-txt)" }}>← Back to Research Hub</Link>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
