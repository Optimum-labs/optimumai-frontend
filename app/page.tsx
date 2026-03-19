import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, BookOpen, Users, Brain, FlaskConical, Activity, Target, Zap, Shield } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "OptimumAI — The First Infrastructure for Human Consciousness Development",
  description:
    "95% of human decisions are borrowed. We built the instrument that shows you exactly which ones — and what's underneath them.",
}

const stats = [
  { value: "250+", label: "Published Papers" },
  { value: "10K+", label: "Active Researchers" },
  { value: "80+",  label: "Countries" },
  { value: "500+", label: "Research Projects" },
]

const pillars = [
  {
    num: "01",
    title: "Mission",
    body: "Build AI that serves human intent — not the other way around. Every product decision starts and ends with agency returned to the person.",
  },
  {
    num: "02",
    title: "Vision",
    body: "A world where intelligence amplifies human potential. Where agentic systems act as extensions of human will, not substitutes for human thought.",
  },
  {
    num: "03",
    title: "Method",
    body: "Rigorous research paired with production-grade engineering. We close the gap between what is proven in the lab and what works at scale.",
  },
  {
    num: "04",
    title: "Open Infrastructure",
    body: "Open by default. Every breakthrough belongs to humanity first. We build in the open and share gains with the researchers who made them possible.",
  },
]

const papers = [
  {
    id: "01",
    category: "Alignment",
    title: "Human-Centric Reward Modeling at Scale",
    authors: "Chen, M. · Patel, R. · Yılmaz, A.",
    date: "Mar 2026",
    href: "/research",
  },
  {
    id: "02",
    category: "Agents",
    title: "Toward Persistent Agentic Memory in LLMs",
    authors: "Singh, K. · Ibrahim, F. · Nakamura, T.",
    date: "Feb 2026",
    href: "/research",
  },
  {
    id: "03",
    category: "Multimodal",
    title: "Cross-Modal Grounding for Embodied Reasoning",
    authors: "Lee, J. · Osei, A. · Müller, H.",
    date: "Feb 2026",
    href: "/research",
  },
  {
    id: "04",
    category: "Safety",
    title: "Red-Teaming Frontier Models: A Systematic Framework",
    authors: "Vargas, C. · Kim, S. · Okafor, N.",
    date: "Jan 2026",
    href: "/research",
  },
]

const tracks = [
  {
    Icon: Brain,
    title: "AI Research",
    body: "Co-author papers, access compute, and publish alongside mentors from top labs worldwide.",
    href: "/research",
  },
  {
    Icon: BookOpen,
    title: "Bootcamps",
    body: "Intensive cohorts covering LLMs, vision, and RL — from foundations to frontier techniques.",
    href: "/bootcamps",
  },
  {
    Icon: FlaskConical,
    title: "Internships",
    body: "Paid placements at companies building the next wave of applied AI products.",
    href: "/internships",
  },
  {
    Icon: Users,
    title: "Beta Outreach",
    body: "10K+ researchers collaborating across 80 countries on open problems in AI.",
    href: "/beta-outreach",
  },
]

