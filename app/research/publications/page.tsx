"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, Github, Upload, Star, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Publication = {
  id: string
  title: string
  authors: string
  venue: string
  year: number
  category: string
  tags: string[]
  abstract: string
  stars: number
  featured?: boolean
}

const publications: Publication[] = [
  {
    id: "pub-001",
    title: "Human-Centric Reward Modeling at Scale",
    authors: "Chen, M. · Patel, R. · Yılmaz, A.",
    venue: "NeurIPS 2026",
    year: 2026,
    category: "agentic-ai",
    tags: ["RLHF", "Reward Models", "Human Feedback", "Alignment"],
    abstract: "We propose a scalable reward modeling framework that incorporates fine-grained human preference data to achieve better alignment in large language models, demonstrating a 23% improvement in human preference metrics.",
    stars: 142,
    featured: true,
  },
  {
    id: "pub-002",
    title: "Toward Persistent Agentic Memory in LLMs",
    authors: "Singh, K. · Ibrahim, F. · Nakamura, T.",
    venue: "ICML 2026",
    year: 2026,
    category: "agentic-ai",
    tags: ["Agents", "Memory", "Long-Context", "Episodic Memory"],
    abstract: "We introduce MemAgent, a framework for persistent episodic memory in LLM-based agents that enables coherent multi-session interactions without context window limitations.",
    stars: 98,
    featured: true,
  },
  {
    id: "pub-003",
    title: "Cross-Modal Grounding for Embodied Reasoning",
    authors: "Lee, J. · Osei, A. · Müller, H.",
    venue: "ICLR 2026",
    year: 2026,
    category: "computer-vision",
    tags: ["Multimodal", "Vision-Language", "Embodied AI", "Grounding"],
    abstract: "A novel cross-modal grounding approach that enables language-guided visual reasoning in embodied environments, achieving state-of-the-art performance on ScanQA and EmbodiedScan benchmarks.",
    stars: 87,
    featured: true,
  },
  {
    id: "pub-004",
    title: "Red-Teaming Frontier Models: A Systematic Framework",
    authors: "Vargas, C. · Kim, S. · Okafor, N.",
    venue: "ACL 2026",
    year: 2026,
    category: "agentic-ai",
    tags: ["Safety", "Red-Teaming", "Evaluation", "Jailbreaking"],
    abstract: "A comprehensive framework for systematically red-teaming frontier language models across 12 risk categories, with automated discovery of novel attack vectors using adversarial agents.",
    stars: 203,
  },
  {
    id: "pub-005",
    title: "Scaling Laws for Multi-Task Learning in Language Models",
    authors: "Liu, M. · Brown, R. · Sato, Y.",
    venue: "NeurIPS 2026",
    year: 2026,
    category: "nlp",
    tags: ["Scaling Laws", "Multi-Task", "Transfer Learning", "LLMs"],
    abstract: "We derive new empirical scaling laws governing multi-task learning in transformer models, demonstrating that task diversity can substitute for model scale at inference time under certain conditions.",
    stars: 175,
  },
  {
    id: "pub-006",
    title: "Efficient Temporal Reasoning via Sparse Attention Patterns",
    authors: "Ogundimu, A. · Stavros, M. · Zhang, W.",
    venue: "EMNLP 2026",
    year: 2026,
    category: "nlp",
    tags: ["Sparse Attention", "Temporal Reasoning", "Efficiency", "Transformers"],
    abstract: "A sparse attention mechanism specifically designed for temporal reasoning tasks, achieving 3.2x inference speedup with equivalent accuracy on benchmarks including TimeQA and TempReason.",
    stars: 56,
  },
  {
    id: "pub-007",
    title: "LoRA-Merge: Composing Multiple LoRA Adapters Without Weight Conflicts",
    authors: "Park, J. · Adeyemi, O. · Schmidt, K.",
    venue: "ICML 2026",
    year: 2026,
    category: "agentic-ai",
    tags: ["LoRA", "Model Merging", "Fine-Tuning", "PEFT"],
    abstract: "We introduce LoRA-Merge, a gradient-aware composition algorithm that combines multiple LoRA adapters trained for different tasks without the catastrophic interference observed in naive weight averaging.",
    stars: 124,
  },
  {
    id: "pub-008",
    title: "Real-Time Object Detection with Lightweight Vision Transformers",
    authors: "Santos, R. · Yoon, H. · Andersen, P.",
    venue: "CVPR 2026",
    year: 2026,
    category: "computer-vision",
    tags: ["Object Detection", "ViT", "Real-Time", "Edge AI"],
    abstract: "A family of lightweight vision transformer architectures for real-time object detection, achieving 45 FPS on mobile hardware while matching ResNet-50 baselines on MS-COCO.",
    stars: 91,
  },
  {
    id: "pub-009",
    title: "Deep Reinforcement Learning for Adaptive Resource Allocation",
    authors: "Petrov, D. · Chukwu, E. · Yamamoto, S.",
    venue: "AAMAS 2026",
    year: 2026,
    category: "rl",
    tags: ["Deep RL", "Resource Allocation", "Multi-Agent", "Policy Gradient"],
    abstract: "A multi-agent deep RL approach for adaptive resource allocation in distributed computing systems, demonstrating 31% reduction in latency and 18% increase in throughput over heuristic baselines.",
    stars: 44,
  },
  {
    id: "pub-010",
    title: "Causal Discovery in High-Dimensional Time Series Data",
    authors: "El-Amin, F. · Kowalski, M. · Nguyen, L.",
    venue: "UAI 2026",
    year: 2026,
    category: "causal",
    tags: ["Causal Discovery", "Time Series", "High-Dimensional", "Granger Causality"],
    abstract: "A regularised constraint-based algorithm for causal discovery in high-dimensional time series, with theoretical guarantees under non-stationarity and practical applications in financial markets.",
    stars: 38,
  },
]

