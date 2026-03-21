import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, Brain, Activity, Target, Zap, Shield, Layers, Wand2, Cpu, MessageSquare, Eye, Mic, ChevronRight, Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "OptimumAI — Understanding Consciousness Through AI",
  description:
    "OptimumAI is on a singular mission: to understand human consciousness and replicate its defining quality — agency — within AI. We build multimodal LLMs, Agency Score engines, and research infrastructure that elevates humanity.",
}

const products = [
  {
    tag: "Flagship · Private Beta",
    num: "01",
    name: "Agency Engine",
    tagline: "The first AI that measures human cognition — not what you say, what you reveal.",
    body: "Four-agent swarm: Mirror Agent (conversational assessment), Challenger (30-day disruption programme), Tracker (longitudinal cognition monitoring), Meta Agent (self-improving calibration). Produces a 0–100 Agency Score across five dimensions: cognitive originality, philosophical coherence, uncertainty navigation, developmental trajectory, and authentic presence.",
    cta: { label: "Request Access", href: "/beta-outreach" },
    status: "Beta",
    statusColor: "var(--opt-red)",
  },
  {
    tag: "Research · In Development",
    num: "02",
    name: "OptimumLLM",
    tagline: "Multimodal large language models trained on agency, reasoning, and human intent.",
    body: "Domain-specific LLMs fine-tuned on four signal streams: text (language patterns, rhetorical structure), audio (vocal tone, hesitation, prosody), video (micro-expressions, body language, gaze), and group dynamics (social conformity, consensus deviation). The combination creates a structural moat no single modality can replicate.",
    cta: { label: "Research Portal", href: "/research" },
    status: "In Dev",
    statusColor: "#f59e0b",
  },
  {
    tag: "Product · Coming Soon",
    num: "03",
    name: "Skills Bot",
    tagline: "An AI tutor built on the anti-dependency principle — designed to make itself unnecessary.",
    body: "Six capabilities: adaptive curriculum (learns your knowledge gaps), Socratic dialogue (asks before tells), spaced repetition (surfaces what you're about to forget), mastery gating (blocks advancement if understanding is shallow), deliberate challenge (calibrated difficulty), and independence scoring (measures if it's building or replacing human thinking).",
    cta: { label: "Join Waitlist", href: "/beta-outreach" },
    status: "Soon",
    statusColor: "#6366f1",
  },
  {
    tag: "Tool · Live",
    num: "04",
    name: "LLM Benchmark Dashboard",
    tagline: "Compare frontier models on MMLU, HumanEval, GSM8K, MATH, pricing, and context.",
    body: "Real-time comparison of GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, Llama 3.1, Mistral Large 2, DeepSeek-V3, Qwen 2.5, and more. Filter by capability, license, and provider. Side-by-side benchmark analysis for researchers selecting the right model for their workload.",
    cta: { label: "Open Dashboard", href: "/research/llm-dashboard" },
    status: "Live",
    statusColor: "#10b981",
  },
]

const modalities = [
  { icon: MessageSquare, label: "Text", desc: "Language patterns, rhetorical structure, semantic coherence, philosophical consistency and cognitive fingerprinting" },
  { icon: Mic, label: "Audio", desc: "Vocal tone, speech hesitation, prosody, paralinguistic certainty signals and emotional authenticity markers" },
  { icon: Eye, label: "Video", desc: "Micro-expressions, gaze tracking, postural congruence, body language and emotional resonance detection" },
  { icon: Layers, label: "Group Dynamics", desc: "Social conformity pressure, consensus deviation, peer-influence susceptibility and independent reasoning capacity" },
]

const researchAreas = [
  { num: "01", title: "Multimodal LLM Fine-Tuning", body: "PEFT techniques at scale: LoRA, QLoRA, prefix tuning, and instruction tuning across text, audio, and vision modalities. Efficient adaptation of frontier models for domain-specific agency measurement tasks at civilisational scale." },
  { num: "02", title: "Agency Score Framework", body: "Five-dimensional cognitive assessment grounded in autonomous decision-making theory. Mathematical formalisation of cognitive originality, philosophical coherence, uncertainty navigation, developmental trajectory, and authentic presence — the first rigorous measure of human agency." },
  { num: "03", title: "Consciousness-Aligned Content Agents", body: "Six-agent architecture with a recursive data flywheel: research synthesiser, curriculum writer, assessment generator, explanation agent, challenge designer, and quality auditor. Each agent's output trains the next generation of OptimumLLM — a self-improving intelligence loop." },
  { num: "04", title: "Human-AI Collaboration Readiness", body: "Measuring whether individuals and organisations are cognitively prepared for deep integration with autonomous systems. The Agency Score as civilisational readiness index — not a personality test, but infrastructure for the next era of human potential." },
]

