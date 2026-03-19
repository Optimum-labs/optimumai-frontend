import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Team — OptimumAI",
  description: "Meet the team behind OptimumAI and explore open positions.",
}

export default function TeamPage() {
  const team = [
    {
      name: "Mohammad Yahiya",
      role: "Founder",
      bio: "Founded OptimumAI with a mission to make world-class AI education accessible to everyone. Passionate about building tools and communities that empower the next generation of AI researchers and engineers.",
      initials: "MY",
      email: "yahiya@optimumai.in",
      linkedin: "https://www.linkedin.com/in/shaik-muhammad-yahiya/",
    },
    {
      name: "Head of Community",
      role: "Role Available",
      bio: "We're looking for a passionate community builder to lead our global network of 10,000+ researchers. Help shape the future of AI education and foster collaboration across 80+ countries.",
      initials: "HC",
      isOpen: true,
    },
    {
      name: "Founding Engineer",
      role: "Open Position",
      bio: "Join us as a founding engineer to build the next generation of AI tools and platforms. Work on cutting-edge research infrastructure, scalable systems, and innovative products.",
      initials: "FE",
      isOpen: true,
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
            <p className="opt-kicker opt-anim-1">Our Team</p>
            <h1 className="opt-headline opt-anim-2">
              The People Behind<br />
              <em>OptimumAI.</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Meet the team building the future of AI education. We're always looking for
              talented individuals to join our mission of making world-class AI accessible to everyone.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <Link href="/contact" className="opt-btn-primary">
                Get in Touch <ArrowRight size={13} />
              </Link>
              <Link href="#openings" className="opt-btn-ghost">
                View Openings
              </Link>
            </div>
          </section>

          {/* ── Team Members ── */}
          <div className="opt-rule"><span className="opt-rule-text">Meet the Team</span></div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "32px", marginBottom: "80px" }}>
            {team.map((member, i) => (
              <div key={i} className="ed-card" style={{ cursor: member.isOpen ? "pointer" : "default" }}>
                <div className="ed-card-img" style={{ background: member.isOpen ? "linear-gradient(135deg, rgba(200,57,43,0.08), rgba(16,185,129,0.08))" : "linear-gradient(135deg, rgba(200,57,43,0.06), rgba(16,185,129,0.08))" }}>
                  <div style={{
                    width: "80px", height: "80px", borderRadius: "50%",
                    background: member.isOpen ? "var(--opt-red)" : "var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-playfair), serif", fontSize: "24px", fontWeight: 700,
                    color: "var(--paper)", margin: "0 auto",
                    border: member.isOpen ? "3px solid rgba(200,57,43,0.2)" : "none"
                  }}>
                    {member.initials}
                  </div>
                  {member.isOpen && (
                    <span className="ed-badge ed-badge--red" style={{ position: "absolute", top: "16px", right: "16px" }}>
                      Open
                    </span>
                  )}
                </div>
                <div className="ed-card-body">
                  <div className="ed-card-title">{member.name}</div>
                  <div className="ed-card-subtitle" style={{ color: member.isOpen ? "var(--opt-red)" : "var(--gold)" }}>
                    {member.role}
                  </div>
                  <p className="ed-card-desc">{member.bio}</p>

                  {!member.isOpen && member.email && (
                    <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                      <a href={`mailto:${member.email}`} className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 12px" }}>
                        <Mail size={12} style={{ marginRight: "6px" }} />
                        Email
                      </a>
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="opt-btn-ghost" style={{ fontSize: "11px", padding: "6px 12px" }}>
                          <ExternalLink size={12} style={{ marginRight: "6px" }} />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}

                  {member.isOpen && (
                    <div style={{ marginTop: "16px" }}>
                      <Link href="/contact" className="opt-btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "12px" }}>
                        Apply Now <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Open Positions ── */}
          <div id="openings" className="opt-rule"><span className="opt-rule-text">Open Positions</span></div>

          <div className="opt-pillars" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginBottom: "64px" }}>
            <div className="opt-pillar" style={{ borderBottom: "none" }}>
              <span className="opt-pillar-num">01</span>
              <div className="opt-pillar-title">Head of Community</div>
              <p className="opt-pillar-body">
                Lead our global community of 10,000+ researchers. Build engagement strategies,
                organize events, and foster collaboration across 80+ countries.
              </p>
              <div style={{ marginTop: "16px" }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-txt)" }}>
                  Location: Remote • Type: Full-time
                </span>
              </div>
            </div>

            <div className="opt-pillar" style={{ borderBottom: "none" }}>
              <span className="opt-pillar-num">02</span>
              <div className="opt-pillar-title">Founding Engineer</div>
              <p className="opt-pillar-body">
                Build the next generation of AI tools and platforms. Work on research infrastructure,
                scalable systems, and innovative products from the ground up.
              </p>
              <div style={{ marginTop: "16px" }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted-txt)" }}>
                  Location: Remote • Type: Full-time
                </span>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker">Ready to Join?</p>
            <h2 className="opt-headline" style={{ fontSize: "28px", marginBottom: "12px" }}>
              Help Build the Future of AI Education
            </h2>
            <p className="opt-sub" style={{ marginBottom: "28px" }}>
              We're looking for passionate individuals who share our mission.
              Reach out to discuss opportunities.
            </p>
            <div className="opt-hero-cta">
              <Link href="/contact" className="opt-btn-primary">Apply Now <ArrowRight size={13} /></Link>
              <Link href="/about" className="opt-btn-ghost">Learn About Us</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}