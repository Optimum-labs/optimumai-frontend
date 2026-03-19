"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase"
import Link from "next/link"
import {
  LayoutDashboard, Users, Trophy, BookOpen, Calendar, Shield,
  Search, Plus, Edit3, Trash2, X, Check, Video, ChevronLeft,
  ChevronRight, RefreshCw, MapPin, Clock, Award, Layers, ExternalLink,
  ChevronDown, FlaskConical, Megaphone, Eye, Globe, Linkedin
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "overview" | "users" | "challenges" | "courses" | "events" | "research" | "ambassadors"

interface Stats {
  users: number; challenges: number; courses: number; events: number
  challengeRegistrations: number; enrollments: number
  researchApplications: number; eventRegistrations: number
  researchPrograms: number; ambassadors: number
}

interface UserRow {
  id: string; name: string; email: string; role: string; emailVerified: boolean
  dateOfBirth: string | null; createdAt: string
  _count: { enrollments: number; challengeRegs: number; researchApps: number; eventRegs: number }
}

interface UserDetail {
  id: string; name: string; email: string; role: string; emailVerified: boolean
  dateOfBirth: string | null; createdAt: string
  enrollments: { id: string; status: string; enrolledAt: string; course: { title: string; category: string; level: string } }[]
  challengeRegs: { id: string; status: string; createdAt: string; challenge: { title: string; level: string; status: string } }[]
  eventRegs: { id: string; createdAt: string; event: { title: string; date: string; type: string } }[]
  researchApps: { id: string; status: string; createdAt: string; program: { title: string; organization: string; difficulty: string } }[]
  ambassadors: { id: string; status: string; region: string | null; createdAt: string }[]
}

interface ChallengeRow {
  id: string; title: string; description: string; level: string; duration: string
  prizePool: string | null; partnership: string | null; maxTeams: number; teamSize: number
  tags: string[]; startsAt: string; registrationCloses: string | null; status: string
  _count: { registrations: number }
}

interface CourseRow {
  id: string; title: string; description: string; category: string
  duration: string; level: string; tags: string[]
  _count: { enrollments: number }
}

interface EventRow {
  id: string; title: string; description: string; date: string; time: string
  location: string; type: string; maxAttendees: number | null
  status: string; meetingLink: string | null
  _count: { registrations: number }
}

interface ResearchRow {
  id: string; title: string; description: string; organization: string
  difficulty: string; duration: string; tags: string[]; objectives: string[]
  prerequisites: string[]; status: string; meetingLink: string | null
  _count: { applications: number }
}

interface AmbassadorRow {
  id: string; fullName: string; email: string; university: string | null
  linkedIn: string | null; motivation: string; status: string
  region: string | null; createdAt: string
  user: { name: string; role: string } | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const LEVEL_COLORS: Record<string, string> = {
  beginner: "#2a7d4f", intermediate: "#b7881a", advanced: "var(--opt-red)"
}

const STATUS_COLORS: Record<string, { color: string; bg: string }> = {
  open:          { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
  upcoming:      { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
  accepting:     { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
  approved:      { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
  active:        { color: "#2a7d4f", bg: "rgba(42,125,79,0.1)" },
  pending:       { color: "#b7881a", bg: "rgba(183,136,26,0.1)" },
  "in-progress": { color: "#b7881a", bg: "rgba(183,136,26,0.1)" },
  ongoing:       { color: "#b7881a", bg: "rgba(183,136,26,0.1)" },
  enrolled:      { color: "#b7881a", bg: "rgba(183,136,26,0.1)" },
  registered:    { color: "#b7881a", bg: "rgba(183,136,26,0.1)" },
  bootcamp:      { color: "var(--gold)", bg: "rgba(16,185,129,0.1)" },
  learning:      { color: "#7c5cba", bg: "rgba(124,92,186,0.1)" },
  completed:     { color: "#6b6456", bg: "rgba(107,100,86,0.1)" },
  closed:        { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
  cancelled:     { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
  inactive:      { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
  rejected:      { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
  admin:         { color: "var(--opt-red)", bg: "rgba(200,57,43,0.1)" },
  user:          { color: "#6b6456",        bg: "rgba(107,100,86,0.1)" },
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function Pill({ label }: { label: string }) {
  const s = STATUS_COLORS[label] || { color: "#6b6456", bg: "rgba(107,100,86,0.1)" }
  return (
    <span style={{
      padding: "2px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 700,
      textTransform: "uppercase" as const, letterSpacing: "0.05em",
      color: s.color, background: s.bg, whiteSpace: "nowrap" as const
    }}>{label}</span>
  )
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div style={{ padding: "56px 24px", textAlign: "center", color: "var(--muted-txt)" }}>
      <div style={{ marginBottom: 10, opacity: 0.3 }}>{icon}</div>
      <p style={{ fontFamily: "DM Mono,monospace", fontSize: "0.83rem" }}>{text}</p>
    </div>
  )
}

function InlineField({ label, value, type = "text", options, onChange, required, span }: {
  label: string; value: string | number; type?: string
  options?: { value: string; label: string }[]
  onChange: (v: string) => void; required?: boolean; span?: boolean
}) {
  return (
    <div className="adm-field" style={span ? { gridColumn: "1/-1" } : undefined}>
      <label className="adm-label">
        {label}{required && <span style={{ color: "var(--opt-red)" }}> *</span>}
      </label>
      {options ? (
        <div className="adm-sel-wrap">
          <select className="adm-input" value={String(value)} onChange={e => onChange(e.target.value)}>
            {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} className="adm-sel-icon" />
        </div>
      ) : type === "textarea" ? (
        <textarea className="adm-input adm-textarea" value={String(value)}
          onChange={e => onChange(e.target.value)} rows={3} />
      ) : (
        <input className="adm-input" type={type} value={String(value)}
          onChange={e => onChange(e.target.value)} />
      )}
    </div>
  )
}

function Modal({ title, onClose, onSave, saving, children }: {
  title: string; onClose: () => void; onSave?: () => void; saving?: boolean; children: React.ReactNode
}) {
  return (
    <div className="adm-overlay" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-head">
          <h2 className="adm-modal-title">{title}</h2>
          <button className="adm-icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {onSave && (
          <div className="adm-modal-foot">
            <button className="adm-btn adm-btn-ghost" onClick={onClose}>Cancel</button>
            <button className="adm-btn adm-btn-primary" onClick={onSave} disabled={saving}>
              {saving ? <><RefreshCw size={13} className="adm-spin" /> Saving…</> : <><Check size={13} /> Save</>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [loading, setLoading]         = useState(true)
  const [authorized, setAuthorized]   = useState(false)
  const [tab, setTab]                 = useState<Tab>("overview")
  const [stats, setStats]             = useState<Stats | null>(null)
  const [recentUsers, setRecentUsers] = useState<{ id: string; name: string; email: string; createdAt: string }[]>([])

  // Users
  const [users, setUsers]           = useState<UserRow[]>([])
  const [userSearch, setUserSearch] = useState("")
  const [userPage, setUserPage]     = useState(1)
  const [userPages, setUserPages]   = useState(1)
  const [userTotal, setUserTotal]   = useState(0)

  // User detail
  const [userDetail, setUserDetail]           = useState<UserDetail | null>(null)
  const [userDetailModal, setUserDetailModal] = useState(false)
  const [loadingDetail, setLoadingDetail]     = useState(false)

  // Challenges
  const [challenges, setChallenges]             = useState<ChallengeRow[]>([])
  const [challengeModal, setChallengeModal]     = useState(false)
  const [editingChallenge, setEditingChallenge] = useState<ChallengeRow | null>(null)
  const blankC = { title: "", description: "", level: "beginner", duration: "", prizePool: "", partnership: "", maxTeams: "10", teamSize: "5", tags: "", startsAt: "", registrationCloses: "", status: "open" }
  const [cf, setCf] = useState(blankC)

  // Courses
  const [courses, setCourses]             = useState<CourseRow[]>([])
  const [courseModal, setCourseModal]     = useState(false)
  const [editingCourse, setEditingCourse] = useState<CourseRow | null>(null)
  const blankK = { title: "", description: "", category: "bootcamp", duration: "", level: "beginner", tags: "" }
  const [kf, setKf] = useState(blankK)

  // Events
  const [events, setEvents]             = useState<EventRow[]>([])
  const [eventModal, setEventModal]     = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventRow | null>(null)
  const blankE = { title: "", description: "", date: "", time: "", location: "", type: "workshop", maxAttendees: "", status: "upcoming", meetingLink: "" }
  const [ef, setEf] = useState(blankE)

  // Research
  const [research, setResearch]               = useState<ResearchRow[]>([])
  const [researchModal, setResearchModal]     = useState(false)
  const [editingResearch, setEditingResearch] = useState<ResearchRow | null>(null)
  const blankR = { title: "", description: "", organization: "", difficulty: "beginner", duration: "", tags: "", objectives: "", prerequisites: "", status: "accepting", meetingLink: "" }
  const [rf, setRf] = useState(blankR)

  // Ambassadors
  const [ambassadors, setAmbassadors]           = useState<AmbassadorRow[]>([])
  const [ambassadorSearch, setAmbassadorSearch] = useState("")
  const [ambassadorFilter, setAmbassadorFilter] = useState("")

  const [saving, setSaving] = useState(false)

  // ── Auth ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push("/login"); return }
      const res = await fetch("/api/admin")
      if (!res.ok) { router.push("/dashboard"); return }
      const d = await res.json()
      setStats(d.stats); setRecentUsers(d.recentUsers)
      setAuthorized(true); setLoading(false)
    })()
  }, [])

  // ── Fetch on tab change ───────────────────────────────────────────────────
  useEffect(() => {
    if (!authorized) return
    if (tab === "users")       fetchUsers()
    if (tab === "challenges")  fetchChallenges()
    if (tab === "courses")     fetchCourses()
    if (tab === "events")      fetchEvents()
    if (tab === "research")    fetchResearch()
    if (tab === "ambassadors") fetchAmbassadors()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, authorized])

  // ── API helpers ───────────────────────────────────────────────────────────
  const fetchUsers = async (page = 1, search = userSearch) => {
    const r = await fetch(`/api/admin/users?page=${page}&search=${encodeURIComponent(search)}`)
    if (!r.ok) return
    const d = await r.json()
    setUsers(d.users); setUserPage(d.page); setUserPages(d.pages); setUserTotal(d.total)
  }
  const fetchChallenges = async () => { const r = await fetch("/api/admin/challenges"); if (r.ok) setChallenges(await r.json()) }
  const fetchCourses    = async () => { const r = await fetch("/api/admin/courses");    if (r.ok) setCourses(await r.json()) }
  const fetchEvents     = async () => { const r = await fetch("/api/admin/events");     if (r.ok) setEvents(await r.json()) }
  const fetchResearch   = async () => { const r = await fetch("/api/admin/research");   if (r.ok) setResearch(await r.json()) }
  const fetchAmbassadors = async (search = ambassadorSearch, status = ambassadorFilter) => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status) params.set("status", status)
    const r = await fetch(`/api/admin/ambassadors?${params}`)
    if (r.ok) setAmbassadors(await r.json())
  }

  const openUserDetail = async (userId: string) => {
    setLoadingDetail(true); setUserDetailModal(true)
    const r = await fetch(`/api/admin/users/detail?id=${userId}`)
    if (r.ok) setUserDetail(await r.json())
    setLoadingDetail(false)
  }

  const toggleRole = async (userId: string, current: string) => {
    await fetch("/api/admin/users", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: current === "admin" ? "user" : "admin" })
    })
    fetchUsers(userPage)
  }

  // ── Challenge CRUD ────────────────────────────────────────────────────────
  const openChallenge = (c?: ChallengeRow) => {
    setEditingChallenge(c || null)
    setCf(c ? {
      title: c.title, description: c.description, level: c.level,
      duration: c.duration, prizePool: c.prizePool || "",
      partnership: c.partnership || "", maxTeams: String(c.maxTeams),
      teamSize: String(c.teamSize), tags: c.tags.join(", "),
      startsAt: c.startsAt.split("T")[0],
      registrationCloses: c.registrationCloses ? c.registrationCloses.split("T")[0] : "",
      status: c.status
    } : blankC)
    setChallengeModal(true)
  }
  const saveChallenge = async () => {
    if (!cf.title.trim() || !cf.description.trim() || !cf.duration.trim() || !cf.startsAt) return
    setSaving(true)
    const payload: Record<string, unknown> = {
      ...cf,
      tags: cf.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      maxTeams: Number(cf.maxTeams), teamSize: Number(cf.teamSize),
    }
    if (editingChallenge) payload.id = editingChallenge.id
    const r = await fetch("/api/admin/challenges", {
      method: editingChallenge ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    })
    if (r.ok) { setChallengeModal(false); fetchChallenges() }
    setSaving(false)
  }
  const deleteChallenge = async (id: string) => {
    if (!confirm("Delete this challenge?")) return
    await fetch(`/api/admin/challenges?id=${id}`, { method: "DELETE" })
    fetchChallenges()
  }

  // ── Course CRUD ───────────────────────────────────────────────────────────
  const openCourse = (c?: CourseRow) => {
    setEditingCourse(c || null)
    setKf(c ? { title: c.title, description: c.description, category: c.category, duration: c.duration, level: c.level, tags: c.tags.join(", ") } : blankK)
    setCourseModal(true)
  }
  const saveCourse = async () => {
    if (!kf.title.trim() || !kf.description.trim() || !kf.duration.trim()) return
    setSaving(true)
    const payload: Record<string, unknown> = { ...kf, tags: kf.tags.split(",").map((t: string) => t.trim()).filter(Boolean) }
    if (editingCourse) payload.id = editingCourse.id
    const r = await fetch("/api/admin/courses", {
      method: editingCourse ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    })
    if (r.ok) { setCourseModal(false); fetchCourses() }
    setSaving(false)
  }
  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course?")) return
    await fetch(`/api/admin/courses?id=${id}`, { method: "DELETE" })
    fetchCourses()
  }

  // ── Event CRUD ────────────────────────────────────────────────────────────
  const openEvent = (e?: EventRow) => {
    setEditingEvent(e || null)
    setEf(e ? {
      title: e.title, description: e.description, date: e.date.split("T")[0],
      time: e.time, location: e.location, type: e.type,
      maxAttendees: e.maxAttendees?.toString() || "",
      status: e.status, meetingLink: e.meetingLink || ""
    } : blankE)
    setEventModal(true)
  }
  const saveEvent = async () => {
    if (!ef.title.trim() || !ef.description.trim() || !ef.date || !ef.time || !ef.location.trim()) return
    setSaving(true)
    const payload: Record<string, unknown> = { ...ef, maxAttendees: ef.maxAttendees ? Number(ef.maxAttendees) : null }
    if (editingEvent) payload.id = editingEvent.id
    const r = await fetch("/api/admin/events", {
      method: editingEvent ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    })
    if (r.ok) { setEventModal(false); fetchEvents() }
    setSaving(false)
  }
  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event?")) return
    await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" })
    fetchEvents()
  }

  // ── Research CRUD ─────────────────────────────────────────────────────────
  const openResearch = (r?: ResearchRow) => {
    setEditingResearch(r || null)
    setRf(r ? {
      title: r.title, description: r.description, organization: r.organization,
      difficulty: r.difficulty, duration: r.duration, tags: r.tags.join(", "),
      objectives: r.objectives.join(", "), prerequisites: r.prerequisites.join(", "),
      status: r.status, meetingLink: r.meetingLink || ""
    } : blankR)
    setResearchModal(true)
  }
  const saveResearch = async () => {
    if (!rf.title.trim() || !rf.description.trim() || !rf.organization.trim() || !rf.duration.trim()) return
    setSaving(true)
    const payload: Record<string, unknown> = {
      ...rf,
      tags: rf.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      objectives: rf.objectives.split(",").map((t: string) => t.trim()).filter(Boolean),
      prerequisites: rf.prerequisites.split(",").map((t: string) => t.trim()).filter(Boolean),
    }
    if (editingResearch) payload.id = editingResearch.id
    const r = await fetch("/api/admin/research", {
      method: editingResearch ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
    })
    if (r.ok) { setResearchModal(false); fetchResearch() }
    setSaving(false)
  }
  const deleteResearch = async (id: string) => {
    if (!confirm("Delete this research program?")) return
    await fetch(`/api/admin/research?id=${id}`, { method: "DELETE" })
    fetchResearch()
  }

  // ── Ambassador actions ────────────────────────────────────────────────────
  const updateAmbassadorStatus = async (id: string, status: string) => {
    await fetch("/api/admin/ambassadors", {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    })
    fetchAmbassadors()
  }
  const deleteAmbassador = async (id: string) => {
    if (!confirm("Delete this ambassador record?")) return
    await fetch(`/api/admin/ambassadors?id=${id}`, { method: "DELETE" })
    fetchAmbassadors()
  }

  // ── Guards ────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="adm-loading">
      <RefreshCw size={22} className="adm-spin" />
      <span>Loading admin panel…</span>
    </div>
  )
  if (!authorized) return null

  const NAV: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "overview",    label: "Overview",    icon: <LayoutDashboard size={15} /> },
    { key: "users",       label: "Users",       icon: <Users size={15} />,        count: stats?.users },
    { key: "challenges",  label: "Challenges",  icon: <Trophy size={15} />,       count: stats?.challenges },
    { key: "courses",     label: "Courses",     icon: <BookOpen size={15} />,     count: stats?.courses },
    { key: "events",      label: "Events",      icon: <Calendar size={15} />,     count: stats?.events },
    { key: "research",    label: "Research",     icon: <FlaskConical size={15} />, count: stats?.researchPrograms },
    { key: "ambassadors", label: "Ambassadors", icon: <Megaphone size={15} />,    count: stats?.ambassadors },
  ]

  return (
    <div className="adm-shell">

      {/* ── Sidebar ───────────────────────────────────────────────────── */}
      <aside className="adm-sidebar">
        <div className="adm-brand">
          <Shield size={17} style={{ color: "var(--opt-red)" }} />
          <span>Admin</span>
        </div>

        <nav className="adm-nav">
          {NAV.map(n => (
            <button
              key={n.key}
              className={`adm-nav-btn${tab === n.key ? " active" : ""}`}
              onClick={() => setTab(n.key)}
            >
              {n.icon}
              <span>{n.label}</span>
              {n.count !== undefined && <span className="adm-nav-badge">{n.count}</span>}
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <Link href="/dashboard" className="adm-nav-btn" style={{ textDecoration: "none" }}>
            <LayoutDashboard size={15} /><span>Dashboard</span>
          </Link>
          <Link href="/" className="adm-nav-btn" style={{ textDecoration: "none" }}>
            <ExternalLink size={15} /><span>View Site</span>
          </Link>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────── */}
      <main className="adm-main">

        {/* ══ OVERVIEW ══ */}
        {tab === "overview" && stats && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Overview</h1>
                <p className="adm-page-sub">Platform snapshot</p>
              </div>
            </div>

            <div className="adm-stat-grid">
              {([
                { label: "Total Users",      value: stats.users,                  icon: <Users size={20} />,        accent: "var(--opt-red)" },
                { label: "Challenges",       value: stats.challenges,             icon: <Trophy size={20} />,       accent: "var(--gold)" },
                { label: "Courses",          value: stats.courses,                icon: <BookOpen size={20} />,     accent: "#7c5cba" },
                { label: "Events",           value: stats.events,                 icon: <Calendar size={20} />,     accent: "#b7881a" },
                { label: "Challenge Regs",   value: stats.challengeRegistrations, icon: <Award size={20} />,        accent: "var(--opt-red)" },
                { label: "Enrollments",      value: stats.enrollments,            icon: <Layers size={20} />,       accent: "var(--gold)" },
                { label: "Research Programs",value: stats.researchPrograms,       icon: <FlaskConical size={20} />, accent: "#2a7d4f" },
                { label: "Research Apps",    value: stats.researchApplications,   icon: <FlaskConical size={20} />, accent: "#2a7d4f" },
                { label: "Event Regs",       value: stats.eventRegistrations,     icon: <Calendar size={20} />,     accent: "#b7881a" },
                { label: "Ambassadors",      value: stats.ambassadors,            icon: <Megaphone size={20} />,    accent: "#7c5cba" },
              ] as { label: string; value: number; icon: React.ReactNode; accent: string }[]).map((s, i) => (
                <div className="adm-stat-card" key={i}>
                  <div className="adm-stat-icon" style={{
                    background: `color-mix(in srgb, ${s.accent} 12%, transparent)`,
                    color: s.accent
                  }}>{s.icon}</div>
                  <div className="adm-stat-val">{s.value}</div>
                  <div className="adm-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="adm-card" style={{ marginTop: 32 }}>
              <div className="adm-card-head">
                <h3 className="adm-card-title">Recent Signups</h3>
                <button className="adm-btn adm-btn-ghost adm-btn-sm"
                  onClick={() => setTab("users")}>View all →</button>
              </div>
              <table className="adm-table">
                <thead><tr><th>Name</th><th>Email</th><th>Joined</th></tr></thead>
                <tbody>
                  {recentUsers.map(u => (
                    <tr key={u.id}>
                      <td><span className="adm-fw">{u.name}</span></td>
                      <td className="adm-muted">{u.email}</td>
                      <td className="adm-muted">{fmt(u.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ══ USERS ══ */}
        {tab === "users" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Users</h1>
                <p className="adm-page-sub">{userTotal} registered members</p>
              </div>
            </div>

            <form className="adm-search-row"
              onSubmit={e => { e.preventDefault(); fetchUsers(1, userSearch) }}>
              <div className="adm-search-wrap">
                <Search size={14} className="adm-search-icon" />
                <input
                  className="adm-search-input"
                  placeholder="Search by name or email…"
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="adm-btn adm-btn-primary">Search</button>
              {userSearch && (
                <button type="button" className="adm-btn adm-btn-ghost"
                  onClick={() => { setUserSearch(""); fetchUsers(1, "") }}>Clear</button>
              )}
            </form>

            <div className="adm-card">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Email</th><th>Role</th><th>Verified</th>
                    <th>Challenges</th><th>Courses</th><th>Joined</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr><td colSpan={8}>
                      <EmptyState icon={<Users size={34} />} text="No users found" />
                    </td></tr>
                  )}
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <button className="adm-user-link" onClick={() => openUserDetail(u.id)}>
                          {u.name}
                        </button>
                      </td>
                      <td className="adm-muted">{u.email}</td>
                      <td><Pill label={u.role} /></td>
                      <td>
                        {u.emailVerified
                          ? <span className="adm-yes"><Check size={12} /> Yes</span>
                          : <span className="adm-no"><X size={12} /> No</span>}
                      </td>
                      <td className="adm-center">{u._count.challengeRegs}</td>
                      <td className="adm-center">{u._count.enrollments}</td>
                      <td className="adm-muted">{fmt(u.createdAt)}</td>
                      <td>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button className="adm-icon-btn" onClick={() => openUserDetail(u.id)} title="View details">
                            <Eye size={14} />
                          </button>
                          <button
                            className={`adm-role-btn${u.role === "admin" ? " is-admin" : ""}`}
                            onClick={() => toggleRole(u.id, u.role)}
                            title={u.role === "admin" ? "Revoke admin" : "Grant admin"}
                          >
                            <Shield size={12} />
                            {u.role === "admin" ? "Revoke" : "Grant"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {userPages > 1 && (
              <div className="adm-pager">
                <button className="adm-pager-btn" disabled={userPage <= 1}
                  onClick={() => fetchUsers(userPage - 1)}><ChevronLeft size={15} /></button>
                <span className="adm-pager-info">Page {userPage} / {userPages}</span>
                <button className="adm-pager-btn" disabled={userPage >= userPages}
                  onClick={() => fetchUsers(userPage + 1)}><ChevronRight size={15} /></button>
              </div>
            )}
          </section>
        )}

        {/* ── User Detail Modal ── */}
        {userDetailModal && (
          <Modal title={userDetail ? `${userDetail.name}'s Profile` : "Loading…"} onClose={() => { setUserDetailModal(false); setUserDetail(null) }}>
            {loadingDetail ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--muted-txt)" }}>
                <RefreshCw size={20} className="adm-spin" /><br />Loading…
              </div>
            ) : userDetail ? (
              <div className="adm-detail-sections">
                {/* Info */}
                <div className="adm-detail-info">
                  <div><strong>Email:</strong> {userDetail.email}</div>
                  <div><strong>Role:</strong> <Pill label={userDetail.role} /></div>
                  <div><strong>Verified:</strong> {userDetail.emailVerified ? "Yes" : "No"}</div>
                  <div><strong>Joined:</strong> {fmt(userDetail.createdAt)}</div>
                  {userDetail.dateOfBirth && <div><strong>DOB:</strong> {fmt(userDetail.dateOfBirth)}</div>}
                </div>

                {/* Courses & Bootcamps */}
                <div className="adm-detail-block">
                  <h4 className="adm-detail-heading"><BookOpen size={14} /> Courses &amp; Bootcamps ({userDetail.enrollments.length})</h4>
                  {userDetail.enrollments.length === 0
                    ? <p className="adm-detail-empty">No enrollments yet</p>
                    : <table className="adm-table">
                        <thead><tr><th>Course</th><th>Category</th><th>Level</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {userDetail.enrollments.map(e => (
                            <tr key={e.id}>
                              <td className="adm-fw">{e.course.title}</td>
                              <td><Pill label={e.course.category} /></td>
                              <td style={{ color: LEVEL_COLORS[e.course.level] }}>{e.course.level}</td>
                              <td><Pill label={e.status} /></td>
                              <td className="adm-muted">{fmt(e.enrolledAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  }
                </div>

                {/* Challenges */}
                <div className="adm-detail-block">
                  <h4 className="adm-detail-heading"><Trophy size={14} /> Challenges ({userDetail.challengeRegs.length})</h4>
                  {userDetail.challengeRegs.length === 0
                    ? <p className="adm-detail-empty">No challenge registrations</p>
                    : <table className="adm-table">
                        <thead><tr><th>Challenge</th><th>Level</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {userDetail.challengeRegs.map(c => (
                            <tr key={c.id}>
                              <td className="adm-fw">{c.challenge.title}</td>
                              <td style={{ color: LEVEL_COLORS[c.challenge.level] }}>{c.challenge.level}</td>
                              <td><Pill label={c.status} /></td>
                              <td className="adm-muted">{fmt(c.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  }
                </div>

                {/* Events */}
                <div className="adm-detail-block">
                  <h4 className="adm-detail-heading"><Calendar size={14} /> Events ({userDetail.eventRegs.length})</h4>
                  {userDetail.eventRegs.length === 0
                    ? <p className="adm-detail-empty">No event registrations</p>
                    : <table className="adm-table">
                        <thead><tr><th>Event</th><th>Type</th><th>Date</th></tr></thead>
                        <tbody>
                          {userDetail.eventRegs.map(e => (
                            <tr key={e.id}>
                              <td className="adm-fw">{e.event.title}</td>
                              <td><Pill label={e.event.type} /></td>
                              <td className="adm-muted">{fmt(e.event.date)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  }
                </div>

                {/* Research */}
                <div className="adm-detail-block">
                  <h4 className="adm-detail-heading"><FlaskConical size={14} /> Research Applications ({userDetail.researchApps.length})</h4>
                  {userDetail.researchApps.length === 0
                    ? <p className="adm-detail-empty">No research applications</p>
                    : <table className="adm-table">
                        <thead><tr><th>Program</th><th>Organization</th><th>Status</th><th>Date</th></tr></thead>
                        <tbody>
                          {userDetail.researchApps.map(r => (
                            <tr key={r.id}>
                              <td className="adm-fw">{r.program.title}</td>
                              <td className="adm-muted">{r.program.organization}</td>
                              <td><Pill label={r.status} /></td>
                              <td className="adm-muted">{fmt(r.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                  }
                </div>

                {/* Ambassador */}
                {userDetail.ambassadors.length > 0 && (
                  <div className="adm-detail-block">
                    <h4 className="adm-detail-heading"><Megaphone size={14} /> Ambassador</h4>
                    {userDetail.ambassadors.map(a => (
                      <div key={a.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        <Pill label={a.status} />
                        {a.region && <span className="adm-muted">Region: {a.region}</span>}
                        <span className="adm-muted">Since {fmt(a.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </Modal>
        )}

        {/* ══ CHALLENGES ══ */}
        {tab === "challenges" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Challenges</h1>
                <p className="adm-page-sub">{challenges.length} total</p>
              </div>
              <button className="adm-btn adm-btn-primary" onClick={() => openChallenge()}>
                <Plus size={14} /> New Challenge
              </button>
            </div>

            {challenges.length === 0
              ? <div className="adm-card"><EmptyState icon={<Trophy size={34} />} text="No challenges yet. Create one above." /></div>
              : <div className="adm-card-grid">
                  {challenges.map(c => (
                    <div key={c.id} className="adm-item-card">
                      <div className="adm-item-head">
                        <Pill label={c.status} />
                        <div className="adm-item-actions">
                          <button className="adm-icon-btn" onClick={() => openChallenge(c)} title="Edit"><Edit3 size={14} /></button>
                          <button className="adm-icon-btn adm-icon-danger" onClick={() => deleteChallenge(c.id)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <h3 className="adm-item-title">{c.title}</h3>
                      <p className="adm-item-desc">{c.description.slice(0, 110)}{c.description.length > 110 ? "…" : ""}</p>
                      <div className="adm-item-meta">
                        <span><Clock size={11} /> {c.duration}</span>
                        <span style={{ color: LEVEL_COLORS[c.level] }}>◆ {c.level}</span>
                        <span><Users size={11} /> {c._count.registrations} regs</span>
                        {c.prizePool && <span><Award size={11} /> {c.prizePool}</span>}
                      </div>
                      {c.tags.length > 0 && (
                        <div className="adm-tags">
                          {c.tags.slice(0, 4).map(t => <span key={t} className="adm-tag">{t}</span>)}
                          {c.tags.length > 4 && <span className="adm-tag">+{c.tags.length - 4}</span>}
                        </div>
                      )}
                      <div className="adm-item-footer">
                        <span>Starts {fmt(c.startsAt)}</span>
                        <span>{c.maxTeams} teams · {c.teamSize}/team</span>
                      </div>
                    </div>
                  ))}
                </div>
            }

            {challengeModal && (
              <Modal
                title={editingChallenge ? "Edit Challenge" : "New Challenge"}
                onClose={() => setChallengeModal(false)}
                onSave={saveChallenge}
                saving={saving}
              >
                <div className="adm-form-grid">
                  <InlineField label="Title" value={cf.title} onChange={v => setCf(f => ({ ...f, title: v }))} required />
                  <InlineField label="Duration" value={cf.duration} onChange={v => setCf(f => ({ ...f, duration: v }))} required />
                  <InlineField label="Description" value={cf.description} type="textarea"
                    onChange={v => setCf(f => ({ ...f, description: v }))} required span />
                  <InlineField label="Level" value={cf.level} options={[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" }
                  ]} onChange={v => setCf(f => ({ ...f, level: v }))} />
                  <InlineField label="Status" value={cf.status} options={[
                    { value: "open", label: "Open" },
                    { value: "in-progress", label: "In Progress" },
                    { value: "closed", label: "Closed" },
                    { value: "completed", label: "Completed" }
                  ]} onChange={v => setCf(f => ({ ...f, status: v }))} />
                  <InlineField label="Prize Pool" value={cf.prizePool}
                    onChange={v => setCf(f => ({ ...f, prizePool: v }))} />
                  <InlineField label="Partnership" value={cf.partnership}
                    onChange={v => setCf(f => ({ ...f, partnership: v }))} />
                  <InlineField label="Max Teams" value={cf.maxTeams} type="number"
                    onChange={v => setCf(f => ({ ...f, maxTeams: v }))} />
                  <InlineField label="Team Size" value={cf.teamSize} type="number"
                    onChange={v => setCf(f => ({ ...f, teamSize: v }))} />
                  <InlineField label="Starts At" value={cf.startsAt} type="date"
                    onChange={v => setCf(f => ({ ...f, startsAt: v }))} required />
                  <InlineField label="Registration Closes" value={cf.registrationCloses} type="date"
                    onChange={v => setCf(f => ({ ...f, registrationCloses: v }))} />
                  <InlineField label="Tags (comma-separated)" value={cf.tags}
                    onChange={v => setCf(f => ({ ...f, tags: v }))} span />
                </div>
              </Modal>
            )}
          </section>
        )}

        {/* ══ COURSES ══ */}
        {tab === "courses" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Courses &amp; Bootcamps</h1>
                <p className="adm-page-sub">{courses.length} total</p>
              </div>
              <button className="adm-btn adm-btn-primary" onClick={() => openCourse()}>
                <Plus size={14} /> New Course
              </button>
            </div>

            {courses.length === 0
              ? <div className="adm-card"><EmptyState icon={<BookOpen size={34} />} text="No courses yet. Create one above." /></div>
              : <div className="adm-card-grid">
                  {courses.map(c => (
                    <div key={c.id} className="adm-item-card">
                      <div className="adm-item-head">
                        <Pill label={c.category} />
                        <div className="adm-item-actions">
                          <button className="adm-icon-btn" onClick={() => openCourse(c)} title="Edit"><Edit3 size={14} /></button>
                          <button className="adm-icon-btn adm-icon-danger" onClick={() => deleteCourse(c.id)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <h3 className="adm-item-title">{c.title}</h3>
                      <p className="adm-item-desc">{c.description.slice(0, 110)}{c.description.length > 110 ? "…" : ""}</p>
                      <div className="adm-item-meta">
                        <span><Clock size={11} /> {c.duration}</span>
                        <span style={{ color: LEVEL_COLORS[c.level] }}>◆ {c.level}</span>
                        <span><Users size={11} /> {c._count.enrollments} enrolled</span>
                      </div>
                      {c.tags.length > 0 && (
                        <div className="adm-tags">
                          {c.tags.slice(0, 4).map(t => <span key={t} className="adm-tag">{t}</span>)}
                          {c.tags.length > 4 && <span className="adm-tag">+{c.tags.length - 4}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
            }

            {courseModal && (
              <Modal
                title={editingCourse ? "Edit Course" : "New Course"}
                onClose={() => setCourseModal(false)}
                onSave={saveCourse}
                saving={saving}
              >
                <div className="adm-form-grid">
                  <InlineField label="Title" value={kf.title} onChange={v => setKf(f => ({ ...f, title: v }))} required />
                  <InlineField label="Duration" value={kf.duration} onChange={v => setKf(f => ({ ...f, duration: v }))} required />
                  <InlineField label="Description" value={kf.description} type="textarea"
                    onChange={v => setKf(f => ({ ...f, description: v }))} required span />
                  <InlineField label="Category" value={kf.category} options={[
                    { value: "bootcamp", label: "Bootcamp" },
                    { value: "learning", label: "Learning" }
                  ]} onChange={v => setKf(f => ({ ...f, category: v }))} />
                  <InlineField label="Level" value={kf.level} options={[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" }
                  ]} onChange={v => setKf(f => ({ ...f, level: v }))} />
                  <InlineField label="Tags (comma-separated)" value={kf.tags}
                    onChange={v => setKf(f => ({ ...f, tags: v }))} span />
                </div>
              </Modal>
            )}
          </section>
        )}

        {/* ══ EVENTS ══ */}
        {tab === "events" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Events</h1>
                <p className="adm-page-sub">{events.length} total</p>
              </div>
              <button className="adm-btn adm-btn-primary" onClick={() => openEvent()}>
                <Plus size={14} /> New Event
              </button>
            </div>

            {events.length === 0
              ? <div className="adm-card"><EmptyState icon={<Calendar size={34} />} text="No events yet. Create one above." /></div>
              : <div className="adm-card-grid">
                  {events.map(ev => (
                    <div key={ev.id} className="adm-item-card">
                      <div className="adm-item-head">
                        <Pill label={ev.status} />
                        <div className="adm-item-actions">
                          <button className="adm-icon-btn" onClick={() => openEvent(ev)} title="Edit"><Edit3 size={14} /></button>
                          <button className="adm-icon-btn adm-icon-danger" onClick={() => deleteEvent(ev.id)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <h3 className="adm-item-title">{ev.title}</h3>
                      <p className="adm-item-desc">{ev.description.slice(0, 110)}{ev.description.length > 110 ? "…" : ""}</p>
                      <div className="adm-item-meta">
                        <span><Calendar size={11} /> {fmt(ev.date)} · {ev.time}</span>
                        <span><MapPin size={11} /> {ev.location}</span>
                        <span><Users size={11} /> {ev._count.registrations}{ev.maxAttendees ? `/${ev.maxAttendees}` : ""}</span>
                      </div>
                      {ev.meetingLink && (
                        <a href={ev.meetingLink} target="_blank" rel="noopener noreferrer"
                          className="adm-meeting-link">
                          <Video size={12} /> Join Link
                        </a>
                      )}
                    </div>
                  ))}
                </div>
            }

            {eventModal && (
              <Modal
                title={editingEvent ? "Edit Event" : "New Event"}
                onClose={() => setEventModal(false)}
                onSave={saveEvent}
                saving={saving}
              >
                <div className="adm-form-grid">
                  <InlineField label="Title" value={ef.title} onChange={v => setEf(f => ({ ...f, title: v }))} required />
                  <InlineField label="Time" value={ef.time} onChange={v => setEf(f => ({ ...f, time: v }))} required />
                  <InlineField label="Description" value={ef.description} type="textarea"
                    onChange={v => setEf(f => ({ ...f, description: v }))} required span />
                  <InlineField label="Date" value={ef.date} type="date"
                    onChange={v => setEf(f => ({ ...f, date: v }))} required />
                  <InlineField label="Location" value={ef.location}
                    onChange={v => setEf(f => ({ ...f, location: v }))} required />
                  <InlineField label="Type" value={ef.type} options={[
                    { value: "workshop", label: "Workshop" },
                    { value: "symposium", label: "Symposium" },
                    { value: "panel", label: "Panel" },
                    { value: "bootcamp", label: "Bootcamp" },
                    { value: "summit", label: "Summit" }
                  ]} onChange={v => setEf(f => ({ ...f, type: v }))} />
                  <InlineField label="Status" value={ef.status} options={[
                    { value: "upcoming", label: "Upcoming" },
                    { value: "ongoing", label: "Ongoing" },
                    { value: "completed", label: "Completed" },
                    { value: "cancelled", label: "Cancelled" }
                  ]} onChange={v => setEf(f => ({ ...f, status: v }))} />
                  <InlineField label="Max Attendees" value={ef.maxAttendees} type="number"
                    onChange={v => setEf(f => ({ ...f, maxAttendees: v }))} />
                  <InlineField label="Meeting / Join Link" value={ef.meetingLink}
                    onChange={v => setEf(f => ({ ...f, meetingLink: v }))} span />
                </div>
              </Modal>
            )}
          </section>
        )}

        {/* ══ RESEARCH PROGRAMS ══ */}
        {tab === "research" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Research Programs</h1>
                <p className="adm-page-sub">{research.length} total</p>
              </div>
              <button className="adm-btn adm-btn-primary" onClick={() => openResearch()}>
                <Plus size={14} /> New Program
              </button>
            </div>

            {research.length === 0
              ? <div className="adm-card"><EmptyState icon={<FlaskConical size={34} />} text="No research programs yet. Create one above." /></div>
              : <div className="adm-card-grid">
                  {research.map(r => (
                    <div key={r.id} className="adm-item-card">
                      <div className="adm-item-head">
                        <Pill label={r.status} />
                        <div className="adm-item-actions">
                          <button className="adm-icon-btn" onClick={() => openResearch(r)} title="Edit"><Edit3 size={14} /></button>
                          <button className="adm-icon-btn adm-icon-danger" onClick={() => deleteResearch(r.id)} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <h3 className="adm-item-title">{r.title}</h3>
                      <p className="adm-item-desc">{r.description.slice(0, 110)}{r.description.length > 110 ? "…" : ""}</p>
                      <div className="adm-item-meta">
                        <span><Globe size={11} /> {r.organization}</span>
                        <span><Clock size={11} /> {r.duration}</span>
                        <span style={{ color: LEVEL_COLORS[r.difficulty] }}>◆ {r.difficulty}</span>
                        <span><Users size={11} /> {r._count.applications} apps</span>
                      </div>
                      {r.tags.length > 0 && (
                        <div className="adm-tags">
                          {r.tags.slice(0, 4).map(t => <span key={t} className="adm-tag">{t}</span>)}
                          {r.tags.length > 4 && <span className="adm-tag">+{r.tags.length - 4}</span>}
                        </div>
                      )}
                      {r.meetingLink && (
                        <a href={r.meetingLink} target="_blank" rel="noopener noreferrer"
                          className="adm-meeting-link">
                          <Video size={12} /> Meeting Link
                        </a>
                      )}
                    </div>
                  ))}
                </div>
            }

            {researchModal && (
              <Modal
                title={editingResearch ? "Edit Research Program" : "New Research Program"}
                onClose={() => setResearchModal(false)}
                onSave={saveResearch}
                saving={saving}
              >
                <div className="adm-form-grid">
                  <InlineField label="Title" value={rf.title} onChange={v => setRf(f => ({ ...f, title: v }))} required />
                  <InlineField label="Organization" value={rf.organization} onChange={v => setRf(f => ({ ...f, organization: v }))} required />
                  <InlineField label="Description" value={rf.description} type="textarea"
                    onChange={v => setRf(f => ({ ...f, description: v }))} required span />
                  <InlineField label="Difficulty" value={rf.difficulty} options={[
                    { value: "beginner", label: "Beginner" },
                    { value: "intermediate", label: "Intermediate" },
                    { value: "advanced", label: "Advanced" }
                  ]} onChange={v => setRf(f => ({ ...f, difficulty: v }))} />
                  <InlineField label="Status" value={rf.status} options={[
                    { value: "accepting", label: "Accepting" },
                    { value: "in-progress", label: "In Progress" },
                    { value: "closed", label: "Closed" }
                  ]} onChange={v => setRf(f => ({ ...f, status: v }))} />
                  <InlineField label="Duration" value={rf.duration} onChange={v => setRf(f => ({ ...f, duration: v }))} required />
                  <InlineField label="Meeting Link" value={rf.meetingLink}
                    onChange={v => setRf(f => ({ ...f, meetingLink: v }))} />
                  <InlineField label="Tags (comma-separated)" value={rf.tags}
                    onChange={v => setRf(f => ({ ...f, tags: v }))} span />
                  <InlineField label="Objectives (comma-separated)" value={rf.objectives}
                    onChange={v => setRf(f => ({ ...f, objectives: v }))} span />
                  <InlineField label="Prerequisites (comma-separated)" value={rf.prerequisites}
                    onChange={v => setRf(f => ({ ...f, prerequisites: v }))} span />
                </div>
              </Modal>
            )}
          </section>
        )}

        {/* ══ AMBASSADORS ══ */}
        {tab === "ambassadors" && (
          <section className="adm-section">
            <div className="adm-page-head">
              <div>
                <h1 className="adm-page-title">Ambassadors</h1>
                <p className="adm-page-sub">{ambassadors.length} total</p>
              </div>
            </div>

            <div className="adm-search-row">
              <div className="adm-search-wrap">
                <Search size={14} className="adm-search-icon" />
                <input
                  className="adm-search-input"
                  placeholder="Search ambassadors…"
                  value={ambassadorSearch}
                  onChange={e => { setAmbassadorSearch(e.target.value); fetchAmbassadors(e.target.value, ambassadorFilter) }}
                />
              </div>
              <div className="adm-sel-wrap">
                <select className="adm-input" value={ambassadorFilter}
                  onChange={e => { setAmbassadorFilter(e.target.value); fetchAmbassadors(ambassadorSearch, e.target.value) }}
                  style={{ width: 150, paddingRight: 30 }}>
                  <option value="">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown size={13} className="adm-sel-icon" />
              </div>
            </div>

            {ambassadors.length === 0
              ? <div className="adm-card"><EmptyState icon={<Megaphone size={34} />} text="No ambassador applications yet" /></div>
              : <div className="adm-card">
                  <table className="adm-table">
                    <thead>
                      <tr>
                        <th>Name</th><th>Email</th><th>University</th>
                        <th>Region</th><th>Status</th><th>Applied</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ambassadors.map(a => (
                        <tr key={a.id}>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <span className="adm-fw">{a.fullName}</span>
                              {a.linkedIn && (
                                <a href={a.linkedIn} target="_blank" rel="noopener noreferrer"
                                  style={{ color: "#0077b5", display: "flex" }}>
                                  <Linkedin size={13} />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="adm-muted">{a.email}</td>
                          <td className="adm-muted">{a.university || "—"}</td>
                          <td className="adm-muted">{a.region || "—"}</td>
                          <td><Pill label={a.status} /></td>
                          <td className="adm-muted">{fmt(a.createdAt)}</td>
                          <td>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {a.status === "pending" && (
                                <>
                                  <button className="adm-btn adm-btn-sm" style={{ color: "#2a7d4f", borderColor: "#2a7d4f" }}
                                    onClick={() => updateAmbassadorStatus(a.id, "approved")}>
                                    <Check size={12} /> Approve
                                  </button>
                                  <button className="adm-btn adm-btn-sm" style={{ color: "var(--opt-red)", borderColor: "var(--opt-red)" }}
                                    onClick={() => updateAmbassadorStatus(a.id, "inactive")}>
                                    <X size={12} /> Reject
                                  </button>
                                </>
                              )}
                              {a.status === "approved" && (
                                <button className="adm-btn adm-btn-sm"
                                  onClick={() => updateAmbassadorStatus(a.id, "active")}>
                                  Activate
                                </button>
                              )}
                              {a.status === "active" && (
                                <button className="adm-btn adm-btn-sm"
                                  onClick={() => updateAmbassadorStatus(a.id, "inactive")}>
                                  Deactivate
                                </button>
                              )}
                              {a.status === "inactive" && (
                                <button className="adm-btn adm-btn-sm"
                                  onClick={() => updateAmbassadorStatus(a.id, "active")}>
                                  Reactivate
                                </button>
                              )}
                              <button className="adm-icon-btn adm-icon-danger"
                                onClick={() => deleteAmbassador(a.id)} title="Delete">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            }
          </section>
        )}

      </main>
    </div>
  )
}
