import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Zap, Globe, Award, Heart, Users, ArrowRight, Brain, Cpu, Network } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About — OptimumAI",
  description: "The mission, vision, and people behind OptimumAI — understanding consciousness to build AI that excels humanity.",
}

const pillars = [
  {
    num: "01",
    title: "Mission",
    body: "Understanding Consciousness. We build AI by first understanding what makes humans human — the agency, the intent, the self-directed thought — then encoding that understanding into every model we train.",
  },
  {
    num: "02",
    title: "Vision",
    body: "A world where AI mirrors human consciousness — not to replace it, but to excel it. Where every agentic system amplifies human will and returns decision-making power to the individual.",
  },
  {
    num: "03",
    title: "Method",
    body: "Rigorous research followed by production-grade engineering. We close the gap between what is proven in the lab and what works at real scale for real people.",
  },
  {
    num: "04",
    title: "Open Infrastructure",
    body: "Open by default. Every breakthrough belongs to humanity first. We build in the open and share gains with the researchers and communities who made them possible.",
  },
]

const values = [
  { icon: Brain, title: "Consciousness-First", description: "Every product decision starts with one question: does this deepen human self-direction, or diminish it?" },
  { icon: Users, title: "Collaboration", description: "Great AI is built together. Peer learning, shared research, and collective success are the foundation of everything we do." },
  { icon: Zap, title: "Frontier Research", description: "We stay at the edge — publishing original work, training novel architectures, and building tools that didn't exist before." },
  { icon: Globe, title: "Radical Access", description: "Geography and background are never barriers. We build for every time zone, every language, every level of experience." },
  { icon: Award, title: "Measured Impact", description: "We track what matters: agency scores improved, researchers placed, breakthroughs published, and lives shifted." },
  { icon: Heart, title: "Integrity", description: "Radical transparency — in our research methods, our results, our pricing, and how we build our models." },
]

const stats = [
  { value: "2022", label: "Founded" },
  { value: "10,000+", label: "Members trained" },
  { value: "80+", label: "Countries" },
  { value: "50+", label: "Partner companies" },
]

