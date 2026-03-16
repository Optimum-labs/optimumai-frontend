"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Brain, FlaskConical, Calendar, Award, TrendingUp, LogOut, Rocket, Video, ExternalLink, Beaker } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

interface DashboardData {
  user: { id: string; name: string; email: string; joinedDate: string }
  stats: { enrolled: number; completed: number; inProgress: number; totalActivities: number; challenges: number; researchPrograms: number }
  enrollments: { id: string; courseTitle: string; courseCategory: string; status: string; progress: number; meetingLink: string | null; enrolledAt: string }[]
  challengeRegistrations: { id: string; challengeTitle: string; challengeLevel: string; challengeDuration: string; startsAt: string; status: string; meetingLink: string | null; appliedAt: string }[]
  researchApplications: { id: string; programTitle: string; programOrganization: string; programDuration: string; programDifficulty: string; status: string; meetingLink: string | null; appliedAt: string }[]
  recentActivity: { id: string; type: string; description: string; createdAt: string }[]
}

const statusStyle = (status: string) => {
  const colors: Record<string, { color: string; bg: string }> = {
    completed: { color: "var(--gold)", bg: "rgba(184,150,90,0.1)" },
    approved: { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
    active: { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
    pending: { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
    enrolled: { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
    "in-progress": { color: "var(--gold)", bg: "rgba(184,150,90,0.1)" },
  }
  return colors[status] || colors.pending
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }
    }

    checkAuth()

    fetch("/api/dashboard")
      .then((res) => {
        if (!res.ok) {
          router.push("/login")
          return null
        }
        return res.json()
      })
      .then((d) => { if (d) setData(d) })
      .finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        window.location.href = '/login'
      }
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="optimum-main">
          <div className="grain-overlay" aria-hidden="true" />
          <div className="opt-page">
            <section className="opt-hero">
              <p className="opt-kicker opt-anim-1">Loading...</p>
            </section>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!data) return null

  const { user, stats, enrollments, challengeRegistrations, researchApplications, recentActivity } = data
  const joinedFormatted = new Date(user.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <>
      <Header />

      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Welcome Header ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">Welcome back</p>
            <h1 className="opt-headline opt-anim-2">
              Hello, {user.name.split(" ")[0]}!
            </h1>
            <p className="opt-sub opt-anim-3">
              Member since {joinedFormatted}. Ready to continue your AI research journey?
            </p>
            <div className="opt-hero-cta" style={{ marginTop: "16px" }}>
              <button onClick={handleLogout} className="opt-btn-ghost" style={{ fontSize: "13px" }}>
                <LogOut size={14} style={{ marginRight: "6px" }} /> Sign Out
              </button>
            </div>
          </section>

          {/* ── Quick Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: stats.challenges, label: "Challenges" },
              { value: stats.researchPrograms, label: "Research Programs" },
              { value: stats.enrolled, label: "Courses Enrolled" },
              { value: stats.completed, label: "Completed" },
              { value: stats.inProgress, label: "In Progress" },
              { value: stats.totalActivities, label: "Total Activities" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── My Challenges ── */}
          <div className="opt-rule"><span className="opt-rule-text">My Challenges</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginBottom: "48px" }}>
            {challengeRegistrations.length === 0 ? (
              <div className="ed-card">
                <div className="ed-card-body" style={{ textAlign: "center", padding: "32px 20px" }}>
                  <Rocket size={24} style={{ color: "var(--muted-txt)", marginBottom: "12px" }} />
                  <p style={{ fontSize: "13px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", margin: 0 }}>
                    No challenge registrations yet. <Link href="/community" style={{ color: "var(--opt-red)" }}>Browse challenges</Link>
                  </p>
                </div>
              </div>
            ) : challengeRegistrations.map((reg) => (
              <div key={reg.id} className="ed-card">
                <div className="ed-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" }}>
                        {reg.challengeTitle}
                      </h4>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                          {reg.challengeLevel} · {reg.challengeDuration}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: "10px",
                      color: statusStyle(reg.status).color,
                      background: statusStyle(reg.status).bg,
                      padding: "3px 10px",
                      borderRadius: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}>
                      {reg.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "12px", color: "var(--muted-txt)" }}>
                    <span><Calendar size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} /> Starts: {new Date(reg.startsAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span><Calendar size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} /> Applied: {new Date(reg.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    {reg.meetingLink ? (
                      <a href={reg.meetingLink} target="_blank" rel="noopener noreferrer" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Video size={12} /> Join Progress Meeting <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", fontStyle: "italic" }}>
                        📅 Meeting link will be shared soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── My Research Programs ── */}
          <div className="opt-rule"><span className="opt-rule-text">My Research Programs</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px", marginBottom: "48px" }}>
            {researchApplications.length === 0 ? (
              <div className="ed-card">
                <div className="ed-card-body" style={{ textAlign: "center", padding: "32px 20px" }}>
                  <Beaker size={24} style={{ color: "var(--muted-txt)", marginBottom: "12px" }} />
                  <p style={{ fontSize: "13px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", margin: 0 }}>
                    No research applications yet. <Link href="/research" style={{ color: "var(--opt-red)" }}>Apply to a program</Link>
                  </p>
                </div>
              </div>
            ) : researchApplications.map((app) => (
              <div key={app.id} className="ed-card">
                <div className="ed-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" }}>
                        {app.programTitle}
                      </h4>
                      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                          {app.programOrganization} · {app.programDuration} · {app.programDifficulty}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: "10px",
                      color: statusStyle(app.status).color,
                      background: statusStyle(app.status).bg,
                      padding: "3px 10px",
                      borderRadius: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}>
                      {app.status}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "12px", color: "var(--muted-txt)" }}>
                    <span><Calendar size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} /> Applied: {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <div style={{ marginTop: "12px" }}>
                    {app.meetingLink ? (
                      <a href={app.meetingLink} target="_blank" rel="noopener noreferrer" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Video size={12} /> Join Progress Meeting <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", fontStyle: "italic" }}>
                        📅 Meeting link will be shared soon
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── My Courses & Bootcamps ── */}
          <div className="opt-rule"><span className="opt-rule-text">My Courses & Bootcamps</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "48px" }}>

            {/* Enrolled Courses */}
            <div className="ed-card">
              <div className="ed-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <BookOpen size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Enrolled Courses
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {enrollments.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                      No courses yet. <Link href="/bootcamps" style={{ color: "var(--opt-red)" }}>Browse bootcamps</Link>
                    </p>
                  ) : enrollments.map((enrollment) => (
                    <div key={enrollment.id} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                          {enrollment.courseTitle}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          color: statusStyle(enrollment.status).color,
                          background: statusStyle(enrollment.status).bg,
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>{enrollment.courseCategory}</span>
                        <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>{enrollment.progress}% complete</span>
                      </div>
                      {enrollment.meetingLink ? (
                        <a href={enrollment.meetingLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "var(--opt-red)", display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none" }}>
                          <Video size={11} /> Join Meeting <ExternalLink size={9} />
                        </a>
                      ) : (
                        <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontStyle: "italic" }}>📅 Meeting link coming soon</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="ed-card">
              <div className="ed-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <TrendingUp size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Recent Activity
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {recentActivity.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                      No activity yet. Start by joining a challenge or research program!
                    </p>
                  ) : recentActivity.map((activity) => (
                    <div key={activity.id} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
                          {activity.description}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          color: "var(--gold)",
                          background: "rgba(184,150,90,0.1)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {activity.type}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>
                        {new Date(activity.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Actions ── */}
          <div className="opt-rule"><span className="opt-rule-text">Quick Actions</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "80px" }}>
            <Link href="/community?tab=challenges" className="opt-btn-ghost" style={{ justifyContent: "center", fontSize: "13px", padding: "14px 20px" }}>
              <Rocket size={15} style={{ marginRight: "8px" }} /> Browse Challenges
            </Link>
            <Link href="/research" className="opt-btn-ghost" style={{ justifyContent: "center", fontSize: "13px", padding: "14px 20px" }}>
              <Beaker size={15} style={{ marginRight: "8px" }} /> Explore Research
            </Link>
            <Link href="/bootcamps" className="opt-btn-ghost" style={{ justifyContent: "center", fontSize: "13px", padding: "14px 20px" }}>
              <Brain size={15} style={{ marginRight: "8px" }} /> Join Bootcamp
            </Link>
            <Link href="/community" className="opt-btn-ghost" style={{ justifyContent: "center", fontSize: "13px", padding: "14px 20px" }}>
              <Users size={15} style={{ marginRight: "8px" }} /> Community Hub
            </Link>
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker">Keep Learning</p>
            <h2 className="opt-headline" style={{ fontSize: "28px", marginBottom: "12px" }}>
              Your AI Journey Continues
            </h2>
            <p className="opt-sub" style={{ marginBottom: "28px" }}>
              Every great AI researcher started somewhere. Keep pushing the boundaries of what's possible.
            </p>
            <div className="opt-hero-cta">
              <Link href="/research" className="opt-btn-primary">Continue Research <ArrowRight size={13} /></Link>
              <Link href="/about" className="opt-btn-ghost">Our Mission</Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  )
}