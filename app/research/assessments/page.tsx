"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Clock, Trophy, Brain, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Quiz = {
  title: string
  desc: string
  slug: string
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Mixed"
  questions: number
  duration: string
  topics: string[]
  locked?: boolean
}

type Category = {
  label: string
  title: string
  quizzes: Quiz[]
}

export default function AssessmentsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [startedQuiz, setStartedQuiz] = useState<string | null>(null)
  const [quizScore, setQuizScore] = useState<Record<string, number>>({})

  const categories: Category[] = [
    {
      label: "VALIDATE YOUR UNDERSTANDING OF AGENTIC AI",
      title: "Agentic AI Essentials",
      quizzes: [
        {
          title: "Workflows vs Agents",
          desc: "Test your understanding of the fundamental differences between deterministic workflows and autonomous AI agents, including use case selection frameworks and essential tools for building agentic systems.",
          slug: "agentic-workflows-quiz",
          difficulty: "Beginner",
          questions: 10,
          duration: "12 min",
          topics: ["Agent Architecture", "Use Case Selection", "LangChain", "AutoGPT"],
        },
        {
          title: "Prompt Engineering Fundamentals",
          desc: "Check your understanding of LLM basics, prompt templates, system prompts, zero-shot vs few-shot learning, and chain-of-thought reasoning techniques that power modern AI systems.",
          slug: "prompt-engineering-quiz",
          difficulty: "Beginner",
          questions: 12,
          duration: "15 min",
          topics: ["System Prompts", "Few-Shot Learning", "Chain-of-Thought", "Prompt Templates"],
        },
        {
          title: "Output Parsing & Function Chaining",
          desc: "Validate your knowledge of LLM structured output parsing, JSON schemas, function chaining patterns, and tool selection strategies for building reliable agentic pipelines.",
          slug: "output-parsing-quiz",
          difficulty: "Intermediate",
          questions: 10,
          duration: "12 min",
          topics: ["JSON Output", "Function Calling", "Tool Use", "Output Validation"],
        },
        {
          title: "Conversational Memory Management",
          desc: "Test your understanding of managing and persisting conversational memory in AI assistants — buffer memory, summary memory, vector store memory, and context window optimisation.",
          slug: "memory-management-quiz",
          difficulty: "Intermediate",
          questions: 10,
          duration: "12 min",
          topics: ["Buffer Memory", "Summary Memory", "Vector Memory", "Context Windows"],
        },
      ],
    },
    {
      label: "TEST YOUR KNOWLEDGE OF LLM ENGINEERING",
      title: "LLM Engineering & Deployment",
      quizzes: [
        {
          title: "LLM Readiness Pre-Assessment",
          desc: "Find out if you're ready for hands-on LLM fine-tuning and deployment. Get a detailed score across key knowledge areas plus personalised study recommendations to close your gaps.",
          slug: "llm-preassessment",
          difficulty: "Mixed",
          questions: 20,
          duration: "25 min",
          topics: ["Self-Assessment", "Personalised Recommendations", "Knowledge Gap Analysis"],
        },
        {
          title: "LLM Architecture Fundamentals",
          desc: "Test your understanding of language model architectures — transformers, attention mechanisms, tokenisation, fine-tuning approaches, and model evaluation methodologies used at leading AI labs.",
          slug: "llm-fundamentals-quiz",
          difficulty: "Intermediate",
          questions: 15,
          duration: "18 min",
          topics: ["Transformers", "Attention", "Tokenisation", "Model Evaluation"],
        },
        {
          title: "Fine-Tuning Building Blocks",
          desc: "Test your knowledge of masking, tokenization, quantization, LoRA, QLoRA, and parameter-efficient fine-tuning techniques. Designed for engineers ready to work with production-grade LLM training pipelines.",
          slug: "fine-tuning-quiz",
          difficulty: "Advanced",
          questions: 15,
          duration: "20 min",
          topics: ["LoRA", "QLoRA", "PEFT", "Quantization", "Instruction Tuning"],
        },
        {
          title: "RAG Systems & Retrieval",
          desc: "Assess your knowledge of embedding models, chunking strategies, vector databases, reranking algorithms, and advanced RAG architectures for production retrieval-augmented generation systems.",
          slug: "rag-quiz",
          difficulty: "Intermediate",
          questions: 12,
          duration: "15 min",
          topics: ["Vector Databases", "Embeddings", "Chunking", "Reranking", "RAG Evaluation"],
          locked: true,
        },
      ],
    },
    {
      label: "ADVANCED TOPICS FOR EXPERIENCED PRACTITIONERS",
      title: "Advanced AI Topics",
      quizzes: [
        {
          title: "AI Safety & Alignment",
          desc: "Test your knowledge of AI alignment research, RLHF, Constitutional AI, red-teaming methodologies, and safety evaluation frameworks used at frontier AI labs.",
          slug: "ai-safety-quiz",
          difficulty: "Advanced",
          questions: 12,
          duration: "18 min",
          topics: ["RLHF", "Constitutional AI", "Red-Teaming", "Alignment Research"],
          locked: true,
        },
        {
          title: "Multi-Agent Systems",
          desc: "Validate your understanding of multi-agent orchestration, communication protocols, consensus mechanisms, and coordination strategies for complex agentic workflows.",
          slug: "multi-agent-quiz",
          difficulty: "Advanced",
          questions: 10,
          duration: "15 min",
          topics: ["Agent Orchestration", "Communication Protocols", "Consensus", "ReAct"],
          locked: true,
        },
      ],
    },
  ]

  const difficultyColour: Record<string, string> = {
    Beginner: "#2a7d4f",
    Intermediate: "var(--gold)",
    Advanced: "var(--opt-red)",
    Mixed: "#6b5cf6",
  }

  const allQuizzes = categories.flatMap((c) => c.quizzes)
  const filters = ["all", "Beginner", "Intermediate", "Advanced", "Mixed"]

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    quizzes: cat.quizzes.filter((q) => activeFilter === "all" || q.difficulty === activeFilter),
  })).filter((cat) => cat.quizzes.length > 0)

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">AI Knowledge Assessments</p>
            <h1 className="opt-headline opt-anim-2">
              Test Your<br /><em>AI Knowledge</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Validate your skills in Agentic AI development, LLM engineering, and production workflows.
              Get scored, identify gaps, and receive personalised study recommendations.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <a href="#assessments" className="opt-btn-primary">Start an Assessment <ArrowRight size={13} /></a>
              <Link href="/research/signup" className="opt-btn-ghost">Join Free — Get Notified</Link>
            </div>
          </section>

          {/* ── Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: String(allQuizzes.length), label: "Active Assessments" },
              { value: allQuizzes.filter((q) => !q.locked).length.toString(), label: "Free to Take" },
              { value: "1,200+", label: "Assessments Completed" },
              { value: "4.8/5", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── How It Works ── */}
          <div className="opt-rule"><span className="opt-rule-text">How Assessments Work</span></div>
          <div className="opt-pillars" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "48px" }}>
            {[
              { num: "01", title: "Pick a Topic", body: "Choose from Agentic AI, LLM Engineering, RAG Systems, Fine-Tuning, or AI Safety. Each assessment is designed by domain experts." },
              { num: "02", title: "Take the Quiz", body: "Answer multiple-choice and scenario-based questions. No time pressure on most quizzes — take your time to reason through each question." },
              { num: "03", title: "Get Your Score", body: "Receive an immediate score, topic-by-topic breakdown, and personalised recommendations for what to study next to close your gaps." },
            ].map((p) => (
              <div key={p.num} className="opt-pillar" style={{ borderBottom: "none" }}>
                <span className="opt-pillar-num">{p.num}</span>
                <div className="opt-pillar-title">{p.title}</div>
                <p className="opt-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>

          {/* ── Filter ── */}
          <div className="opt-rule" id="assessments"><span className="opt-rule-text">Browse Assessments</span></div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  fontFamily: "var(--font-dm-mono),monospace",
                  fontSize: "11px",
                  padding: "6px 14px",
                  border: "1px solid",
                  borderColor: activeFilter === f ? "var(--ink)" : "rgba(10,10,10,0.2)",
                  background: activeFilter === f ? "var(--ink)" : "transparent",
                  color: activeFilter === f ? "var(--cream)" : "var(--muted-txt)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {f === "all" ? "All Levels" : f}
              </button>
            ))}
          </div>

          {/* ── Quiz Categories ── */}
          {filteredCategories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: "48px" }}>
              <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>{cat.label}</p>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "24px" }}>{cat.title}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {cat.quizzes.map((q, qi) => (
                  <div
                    key={qi}
                    id={q.slug}
                    style={{
                      padding: "24px",
                      border: "1px solid rgba(10,10,10,0.1)",
                      background: q.locked ? "rgba(10,10,10,0.02)" : "rgba(255,255,255,0.4)",
                      position: "relative",
                      opacity: q.locked ? 0.75 : 1,
                    }}
                  >
                    {q.locked && (
                      <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                        <Lock size={14} style={{ color: "var(--muted-txt)" }} />
                      </div>
                    )}
                    {quizScore[q.slug] !== undefined && (
                      <div style={{ position: "absolute", top: "16px", right: "16px", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontFamily: "var(--font-dm-mono),monospace", color: "#2a7d4f" }}>
                        <CheckCircle size={12} /> {quizScore[q.slug]}%
                      </div>
                    )}

                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{
                        fontFamily: "var(--font-dm-mono),monospace",
                        fontSize: "9px",
                        padding: "3px 8px",
                        background: "rgba(10,10,10,0.06)",
                        borderRadius: "2px",
                        color: difficultyColour[q.difficulty],
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}>
                        {q.difficulty}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.3 }}>{q.title}</h3>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", lineHeight: 1.75, color: "var(--muted-txt)", marginBottom: "16px" }}>{q.desc}</p>

                    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                        <Trophy size={11} /> {q.questions} questions
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                        <Clock size={11} /> {q.duration}
                      </span>
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "20px" }}>
                      {q.topics.map((t, ti) => (
                        <span key={ti} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 7px", background: "rgba(10,10,10,0.05)", borderRadius: "2px", color: "var(--muted-txt)" }}>{t}</span>
                      ))}
                    </div>

                    {q.locked ? (
                      <Link href="/research/signup" style={{ textDecoration: "none" }}>
                        <div className="opt-btn-ghost" style={{ fontSize: "11px", padding: "9px 18px", display: "inline-flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                          <Lock size={10} /> Unlock — Join Free
                        </div>
                      </Link>
                    ) : startedQuiz === q.slug ? (
                      <div style={{ padding: "16px", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "2px" }}>
                        <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "#2a7d4f", margin: "0 0 8px" }}>
                          Assessment feature launching soon. <br />Sign up to get early access and be first to try it.
                        </p>
                        <Link href="/research/signup" className="opt-btn-primary" style={{ fontSize: "10px", padding: "8px 16px" }}>
                          Get Early Access <ArrowRight size={10} />
                        </Link>
                      </div>
                    ) : (
                      <button
                        onClick={() => setStartedQuiz(q.slug)}
                        className="opt-btn-primary"
                        style={{ fontSize: "11px", padding: "9px 18px" }}
                      >
                        {quizScore[q.slug] !== undefined ? "Retake Quiz" : "Start Assessment"} <ArrowRight size={11} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ── Coming Soon ── */}
          <div style={{ padding: "40px", border: "1px dashed rgba(10,10,10,0.15)", background: "rgba(255,255,255,0.2)", textAlign: "center", marginBottom: "64px" }}>
            <Brain size={28} style={{ color: "var(--gold)", margin: "0 auto 16px" }} />
            <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>More Assessments Are Coming Soon</h3>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "20px", lineHeight: 1.7, maxWidth: "400px", margin: "0 auto 20px" }}>
              Computer Vision, Reinforcement Learning, MLOps, AI Safety, and Multimodal AI assessments are in development. Join free to get notified when they launch.
            </p>
            <Link href="/research/signup" className="opt-btn-primary" style={{ fontSize: "11px", padding: "11px 26px" }}>
              Join Free — Get Notified <ArrowRight size={11} />
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
