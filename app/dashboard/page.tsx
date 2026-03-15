import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, BookOpen, Users, Brain, FlaskConical, Calendar, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Dashboard — OptimumAI",
  description: "Your personal dashboard for AI research and learning.",
}

export default function DashboardPage() {
  // In a real app, this would come from authentication context
  const user = {
    name: "Demo User",
    email: "user@example.com",
    joinedDate: "March 2026",
    progress: {
      bootcamps: 2,
      papers: 5,
      internships: 1
    }
  }

  const recentActivity = [
    {
      type: "bootcamp",
      title: "Completed: Deep Learning Foundations",
      date: "2 days ago",
      status: "completed"
    },
    {
      type: "paper",
      title: "Co-authored: Human-Centric Reward Modeling",
      date: "1 week ago",
      status: "published"
    },
    {
      type: "internship",
      title: "Applied: ML Engineering at TechCorp",
      date: "3 days ago",
      status: "pending"
    }
  ]

  const upcomingEvents = [
    {
      title: "Advanced LLM Bootcamp",
      date: "March 25, 2026",
      type: "bootcamp"
    },
    {
      title: "Research Paper Review Session",
      date: "March 28, 2026",
      type: "webinar"
    },
    {
      title: "AI Ethics Discussion",
      date: "April 2, 2026",
      type: "community"
    }
  ]

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
              Hello, {user.name.split(' ')[0]}!
            </h1>
            <p className="opt-sub opt-anim-3">
              Ready to continue your AI research journey? Here's what's happening in your world.
            </p>
          </section>

          {/* ── Quick Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: user.progress.bootcamps, label: "Bootcamps Completed" },
              { value: user.progress.papers, label: "Papers Co-authored" },
              { value: user.progress.internships, label: "Internship Applications" },
              { value: "Level 3", label: "Research Level" },
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
                  {recentActivity.map((activity, i) => (
                    <div key={i} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)"
                        }}>
                          {activity.title}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          color: activity.status === "completed" ? "var(--gold)" :
                                 activity.status === "published" ? "var(--opt-red)" : "var(--muted-txt)",
                          background: activity.status === "completed" ? "rgba(184,150,90,0.1)" :
                                   activity.status === "published" ? "rgba(200,57,43,0.1)" : "rgba(107,100,86,0.1)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {activity.status}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>{activity.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="ed-card">
              <div className="ed-card-body">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                  <Calendar size={20} style={{ color: "var(--gold)" }} />
                  <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                    Upcoming Events
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {upcomingEvents.map((event, i) => (
                    <div key={i} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", borderRadius: "4px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: "14px",
                          fontWeight: 600,
                          color: "var(--ink)"
                        }}>
                          {event.title}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          color: "var(--opt-red)",
                          background: "rgba(200,57,43,0.1)",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em"
                        }}>
                          {event.type}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--muted-txt)" }}>{event.date}</span>
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