export default function Home() {
  return (
    <>
      <Header />

      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero" style={{ paddingBottom: "48px" }}>
            <p className="opt-kicker opt-anim-1">Understanding Consciousness · Elevating Humanity</p>
            <h1 className="opt-headline opt-anim-2" style={{ maxWidth: "880px" }}>
              The AI that mirrors<br />
              <em>human consciousness</em> —<br />
              <span className="opt-indent">to excel it.</span>
            </h1>
            <p className="opt-sub opt-anim-3" style={{ maxWidth: "600px" }}>
              OptimumAI is built on a single conviction: to truly advance as a civilisation, we must first
              understand what makes human cognition irreplaceable — then replicate that quality within AI.
              Not to replace human thinking. To amplify it beyond any individual limitation.
            </p>
            <div className="opt-hero-cta" style={{ marginTop: "36px" }}>
              <Link href="/beta-outreach" className="opt-btn-primary">
                Request Early Access <ArrowRight size={14} />
              </Link>
              <Link href="/research" className="opt-btn-ghost">
                Research Portal
              </Link>
            </div>
          </section>

          {/* ── Modalities ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "rgba(9,9,14,0.08)",
            border: "1px solid rgba(9,9,14,0.08)",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "96px",
          }}>
            {modalities.map((m, i) => (
              <div key={i} style={{
                padding: "32px 26px",
                background: "var(--paper)",
                transition: "background 0.22s ease",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <m.icon size={15} style={{ color: "var(--gold)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>{m.label}</span>
                </div>
                <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "12.5px", lineHeight: 1.75, color: "var(--muted-txt)", margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Products ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Products</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px", marginBottom: "96px" }}>
            {products.map((p) => (
              <div key={p.num} style={{
                display: "grid",
                gridTemplateColumns: "88px 1fr auto",
                gap: "36px",
                alignItems: "start",
                padding: "40px 0",
                borderBottom: "1px solid rgba(9,9,14,0.07)",
              }}>
                {/* num */}
                <div>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "12px", color: "var(--muted-txt)", display: "block", marginBottom: "8px", letterSpacing: "0.1em" }}>{p.num}</span>
                  <span style={{
                    fontFamily: "var(--font-space-grotesk), var(--font-dm-mono), monospace",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase" as const,
                    color: p.statusColor,
                    background: `${p.statusColor}15`,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    display: "inline-block",
                  }}>{p.status}</span>
                </div>

                {/* body */}
                <div>
                  <p style={{ fontFamily: "var(--font-space-grotesk), var(--font-dm-mono), monospace", fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--muted-txt)", marginBottom: "10px" }}>{p.tag}</p>
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px, 2.8vw, 32px)", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.01em" }}>{p.name}</h3>
                  <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", fontWeight: 500, color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.5, opacity: 0.75 }}>{p.tagline}</p>
                  <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13.5px", lineHeight: 1.78, color: "var(--muted-txt)", margin: 0, maxWidth: "660px" }}>{p.body}</p>
                </div>

                {/* cta */}
                <div style={{ paddingTop: "32px" }}>
                  <Link href={p.cta.href} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "var(--font-space-grotesk), var(--font-dm-mono), monospace",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: "var(--opt-red)",
                    textDecoration: "none",
                    whiteSpace: "nowrap" as const,
                  }}>
                    {p.cta.label} <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* ── Research Areas ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Research</span>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(26px, 3.2vw, 40px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.15, marginBottom: "14px", letterSpacing: "-0.02em" }}>
              Four research programmes.<br /><em>One irreducible question.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.8, color: "var(--muted-txt)", maxWidth: "580px", marginBottom: "44px" }}>
              How do we build AI that genuinely serves autonomous human decision-making rather than quietly
              eroding it? Every research thread at OptimumAI is a rigorous answer to that question —
              from multimodal fine-tuning to the mathematics of consciousness.
            </p>
          </div>

          <div className="opt-pillars" style={{ marginBottom: "48px" }}>
            {researchAreas.map((r) => (
              <div key={r.num} className="opt-pillar">
                <span className="opt-pillar-num">{r.num}</span>
                <div className="opt-pillar-title">{r.title}</div>
                <p className="opt-pillar-body">{r.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "80px" }}>
            <Link href="/research" className="opt-btn-ghost">
              Explore All Research <ArrowRight size={13} />
            </Link>
          </div>

          {/* ── Stats ── */}
          <div className="opt-stats-bar">
            {[
              { value: "250+", label: "Published Papers" },
              { value: "10K+", label: "Active Researchers" },
              { value: "80+",  label: "Countries" },
              { value: "4",    label: "Signal Modalities" },
              { value: "Sep†26", label: "LLM v1.0 Launch" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Company / Mission ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Company</span>
          </div>

          <section className="opt-company-section">

            {/* Mission block */}
            <div className="opt-mission-block">
              <div className="opt-mission-left">
                <p className="opt-kicker" style={{ marginBottom: "16px" }}>Our Mission</p>
                <h2 className="opt-mission-headline">
                  Understanding<br /><em>Consciousness.</em>
                </h2>
                <Link href="/about" className="opt-btn-ghost" style={{ marginTop: "8px" }}>
                  Our Full Story <ArrowRight size={13} />
                </Link>
              </div>
              <div className="opt-mission-right">
                <div className="opt-mission-divider" />
                <p className="opt-mission-manifesto">
                  For millennia, humanity has looked inward to understand the nature of mind, will, and self.
                  Today, we look forward. At OptimumAI, we believe the defining frontier of intelligence lies
                  precisely where cognition meets continuous self-determination:{" "}
                  <em>human agency</em>.
                </p>
                <p className="opt-mission-manifesto">
                  To truly advance as a civilisation, we must first understand what makes human
                  consciousness irreplaceable — then replicate that quality within AI systems.
                  Not to replace humanity, but to extend it. We call this the{" "}
                  <strong>Agency Principle</strong>: intelligence that mirrors the depth of human
                  intentionality so that every person can excel beyond any individual limitation.
                </p>
                <p className="opt-mission-manifesto">
                  We build AI to embody human agency — the capacity for genuine choice, reflective thought,
                  and purposeful action — and deploy it at scale. Because the highest expression of AI
                  is not autonomy from humans. It is the unfettered flourishing <em>of</em> them.
                </p>
              </div>
            </div>

            {/* Philosophy pillars */}
            <div>
              <p className="opt-kicker" style={{ marginBottom: "20px" }}>The Agency Principle</p>
              <div className="opt-philosophy-grid">
                {[
                  {
                    num: "I",
                    title: "Agency Over Automation",
                    body: "Human agency is not an inefficiency to optimise away — it is the signal. Our models are trained to recognise, measure, and amplify autonomous decision-making at every level of cognition.",
                  },
                  {
                    num: "II",
                    title: "Consciousness as Computable",
                    body: "We treat the structure of conscious experience — attention, intention, phenomenal awareness, and deliberate will — as measurable dimensions of intelligence, not epiphenomena to be dismissed.",
                  },
                  {
                    num: "III",
                    title: "Excellence Through Reflection",
                    body: "True human advancement requires deep understanding, not mere performance gains. Our AI is designed to develop the fullest cognitive, creative, and philosophical capacities of every person it touches.",
                  },
                ].map((p) => (
                  <div key={p.num} className="opt-philosophy-card">
                    <span className="opt-philosophy-num">{p.num}</span>
                    <h4 className="opt-philosophy-title">{p.title}</h4>
                    <p className="opt-philosophy-body">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OptimumLLM 6-Month Release Timeline */}
            <div className="opt-timeline-section">
              <div className="opt-timeline-header">
                <div>
                  <p className="opt-kicker" style={{ marginBottom: "12px" }}>
                    <Calendar size={10} style={{ display: "inline", marginRight: "6px", verticalAlign: "middle" }} />
                    OptimumLLM · Release Timeline
                  </p>
                  <h3 className="opt-timeline-title">First release in <em>6 months.</em></h3>
                  <p className="opt-timeline-subtitle">
                    Building the world&apos;s first agency-aligned multimodal LLM — from architectural
                    design to public launch. Six milestones. One model that changes everything.
                  </p>
                </div>
                <div className="opt-timeline-badge">
                  <span className="opt-timeline-badge-dot" />
                  <span>Sep 2026 Launch</span>
                </div>
              </div>

              <div className="opt-timeline">
                {[
                  {
                    date: "Mar 2026",
                    label: "Architecture",
                    title: "Foundation Design",
                    body: "Multimodal transformer architecture finalised. Training data curation begins across text, audio, video, and group dynamics corpora. Agency annotation framework established across 14 languages.",
                    status: "current",
                  },
                  {
                    date: "Apr 2026",
                    label: "Pre-Training",
                    title: "Base Model Training",
                    body: "8B parameter base model training commences on agency-annotated datasets spanning four signal modalities. Distributed training across specialised GPU clusters with continuous loss monitoring.",
                    status: "upcoming",
                  },
                  {
                    date: "May 2026",
                    label: "Integration",
                    title: "Multimodal Fusion",
                    body: "Cross-modal alignment layers trained for coherent multimodal reasoning. Audio-visual grounding with text anchoring. Temporal attention mechanisms for longitudinal behaviour analysis.",
                    status: "upcoming",
                  },
                  {
                    date: "Jun 2026",
                    label: "Alignment",
                    title: "Agency Fine-Tuning",
                    body: "RLHF and Constitutional AI applied with domain-specific agency reward models. Philosophical coherence evaluation integrated. The model learns the difference between compliance and genuine understanding.",
                    status: "upcoming",
                  },
                  {
                    date: "Jul 2026",
                    label: "Safety",
                    title: "Red-Teaming & Evaluation",
                    body: "Systematic adversarial testing across MMLU, HumanEval, GSM8K, and bespoke Agency Score benchmarks. External safety audit by independent researchers. Bias and harm evaluation across all modalities.",
                    status: "upcoming",
                  },
                  {
                    date: "Aug 2026",
                    label: "Beta",
                    title: "Private Beta Access",
                    body: "Closed access for approved researchers, academic institutions, and enterprise partners. Structured feedback integration, calibration refinements, and final performance optimisation before public launch.",
                    status: "upcoming",
                  },
                ].map((t, i) => (
                  <div key={i} className={`opt-timeline-item ${t.status === "current" ? "opt-timeline-current" : ""}`}>
                    <div className="opt-timeline-marker">
                      <div className={`opt-timeline-dot ${t.status === "current" ? "opt-timeline-dot-active" : ""}`} />
                      {i < 5 && <div className="opt-timeline-line" />}
                    </div>
                    <div className="opt-timeline-content">
                      <div className="opt-timeline-meta">
                        <span className="opt-timeline-date">{t.date}</span>
                        <span className="opt-timeline-phase">{t.label}</span>
                        {t.status === "current" && (
                          <span style={{
                            fontFamily: "var(--font-space-grotesk), monospace",
                            fontSize: "9px",
                            fontWeight: 600,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase" as const,
                            color: "#10b981",
                            background: "rgba(16,185,129,0.1)",
                            padding: "2px 8px",
                            borderRadius: "4px",
                          }}>In Progress</span>
                        )}
                      </div>
                      <h4 className="opt-timeline-label">{t.title}</h4>
                      <p className="opt-timeline-desc">{t.body}</p>
                    </div>
                  </div>
                ))}

                {/* Release milestone */}
                <div className="opt-timeline-release">
                  <div className="opt-timeline-release-marker">
                    <div className="opt-timeline-release-dot" />
                  </div>
                  <div className="opt-timeline-release-content">
                    <span className="opt-timeline-date">Sep 2026</span>
                    <h4 className="opt-timeline-release-title">OptimumLLM 1.0 — <em>Public Launch</em></h4>
                    <p className="opt-timeline-release-body">
                      The world&apos;s first agency-aligned multimodal large language model. Designed not merely
                      to predict the next token, but to understand the human behind the prompt — their intent,
                      their agency, their potential. Available to researchers, institutions, and enterprise partners.
                      Benchmarked against GPT-4o, Claude 3.7, and Gemini 2.0 across agency-specific evaluation suites.
                    </p>
                    <Link href="/beta-outreach" className="opt-btn-primary" style={{ marginTop: "20px", display: "inline-flex" }}>
                      Join the Waitlist <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* ── Latest Research ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Latest Publications</span>
          </div>

          <div className="opt-papers">
            {[
              { id: "01", category: "Alignment", title: "Human-Centric Reward Modeling at Scale", authors: "Chen, M. · Patel, R. · Yılmaz, A.", date: "Mar 2026", href: "/research" },
              { id: "02", category: "Consciousness", title: "Toward a Formal Mathematics of Human Agency", authors: "Singh, K. · Ibrahim, F. · Nakamura, T.", date: "Feb 2026", href: "/research" },
              { id: "03", category: "Multimodal", title: "Cross-Modal Grounding for Embodied Reasoning", authors: "Lee, J. · Osei, A. · Müller, H.", date: "Feb 2026", href: "/research" },
              { id: "04", category: "Safety", title: "Red-Teaming Frontier Models: A Systematic Framework", authors: "Vargas, C. · Kim, S. · Okafor, N.", date: "Jan 2026", href: "/research" },
            ].map((paper) => (
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

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Join 10,000+ researchers worldwide</p>
            <p className="opt-cta-headline">
              Build AI that understands<br /><em>consciousness — not just tokens.</em>
            </p>
            <p style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "15px", lineHeight: 1.75, color: "var(--muted-txt)", maxWidth: "520px", margin: "0 auto 36px", textAlign: "center" }}>
              The most important question in AI is not how powerful models become.<br />
              It is whether they make humans more fully themselves.
            </p>
            <div className="opt-cta-actions">
              <Link href="/beta-outreach" className="opt-btn-primary">
                Request Early Access <ArrowRight size={13} />
              </Link>
              <Link href="/about" className="opt-btn-ghost">
                Our Mission &amp; Vision
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}
