"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Brain, FlaskConical, Calendar, Award, TrendingUp, LogOut, Rocket, Video, ExternalLink, Beaker, User, Edit3, Check, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"

interface DashboardData {
  user: { id: string; name: string; email: string; dateOfBirth: string | null; joinedDate: string }
  stats: { enrolled: number; completed: number; inProgress: number; totalActivities: number; challenges: number; researchPrograms: number }
  enrollments: { id: string; courseTitle: string; courseCategory: string; status: string; progress: number; meetingLink: string | null; enrolledAt: string }[]
  challengeRegistrations: { id: string; challengeTitle: string; challengeLevel: string; challengeDuration: string; startsAt: string; status: string; meetingLink: string | null; appliedAt: string }[]
  researchApplications: { id: string; programTitle: string; programOrganization: string; programDuration: string; programDifficulty: string; status: string; meetingLink: string | null; appliedAt: string }[]
  recentActivity: { id: string; type: string; description: string; createdAt: string }[]
}

const statusStyle = (status: string) => {
  const colors: Record<string, { color: string; bg: string }> = {
    completed: { color: "var(--gold)", bg: "rgba(16,185,129,0.1)" },
    approved: { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
    active: { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
    pending: { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
    enrolled: { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
    "in-progress": { color: "var(--gold)", bg: "rgba(16,185,129,0.1)" },
  }
  return colors[status] || colors.pending
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', dateOfBirth: '' })
  const [profileSaving, setProfileSaving] = useState(false)
  const [dashSection, setDashSection] = useState<string>('challenges')
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

  const startEditing = () => {
    if (!data) return
    setProfileForm({
      name: data.user.name,
      dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth.split('T')[0] : '',
    })
    setEditingProfile(true)
  }

  const saveProfile = async () => {
    setProfileSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileForm.name,
          dateOfBirth: profileForm.dateOfBirth || null,
        }),
      })
      if (res.ok) {
        const { user: updated } = await res.json()
        setData(prev => prev ? { ...prev, user: { ...prev.user, name: updated.name, dateOfBirth: updated.dateOfBirth } } : prev)
        setEditingProfile(false)
      }
    } catch (err) {
      console.error("Profile update failed:", err)
    } finally {
      setProfileSaving(false)
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

          {/* ── Account Information ── */}
          <div className="opt-rule"><span className="opt-rule-text">Account Information</span></div>

          <div className="ed-card" style={{ marginBottom: "48px" }}>
            <div className="ed-card-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <User size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Profile Details
                  </h3>
                </div>
                {!editingProfile ? (
                  <button onClick={startEditing} className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 14px", cursor: "pointer", background: "none", border: "1px solid rgba(10,10,10,0.15)" }}>
                    <Edit3 size={12} style={{ marginRight: "4px" }} /> Edit
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={saveProfile} disabled={profileSaving} className="opt-btn-primary" style={{ fontSize: "11px", padding: "6px 14px" }}>
                      <Check size={12} style={{ marginRight: "4px" }} /> {profileSaving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => setEditingProfile(false)} className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 14px", cursor: "pointer", background: "none", border: "1px solid rgba(10,10,10,0.15)" }}>
                      <X size={12} style={{ marginRight: "4px" }} /> Cancel
                    </button>
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                {/* Name */}
                <div style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.07)", borderRadius: "10px", background: "rgba(10,10,10,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Full Name
                  </span>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="auth-input"
                      style={{ marginTop: "6px", fontSize: "14px" }}
                    />
                  ) : (
                    <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "6px 0 0" }}>
                      {user.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.07)", borderRadius: "10px", background: "rgba(10,10,10,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Email Address
                  </span>
                  <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "6px 0 0" }}>
                    {user.email}
                  </p>
                </div>

                {/* User ID */}
                <div style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.07)", borderRadius: "10px", background: "rgba(10,10,10,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    User ID
                  </span>
                  <p style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "13px", color: "var(--ink)", margin: "6px 0 0", wordBreak: "break-all" }}>
                    {user.id}
                  </p>
                </div>

                {/* Date of Birth */}
                <div style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.07)", borderRadius: "10px", background: "rgba(10,10,10,0.01)" }}>
                  <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Date of Birth
                  </span>
                  {editingProfile ? (
                    <input
                      type="date"
                      value={profileForm.dateOfBirth}
                      onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })}
                      className="auth-input"
                      style={{ marginTop: "6px", fontSize: "14px" }}
                    />
                  ) : (
                    <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "6px 0 0" }}>
                      {user.dateOfBirth
                        ? new Date(user.dateOfBirth).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : "Not set"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Quick Stats ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "14px",
            marginBottom: "40px",
          }}>
            {[
              { icon: Rocket,    value: stats.challenges,      label: "Challenges",        color: "#c8392b", bg: "rgba(200,57,43,0.08)" },
              { icon: Beaker,    value: stats.researchPrograms, label: "Research Programs",  color: "#10b981", bg: "rgba(16,185,129,0.08)" },
              { icon: BookOpen,  value: stats.enrolled,         label: "Courses Enrolled",  color: "#6366f1", bg: "rgba(99,102,241,0.08)" },
              { icon: Award,     value: stats.completed,        label: "Completed",         color: "#10b981", bg: "rgba(16,185,129,0.08)" },
              { icon: TrendingUp,value: stats.inProgress,       label: "In Progress",       color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
              { icon: Brain,     value: stats.totalActivities,  label: "Total Activities",  color: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
            ].map((s) => (
              <div key={s.label} style={{
                padding: "18px 20px",
                background: "#fff",
                border: "1px solid rgba(10,10,10,0.07)",
                borderRadius: "10px",
                borderLeft: `3px solid ${s.color}`,
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <div style={{ padding: "8px", borderRadius: "8px", background: s.bg, flexShrink: 0 }}>
                    <s.icon size={16} style={{ color: s.color, display: "block" }} />
                  </div>
                  <span style={{
                    fontSize: "28px", fontWeight: 700,
                    color: "var(--ink)",
                    fontFamily: "var(--font-playfair), serif",
                    lineHeight: 1,
                  }}>{s.value}</span>
                </div>
                <span style={{
                  fontSize: "11px", color: "var(--muted-txt)",
                  textTransform: "uppercase", letterSpacing: "0.05em",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Section Navigation ── */}
          <div style={{
            display: "flex",
            gap: 0,
            flexWrap: "wrap",
            borderBottom: "2px solid rgba(10,10,10,0.08)",
            marginBottom: "32px",
          }}>
            {[
              { key: "challenges", label: "Challenges",       count: stats.challenges },
              { key: "research",   label: "Research",         count: stats.researchPrograms },
              { key: "courses",    label: "Courses",          count: stats.enrolled },
              { key: "activity",   label: "Activity",         count: recentActivity.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setDashSection(tab.key)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "11px 20px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontFamily: "var(--font-inter, Inter, sans-serif)",
                  fontWeight: dashSection === tab.key ? 600 : 400,
                  color: dashSection === tab.key ? "var(--opt-red)" : "var(--muted-txt)",
                  borderBottom: dashSection === tab.key ? "2px solid var(--opt-red)" : "2px solid transparent",
                  marginBottom: "-2px",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
                <span style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "1px 6px",
                  borderRadius: "10px",
                  background: dashSection === tab.key ? "rgba(200,57,43,0.1)" : "rgba(10,10,10,0.06)",
                  color: dashSection === tab.key ? "var(--opt-red)" : "var(--muted-txt)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* ── Tab: Challenges ── */}
          {dashSection === "challenges" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
              {challengeRegistrations.length === 0 ? (
                <div className="ed-card">
                  <div className="ed-card-body" style={{ textAlign: "center", padding: "48px 20px" }}>
                    <Rocket size={28} style={{ color: "var(--muted-txt)", display: "block", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: "14px", color: "var(--muted-txt)", margin: "0 0 20px", fontFamily: "var(--font-inter), sans-serif" }}>
                      No challenge registrations yet.
                    </p>
                    <Link href="/community" className="opt-btn-primary" style={{ fontSize: "12px" }}>
                      Browse Challenges <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ) : challengeRegistrations.map((reg) => (
                <div key={reg.id} className="ed-card">
                  <div className="ed-card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
                          {reg.challengeTitle}
                        </h4>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "var(--opt-red)", background: "rgba(200,57,43,0.08)", padding: "2px 8px", borderRadius: "8px" }}>
                            {reg.challengeLevel}
                          </span>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "var(--muted-txt)", background: "rgba(10,10,10,0.05)", padding: "2px 8px", borderRadius: "8px" }}>
                            {reg.challengeDuration}
                          </span>
                        </div>
                      </div>
                      <span style={{
                        fontSize: "10px",
                        color: statusStyle(reg.status).color,
                        background: statusStyle(reg.status).bg,
                        padding: "4px 10px", borderRadius: "12px",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                      }}>{reg.status}</span>
                    </div>
                    <div style={{
                      display: "flex", gap: "20px", flexWrap: "wrap",
                      fontSize: "12px", color: "var(--muted-txt)",
                      paddingTop: "12px", borderTop: "1px solid rgba(10,10,10,0.06)",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} /> Starts: {new Date(reg.startsAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} /> Applied: {new Date(reg.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {reg.meetingLink ? (
                        <a href={reg.meetingLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--opt-red)", textDecoration: "none", fontWeight: 500 }}>
                          <Video size={12} /> Join Meeting <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span style={{ fontStyle: "italic" }}>📅 Meeting link coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Research ── */}
          {dashSection === "research" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
              {researchApplications.length === 0 ? (
                <div className="ed-card">
                  <div className="ed-card-body" style={{ textAlign: "center", padding: "48px 20px" }}>
                    <Beaker size={28} style={{ color: "var(--muted-txt)", display: "block", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: "14px", color: "var(--muted-txt)", margin: "0 0 20px", fontFamily: "var(--font-inter), sans-serif" }}>
                      No research applications yet.
                    </p>
                    <Link href="/research" className="opt-btn-primary" style={{ fontSize: "12px" }}>
                      Explore Research <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ) : researchApplications.map((app) => (
                <div key={app.id} className="ed-card">
                  <div className="ed-card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
                      <div>
                        <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
                          {app.programTitle}
                        </h4>
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "#10b981", background: "rgba(16,185,129,0.08)", padding: "2px 8px", borderRadius: "8px" }}>
                            {app.programDifficulty}
                          </span>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "var(--muted-txt)", background: "rgba(10,10,10,0.05)", padding: "2px 8px", borderRadius: "8px" }}>
                            {app.programOrganization}
                          </span>
                          <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "var(--muted-txt)", background: "rgba(10,10,10,0.05)", padding: "2px 8px", borderRadius: "8px" }}>
                            {app.programDuration}
                          </span>
                        </div>
                      </div>
                      <span style={{
                        fontSize: "10px",
                        color: statusStyle(app.status).color,
                        background: statusStyle(app.status).bg,
                        padding: "4px 10px", borderRadius: "12px",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                      }}>{app.status}</span>
                    </div>
                    <div style={{
                      display: "flex", gap: "20px", flexWrap: "wrap",
                      fontSize: "12px", color: "var(--muted-txt)",
                      paddingTop: "12px", borderTop: "1px solid rgba(10,10,10,0.06)",
                      fontFamily: "var(--font-inter), sans-serif",
                    }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Calendar size={12} /> Applied: {new Date(app.appliedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      {app.meetingLink ? (
                        <a href={app.meetingLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--opt-red)", textDecoration: "none", fontWeight: 500 }}>
                          <Video size={12} /> Join Meeting <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span style={{ fontStyle: "italic" }}>📅 Meeting link coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Courses ── */}
          {dashSection === "courses" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "48px" }}>
              {enrollments.length === 0 ? (
                <div className="ed-card">
                  <div className="ed-card-body" style={{ textAlign: "center", padding: "48px 20px" }}>
                    <BookOpen size={28} style={{ color: "var(--muted-txt)", display: "block", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: "14px", color: "var(--muted-txt)", margin: "0 0 20px", fontFamily: "var(--font-inter), sans-serif" }}>
                      No courses enrolled yet.
                    </p>
                    <Link href="/bootcamps" className="opt-btn-primary" style={{ fontSize: "12px" }}>
                      Browse Bootcamps <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ) : enrollments.map((enrollment) => (
                <div key={enrollment.id} className="ed-card">
                  <div className="ed-card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px", gap: "12px" }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "17px", fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>
                          {enrollment.courseTitle}
                        </h4>
                        <span style={{ fontSize: "10px", fontFamily: "var(--font-dm-mono), monospace", color: "var(--muted-txt)", background: "rgba(10,10,10,0.05)", padding: "2px 8px", borderRadius: "8px" }}>
                          {enrollment.courseCategory}
                        </span>
                      </div>
                      <span style={{
                        fontSize: "10px",
                        color: statusStyle(enrollment.status).color,
                        background: statusStyle(enrollment.status).bg,
                        padding: "4px 10px", borderRadius: "12px",
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                      }}>{enrollment.status}</span>
                    </div>
                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-inter), sans-serif" }}>Progress</span>
                        <span style={{ fontSize: "11px", color: "var(--ink)", fontWeight: 600, fontFamily: "var(--font-dm-mono), monospace" }}>{enrollment.progress}%</span>
                      </div>
                      <div style={{ height: "6px", background: "rgba(10,10,10,0.08)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{
                          height: "100%",
                          width: `${enrollment.progress}%`,
                          background: enrollment.progress === 100 ? "#10b981" : "var(--opt-red)",
                          borderRadius: "3px",
                          transition: "width 0.5s ease",
                        }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", fontSize: "12px", color: "var(--muted-txt)", paddingTop: "12px", borderTop: "1px solid rgba(10,10,10,0.06)", fontFamily: "var(--font-inter), sans-serif" }}>
                      {enrollment.meetingLink ? (
                        <a href={enrollment.meetingLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--opt-red)", textDecoration: "none", fontWeight: 500 }}>
                          <Video size={12} /> Join Meeting <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span style={{ fontStyle: "italic" }}>📅 Meeting link coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Activity ── */}
          {dashSection === "activity" && (
            <div style={{ marginBottom: "48px" }}>
              {recentActivity.length === 0 ? (
                <div className="ed-card">
                  <div className="ed-card-body" style={{ textAlign: "center", padding: "48px 20px" }}>
                    <TrendingUp size={28} style={{ color: "var(--muted-txt)", display: "block", margin: "0 auto 12px" }} />
                    <p style={{ fontSize: "14px", color: "var(--muted-txt)", margin: 0, fontFamily: "var(--font-inter), sans-serif" }}>
                      No activity yet. Start by joining a challenge or research program!
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ position: "relative", paddingLeft: "32px" }}>
                  <div style={{
                    position: "absolute", left: "9px", top: "12px", bottom: "12px",
                    width: "2px",
                    background: "linear-gradient(to bottom, var(--opt-red), rgba(200,57,43,0.08))",
                  }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {recentActivity.map((activity) => (
                      <div key={activity.id} style={{ position: "relative" }}>
                        <div style={{
                          position: "absolute", left: "-27px", top: "50%",
                          transform: "translateY(-50%)",
                          width: "10px", height: "10px",
                          borderRadius: "50%",
                          background: "var(--opt-red)",
                          border: "2px solid var(--paper)",
                          boxShadow: "0 0 0 3px rgba(200,57,43,0.15)",
                        }} />
                        <div className="ed-card">
                          <div className="ed-card-body" style={{ padding: "16px 20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                              <p style={{ margin: 0, fontSize: "14px", color: "var(--ink)", fontFamily: "var(--font-inter), sans-serif" }}>
                                {activity.description}
                              </p>
                              <span style={{
                                fontSize: "10px",
                                color: "#10b981", background: "rgba(16,185,129,0.08)",
                                padding: "3px 8px", borderRadius: "8px",
                                textTransform: "uppercase", letterSpacing: "0.04em",
                                fontFamily: "var(--font-dm-mono), monospace",
                                fontWeight: 600, whiteSpace: "nowrap", flexShrink: 0,
                              }}>{activity.type}</span>
                            </div>
                            <p style={{ margin: 0, fontSize: "11px", color: "var(--muted-txt)", fontFamily: "var(--font-dm-mono), monospace" }}>
                              {new Date(activity.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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