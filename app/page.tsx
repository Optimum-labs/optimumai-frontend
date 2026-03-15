import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, BookOpen, Users, Brain, FlaskConical } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "OptimumAI — Reclaim Human Agency",
  description:
    "AI that amplifies what makes us human. Research, tools, and systems built for the agentic era.",
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
    title: "Community",
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
    title: "Community",
    body: "10K+ researchers collaborating across 80 countries on open problems in AI.",
    href: "/community",
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
            <p className="opt-kicker opt-anim-1">Mission &amp; Vision</p>
            <h1 className="opt-headline opt-anim-2">
              Reclaim<br />
              <em>Human</em>
              <span className="opt-indent">Agency.</span>
            </h1>
            <p className="opt-sub opt-anim-3">
              The mission was always clear. AI that amplifies what makes us
              human — not replaces it. Every decision, every tool, every system
              built toward one end: <em>human agency restored</em>.
            </p>
            <p className="opt-sub opt-anim-4" style={{ marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
              We're building the infrastructure for the agentic era — where AI serves human intent,
              not the other way around.
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

          {/* ── The Evolution ── */}
          <div className="opt-rule opt-anim-6">
            <span className="opt-rule-text">The Evolution</span>
          </div>

          <div className="opt-shift">
            <div>
              <span className="opt-shift-label">Then</span>
              <p className="opt-shift-text">
                A clear mission from day one. Built to optimize for humans, not around them.
              </p>
            </div>
            <div className="opt-shift-divider" />
            <div>
              <span className="opt-shift-label">Now</span>
              <p className="opt-shift-text-now">
                Just became more <em>agentic</em> —
                because the mission demands it.
              </p>
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

          {/* ── About OptimumAI ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">About OptimumAI</span>
          </div>

          <div style={{ maxWidth: "800px", margin: "0 auto 80px", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: "20px",
              lineHeight: 1.2
            }}>
              We exist to make<br /><em>world-class AI</em><br />available to everyone.
            </h2>
            <p style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--muted-txt)",
              marginBottom: "32px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto"
            }}>
              OptimumAI is a research-first education company founded in 2022. We build the programmes, tools, and
              community infrastructure that turn ambitious people into practising AI researchers and engineers.
            </p>

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
                "The gap between academic AI research and accessible education was enormous. The best techniques
                were locked inside elite labs and paywalled journals. Talented people everywhere had no path into the field."
              </p>
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
                <Link href="/community" className="opt-btn-ghost">
                  Join Community
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
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Ready to begin?</p>
            <p className="opt-cta-headline">
              Start your journey toward<br />the agentic era.
            </p>
            <div className="opt-cta-actions">
              <Link href="/signup" className="opt-btn-primary">
                Apply Now <ArrowRight size={13} />
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
