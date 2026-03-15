'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ExternalLink, Calendar, Users } from "lucide-react"
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
    { id: "01", title: "LLM Fine-Tuning Bootcamp", duration: "4 weeks", level: "Intermediate", desc: "Master the art of fine-tuning large language models for specific tasks and domains." },
    { id: "02", title: "Building LLMs from Scratch", duration: "6 weeks", level: "Advanced",  desc: "Learn to build and train large language models from the ground up using transformers." },
    { id: "03", title: "RAG Systems Bootcamp",       duration: "3 weeks", level: "Intermediate", desc: "Build retrieval-augmented generation systems for enhanced AI applications." },
    { id: "04", title: "Multimodal AI Bootcamp",     duration: "4 weeks", level: "Advanced",  desc: "Work with vision-language models and multimodal architectures in production." },
  ]

  const learnings = [
    { id: "01", title: "Understanding Transformers",                      duration: "8 hrs", level: "Intermediate" },
    { id: "02", title: "Fine-tuning Techniques for Production Models",    duration: "6 hrs", level: "Advanced" },
    { id: "03", title: "Evaluation Metrics for Language Models",          duration: "4 hrs", level: "Beginner" },
    { id: "04", title: "Efficient Training with Quantization",           duration: "5 hrs", level: "Advanced" },
  ]

  const news = [
    { date: "Mar 2024", title: "OptimumAI Launches New Research Initiative on AI Safety", excerpt: "Announcing our new research initiative focusing on AI safety and alignment challenges." },
    { date: "Mar 2024", title: "10 Papers Published in Top-Tier Venues This Quarter", excerpt: "Community members published groundbreaking research at NeurIPS, ICML, and ICLR." },
    { date: "Feb 2024", title: "Community Wins: 3 AI Startups Launched", excerpt: "Community members launched three AI startups based on research from OptimumAI." },
    { date: "Feb 2024", title: "Partnership: Collaborating with Leading Universities", excerpt: "OptimumAI partners with top universities to bring research opportunities to students worldwide." },
  ]

  const papers = [
    { id: "01", venue: "NeurIPS 2024", title: "Efficient Fine-Tuning of Large Language Models with Low-Rank Adaptation", authors: "Smith, J. · Johnson, A. et al." },
    { id: "02", venue: "ICML 2024",    title: "Scaling Laws for Multi-Task Learning in Language Models",                 authors: "Chen, S. · Kumar, D. et al." },
    { id: "03", venue: "ICLR 2024",    title: "Safety-Aware Training of Large Language Models",                          authors: "Patel, A. · Wilson, J. et al." },
    { id: "04", venue: "ACL 2024",     title: "Cross-Lingual Transfer Learning in Transformer Models",                  authors: "Liu, M. · Brown, R. et al." },
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
                <div key={b.id} className="comm-row">
                  <span className="comm-row-num">{b.id}</span>
                  <div className="comm-row-body">
                    <span className="comm-row-title">{b.title}</span>
                    <span className="comm-row-desc">{b.desc}</span>
                  </div>
                  <div className="comm-row-meta">
                    <span className="comm-tag">{b.duration}</span>
                    <span className="comm-tag">{b.level}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Learning ── */}
          {activeTab === "learnings" && (
            <div className="comm-section">
              {learnings.map((l) => (
                <div key={l.id} className="comm-row">
                  <span className="comm-row-num">{l.id}</span>
                  <div className="comm-row-body">
                    <span className="comm-row-title">{l.title}</span>
                  </div>
                  <div className="comm-row-meta">
                    <span className="comm-tag">{l.duration}</span>
                    <span className="comm-tag">{l.level}</span>
                  </div>
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
