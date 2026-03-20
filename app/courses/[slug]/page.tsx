"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Clock, Users, ArrowRight, ArrowLeft, BookOpen, BarChart3, CheckCircle2, Circle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, use } from "react"
import { createBrowserClient } from "@supabase/ssr"

interface Course {
  id: string
  title: string
  slug: string
  description: string
  category: string
  duration: string
  level: string
  tags: string[]
  createdAt: string
  _count: { enrollments: number }
}

interface Lesson {
  id: string
  title: string
  order: number
  description: string | null
  completed: boolean
  completedAt: string | null
}

interface ProgressData {
  lessons: Lesson[]
  progress: { completed: number; total: number; percent: number }
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [course, setCourse] = useState<Course | null>(null)
  const [related, setRelated] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [user, setUser] = useState<{ id: string; email?: string } | null>(null)
  const [enrolling, setEnrolling] = useState(false)
  const [enrolled, setEnrolled] = useState(false)
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [guestForm, setGuestForm] = useState({ fullName: "", email: "" })
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [togglingLesson, setTogglingLesson] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUser({ id: user.id, email: user.email })
    })
  }, [])

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${encodeURIComponent(slug)}`)
        if (!res.ok) {
          setError(res.status === 404 ? "Course not found." : "Failed to load course.")
          return
        }
        const data = await res.json()
        setCourse(data.course)
        setRelated(data.related || [])
      } catch {
        setError("Failed to load course.")
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [slug])

  // Fetch progress when user is authenticated
  useEffect(() => {
    if (!user) return
    fetch(`/api/courses/${encodeURIComponent(slug)}/progress`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setProgressData(data)
          setEnrolled(true)
        }
      })
      .catch(() => {})
  }, [user, slug])

  const toggleLesson = async (lessonId: string, currentlyCompleted: boolean) => {
    if (!progressData) return
    setTogglingLesson(lessonId)
    try {
      const res = await fetch(`/api/courses/${encodeURIComponent(slug)}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, completed: !currentlyCompleted }),
      })
      if (res.ok) {
        const result = await res.json()
        setProgressData((prev) =>
          prev
            ? {
                ...prev,
                lessons: prev.lessons.map((l) =>
                  l.id === lessonId ? { ...l, completed: !currentlyCompleted, completedAt: !currentlyCompleted ? new Date().toISOString() : null } : l
                ),
                progress: result.progress,
              }
            : prev
        )
      }
    } catch {
      // silently fail
    } finally {
      setTogglingLesson(null)
    }
  }

  const handleEnroll = async () => {
    if (!user && (!guestForm.fullName || !guestForm.email)) {
      setMessage({ text: "Please fill in your name and email.", error: true })
      return
    }

    setEnrolling(true)
    setMessage(null)

    const formData = new FormData()
    formData.append("courseSlug", slug)
    if (resume) formData.append("resume", resume)
    if (!user) {
      formData.append("fullName", guestForm.fullName)
      formData.append("email", guestForm.email)
    }
    formData.append("jsonData", JSON.stringify({
      courseSlug: slug,
      resumeUploaded: !!resume,
      enrolledAt: new Date().toISOString(),
    }))

    try {
      const res = await fetch("/api/enroll", { method: "POST", body: formData })
      const data = await res.json()
      if (!res.ok) {
        setMessage({ text: data.error, error: true })
        if (res.status === 409) setEnrolled(true)
      } else {
        setMessage({ text: "Enrolled successfully! Check your dashboard.", error: false })
        setEnrolled(true)
      }
    } catch {
      setMessage({ text: "Something went wrong. Please try again.", error: true })
    } finally {
      setEnrolling(false)
    }
  }

  const levelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner": return "ed-badge--gold"
      case "advanced": return "ed-badge--red"
      default: return ""
    }
  }

  if (loading) return null // loading.tsx handles this
  if (error || !course) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="opt-page" style={{ textAlign: "center", padding: "120px 24px" }}>
            <h1 className="opt-headline" style={{ fontSize: "28px", marginBottom: "16px" }}>
              {error || "Course not found"}
            </h1>
            <Link href="/bootcamps" className="opt-btn-ghost">
              <ArrowLeft size={13} /> Back to Bootcamps
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px", fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)" }}>
            <Link href="/bootcamps" style={{ color: "var(--muted-txt)", textDecoration: "none" }}>
              Bootcamps
            </Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "var(--ink)" }}>{course.title}</span>
          </nav>

          {/* Hero */}
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span className={`ed-badge ${levelColor(course.level)}`} style={{ position: "static" }}>
                {course.level}
              </span>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Clock size={12} /> {course.duration}
              </span>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Users size={12} /> {course._count.enrollments} enrolled
              </span>
              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <BookOpen size={12} /> {course.category}
              </span>
            </div>

            <h1 className="opt-headline" style={{ fontSize: "36px", marginBottom: "16px" }}>
              {course.title}
            </h1>

            <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "13px", lineHeight: "1.8", color: "var(--muted-txt)", maxWidth: "700px" }}>
              {course.description}
            </p>
          </section>

          {/* Tags */}
          {course.tags.length > 0 && (
            <section style={{ marginBottom: "48px" }}>
              <div className="opt-rule"><span className="opt-rule-text">Topics</span></div>
              <div className="ed-tags" style={{ marginTop: "16px" }}>
                {course.tags.map((tag, i) => (
                  <span key={i} className="ed-tag">{tag}</span>
                ))}
              </div>
            </section>
          )}

          {/* Enrollment Form */}
          <section style={{ marginBottom: "64px" }}>
            <div className="opt-rule"><span className="opt-rule-text">Enroll</span></div>

            <div style={{
              marginTop: "24px",
              padding: "32px",
              border: "1px solid rgba(10,10,10,0.1)",
              background: "rgba(255,255,255,0.45)",
              maxWidth: "480px",
            }}>
              {enrolled ? (
                <div style={{ textAlign: "center" }}>
                  <BarChart3 size={32} style={{ color: "var(--gold)", marginBottom: "12px" }} />
                  <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>
                    You&apos;re Enrolled!
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "12px", color: "var(--muted-txt)", marginBottom: "16px" }}>
                    Check your dashboard to track your progress.
                  </p>
                  <Link href="/dashboard" className="opt-btn-primary" style={{ fontSize: "12px" }}>
                    Go to Dashboard <ArrowRight size={12} />
                  </Link>
                </div>
              ) : (
                <>
                  {!user && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={guestForm.fullName}
                        onChange={(e) => setGuestForm((p) => ({ ...p, fullName: e.target.value }))}
                        style={{
                          fontSize: "12px", padding: "10px 12px",
                          border: "1px solid rgba(10,10,10,0.15)", borderRadius: "4px",
                          fontFamily: "var(--font-dm-mono), monospace",
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={guestForm.email}
                        onChange={(e) => setGuestForm((p) => ({ ...p, email: e.target.value }))}
                        style={{
                          fontSize: "12px", padding: "10px 12px",
                          border: "1px solid rgba(10,10,10,0.15)", borderRadius: "4px",
                          fontFamily: "var(--font-dm-mono), monospace",
                        }}
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "11px", color: "var(--muted-txt)", display: "block", marginBottom: "6px" }}>
                      Resume (optional)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files?.[0] || null)}
                      style={{
                        fontSize: "11px", padding: "6px",
                        border: "1px solid rgba(10,10,10,0.15)", borderRadius: "4px",
                        width: "100%",
                      }}
                    />
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="opt-btn-primary"
                    style={{ width: "100%", fontSize: "12px", opacity: enrolling ? 0.6 : 1 }}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Now"} <ArrowRight size={12} />
                  </button>
                </>
              )}

              {message && (
                <p style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: message.error ? "var(--opt-red)" : "#2a7d4f",
                }}>
                  {message.text}
                </p>
              )}
            </div>
          </section>

          {/* Progress Tracking */}
          {progressData && progressData.lessons.length > 0 && (
            <section style={{ marginBottom: "64px" }}>
              <div className="opt-rule"><span className="opt-rule-text">My Progress</span></div>

              {/* Progress Bar */}
              <div style={{ marginTop: "24px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "12px", color: "var(--muted-txt)" }}>
                    {progressData.progress.completed} of {progressData.progress.total} lessons complete
                  </span>
                  <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>
                    {progressData.progress.percent}%
                  </span>
                </div>
                <div style={{ width: "100%", height: "8px", background: "rgba(10,10,10,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{
                    width: `${progressData.progress.percent}%`,
                    height: "100%",
                    background: progressData.progress.percent === 100 ? "var(--gold)" : "var(--opt-red)",
                    borderRadius: "4px",
                    transition: "width 0.3s ease",
                  }} />
                </div>
              </div>

              {/* Lesson List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {progressData.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id, lesson.completed)}
                    disabled={togglingLesson === lesson.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "14px 16px",
                      border: "1px solid rgba(10,10,10,0.08)",
                      background: lesson.completed ? "rgba(16,185,129,0.04)" : "rgba(255,255,255,0.45)",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      opacity: togglingLesson === lesson.id ? 0.6 : 1,
                      transition: "background 0.2s ease",
                    }}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 size={18} style={{ color: "var(--gold)", flexShrink: 0 }} />
                    ) : (
                      <Circle size={18} style={{ color: "var(--muted-txt)", flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: "10px",
                        color: "var(--muted-txt)",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.08em",
                      }}>
                        Lesson {lesson.order}
                      </span>
                      <div style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        textDecoration: lesson.completed ? "line-through" : "none",
                        opacity: lesson.completed ? 0.6 : 1,
                      }}>
                        {lesson.title}
                      </div>
                      {lesson.description && (
                        <p style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "11px",
                          color: "var(--muted-txt)",
                          margin: "4px 0 0",
                        }}>
                          {lesson.description}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Related Courses */}
          {related.length > 0 && (
            <section style={{ marginBottom: "64px" }}>
              <div className="opt-rule"><span className="opt-rule-text">Related Courses</span></div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
                marginTop: "24px",
              }}>
                {related.map((r) => (
                  <Link key={r.id} href={`/courses/${r.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      padding: "24px",
                      border: "1px solid rgba(10,10,10,0.1)",
                      background: "rgba(255,255,255,0.45)",
                      transition: "border-color 0.25s ease",
                    }}
                      className="hover:border-gold"
                    >
                      <span className={`ed-badge ${levelColor(r.level)}`} style={{ position: "static", marginBottom: "12px", display: "inline-block" }}>
                        {r.level}
                      </span>
                      <div className="ed-card-title" style={{ marginBottom: "8px" }}>{r.title}</div>
                      <p className="ed-card-desc" style={{ marginBottom: "12px" }}>
                        {r.description.length > 120 ? r.description.slice(0, 120) + "..." : r.description}
                      </p>
                      <div className="ed-meta">
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={12} /> {r.duration}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="opt-cta-block">
            <p className="opt-kicker">Explore More</p>
            <h2 className="opt-headline" style={{ fontSize: "28px", marginBottom: "12px" }}>
              Browse All Programs
            </h2>
            <div className="opt-hero-cta">
              <Link href="/bootcamps" className="opt-btn-primary">
                All Bootcamps <ArrowRight size={13} />
              </Link>
              <Link href="/research" className="opt-btn-ghost">Research Programs</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
