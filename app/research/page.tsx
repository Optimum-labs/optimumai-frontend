"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Brain, FlaskConical, BarChart3, ChevronRight, ExternalLink, Cpu, Zap, FileText } from "lucide-react"
import Link from "next/link"

export default function ResearchPage() {
  const assessmentCategories = [
    {
      label: "VALIDATE YOUR UNDERSTANDING OF AGENTIC AI",
      title: "Agentic AI Essentials",
      quizzes: [
        { title: "Workflows vs Agents", desc: "Test your understanding of workflows vs agents, use case selection, and essential tools.", slug: "agentic-workflows-quiz", difficulty: "Beginner" },
        { title: "Prompt Engineering", desc: "Check your understanding of LLM basics, prompt templates, system prompts, and reasoning techniques.", slug: "prompt-engineering-quiz", difficulty: "Beginner" },
        { title: "Output Parsing & Function Chaining", desc: "Validate your knowledge of LLM structured output parsing and function chaining.", slug: "output-parsing-quiz", difficulty: "Intermediate" },
        { title: "Conversational Memory Management", desc: "Test your understanding of managing and persisting conversational memory in AI assistants.", slug: "memory-management-quiz", difficulty: "Intermediate" },
      ],
    },
    {
      label: "TEST YOUR KNOWLEDGE OF LLM ENGINEERING",
      title: "LLM Engineering & Deployment",
      quizzes: [
        { title: "LLM Pre-Assessment", desc: "Find out if you're ready for hands-on LLM fine-tuning and deployment. Get a score plus personalized prep recommendations.", slug: "llm-preassessment", difficulty: "Mixed" },
        { title: "LLM Fundamentals", desc: "Test your understanding of language model architectures, fine-tuning approaches, and model evaluation.", slug: "llm-fundamentals-quiz", difficulty: "Intermediate" },
        { title: "Fine-Tuning Building Blocks", desc: "Test your knowledge of masking, tokenization, quantization, LoRA/QLoRA, and parameter-efficient fine-tuning techniques.", slug: "fine-tuning-quiz", difficulty: "Advanced" },
        { title: "RAG Systems & Retrieval", desc: "Assess your knowledge of embedding models, chunking strategies, vector databases, and retrieval optimization.", slug: "rag-quiz", difficulty: "Intermediate" },
      ],
    },
  ]

  const publicationCategories = [
    { icon: Brain, title: "Agentic AI", desc: "Autonomous agents, multi-agent systems, and advanced language models reshaping how AI systems interact and decide.", href: "/research/publications?cat=agentic-ai", count: 47 },
    { icon: Cpu, title: "Computer Vision", desc: "Advanced implementations in visual understanding, from real-time object detection to complex multi-modal vision systems.", href: "/research/publications?cat=computer-vision", count: 35 },
    { icon: Zap, title: "Reinforcement Learning", desc: "Innovations in autonomous decision-making, from game-playing agents to real-world robotic control systems.", href: "/research/publications?cat=rl", count: 28 },
    { icon: FileText, title: "NLP & Text", desc: "Work in text classification, summarization, translation, question answering, and other advanced NLP tasks.", href: "/research/publications?cat=nlp", count: 52 },
    { icon: BarChart3, title: "Time Series", desc: "Forecasting, anomaly detection, and temporal pattern recognition across diverse application domains.", href: "/research/publications?cat=timeseries", count: 19 },
    { icon: FlaskConical, title: "Causal AI", desc: "Causal inference, counterfactual analysis, and cause-effect relationship modeling across disciplines.", href: "/research/publications?cat=causal", count: 14 },
  ]

  const recentPublications = [
    { title: "Human-Centric Reward Modeling at Scale", authors: "Chen, M. · Patel, R. · Yılmaz, A.", venue: "NeurIPS 2026", tags: ["RLHF", "Reward Models"] },
    { title: "Toward Persistent Agentic Memory in LLMs", authors: "Singh, K. · Ibrahim, F. · Nakamura, T.", venue: "ICML 2026", tags: ["Agents", "Memory"] },
    { title: "Cross-Modal Grounding for Embodied Reasoning", authors: "Lee, J. · Osei, A. · Müller, H.", venue: "ICLR 2026", tags: ["Multimodal", "Vision-Language"] },
    { title: "Red-Teaming Frontier Models: A Systematic Framework", authors: "Vargas, C. · Kim, S. · Okafor, N.", venue: "ACL 2026", tags: ["Safety", "Evaluation"] },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">Research Portal</p>
            <h1 className="opt-headline opt-anim-2">
              Advance the<br /><em>Science of AI</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Test your knowledge, publish your research, explore LLM benchmarks, and collaborate with a
              global community of AI researchers and practitioners.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <Link href="/research/dashboard" className="opt-btn-primary">Research Dashboard <ArrowRight size={13} /></Link>
              <Link href="/research/publications" className="opt-btn-ghost">Browse Publications</Link>
            </div>
          </section>

          {/* ── Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: "250+", label: "Publications" },
              { value: "15",   label: "Quizzes & Assessments" },
              { value: "10+",  label: "LLMs Tracked" },
              { value: "80+",  label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Quick Nav ── */}
          <div className="opt-rule"><span className="opt-rule-text">Research Sections</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "64px" }}>
            {[
              { href: "/research/assessments", icon: Brain, title: "Assessments", desc: "Test your AI knowledge with expert-crafted quizzes on LLMs, agents, and more." },
              { href: "/research/publications", icon: BookOpen, title: "Publications", desc: "Showcase your AI research. All projects — industry, academic, student work welcome." },
              { href: "/research/llm-dashboard", icon: BarChart3, title: "LLM Dashboard", desc: "Compare frontier models by benchmarks, context window, pricing, and capabilities." },
              { href: "/research/dashboard", icon: FlaskConical, title: "My Dashboard", desc: "Track your publications, assessment scores, and saved LLM comparisons." },
            ].map((item, i) => (
              <Link key={i} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "24px",
                  border: "1px solid rgba(10,10,10,0.1)",
                  background: "rgba(255,255,255,0.4)",
                  transition: "border-color 0.2s, background 0.2s",
                  cursor: "pointer",
                  height: "100%",
                }}>
                  <item.icon size={22} style={{ color: "var(--opt-red)", marginBottom: "14px" }} />
                  <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>{item.title}</div>
                  <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", lineHeight: 1.8, color: "var(--muted-txt)", margin: 0 }}>{item.desc}</p>
                  <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--gold)", fontFamily: "var(--font-dm-mono),monospace" }}>
                    Explore <ChevronRight size={11} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ── Assessments Preview ── */}
          <div className="opt-rule"><span className="opt-rule-text">Test Your Knowledge</span></div>
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>
                  Validate Your AI Skills
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "480px" }}>
                  Expert-crafted assessments covering Agentic AI, LLM Engineering, and production workflows. Get scored and receive personalised study recommendations.
                </p>
              </div>
              <Link href="/research/assessments" className="opt-btn-ghost" style={{ whiteSpace: "nowrap", fontSize: "11px" }}>
                All Assessments <ArrowRight size={11} />
              </Link>
            </div>

            {assessmentCategories.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: "36px" }}>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "16px" }}>{cat.label}</p>
                <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", marginBottom: "16px" }}>{cat.title}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                  {cat.quizzes.map((q, qi) => (
                    <Link key={qi} href={`/research/assessments#${q.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ padding: "18px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)", transition: "border-color 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                          <span style={{ fontFamily: "var(--font-playfair),serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{q.title}</span>
                          <span style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 6px", background: "rgba(10,10,10,0.06)", borderRadius: "2px", color: "var(--muted-txt)", whiteSpace: "nowrap", marginLeft: "8px" }}>{q.difficulty}</span>
                        </div>
                        <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", margin: 0 }}>{q.desc}</p>
                        <div style={{ marginTop: "12px", fontSize: "10px", color: "var(--opt-red)", fontFamily: "var(--font-dm-mono),monospace", display: "flex", alignItems: "center", gap: "4px" }}>
                          Take Quiz <ArrowRight size={10} />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ textAlign: "center", padding: "32px", border: "1px dashed rgba(10,10,10,0.15)", background: "rgba(255,255,255,0.2)" }}>
              <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "12px" }}>More assessments coming soon. Join free and get notified.</p>
              <Link href="/research/signup" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 24px" }}>
                Join the Research Portal <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* ── Publications Preview ── */}
          <div className="opt-rule"><span className="opt-rule-text">Publications</span></div>
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.2 }}>
                  Showcase Your AI Work
                </h2>
                <p style={{ fontSize: "13px", color: "var(--muted-txt)", lineHeight: 1.7, maxWidth: "480px" }}>
                  Publish research, academic projects, industry solutions, and tutorials. All AI/ML work welcome — from student projects to NeurIPS submissions.
                </p>
              </div>
              <Link href="/research/publications" className="opt-btn-ghost" style={{ whiteSpace: "nowrap", fontSize: "11px" }}>
                All Publications <ArrowRight size={11} />
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "32px" }}>
              {publicationCategories.map((cat, i) => (
                <Link key={i} href={cat.href} style={{ textDecoration: "none" }}>
                  <div style={{ padding: "20px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)", transition: "border-color 0.2s", height: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <cat.icon size={18} style={{ color: "var(--opt-red)" }} />
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--gold)" }}>{cat.count} papers</span>
                    </div>
                    <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px" }}>{cat.title}</div>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", margin: 0 }}>{cat.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted-txt)", marginBottom: "16px" }}>Recent Publications</p>
              <div className="opt-papers">
                {recentPublications.map((p, i) => (
                  <div key={i} className="opt-paper-row" style={{ cursor: "default" }}>
                    <span className="opt-paper-num">{String(i + 1).padStart(2, "0")}</span>
                    <div className="opt-paper-body">
                      <span className="opt-paper-cat">{p.venue}</span>
                      <span className="opt-paper-title">{p.title}</span>
                      <span className="opt-paper-authors">{p.authors}</span>
                    </div>
                    <div className="opt-paper-right">
                      <div style={{ display: "flex", gap: "4px" }}>
                        {p.tags.map((t, ti) => <span key={ti} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 6px", background: "rgba(10,10,10,0.06)", borderRadius: "2px", color: "var(--muted-txt)" }}>{t}</span>)}
                      </div>
                      <ExternalLink size={11} className="opt-paper-icon" style={{ marginTop: "4px" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── LLM Dashboard CTA ── */}
          <div className="opt-rule"><span className="opt-rule-text">LLM Intelligence</span></div>
          <div style={{ marginBottom: "64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div style={{ padding: "36px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.4)" }}>
              <BarChart3 size={28} style={{ color: "var(--gold)", marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px", lineHeight: 1.2 }}>LLM Dashboard</h3>
              <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", lineHeight: 1.8, color: "var(--muted-txt)", marginBottom: "20px" }}>
                Compare 10+ frontier models side-by-side. Benchmarks (MMLU, HumanEval, GSM8K), context windows, pricing per token, parameters, capabilities, and more.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {["MMLU, HumanEval, GSM8K, MATH benchmarks", "Context window — 4K to 1M tokens", "Pricing per 1M input/output tokens", "Capabilities: text, code, vision, function calling", "Provider — OpenAI, Anthropic, Google, Meta, Mistral"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/research/llm-dashboard" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 22px" }}>
                Open LLM Dashboard <ArrowRight size={11} />
              </Link>
            </div>
            <div style={{ padding: "36px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.4)" }}>
              <FlaskConical size={28} style={{ color: "var(--opt-red)", marginBottom: "16px" }} />
              <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "10px", lineHeight: 1.2 }}>Research Dashboard</h3>
              <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", lineHeight: 1.8, color: "var(--muted-txt)", marginBottom: "20px" }}>
                Your personal research portal. Track publications, view assessment scores, manage saved LLM comparisons, and connect with collaborators.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                {["Publication management & submission", "Assessment history & scores", "Saved LLM comparisons", "Collaboration requests & notifications", "Research profile & citations"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--opt-red)", flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="/research/login" className="opt-btn-primary" style={{ fontSize: "11px", padding: "10px 22px" }}>
                  Log In <ArrowRight size={11} />
                </Link>
                <Link href="/research/signup" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "10px 22px" }}>
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>

          {/* ── Publish CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Publish Your Research</p>
            <p className="opt-cta-headline">
              Share AI innovations<br />with the world.
            </p>
            <p className="opt-pillar-body" style={{ maxWidth: "560px", margin: "0 auto 28px", textAlign: "center" }}>
              Publish research, academic projects, implementations, and industry solutions with code, data, and documentation. Join free and get your first publication live in under an hour.
            </p>
            <div className="opt-cta-actions">
              <Link href="/research/signup" className="opt-btn-primary">Start Publishing — Free <ArrowRight size={13} /></Link>
              <Link href="/research/publications" className="opt-btn-ghost">Browse All Publications</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
