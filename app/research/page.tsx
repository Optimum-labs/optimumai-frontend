"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Globe, Users, Calendar } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"

export default function ResearchPage() {
  const [applyingSlug, setApplyingSlug] = useState<string | null>(null)
  const [appliedSlugs, setAppliedSlugs] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<{ slug: string; text: string; error: boolean } | null>(null)
  const [user, setUser] = useState<any>(null)
  const [guestForms, setGuestForms] = useState<Record<string, { fullName: string; email: string }>>({})

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleApply = async (slug: string) => {
    if (!user) {
      const guestData = guestForms[slug]
      if (!guestData?.fullName || !guestData?.email) {
        setMessage({ slug, text: "Please fill in your name and email to apply.", error: true })
        return
      }
    }
    setApplyingSlug(slug)
    setMessage(null)
    try {
      const body: any = { programSlug: slug }
      if (!user) {
        body.fullName = guestForms[slug].fullName
        body.email = guestForms[slug].email
      }
      const res = await fetch("/api/research/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ slug, text: data.error, error: true })
        if (res.status === 409) setAppliedSlugs((s) => new Set(s).add(slug))
      } else {
        setMessage({ slug, text: "Application submitted! Check your dashboard.", error: false })
        setAppliedSlugs((s) => new Set(s).add(slug))
      }
    } catch {
      setMessage({ slug, text: "Something went wrong. Please try again.", error: true })
    } finally {
      setApplyingSlug(null)
    }
  }

  const projects = [
    {
      title: "Building LLMs from Scratch",
      slug: "building-llms-from-scratch",
      organization: "OptimumAI Research Lab",
      participants: 62,
      duration: "16 weeks",
      region: "Global",
      image: "/neural-network-architecture-visualization.jpg",
      tags: ["LLM", "Transformers", "Deep Learning", "PyTorch"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Learn to build and train large language models from the ground up, covering tokenization, architecture design, and training strategies.",
      objectives: [
        "Implement transformer architecture from scratch",
        "Design tokenization strategies",
        "Train models on distributed systems",
        "Optimize inference performance",
      ],
      prerequisites: ["Strong Python skills", "Deep learning fundamentals", "PyTorch experience", "Linear algebra"],
    },
    {
      title: "Fine-Tuning & PEFT Techniques",
      slug: "fine-tuning-peft-techniques",
      organization: "OptimumAI Research Lab",
      participants: 78,
      duration: "12 weeks",
      region: "Global",
      image: "/ai-model-training-dashboard.jpg",
      tags: ["Fine-tuning", "LoRA", "QLoRA", "PEFT"],
      status: "Accepting Applications",
      difficulty: "Intermediate",
      description:
        "Master parameter-efficient fine-tuning methods including LoRA, QLoRA, and prefix tuning for adapting LLMs to specific tasks.",
      objectives: [
        "Implement LoRA and QLoRA techniques",
        "Fine-tune models with limited compute",
        "Evaluate fine-tuned model performance",
        "Deploy fine-tuned models in production",
      ],
      prerequisites: ["Python programming", "Basic ML knowledge", "Familiarity with transformers", "GPU access"],
    },
    {
      title: "RAG Systems & Vector Databases",
      slug: "rag-systems-vector-databases",
      organization: "OptimumAI Applied AI",
      participants: 85,
      duration: "10 weeks",
      region: "Global",
      image: "/information-retrieval-system.jpg",
      tags: ["RAG", "Vector DB", "Embeddings", "LangChain"],
      status: "In Progress",
      difficulty: "Intermediate",
      description:
        "Build production-ready Retrieval Augmented Generation systems with advanced chunking, embedding strategies, and reranking.",
      objectives: [
        "Design optimal chunking strategies",
        "Implement vector database solutions",
        "Build RAG pipelines with LangChain",
        "Optimize retrieval accuracy",
      ],
      prerequisites: ["Python programming", "API development", "Database fundamentals", "LLM basics"],
    },
    {
      title: "Multimodal AI Research",
      slug: "multimodal-ai-research",
      organization: "OptimumAI Vision Lab",
      participants: 54,
      duration: "14 weeks",
      region: "Global",
      image: "/multimodal-ai-vision-language.jpg",
      tags: ["Vision-Language", "CLIP", "Multimodal", "Diffusion"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Explore cutting-edge multimodal models combining vision, language, and audio for next-generation AI applications.",
      objectives: [
        "Train vision-language models",
        "Implement multimodal embeddings",
        "Build cross-modal retrieval systems",
        "Create generative multimodal applications",
      ],
      prerequisites: ["Computer vision experience", "NLP knowledge", "PyTorch/TensorFlow", "Research experience"],
    },
    {
      title: "LLM Agents & Tool Use",
      slug: "llm-agents-tool-use",
      organization: "OptimumAI Agentic AI",
      participants: 67,
      duration: "10 weeks",
      region: "Global",
      image: "/ai-agent-workflow-automation.jpg",
      tags: ["Agents", "Tool Calling", "ReAct", "AutoGPT"],
      status: "Accepting Applications",
      difficulty: "Intermediate",
      description:
        "Design and implement autonomous AI agents with reasoning, planning, and tool-use capabilities for complex workflows.",
      objectives: [
        "Implement ReAct and ReWOO patterns",
        "Build multi-step reasoning agents",
        "Design tool-calling interfaces",
        "Create agentic workflow systems",
      ],
      prerequisites: ["Python development", "LLM API experience", "Software architecture", "Problem-solving skills"],
    },
    {
      title: "Model Compression & Optimization",
      slug: "model-compression-optimization",
      organization: "OptimumAI Efficiency Lab",
      participants: 41,
      duration: "8 weeks",
      region: "Global",
      image: "/ai-model-optimization.jpg",
      tags: ["Quantization", "Pruning", "Distillation", "ONNX"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Master techniques for compressing and optimizing large models for edge deployment and inference efficiency.",
      objectives: [
        "Implement quantization techniques",
        "Apply model pruning strategies",
        "Perform knowledge distillation",
        "Optimize for edge devices",
      ],
      prerequisites: ["Deep learning expertise", "Model architectures", "C++/CUDA helpful", "Hardware understanding"],
    },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">Research Projects</p>
            <h1 className="opt-headline opt-anim-2">
              Collaborative<br /><em>AI Research</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Join cutting-edge research projects on LLM development, fine-tuning, RAG systems, and more.
              Collaborate with global teams to push the boundaries of AI.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <a href="#projects" className="opt-btn-primary">Browse Projects <ArrowRight size={13} /></a>
              <Link href="/contact" className="opt-btn-ghost">Propose a Project</Link>
            </div>
          </section>

          {/* ── Projects ── */}
          <div className="opt-rule" id="projects"><span className="opt-rule-text">Projects</span></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "64px" }}>
            {projects.map((project, index) => (
              <div key={index} className="ed-card">
                <div className="ed-card-img">
                  <img src={project.image || "/placeholder.svg"} alt={project.title} />
                  <span className={`ed-badge${project.difficulty === "Advanced" ? " ed-badge--red" : " ed-badge--gold"}`}>
                    {project.difficulty}
                  </span>
                </div>
                <div className="ed-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "4px" }}>
                    <div className="ed-card-title">{project.title}</div>
                    <span className="ed-badge">{project.status}</span>
                  </div>
                  <div className="ed-card-subtitle">{project.organization}</div>
                  <p className="ed-card-desc">{project.description}</p>

                  <div className="ed-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Users size={13} /> {project.participants} collaborators</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Calendar size={13} /> {project.duration}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Globe size={13} /> {project.region}</span>
                  </div>

                  <ul className="ed-list">
                    {project.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>

                  <div className="ed-tags">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="ed-tag">{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingTop: "8px" }}>
                    {!user && project.status === "Accepting Applications" && !appliedSlugs.has(project.slug) && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          placeholder="Full name"
                          value={guestForms[project.slug]?.fullName || ""}
                          onChange={(e) => setGuestForms(prev => ({ ...prev, [project.slug]: { ...prev[project.slug], fullName: e.target.value, email: prev[project.slug]?.email || "" } }))}
                          style={{ fontSize: "11px", padding: "6px 8px", border: "1px solid rgba(10,10,10,0.15)", borderRadius: "4px", fontFamily: "var(--font-dm-mono), monospace", flex: 1 }}
                        />
                        <input
                          type="email"
                          placeholder="Email address"
                          value={guestForms[project.slug]?.email || ""}
                          onChange={(e) => setGuestForms(prev => ({ ...prev, [project.slug]: { ...prev[project.slug], email: e.target.value, fullName: prev[project.slug]?.fullName || "" } }))}
                          style={{ fontSize: "11px", padding: "6px 8px", border: "1px solid rgba(10,10,10,0.15)", borderRadius: "4px", fontFamily: "var(--font-dm-mono), monospace", flex: 1 }}
                        />
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "12px" }}>
                      {project.status === "Accepting Applications" && !appliedSlugs.has(project.slug) ? (
                        <button
                          onClick={() => handleApply(project.slug)}
                          disabled={applyingSlug === project.slug}
                          className="opt-btn-primary"
                          style={{ fontSize: "12px", padding: "10px 20px", opacity: applyingSlug === project.slug ? 0.6 : 1 }}
                        >
                          {applyingSlug === project.slug ? "Submitting..." : "Apply to Join"} <ArrowRight size={11} />
                        </button>
                      ) : project.status === "In Progress" ? (
                        <span className="opt-btn-ghost" style={{ fontSize: "12px", padding: "10px 20px", cursor: "default" }}>In Progress</span>
                      ) : (
                        <span className="opt-btn-ghost" style={{ fontSize: "12px", padding: "10px 20px", cursor: "default", color: "#2a7d4f" }}>✓ Applied</span>
                      )}
                    </div>
                    {message && message.slug === project.slug && (
                      <span style={{ fontSize: "12px", color: message.error ? "var(--opt-red)" : "#2a7d4f", fontFamily: "var(--font-dm-mono), monospace" }}>
                        {message.text}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Have a Research Idea?</p>
            <p className="opt-cta-headline">
              Partner with us to launch<br />collaborative AI research.
            </p>
            <p className="opt-pillar-body" style={{ maxWidth: "560px", margin: "0 auto 28px", textAlign: "center" }}>
              We provide infrastructure, mentorship, and a global community of researchers to turn your idea into published, peer-reviewed work.
            </p>
            <div className="opt-cta-actions">
              <Link href="/contact" className="opt-btn-primary">Propose a Project <ArrowRight size={13} /></Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