export default function Home() {
  return (
    <>
      <Header />

      <main className="optimum-main">
        {/* Grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">The Infrastructure for Human Consciousness Development</p>
            <h1 className="opt-headline opt-anim-2">
              95% of your<br />
              <em>decisions</em>
              <span className="opt-indent">are borrowed.</span>
            </h1>
            <p className="opt-sub opt-anim-3">
              None of them are yours. We built the instrument that shows you
              exactly which ones — and what's underneath them.
            </p>
            <p className="opt-sub opt-anim-4" style={{ marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
              Most humans are not thinking. They're executing borrowed programs.
              We built the first system that proves it — and fixes it.
            </p>
          </section>

          {/* ── Stats bar ── */}
          <div className="opt-stats-bar opt-anim-5">
            {stats.map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Agency Score ── */}
          <div className="opt-rule opt-anim-6">
            <span className="opt-rule-text">The Agency Score</span>
          </div>

          <div className="agency-score-section">
            <div className="agency-score-intro">
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "16px",
                lineHeight: 1.2
              }}>
                Not a personality type.<br />Not a category.<br /><em>A number with meaning.</em>
              </h2>
              <p style={{
                fontSize: "13px",
                lineHeight: 1.85,
                color: "var(--muted-txt)",
                maxWidth: "520px",
                marginBottom: "32px"
              }}>
                Every competitor builds assessments that measure what people say about themselves. 
                Ours measures what their actual language patterns, vocal tone, and response behavior 
                reveal about them — without them knowing.
              </p>
            </div>

            <div className="agency-score-demo">
              <div className="agency-score-card">
                <div className="agency-score-header">
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--gold)" }}>Agency Assessment</span>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", color: "var(--muted-txt)" }}>Sample Output</span>
                </div>
                <div className="agency-score-number">
                  <span style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "72px",
                    fontWeight: 900,
                    color: "var(--opt-red)",
                    lineHeight: 1
                  }}>67</span>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)", marginLeft: "8px" }}>/100</span>
                </div>
                <div className="agency-score-dimensions">
                  {[
                    { label: "Original Thought", value: 72, color: "var(--opt-red)" },
                    { label: "Decision Autonomy", value: 61, color: "var(--gold)" },
                    { label: "Pattern Awareness", value: 74, color: "var(--ink)" },
                    { label: "Cognitive Flexibility", value: 58, color: "var(--muted-txt)" },
                  ].map((d) => (
                    <div key={d.label} className="agency-dimension">
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", color: "var(--ink)" }}>{d.label}</span>
                        <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{d.value}</span>
                      </div>
                      <div style={{ height: "3px", background: "rgba(10,10,10,0.08)", borderRadius: "2px" }}>
                        <div style={{ height: "100%", width: `${d.value}%`, background: d.color, borderRadius: "2px", transition: "width 1s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "20px", padding: "16px", background: "rgba(184,150,90,0.06)", border: "1px solid rgba(184,150,90,0.12)" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--gold)", display: "block", marginBottom: "8px" }}>Pattern Map Insight</span>
                  <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", lineHeight: 1.7, color: "var(--ink)", margin: 0, fontStyle: "italic" }}>
                    "Career decisions show strong conformity to peer-group consensus. 
                    Creative reasoning operates independently but is suppressed in professional contexts."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── The Agency Engine ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">The Agency Engine</span>
          </div>

          <div className="agency-engine-section">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <p style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                color: "var(--opt-red)",
                marginBottom: "16px"
              }}>Now in Private Beta</p>
              <h2 style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: "16px",
                lineHeight: 1.2
              }}>
                The first infrastructure for<br />human consciousness development<br /><em>at scale.</em>
              </h2>
              <p style={{
                fontSize: "13px",
                lineHeight: 1.85,
                color: "var(--muted-txt)",
                maxWidth: "560px",
                margin: "0 auto 32px"
              }}>
                One agent. One human. One score. One disruption. The Mirror Agent talks to a human, 
                asks precise questions, listens for patterns, and reflects back exactly where they're 
                operating on autopilot versus genuine original thought.
              </p>
            </div>

            <div className="agency-engine-grid">
              {[
                {
                  icon: Activity,
                  num: "01",
                  title: "The Mirror Agent",
                  status: "Private Beta",
                  body: "30-minute conversational assessment across text and voice. Measures actual language patterns, vocal tone, and response behavior to produce your Agency Score.",
                },
                {
                  icon: Target,
                  num: "02",
                  title: "The Challenger",
                  status: "Coming Soon",
                  body: "Takes Mirror Agent output. Designs personalized 30-day cognitive disruption program — precise behavioral interventions targeting your specific suppressed capacity.",
                },
                {
                  icon: Zap,
                  num: "03",
                  title: "The Tracker",
                  status: "Coming Soon",
                  body: "Longitudinal check-ins every 30 days. Measures whether Agency Score is genuinely moving or you're performing change. Brutal honest tracking.",
                },
                {
                  icon: Shield,
                  num: "04",
                  title: "The Meta Agent",
                  status: "In Development",
                  body: "Watches all agents. Identifies where the system has blind spots. Rewrites its own prompts. Improves calibration autonomously.",
                },
              ].map((agent) => (
                <div key={agent.num} className="agency-engine-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <agent.icon size={18} style={{ color: "var(--opt-red)" }} />
                    <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: agent.status === "Private Beta" ? "var(--opt-red)" : "var(--gold)" }}>{agent.status}</span>
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{agent.num}</span>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: "8px 0" }}>{agent.title}</div>
                  <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>{agent.body}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <Link href="/beta-outreach" className="opt-btn-primary">
                Request Early Access <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── Foundations ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Foundations</span>
          </div>

          <div className="opt-pillars">
            {pillars.map((p) => (
              <div key={p.num} className="opt-pillar">
                <span className="opt-pillar-num">{p.num}</span>
                <div className="opt-pillar-title">{p.title}</div>
                <p className="opt-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>

          {/* ── Two Businesses ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">What We Build</span>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto 80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "40px" }}>
              <div style={{
                padding: "32px",
                border: "1px solid rgba(184,150,90,0.15)",
                background: "rgba(255,255,255,0.4)"
              }}>
                <span style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "block",
                  marginBottom: "16px"
                }}>Education &amp; Research</span>
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "12px"
                }}>
                  The Foundation
                </div>
                <p style={{
                  fontSize: "12px",
                  lineHeight: 1.8,
                  color: "var(--muted-txt)",
                  marginBottom: "20px"
                }}>
                  Intensive bootcamps, research programs, and internships that transform ambitious 
                  people into practising AI researchers. Real, valuable, and funding the mission.
                </p>
                <Link href="/bootcamps" className="opt-btn-ghost" style={{ fontSize: "9px", padding: "8px 20px" }}>
                  Explore Programs <ArrowRight size={10} />
                </Link>
              </div>

              <div style={{
                padding: "32px",
                border: "1px solid rgba(200,57,43,0.2)",
                background: "rgba(200,57,43,0.03)",
                borderTop: "3px solid var(--opt-red)"
              }}>
                <span style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: "9px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--opt-red)",
                  display: "block",
                  marginBottom: "16px"
                }}>Assessment Engine</span>
                <div style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--ink)",
                  marginBottom: "12px"
                }}>
                  The Revolution
                </div>
                <p style={{
                  fontSize: "12px",
                  lineHeight: 1.8,
                  color: "var(--muted-txt)",
                  marginBottom: "20px"
                }}>
                  The Agency Engine — a multi-agent swarm that measures, challenges, and develops 
                  human consciousness at scale. The thing nobody else can build.
                </p>
                <Link href="/beta-outreach" className="opt-btn-primary" style={{ fontSize: "9px", padding: "8px 20px" }}>
                  Request Beta Access <ArrowRight size={10} />
                </Link>
              </div>
            </div>

            <div style={{
              background: "rgba(184,150,90,0.05)",
              border: "1px solid rgba(184,150,90,0.1)",
              borderRadius: "4px",
              padding: "24px",
              marginBottom: "32px"
            }}>
              <p style={{
                fontSize: "16px",
                lineHeight: 1.6,
                color: "var(--ink)",
                margin: 0,
                fontStyle: "italic"
              }}>
                "Tesla wasn't a car — it was proof fossil fuel transport was obsolete. 
                OptimumAI isn't an assessment tool — it's the first infrastructure for 
                human consciousness development at scale."
              </p>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "24px",
              marginBottom: "40px"
            }}>
              {[
                { value: "2022", label: "Founded" },
                { value: "10,000+", label: "Members trained" },
                { value: "80+", label: "Countries represented" },
                { value: "50+", label: "Partner companies" },
              ].map((s, i) => (
                <div key={i} style={{
                  borderLeft: "2px solid var(--gold)",
                  paddingLeft: "16px",
                  textAlign: "left"
                }}>
                  <div style={{
                    fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                    fontSize: "clamp(24px, 3vw, 36px)",
                    fontWeight: 900,
                    color: "var(--ink)",
                    lineHeight: 1
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "var(--font-dm-mono), 'DM Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--muted-txt)",
                    marginTop: "6px"
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            <Link href="/about" className="opt-btn-ghost">
              Learn more about us <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── Latest Research ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Latest Research</span>
          </div>

          <div className="opt-papers">
            {papers.map((paper) => (
              <Link key={paper.id} href={paper.href} className="opt-paper-row">
                <span className="opt-paper-num">{paper.id}</span>
                <div className="opt-paper-body">
                  <span className="opt-paper-cat">{paper.category}</span>
                  <span className="opt-paper-title">{paper.title}</span>
                  <span className="opt-paper-authors">{paper.authors}</span>
                </div>
                <div className="opt-paper-right">
                  <span className="opt-paper-date">{paper.date}</span>
                  <ExternalLink size={11} className="opt-paper-icon" />
                </div>
              </Link>
            ))}
            <Link href="/research" className="opt-papers-more">
              View all publications <ArrowRight size={11} />
            </Link>
          </div>



          {/* ── Programs ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Programs</span>
          </div>

          <div className="opt-tracks">
            {tracks.map(({ Icon, title, body, href }) => (
              <Link key={title} href={href} className="opt-track">
                <div className="opt-track-icon">
                  <Icon size={18} />
                </div>
                <div className="opt-track-title">{title}</div>
                <p className="opt-track-body">{body}</p>
                <span className="opt-track-link">
                  Learn more <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>

          {/* ── Get Started ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Get Started</span>
          </div>

          <div className="opt-shift" style={{ marginBottom: "64px" }}>
            <div>
              <span className="opt-shift-label">Ready to explore?</span>
              <p className="opt-shift-text" style={{ marginBottom: "24px" }}>
                Join 10,000+ researchers worldwide working on the frontier of AI.
                Start with our research programs or connect with the community.
              </p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/research" className="opt-btn-primary">
                  Explore Research <ArrowRight size={13} />
                </Link>
                <Link href="/beta-outreach" className="opt-btn-ghost">
                  Join Beta Outreach
                </Link>
              </div>
            </div>
            <div className="opt-shift-divider" />
            <div>
              <span className="opt-shift-label">New to AI research?</span>
              <p className="opt-shift-text" style={{ marginBottom: "24px" }}>
                Our intensive bootcamps transform beginners into job-ready AI practitioners.
                Learn from industry experts and build production-ready skills.
              </p>
              <Link href="/bootcamps" className="opt-btn-primary" style={{ background: "transparent", color: "var(--ink)", border: "1.5px solid var(--ink)" }}>
                View Bootcamps <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* ── Newsletter ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Stay Updated</span>
          </div>

          <div className="opt-newsletter">
            <div className="opt-newsletter-copy">
              <p className="opt-newsletter-title">Research Digest</p>
              <p className="opt-newsletter-desc">
                Monthly roundup of papers, model releases, and open problems — straight to your inbox.
              </p>
            </div>
            <form className="opt-newsletter-form">
              <input
                type="email"
                className="opt-newsletter-input"
                placeholder="your@email.com"
                aria-label="Email address"
                autoComplete="email"
              />
              <button type="submit" className="opt-newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Say the true thing. Build the true thing.</p>
            <p className="opt-cta-headline">
              The first system that proves<br />you're not thinking — <em>and fixes it.</em>
            </p>
            <div className="opt-cta-actions">
              <Link href="/beta-outreach" className="opt-btn-primary">
                Request Early Access <ArrowRight size={13} />
              </Link>
              <Link href="/about" className="opt-btn-ghost">
                Learn about us
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
