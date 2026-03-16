"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Clock, Users, Code, Brain, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"

export default function BootcampsPage() {
  const [enrollingSlug, setEnrollingSlug] = useState<string | null>(null)
  const [enrolledSlugs, setEnrolledSlugs] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState<{ slug: string; text: string; error: boolean } | null>(null)
  const [user, setUser] = useState<any>(null)
  const [resumes, setResumes] = useState<Record<string, File>>({})

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

  const handleEnroll = async (slug: string) => {
    if (!user) {
      setMessage({ slug, text: "Please sign in to enroll.", error: true })
      return
    }
    setEnrollingSlug(slug)
    setMessage(null)

    const formData = new FormData()
    formData.append('courseSlug', slug)
    if (resumes[slug]) {
      formData.append('resume', resumes[slug])
    }

    // Save as JSON
    const jsonData = {
      courseSlug,
      resumeUploaded: !!resumes[slug],
      enrolledAt: new Date().toISOString()
    }
    formData.append('jsonData', JSON.stringify(jsonData))

    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ slug, text: data.error, error: true })
        if (res.status === 409) setEnrolledSlugs((s) => new Set(s).add(slug))
      } else {
        setMessage({ slug, text: "Enrolled! Check your dashboard.", error: false })
        setEnrolledSlugs((s) => new Set(s).add(slug))
      }
    } catch {
      setMessage({ slug, text: "Something went wrong. Please try again.", error: true })
    } finally {
      setEnrollingSlug(null)
    }
  }

  const bootcamps = [
    {
      title: "Deep Learning Foundations",
      slug: "deep-learning-foundations",
      level: "Beginner",
      duration: "8 weeks",
      students: "1,200+",
      image: "/neural-network-visualization.png",
      topics: ["Neural Networks", "PyTorch", "Computer Vision", "NLP Basics"],
      nextStart: "Feb 15, 2026",
      description:
        "Start your AI journey with comprehensive deep learning fundamentals. Learn neural network architectures, training techniques, and apply them to real-world computer vision and NLP tasks.",
      outcomes: [
        "Build neural networks from scratch",
        "Train computer vision models",
        "Create NLP applications",
        "Deploy ML models to production",
      ],
    },
    {
      title: "Advanced LLM Engineering",
      slug: "advanced-llm-engineering",
      level: "Advanced",
      duration: "10 weeks",
      students: "800+",
      image: "/ai-language-model-architecture.jpg",
      topics: ["Transformers", "Fine-tuning", "RAG Systems", "Prompt Engineering"],
      nextStart: "Feb 22, 2026",
      description:
        "Master the art of building and deploying large language models. Learn transformer architectures, fine-tuning techniques, RAG implementations, and advanced prompt engineering strategies.",
      outcomes: [
        "Fine-tune LLMs for custom tasks",
        "Build production RAG systems",
        "Implement advanced prompting techniques",
        "Optimize model performance",
      ],
    },
    {
      title: "AI for Computer Vision",
      slug: "ai-computer-vision",
      level: "Intermediate",
      duration: "8 weeks",
      students: "950+",
      image: "/computer-vision-ai-technology.jpg",
      topics: ["Object Detection", "Segmentation", "GANs", "Video Analysis"],
      nextStart: "Mar 1, 2026",
      description:
        "Dive deep into computer vision with state-of-the-art techniques. Master object detection, semantic segmentation, generative models, and real-time video processing.",
      outcomes: [
        "Implement object detection systems",
        "Build semantic segmentation models",
        "Create generative AI for images",
        "Process video streams in real-time",
      ],
    },
    {
      title: "MLOps & AI Infrastructure",
      slug: "mlops-production-ml",
      level: "Intermediate",
      duration: "6 weeks",
      students: "650+",
      image: "/mlops-infrastructure.jpg",
      topics: ["CI/CD", "Model Monitoring", "Docker", "Kubernetes"],
      nextStart: "Mar 8, 2026",
      description:
        "Learn to deploy, monitor, and maintain AI systems at scale. Cover MLOps best practices, containerization, orchestration, and production monitoring.",
      outcomes: [
        "Build CI/CD pipelines for ML",
        "Deploy models with Docker/K8s",
        "Monitor model performance",
        "Implement A/B testing for models",
      ],
    },
    {
      title: "Reinforcement Learning",
      slug: "reinforcement-learning",
      level: "Advanced",
      duration: "10 weeks",
      students: "420+",
      image: "/reinforcement-learning-agent.png",
      topics: ["Q-Learning", "Policy Gradients", "Multi-Agent RL", "Game AI"],
      nextStart: "Mar 15, 2026",
      description:
        "Master reinforcement learning algorithms and applications. Build intelligent agents that learn through interaction, from simple games to complex robotic control.",
      outcomes: [
        "Implement RL algorithms",
        "Train game-playing agents",
        "Build robotic control systems",
        "Design reward functions",
      ],
    },
    {
      title: "AI Product Management",
      slug: "ai-product-management",
      level: "Beginner",
      duration: "6 weeks",
      students: "890+",
      image: "/ai-product-management.jpg",
      topics: ["Product Strategy", "User Research", "AI Ethics", "Go-to-Market"],
      nextStart: "Mar 22, 2026",
      description:
        "Learn to build and ship AI-powered products. Cover product strategy, user research, ethical considerations, and go-to-market strategies for AI applications.",
      outcomes: [
        "Define AI product strategy",
        "Conduct user research",
        "Navigate AI ethics",
        "Launch AI products successfully",
      ],
    },
  ]

  const features = [
    {
      icon: Code,
      title: "Hands-On Projects",
      description: "Build real-world applications that showcase your skills to employers",
    },
    {
      icon: Brain,
      title: "Expert Instructors",
      description: "Learn from industry practitioners at leading AI companies",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Work with peers in small cohorts for maximum engagement",
    },
    {
      icon: Zap,
      title: "Career Support",
      description: "Get resume reviews, interview prep, and job placement assistance",
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
            <p className="opt-kicker opt-anim-1">Bootcamps</p>
            <h1 className="opt-headline opt-anim-2">
              Intensive AI Training<br />
              <em>Programs.</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Transform your career with project-based bootcamps designed by industry experts.
              Go from beginner to job-ready in weeks.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <Link href="/community" className="opt-btn-primary">Explore Community <ArrowRight size={13} /></Link>
              <Link href="/contact" className="opt-btn-ghost">Get in Touch</Link>
            </div>
          </section>

          {/* ── Features ── */}
          <div className="opt-rule"><span className="opt-rule-text">Why OptimumAI</span></div>

          <div className="opt-pillars" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "64px" }}>
            {features.map((f, i) => (
              <div key={i} className="opt-pillar" style={{ borderBottom: "none" }}>
                <f.icon size={20} style={{ color: "var(--gold)", marginBottom: "12px" }} />
                <div className="opt-pillar-title">{f.title}</div>
                <p className="opt-pillar-body">{f.description}</p>
              </div>
            ))}
          </div>

          {/* ── Bootcamp listings ── */}
          <div className="opt-rule"><span className="opt-rule-text">Programs</span></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "64px" }}>
            {bootcamps.map((b, i) => (
              <div key={i} className="ed-card">
                <div className="ed-card-img">
                  <img src={b.image || "/placeholder.svg"} alt={b.title} />
                  <span className={`ed-badge${b.level === "Advanced" ? " ed-badge--red" : b.level === "Beginner" ? " ed-badge--gold" : ""}`}>
                    {b.level}
                  </span>
                </div>
                <div className="ed-card-body">
                  <div className="ed-card-title">{b.title}</div>
                  <p className="ed-card-desc">{b.description}</p>

                  <div className="ed-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Clock size={12} /> {b.duration}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}><Users size={12} /> {b.students} students</span>
                  </div>

                  <div className="ed-tags">
                    {b.topics.map((t, idx) => <span key={idx} className="ed-tag">{t}</span>)}
                  </div>

                  <ul className="ed-list">
                    {b.outcomes.map((o, idx) => <li key={idx}>{o}</li>)}
                  </ul>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                    <div>
                      <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--muted-txt)" }}>Next cohort</span>
                      <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)" }}>{b.nextStart}</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", width: "200px" }}>
                      {user && !enrolledSlugs.has(b.slug) && (
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setResumes(prev => ({ ...prev, [b.slug]: e.target.files?.[0] || undefined }))}
                          style={{ fontSize: "10px", padding: "4px", border: "1px solid var(--muted-txt)", borderRadius: "4px" }}
                        />
                      )}
                      {enrolledSlugs.has(b.slug) ? (
                        <span className="opt-btn-ghost" style={{ fontSize: "11px", padding: "8px 18px", cursor: "default", color: "#2a7d4f" }}>✓ Enrolled</span>
                      ) : user ? (
                        <button
                          onClick={() => handleEnroll(b.slug)}
                          disabled={enrollingSlug === b.slug}
                          className="opt-btn-primary"
                          style={{ fontSize: "11px", padding: "8px 18px", opacity: enrollingSlug === b.slug ? 0.6 : 1 }}
                        >
                          {enrollingSlug === b.slug ? "Enrolling..." : "Enroll Now"} <ArrowRight size={11} />
                        </button>
                      ) : (
                        <Link href="/login" className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 18px" }}>
                          Sign In to Enroll <ArrowRight size={11} />
                        </Link>
                      )}
                      {message && message.slug === b.slug && (
                        <span style={{ fontSize: "10px", color: message.error ? "var(--opt-red)" : "#2a7d4f", fontFamily: "var(--font-dm-mono), monospace" }}>
                          {message.text}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker">Ready to Start?</p>
            <h2 className="opt-headline" style={{ fontSize: "28px", marginBottom: "12px" }}>
              Join the Next Cohort
            </h2>
            <p className="opt-sub" style={{ marginBottom: "28px" }}>
              Applications are open. Spots are limited — reserve yours today.
            </p>
            <div className="opt-hero-cta">
              {user ? (
                <Link href="/dashboard" className="opt-btn-primary">View My Enrollments <ArrowRight size={13} /></Link>
              ) : (
                <Link href="/login" className="opt-btn-primary">Sign In to Enroll <ArrowRight size={13} /></Link>
              )}
              <Link href="/contact" className="opt-btn-ghost">Contact Us</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