const categories = [
  { key: "all", label: "All Categories" },
  { key: "agentic-ai", label: "Agentic AI" },
  { key: "computer-vision", label: "Computer Vision" },
  { key: "rl", label: "Reinforcement Learning" },
  { key: "nlp", label: "NLP & Text" },
  { key: "timeseries", label: "Time Series" },
  { key: "causal", label: "Causal AI" },
]

export default function PublicationsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortBy, setSortBy] = useState<"recent" | "stars">("recent")
  const [showSubmit, setShowSubmit] = useState(false)

  const filtered = publications
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => sortBy === "stars" ? b.stars - a.stars : b.year - a.year)

  const featured = publications.filter((p) => p.featured)

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">AI/ML Publications</p>
            <h1 className="opt-headline opt-anim-2">
              Showcase Your<br /><em>AI Innovations</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Share your AI research with the world. Publish implementations, academic projects, industry solutions,
              and tutorials — with code, data, and documentation. All AI/ML work welcome.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <button onClick={() => setShowSubmit(true)} className="opt-btn-primary">
                Publish Your Research <Upload size={13} />
              </button>
              <a href="#publications" className="opt-btn-ghost">Browse Publications</a>
            </div>
          </section>

          {/* ── Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: "250+", label: "Publications" },
              { value: "15",   label: "Accepted Venues" },
              { value: "80+",  label: "Countries" },
              { value: "4.9",  label: "Avg. Review Score" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Submit Modal ── */}
          {showSubmit && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
              <div style={{ background: "var(--cream)", padding: "40px", maxWidth: "520px", width: "100%", position: "relative" }}>
                <button onClick={() => setShowSubmit(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--muted-txt)", fontSize: "18px" }}>×</button>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>Submit Publication</p>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "20px" }}>Publish Your First Project</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  {["Initiate your publication. Add co-authors and attach license.", "Link your code repository and datasets (GitHub, HuggingFace, Kaggle).", "Write documentation in markdown and embed charts, images, and tables.", "Upload relevant files including data, PDFs, notebooks.", "Submit for review and publish to the community."].map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: "var(--gold)", minWidth: "20px" }}>{i + 1}.</span>
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", lineHeight: 1.7, color: "var(--muted-txt)" }}>{step}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "16px", lineHeight: 1.6 }}>
                  You need a research account to submit. Sign up free — it takes under 2 minutes.
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <Link href="/research/signup" className="opt-btn-primary" style={{ fontSize: "11px", flex: 1, textAlign: "center", padding: "11px 16px" }}>
                    Create Research Account <ArrowRight size={11} />
                  </Link>
                  <Link href="/research/login" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "11px 16px" }}>
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── Categories ── */}
          <div className="opt-rule"><span className="opt-rule-text">Advanced AI Research</span></div>
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-txt)", marginBottom: "20px" }}>ADVANCED AI RESEARCH & APPLICATIONS</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {[
                { cat: "agentic-ai", title: "Agentic AI", desc: "Autonomous agents, multi-agent systems, and advanced language models reshaping how AI systems interact and make decisions.", tags: ["autonomous-agents", "llm-applications", "multi-agent-systems"] },
                { cat: "computer-vision", title: "Computer Vision", desc: "Advanced implementations in visual understanding — real-time object detection to complex scene interpretation and multi-modal vision.", tags: ["visual-intelligence", "deep-learning", "multi-modal-vision"] },
                { cat: "rl", title: "Reinforcement Learning", desc: "Innovations in autonomous decision-making, from game-playing agents to real-world robotic control and industrial applications.", tags: ["rl-systems", "autonomous-decisions", "deep-rl"] },
              ].map((item, i) => (
                <button key={i} onClick={() => setActiveCategory(item.cat)} style={{ textAlign: "left", padding: "24px", border: `1px solid ${activeCategory === item.cat ? "var(--ink)" : "rgba(10,10,10,0.1)"}`, background: activeCategory === item.cat ? "rgba(10,10,10,0.03)" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "border-color 0.2s" }}>
                  <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px" }}>{item.title}</h3>
                  <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", marginBottom: "12px" }}>{item.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {item.tags.map((t, ti) => <span key={ti} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 6px", background: "rgba(10,10,10,0.06)", borderRadius: "2px", color: "var(--muted-txt)" }}>{t}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ── Applied AI Section ── */}
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-txt)", marginBottom: "20px" }}>PRACTICAL SOLUTIONS FOR REAL-WORLD CHALLENGES</p>
            <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "20px", fontWeight: 700, color: "var(--ink)", marginBottom: "16px" }}>Applied AI/ML and Data Science</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.slice(1).map((c) => (
                <button key={c.key} onClick={() => setActiveCategory(activeCategory === c.key ? "all" : c.key)}
                  style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", padding: "6px 14px", border: "1px solid", borderColor: activeCategory === c.key ? "var(--ink)" : "rgba(10,10,10,0.2)", background: activeCategory === c.key ? "var(--ink)" : "transparent", color: activeCategory === c.key ? "var(--cream)" : "var(--muted-txt)", borderRadius: "2px", cursor: "pointer", transition: "all 0.15s" }}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Featured ── */}
          {activeCategory === "all" && (
            <div style={{ marginBottom: "48px" }}>
              <div className="opt-rule"><span className="opt-rule-text">Featured Publications</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                {featured.map((pub) => (
                  <div key={pub.id} style={{ padding: "24px", border: "2px solid var(--gold)", background: "rgba(255,255,255,0.5)", position: "relative" }}>
                    <span style={{ position: "absolute", top: "16px", right: "16px", fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", padding: "2px 8px", background: "var(--gold)", color: "#fff", borderRadius: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Featured</span>
                    <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--gold)", marginBottom: "8px", display: "block" }}>{pub.venue}</span>
                    <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", marginBottom: "6px", lineHeight: 1.3 }}>{pub.title}</h3>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)", marginBottom: "10px" }}>{pub.authors}</p>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", marginBottom: "12px" }}>{pub.abstract}</p>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {pub.tags.map((t, i) => <span key={i} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 6px", background: "rgba(10,10,10,0.06)", borderRadius: "2px", color: "var(--muted-txt)" }}>{t}</span>)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "10px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Star size={11} style={{ color: "var(--gold)" }} /> {pub.stars}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><ExternalLink size={11} /> Read Paper</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── All Publications ── */}
          <div className="opt-rule" id="publications"><span className="opt-rule-text">{activeCategory === "all" ? "All Publications" : categories.find((c) => c.key === activeCategory)?.label}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)" }}>{filtered.length} publication{filtered.length !== 1 ? "s" : ""}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Filter size={11} style={{ color: "var(--muted-txt)" }} />
              {(["recent", "stars"] as const).map((s) => (
                <button key={s} onClick={() => setSortBy(s)}
                  style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", padding: "4px 10px", border: "1px solid", borderColor: sortBy === s ? "var(--ink)" : "rgba(10,10,10,0.2)", background: sortBy === s ? "var(--ink)" : "transparent", color: sortBy === s ? "var(--cream)" : "var(--muted-txt)", borderRadius: "2px", cursor: "pointer", textTransform: "capitalize" }}>
                  {s === "stars" ? "Most Stars" : "Most Recent"}
                </button>
              ))}
            </div>
          </div>

          <div className="opt-papers" style={{ marginBottom: "48px" }}>
            {filtered.map((pub, i) => (
              <div key={pub.id} className="opt-paper-row" style={{ cursor: "pointer", flexDirection: "column", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ display: "flex", width: "100%", alignItems: "flex-start", gap: "16px" }}>
                  <span className="opt-paper-num">{String(i + 1).padStart(2, "0")}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span className="opt-paper-cat">{pub.venue}</span>
                      {pub.featured && <span style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "1px 6px", background: "var(--gold)", color: "#fff", borderRadius: "2px" }}>Featured</span>}
                    </div>
                    <span className="opt-paper-title">{pub.title}</span>
                    <span className="opt-paper-authors">{pub.authors}</span>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", margin: "6px 0 8px" }}>{pub.abstract}</p>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {pub.tags.map((t, ti) => <span key={ti} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 6px", background: "rgba(10,10,10,0.05)", borderRadius: "2px", color: "var(--muted-txt)" }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", flexShrink: 0 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--muted-txt)" }}>
                      <Star size={10} style={{ color: "var(--gold)" }} /> {pub.stars}
                    </span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--muted-txt)", cursor: "pointer" }}><Github size={11} /></span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "var(--muted-txt)", cursor: "pointer" }}><ExternalLink size={11} /></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Publish CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Your Research Deserves an Audience</p>
            <p className="opt-cta-headline">
              Publish in Under<br />an Hour.
            </p>
            <p className="opt-pillar-body" style={{ maxWidth: "540px", margin: "0 auto 28px", textAlign: "center" }}>
              Write in our Jupyter-like interface or upload existing notebooks. Link GitHub repos, embed visualisations, and use LaTeX for equations. Top publications are featured across our social media feeds on LinkedIn, X, and more.
            </p>
            <div className="opt-cta-actions">
              <button onClick={() => setShowSubmit(true)} className="opt-btn-primary">
                Start Publishing — Free <ArrowRight size={13} />
              </button>
              <Link href="/research" className="opt-btn-ghost">Back to Research Hub</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
