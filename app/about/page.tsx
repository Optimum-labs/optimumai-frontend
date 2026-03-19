import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Zap, Globe, Award, Heart, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About — OptimumAI",
  description: "The people and principles behind OptimumAI.",
}

export default function AboutPage() {
  const team = [
    {
      name: "Mohammad Yahiya",
      role: "Founder",
      bio: "Founded OptimumAI with a mission to make world-class AI education accessible to everyone. Passionate about building tools and communities that empower the next generation of AI researchers and engineers.",
      initials: "MY",
    },
  ]

  const values = [
    { icon: Target, title: "Excellence", description: "We hold ourselves and our programmes to the highest standard — rigorous, honest, always improving." },
    { icon: Users, title: "Collaboration", description: "We believe great AI is built together. Collaboration, peer learning, and shared success are central to everything we do." },
    { icon: Zap, title: "Innovation", description: "We stay at the frontier — updating curricula weekly, publishing original research, and building tools that didn't exist before." },
    { icon: Globe, title: "Accessibility", description: "Geography and background should never be barriers. We design programmes that reach every time zone and every level." },
    { icon: Award, title: "Impact", description: "We measure success by outcomes: papers published, jobs secured, products shipped, and lives changed." },
    { icon: Heart, title: "Integrity", description: "We operate with radical transparency — in pricing, in results data, and in how we build our AI tools." },
  ]

  const stats = [
    { value: "2022", label: "Founded" },
    { value: "10,000+", label: "Members trained" },
    { value: "80+", label: "Countries represented" },
    { value: "50+", label: "Partner companies" },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <p className="opt-kicker">About OptimumAI</p>
          <h1 className="opt-headline" style={{ fontSize: "clamp(36px, 5vw, 72px)" }}>
            We exist to make<br /><em>world-class AI</em><br />available to everyone.
          </h1>
          <p className="opt-sub" style={{ maxWidth: "600px" }}>
            OptimumAI is a research-first education company founded in 2022. We build the programmes, tools, and
            community infrastructure that turn ambitious people into practising AI researchers and engineers.
          </p>

          {/* ── Stats ── */}
          <div className="opt-rule"><span className="opt-rule-text">By the numbers</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "32px", marginBottom: "64px" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderLeft: "2px solid var(--gold)", paddingLeft: "16px" }}>
                <div style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-dm-mono), 'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted-txt)", marginTop: "6px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── Story ── */}
          <div className="opt-rule"><span className="opt-rule-text">Our story</span></div>
          <div className="opt-legal-body" style={{ maxWidth: "680px", marginBottom: "64px" }}>
            <p>
              OptimumAI was born out of a simple observation: the gap between academic AI research and accessible
              education was enormous. The best techniques were locked inside elite labs and paywalled journals.
              Talented people in Lagos, Karachi, and São Paulo had no path into the field.
            </p>
            <p>
              Mohammad Yahiya founded OptimumAI in 2022 with a clear goal: build the infrastructure that gives
              talented people everywhere a real shot at an AI career. Starting from a single cohort of 200 members,
              he built a research-grade curriculum, an internship marketplace, and a global community from the ground up.
            </p>
            <p>
              Today, OptimumAI runs ongoing research projects, intensive bootcamps, and a hiring marketplace used by
              50+ companies. We are independent, profitable, and entirely focused on the learner.
            </p>
          </div>

          {/* ── Team ── */}
          <div className="opt-rule"><span className="opt-rule-text">The team</span></div>
          <p className="opt-sub" style={{ marginBottom: "40px" }}>The people building OptimumAI.</p>
          <Link href="/team" style={{ textDecoration: "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px", marginBottom: "72px", cursor: "pointer" }}>
              {team.map((member, i) => (
                <Card key={i} style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: "2px", boxShadow: "none", transition: "border-color 0.2s ease" }} className="hover:border-gold">
                  <CardContent style={{ padding: "32px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "50%",
                      background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700,
                      color: "var(--paper)", marginBottom: "16px", letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}>{member.initials}</div>
                    <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>{member.name}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--gold)", marginBottom: "14px" }}>{member.role}</div>
                    <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "12px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Link>

          {/* ── Values ── */}
          <div className="opt-rule"><span className="opt-rule-text">What we stand for</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px", marginBottom: "72px" }}>
            {values.map((v, i) => (
              <div key={i} style={{ padding: "28px", border: "1px solid rgba(16,185,129,0.15)", borderTop: "3px solid var(--gold)", background: "rgba(255,255,255,0.4)" }}>
                <v.icon style={{ width: 24, height: 24, color: "var(--opt-red)", marginBottom: 12 }} />
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{v.title}</div>
                <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "12px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="opt-rule"><span className="opt-rule-text">Get involved</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", paddingBottom: "80px" }}>
            <Link href="/beta-outreach" className="opt-btn-primary" style={{ padding: "14px 32px", fontSize: "13px" }}>
              Join the Beta Outreach
            </Link>
            <Link href="/contact" className="opt-btn-primary" style={{ padding: "14px 32px", fontSize: "13px", background: "transparent", color: "var(--ink)", border: "1.5px solid var(--ink)" }}>
              Contact us
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
