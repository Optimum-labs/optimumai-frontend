"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Brain, FlaskConical, Calendar, Award, TrendingUp, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

interface DashboardData {
  user: { id: string; name: string; email: string; joinedDate: string }
  stats: { enrolled: number; completed: number; inProgress: number; totalActivities: number }
  enrollments: { id: string; courseTitle: string; courseCategory: string; status: string; progress: number; enrolledAt: string }[]
  recentActivity: { id: string; type: string; description: string; createdAt: string }[]
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
    console.log("Starting logout...")
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Logout error:", errorData.error)
        return
      }

      console.log("Logout successful, redirecting...")
      window.location.href = '/login' // Use window.location for full page reload
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

  const { user, stats, enrollments, recentActivity } = data
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

          {/* ── Main Dashboard Grid ── */}
          <div className="opt-rule"><span className="opt-rule-text">Your Dashboard</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px", marginBottom: "80px" }}>

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
                      No activity yet. Enroll in a course to get started!
                    </p>
                  ) : recentActivity.map((activity) => (
                    <div key={activity.id} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)"
                        }}>
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

            {/* Enrolled Courses */}
            <div className="ed-card">
              <div className="ed-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <Calendar size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    My Courses
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {enrollments.length === 0 ? (
                    <p style={{ fontSize: "13px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                      No courses yet. Browse our bootcamps to enroll!
                    </p>
                  ) : enrollments.map((enrollment) => (
                    <div key={enrollment.id} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)"
                        }}>
                          {enrollment.courseTitle}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          color: enrollment.status === "completed" ? "var(--gold)" : "var(--opt-red)",
                          background: enrollment.status === "completed" ? "rgba(184,150,90,0.1)" : "rgba(200,57,43,0.1)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>
                          {enrollment.courseCategory}
                        </span>
                        <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>
                          {enrollment.progress}% complete
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="ed-card">
              <div className="ed-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <Award size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Quick Actions
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <Link href="/research" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "14px" }}>
                    <BookOpen size={16} style={{ marginRight: "8px" }} />
                    Explore Research
                  </Link>
                  <Link href="/bootcamps" className="opt-btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: "14px" }}>
                    <Brain size={16} style={{ marginRight: "8px" }} />
                    Join Bootcamp
                  </Link>
                  <Link href="/internships" className="opt-btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: "14px" }}>
                    <FlaskConical size={16} style={{ marginRight: "8px" }} />
                    Find Internship
                  </Link>
                  <Link href="/community" className="opt-btn-ghost" style={{ width: "100%", justifyContent: "center", fontSize: "14px" }}>
                    <Users size={16} style={{ marginRight: "8px" }} />
                    Community Hub
                  </Link>
                </div>
              </div>
            </div>

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