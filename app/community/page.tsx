'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, Calendar, Users, Clock, Code, Brain, Zap, ChevronDown, BookOpen, Play } from "lucide-react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function CommunityPage() {
  return (
    <Suspense>
      <CommunityContent />
    </Suspense>
  )
}

function CommunityContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'bootcamps')
  const [expandedBootcamp, setExpandedBootcamp] = useState<string | null>(null)
  const [expandedLearning, setExpandedLearning] = useState<string | null>(null)

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(tab)
  }, [searchParams])

  const tabs = [
    { key: "bootcamps", label: "Bootcamps" },
    { key: "learnings", label: "Learning" },
    { key: "news",      label: "News" },
    { key: "papers",    label: "Papers" },
  ]

  const bootcamps = [
    {
      id: "01",
      title: "Deep Learning Foundations",
      duration: "8 weeks",
      level: "Beginner",
      students: "1,200+",
      nextStart: "Feb 15, 2026",
      desc: "Start your AI journey with comprehensive deep learning fundamentals. Learn neural network architectures, training techniques, and apply them to real-world computer vision and NLP tasks.",
      topics: ["Neural Networks", "PyTorch", "Computer Vision", "NLP Basics"],
      outcomes: ["Build neural networks from scratch", "Train computer vision models", "Create NLP applications", "Deploy ML models to production"],
    },
    {
      id: "02",
      title: "Advanced LLM Engineering",
      duration: "10 weeks",
      level: "Advanced",
      students: "800+",
      nextStart: "Feb 22, 2026",
      desc: "Master the art of building and deploying large language models. Learn transformer architectures, fine-tuning techniques, RAG implementations, and advanced prompt engineering strategies.",
      topics: ["Transformers", "Fine-tuning", "RAG Systems", "Prompt Engineering"],
      outcomes: ["Fine-tune LLMs for custom tasks", "Build production RAG systems", "Implement advanced prompting techniques", "Optimize model performance"],
    },
    {
      id: "03",
      title: "AI for Computer Vision",
      duration: "8 weeks",
      level: "Intermediate",
      students: "950+",
      nextStart: "Mar 1, 2026",
      desc: "Dive deep into computer vision with state-of-the-art techniques. Master object detection, semantic segmentation, generative models, and real-time video processing.",
      topics: ["Object Detection", "Segmentation", "GANs", "Video Analysis"],
      outcomes: ["Implement object detection systems", "Build semantic segmentation models", "Create generative AI for images", "Process video streams in real-time"],
    },
    {
      id: "04",
      title: "MLOps & AI Infrastructure",
      duration: "6 weeks",
      level: "Intermediate",
      students: "650+",
      nextStart: "Mar 8, 2026",
      desc: "Learn to deploy, monitor, and maintain AI systems at scale. Cover MLOps best practices, containerization, orchestration, and production monitoring.",
      topics: ["CI/CD", "Model Monitoring", "Docker", "Kubernetes"],
      outcomes: ["Build CI/CD pipelines for ML", "Deploy models with Docker/K8s", "Monitor model performance", "Implement A/B testing for models"],
    },
    {
      id: "05",
      title: "Reinforcement Learning",
      duration: "10 weeks",
      level: "Advanced",
      students: "420+",
      nextStart: "Mar 15, 2026",
      desc: "Master reinforcement learning algorithms and applications. Build intelligent agents that learn through interaction, from simple games to complex robotic control.",
      topics: ["Q-Learning", "Policy Gradients", "Multi-Agent RL", "Game AI"],
      outcomes: ["Implement RL algorithms", "Train game-playing agents", "Build robotic control systems", "Design reward functions"],
    },
    {
      id: "06",
      title: "AI Product Management",
      duration: "6 weeks",
      level: "Beginner",
      students: "890+",
      nextStart: "Mar 22, 2026",
      desc: "Learn to build and ship AI-powered products. Cover product strategy, user research, ethical considerations, and go-to-market strategies for AI applications.",
      topics: ["Product Strategy", "User Research", "AI Ethics", "Go-to-Market"],
      outcomes: ["Define AI product strategy", "Conduct user research", "Navigate AI ethics", "Launch AI products successfully"],
    },
  ]

  const learnings = [
    {
      id: "01",
      title: "Understanding Transformers",
      duration: "8 hrs",
      level: "Intermediate",
      lessons: 12,
      desc: "A deep-dive into the transformer architecture that powers modern AI. Covers attention mechanisms, positional encoding, multi-head attention, and the mathematics behind self-attention.",
      topics: ["Self-Attention", "Positional Encoding", "Multi-Head Attention", "Layer Normalization"],
      outcomes: ["Understand attention mechanisms", "Implement transformers from scratch", "Debug common training issues", "Optimize transformer performance"],
    },
    {
      id: "02",
      title: "Fine-tuning Techniques for Production Models",
      duration: "6 hrs",
      level: "Advanced",
      lessons: 9,
      desc: "Master the art of fine-tuning pre-trained models for production deployments. Covers LoRA, QLoRA, PEFT, instruction tuning, and RLHF techniques used at leading AI labs.",
      topics: ["LoRA", "QLoRA", "Instruction Tuning", "RLHF"],
      outcomes: ["Fine-tune models with LoRA", "Apply quantized fine-tuning", "Create instruction-tuned models", "Implement RLHF pipelines"],
    },
    {
      id: "03",
      title: "Evaluation Metrics for Language Models",
      duration: "4 hrs",
      level: "Beginner",
      lessons: 7,
      desc: "Learn how to properly evaluate language model performance. Covers BLEU, ROUGE, perplexity, human evaluation frameworks, and building custom evaluation pipelines.",
      topics: ["BLEU & ROUGE", "Perplexity", "Human Evaluation", "Custom Benchmarks"],
      outcomes: ["Choose the right metrics", "Build evaluation pipelines", "Design human eval frameworks", "Create custom benchmarks"],
    },
    {
      id: "04",
      title: "Efficient Training with Quantization",
      duration: "5 hrs",
      level: "Advanced",
      lessons: 8,
      desc: "Reduce model size and training costs without sacrificing quality. Covers INT8, INT4 quantization, mixed-precision training, knowledge distillation, and model pruning strategies.",
      topics: ["INT8/INT4 Quantization", "Mixed Precision", "Knowledge Distillation", "Model Pruning"],
      outcomes: ["Quantize models for production", "Implement mixed-precision training", "Run knowledge distillation", "Prune models effectively"],
    },
    {
      id: "05",
      title: "Building RAG Pipelines",
      duration: "7 hrs",
      level: "Intermediate",
      lessons: 10,
      desc: "End-to-end guide to retrieval-augmented generation. Covers embedding models, vector databases, chunking strategies, re-ranking, and production-grade RAG architectures.",
      topics: ["Vector Databases", "Embedding Models", "Chunking Strategies", "Re-ranking"],
      outcomes: ["Set up vector databases", "Choose embedding strategies", "Build production RAG systems", "Optimize retrieval quality"],
    },
    {
      id: "06",
      title: "Prompt Engineering Masterclass",
      duration: "4 hrs",
      level: "Beginner",
      lessons: 8,
      desc: "Unlock the full potential of large language models with systematic prompt engineering. Covers chain-of-thought, few-shot learning, tool use, and prompt optimization.",
      topics: ["Chain-of-Thought", "Few-Shot Learning", "Tool Use", "Prompt Optimization"],
      outcomes: ["Write effective prompts", "Implement CoT reasoning", "Build tool-use patterns", "Optimize prompt performance"],
    },
  ]

  const news = [
    { date: "Mar 2026", title: "OptimumAI Launches Agentic AI Research Programme", excerpt: "Our new flagship research initiative explores autonomous AI systems that serve human intent — with 12 open positions for researchers worldwide." },
    { date: "Mar 2026", title: "15 Papers Accepted at Top-Tier Venues This Quarter", excerpt: "Community members achieved record-breaking publications at NeurIPS, ICML, and ICLR, including two best paper nominations." },
    { date: "Feb 2026", title: "Community Milestone: 10,000 Active Researchers", excerpt: "OptimumAI's global community has officially surpassed 10,000 active researchers across 80+ countries." },
    { date: "Feb 2026", title: "Partnership with Leading Universities Expanded", excerpt: "New collaborations with MIT, Stanford, and Oxford bring cutting-edge research opportunities to our community members." },
    { date: "Jan 2026", title: "5 AI Startups Founded by Community Members", excerpt: "Five AI startups, collectively raising $12M in seed funding, were founded by OptimumAI community alumni this quarter." },
  ]

  const papers = [
    { id: "01", venue: "NeurIPS 2026", title: "Human-Centric Reward Modeling at Scale", authors: "Chen, M. · Patel, R. · Yılmaz, A." },
    { id: "02", venue: "ICML 2026",    title: "Toward Persistent Agentic Memory in LLMs", authors: "Singh, K. · Ibrahim, F. · Nakamura, T." },
    { id: "03", venue: "ICLR 2026",    title: "Cross-Modal Grounding for Embodied Reasoning", authors: "Lee, J. · Osei, A. · Müller, H." },
    { id: "04", venue: "ACL 2026",     title: "Red-Teaming Frontier Models: A Systematic Framework", authors: "Vargas, C. · Kim, S. · Okafor, N." },
    { id: "05", venue: "NeurIPS 2026", title: "Scaling Laws for Multi-Task Learning in Language Models", authors: "Liu, M. · Brown, R. · Sato, Y." },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">Community</p>
            <h1 className="opt-headline opt-anim-2">
              Advancing AI Through<br />
              <em>Community</em>.
            </h1>
            <p className="opt-sub opt-anim-3">
              10,000+ researchers across 80 countries solving open problems together.
              Bootcamps, learning resources, published papers — one global community.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <Link href="/community/events" className="opt-btn-primary">
                Upcoming Events <Calendar size={13} />
              </Link>
              <Link href="/community/volunteer" className="opt-btn-ghost">
                Become Ambassador <Users size={13} />
              </Link>
            </div>
          </section>

          {/* ── Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: "500+", label: "AI Projects" },
              { value: "80+",  label: "Countries" },
              { value: "10K+", label: "Learners" },
              { value: "250+", label: "Papers Published" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── What We Do ── */}
          <div className="opt-rule"><span className="opt-rule-text">What We Do</span></div>

          <div className="opt-pillars" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { num: "01", title: "Intensive Bootcamps", body: "Project-based training that transforms beginners into job-ready AI practitioners — covering deep learning foundations through to advanced LLM engineering." },
              { num: "02", title: "Collaborative Research", body: "Global teams working on cutting-edge problems: building LLMs from scratch, fine-tuning techniques, RAG systems, multimodal AI, and agentic systems." },
              { num: "03", title: "Career Opportunities", body: "Exclusive internship and full-time roles at leading AI companies and research labs, with strong conversion rates to permanent positions." },
            ].map((p) => (
              <div key={p.num} className="opt-pillar" style={{ borderBottom: "none" }}>
                <span className="opt-pillar-num">{p.num}</span>
                <div className="opt-pillar-title">{p.title}</div>
                <p className="opt-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>

          {/* ── Tab navigation ── */}
          <div className="opt-rule"><span className="opt-rule-text">Explore</span></div>

          <div className="comm-tabs">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`comm-tab${activeTab === t.key ? " comm-tab--active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Tab: Bootcamps ── */}
          {activeTab === "bootcamps" && (
            <div className="comm-section">
              {bootcamps.map((b) => (
                <div key={b.id} className="comm-expand-item">
                  <div
                    className="comm-row"
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandedBootcamp(expandedBootcamp === b.id ? null : b.id)}
                  >
                    <span className="comm-row-num">{b.id}</span>
                    <div className="comm-row-body">
                      <span className="comm-row-title">{b.title}</span>
                      <span className="comm-row-desc">{b.desc}</span>
                    </div>
                    <div className="comm-row-meta">
                      <span className="comm-tag">{b.duration}</span>
                      <span className="comm-tag">{b.level}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          color: "var(--gold)",
                          transition: "transform 0.25s ease",
                          transform: expandedBootcamp === b.id ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      />
                    </div>
                  </div>

                  {expandedBootcamp === b.id && (
                    <div className="comm-detail">
                      <div className="comm-detail-grid">
                        <div>
                          <span className="comm-detail-label">Topics Covered</span>
                          <div className="comm-detail-tags">
                            {b.topics.map((t, i) => <span key={i} className="comm-tag">{t}</span>)}
                          </div>
                        </div>
                        <div>
                          <span className="comm-detail-label">What You'll Learn</span>
                          <ul className="comm-detail-list">
                            {b.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                          </ul>
                        </div>
                      </div>
                      <div className="comm-detail-footer">
                        <div className="comm-detail-meta">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Users size={12} /> {b.students} students</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {b.duration}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Calendar size={12} /> Next: {b.nextStart}</span>
                        </div>
                        <Link href="/signup" className="opt-btn-primary" style={{ fontSize: "10px", padding: "10px 22px" }}>
                          Apply Now <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Learning ── */}
          {activeTab === "learnings" && (
            <div className="comm-section">
              {learnings.map((l) => (
                <div key={l.id} className="comm-expand-item">
                  <div
                    className="comm-row"
                    style={{ cursor: "pointer" }}
                    onClick={() => setExpandedLearning(expandedLearning === l.id ? null : l.id)}
                  >
                    <span className="comm-row-num">{l.id}</span>
                    <div className="comm-row-body">
                      <span className="comm-row-title">{l.title}</span>
                      <span className="comm-row-desc">{l.desc}</span>
                    </div>
                    <div className="comm-row-meta">
                      <span className="comm-tag">{l.duration}</span>
                      <span className="comm-tag">{l.level}</span>
                      <ChevronDown
                        size={14}
                        style={{
                          color: "var(--gold)",
                          transition: "transform 0.25s ease",
                          transform: expandedLearning === l.id ? "rotate(180deg)" : "rotate(0deg)"
                        }}
                      />
                    </div>
                  </div>

                  {expandedLearning === l.id && (
                    <div className="comm-detail">
                      <div className="comm-detail-grid">
                        <div>
                          <span className="comm-detail-label">Topics Covered</span>
                          <div className="comm-detail-tags">
                            {l.topics.map((t, i) => <span key={i} className="comm-tag">{t}</span>)}
                          </div>
                        </div>
                        <div>
                          <span className="comm-detail-label">Learning Outcomes</span>
                          <ul className="comm-detail-list">
                            {l.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                          </ul>
                        </div>
                      </div>
                      <div className="comm-detail-footer">
                        <div className="comm-detail-meta">
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><BookOpen size={12} /> {l.lessons} lessons</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {l.duration}</span>
                        </div>
                        <Link href="/signup" className="opt-btn-primary" style={{ fontSize: "10px", padding: "10px 22px" }}>
                          Start Learning <Play size={12} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: News ── */}
          {activeTab === "news" && (
            <div className="comm-section">
              {news.map((n, i) => (
                <div key={i} className="comm-row">
                  <span className="comm-row-num" style={{ minWidth: "64px", fontSize: "10px" }}>{n.date}</span>
                  <div className="comm-row-body">
                    <span className="comm-row-title">{n.title}</span>
                    <span className="comm-row-desc">{n.excerpt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Papers ── */}
          {activeTab === "papers" && (
            <div className="opt-papers">
              {papers.map((p) => (
                <div key={p.id} className="opt-paper-row" style={{ cursor: "default" }}>
                  <span className="opt-paper-num">{p.id}</span>
                  <div className="opt-paper-body">
                    <span className="opt-paper-cat">{p.venue}</span>
                    <span className="opt-paper-title">{p.title}</span>
                    <span className="opt-paper-authors">{p.authors}</span>
                  </div>
                  <div className="opt-paper-right">
                    <ExternalLink size={11} className="opt-paper-icon" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Account ── */}
          <div className="opt-rule" style={{ marginTop: "64px" }}><span className="opt-rule-text">Get Started</span></div>

          <div className="comm-auth">
            <div className="comm-auth-card">
              <div className="opt-pillar-title" style={{ marginBottom: "8px" }}>Sign In</div>
              <p className="opt-pillar-body" style={{ marginBottom: "24px" }}>
                Access your research dashboard, track applications, and stay connected with the community.
              </p>
              <Link href="/login" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Sign In <ArrowRight size={13} />
              </Link>
            </div>
            <div className="comm-auth-card">
              <div className="opt-pillar-title" style={{ marginBottom: "8px" }}>New Here?</div>
              <p className="opt-pillar-body" style={{ marginBottom: "24px" }}>
                Join 10,000+ researchers. Create a free account to apply for programmes and publish research.
              </p>
              <Link href="/signup" className="opt-btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
                Create an Account <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