export default function AboutPage() {
  const team = [
    {
      name: "Mohammad Yahiya",
      role: "Founder",
      bio: "Founded OptimumAI with a mission to make world-class AI education accessible to everyone. Passionate about building tools and communities that empower the next generation of AI researchers and engineers.",
      initials: "MY",
    },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <p className="opt-kicker opt-anim-1">About OptimumAI</p>
          <h1 className="opt-headline opt-anim-2" style={{ fontSize: "clamp(36px, 5vw, 72px)", maxWidth: "800px" }}>
            We started with a question —<br /><em>not a product.</em>
          </h1>
          <p className="opt-sub opt-anim-3" style={{ maxWidth: "620px" }}>
            OptimumAI is an AI research company founded in 2022 on a single thesis:
            before we can build AI that excels humanity, we must first understand what makes humans human.
            The answer is consciousness — specifically, human agency.
          </p>

          {/* ── Stats ── */}
          <div className="opt-stats-bar" style={{ marginTop: "48px" }}>
            {stats.map((s, i) => (
              <div key={i} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Mission & Vision ── */}
          <div id="mission" style={{ scrollMarginTop: "88px" }}>
          <div className="opt-rule" style={{ marginTop: "64px" }}><span className="opt-rule-text">Mission &amp; Vision</span></div>
          <div className="opt-pillars">
            {pillars.map((p) => (
              <div key={p.num} className="opt-pillar">
                <span className="opt-pillar-num">{p.num}</span>
                <div className="opt-pillar-title">{p.title}</div>
                <p className="opt-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
          </div>{/* end #mission */}

          {/* ── The strategic bet ── */}
          <div className="opt-rule"><span className="opt-rule-text">The strategic thesis</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", background: "rgba(10,10,10,0.07)", border: "1px solid rgba(10,10,10,0.07)", borderRadius: "12px", overflow: "hidden", marginBottom: "48px" }}>
            <div style={{ padding: "40px 36px", background: "var(--ink)", color: "var(--paper)" }}>
              <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", marginBottom: "16px" }}>The Foundation</p>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, lineHeight: 1.3, marginBottom: "16px", color: "var(--paper)" }}>
                A global research community built from the ground up.
              </div>
              <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13px", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", margin: 0 }}>
                10,000+ members. 80+ countries. Research bootcamps, internship pipelines, and a hiring marketplace
                connecting talent to 50+ partner companies. The community is the moat — and the data layer.
              </p>
            </div>
            <div style={{ padding: "40px 36px", background: "var(--paper)" }}>
              <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--muted-txt)", marginBottom: "16px" }}>The Frontier</p>
              <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "22px", fontWeight: 700, lineHeight: 1.3, marginBottom: "16px", color: "var(--ink)" }}>
                Domain-specific LLMs trained on human agency signals.
              </div>
              <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>
                OptimumLLM: multimodal foundation models that understand how humans think, not just what they
                say. Four signal streams. Five assessment dimensions. A structural moat no single modality can replicate.
              </p>
            </div>
          </div>

          {/* ── Tesla quote ── */}
          <blockquote style={{
            borderLeft: "3px solid var(--opt-red)",
            paddingLeft: "28px",
            margin: "0 0 64px",
            maxWidth: "640px",
          }}>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(16px, 2vw, 21px)", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink)", marginBottom: "12px" }}>
              "Tesla wasn't a car — it was proof that fossil-fuel transport was obsolete. OptimumAI isn't an
              assessment tool — it's the first infrastructure for human consciousness development at scale."
            </p>
            <cite style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--muted-txt)", fontStyle: "normal" }}>
              Mohammad Yahiya — Founder, OptimumAI
            </cite>
          </blockquote>

          {/* ── Story ── */}
          <div className="opt-rule"><span className="opt-rule-text">Our story</span></div>
          <div style={{ maxWidth: "700px", marginBottom: "72px" }}>

            {/* Opening */}
            <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: 1.4, color: "var(--ink)", marginBottom: "32px" }}>
              We didn&rsquo;t start with a product.<br />We started with a question.
            </p>

            {/* Section 1 — The founding observation */}
            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--opt-red)", marginBottom: "10px" }}>
              The founding observation
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "16px" }}>
              In 2022, AI was accelerating — fast. But every major system we looked at was optimising for the same thing: performance on a benchmark hand-picked by the people who built the system. Accuracy. Speed. Token cost. The metrics were real. The outputs were impressive. What was missing was the human.
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "32px" }}>
              Not &ldquo;the user&rdquo; as a data point. The human as an agent — a consciousness that sets its own goals, changes its mind, acts under uncertainty, and is ultimately responsible for the decisions it makes. No one in the commercial AI race was asking: <em>what is the effect of this system on human agency?</em> We decided that question was worth building a company around.
            </p>

            {/* Section 2 — Mission became a product */}
            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--opt-red)", marginBottom: "10px" }}>
              The mission became a product
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "16px" }}>
              Our first insight was this: you cannot build AI that serves human agency if you have never measured human agency. So before we wrote a single line of model code, we built the Agency Score — a multimodal assessment framework that quantifies the degree to which a person exercises self-directed, autonomous thought across five dimensions: clarity of intent, adaptability, ethical reasoning, long-horizon planning, and reflective self-correction.
            </p>
            <blockquote style={{ borderLeft: "3px solid var(--opt-red)", paddingLeft: "24px", margin: "0 0 32px", color: "var(--ink)" }}>
              <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontStyle: "italic", lineHeight: 1.6, marginBottom: "8px" }}>
                &ldquo;We weren&rsquo;t building a test. We were building a mirror — a way for humans to see their own cognition clearly, so we could eventually build AI that reflects the best of it back.&rdquo;
              </p>
              <cite style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-txt)", fontStyle: "normal" }}>Mohammad Yahiya — Founder, OptimumAI</cite>
            </blockquote>

            {/* Section 3 — What we are building now */}
            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--opt-red)", marginBottom: "10px" }}>
              What we are building now
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "20px" }}>
              Today, OptimumAI operates across three interconnected fronts — each one feeding the others:
            </p>
            <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
              {[
                { label: "01 · Research", body: "We publish original research on consciousness, agency, and human-aligned AI architectures. Our papers don't just describe the problem — they ship the infrastructure to address it." },
                { label: "02 · Agency Engine", body: "We are building the Agency Engine — a suite of LLMs, fine-tuned on human agency signals, designed to augment human decision-making instead of replacing it. The first model, OptimumLLM v1.0, releases September 2026." },
                { label: "03 · Global Community", body: "10,000+ researchers across 80+ countries contribute data, peer-review, and real-world signal to everything we build. The community isn't a marketing asset. It's the data infrastructure that makes the models honest." },
              ].map((item) => (
                <div key={item.label} style={{ padding: "24px 28px", background: "rgba(255,255,255,0.55)", border: "1px solid rgba(201,160,38,0.18)", borderLeft: "4px solid var(--gold)", borderRadius: "0 10px 10px 0" }}>
                  <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>{item.label}</p>
                  <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "14px", lineHeight: 1.85, color: "var(--ink)", margin: 0 }}>{item.body}</p>
                </div>
              ))}
            </div>

            {/* Section 4 — Philosophy */}
            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--opt-red)", marginBottom: "10px" }}>
              The philosophy behind everything
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "16px" }}>
              The commercial AI industry has a structural incentive problem. The metrics that attract investment — daily active users, session time, task automation rate — are all, at their core, measures of dependency. The more a user needs the AI, the better the numbers look. This is not what we believe AI should be.
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "32px" }}>
              We believe AI should be measured by how much it increases human capability — not decreases it. A person who uses OptimumAI tools should emerge more capable of independent thought, more resilient under uncertainty, and more clearly aware of their own decision-making patterns. If our systems create dependency, we have failed.
            </p>

            {/* Section 5 — Closing */}
            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--opt-red)", marginBottom: "10px" }}>
              The world does not need more AI
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "16px" }}>
              The world does not need more AI. It needs better humans — humans who think more clearly, act more deliberately, and understand their own consciousness with the same rigour they apply to the world around them.
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "40px" }}>
              AI is our tool for getting there. Consciousness is our subject. Agency is our measure. And the destination — always — is a humanity that is more fully, more powerfully, more beautifully itself.
            </p>

            {/* Tagline */}
            <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, fontStyle: "italic", color: "var(--ink)", borderTop: "1px solid rgba(10,10,10,0.08)", paddingTop: "32px" }}>
              Making Humans Better Humans.
            </p>
          </div>

          {/* ── Team ── */}
          <div className="opt-rule"><span className="opt-rule-text">The team</span></div>
          <p className="opt-sub" style={{ marginBottom: "40px" }}>The people building OptimumAI.</p>
          <Link href="/team" style={{ textDecoration: "none" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "28px", marginBottom: "72px", cursor: "pointer" }}>
              {team.map((member, i) => (
                <Card key={i} style={{ background: "rgba(255,255,255,0.55)", border: "1px solid rgba(201,160,38,0.18)", borderRadius: "12px", boxShadow: "var(--shadow-sm)", transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}>
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
              <div key={i} style={{ padding: "28px", border: "1px solid rgba(201,160,38,0.15)", borderTop: "3px solid var(--gold)", borderRadius: "0 0 12px 12px", background: "rgba(255,255,255,0.4)", boxShadow: "var(--shadow-sm)" }}>
                <v.icon style={{ width: 22, height: 22, color: "var(--opt-red)", marginBottom: 12 }} />
                <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{v.title}</div>
                <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Ready to contribute?</p>
            <p className="opt-cta-headline">
              Join the researchers building<br /><em>the next generation of AI.</em>
            </p>
            <div className="opt-cta-actions">
              <Link href="/beta-outreach" className="opt-btn-primary">
                Join the Beta <ArrowRight size={13} />
              </Link>
              <Link href="/contact" className="opt-btn-ghost">
                Contact us
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
