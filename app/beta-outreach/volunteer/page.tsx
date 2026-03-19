'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Users, Award, Heart, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function VolunteerPage() {
  return (
    <>
      <Header />
      <main className="optimum-main">
        {/* Grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker">Beta Outreach</p>
            <h1 className="opt-headline">
              Become a <em>Beta Outreach Ambassador</em>
            </h1>
            <p className="opt-sub">
              Join our elite team of Ambassadors and help shape the future of AI education and human agency research.
              Lead workshops, mentor aspiring AI researchers, and represent OptimumAI in the global AI community.
            </p>
            <div className="opt-hero-cta">
              <a
                href="https://forms.cloud.microsoft/r/dbB4TEA4Ru"
                target="_blank"
                rel="noopener noreferrer"
                className="opt-btn-primary"
              >
                Apply Now
                <ExternalLink size={16} />
              </a>
              <Link href="/beta-outreach" className="opt-btn-ghost">
                Back to Beta Outreach
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* ── Ambassador Benefits ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Benefits</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '80px' }}>
            <div style={{
              padding: '32px',
              border: '1px solid rgba(10, 10, 10, 0.12)',
              transition: 'background 0.25s ease'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Award size={32} style={{ color: 'var(--opt-red)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
                lineHeight: 1.2,
                color: 'var(--ink)'
              }}>
                Recognition & Credibility
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--muted-txt)'
              }}>
                Earn official recognition as an OptimumAI Community Ambassador with certificates,
                badges, and LinkedIn endorsements that showcase your expertise.
              </p>
            </div>

            <div style={{
              padding: '32px',
              border: '1px solid rgba(10, 10, 10, 0.12)',
              transition: 'background 0.25s ease'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Users size={32} style={{ color: 'var(--opt-red)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
                lineHeight: 1.2,
                color: 'var(--ink)'
              }}>
                Exclusive Networking
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--muted-txt)'
              }}>
                Connect with leading AI researchers, industry professionals, and fellow ambassadors
                through our private community channels and events.
              </p>
            </div>

            <div style={{
              padding: '32px',
              border: '1px solid rgba(10, 10, 10, 0.12)',
              transition: 'background 0.25s ease'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Heart size={32} style={{ color: 'var(--opt-red)' }} />
              </div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '22px',
                fontWeight: 700,
                marginBottom: '12px',
                lineHeight: 1.2,
                color: 'var(--ink)'
              }}>
                Professional Growth
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--muted-txt)'
              }}>
                Access to cutting-edge research, early product releases, speaking opportunities,
                and career advancement support in the AI field.
              </p>
            </div>
          </div>

          {/* ── Responsibilities ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Responsibilities</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '80px' }}>
            <div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'var(--ink)'
              }}>
                Community Leadership
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Lead and moderate community discussions
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Organize virtual meetups and study groups
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Mentor new community members
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Share knowledge and best practices
                </li>
              </ul>
            </div>

            <div>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '24px',
                fontWeight: 700,
                marginBottom: '20px',
                color: 'var(--ink)'
              }}>
                Content Creation
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Create educational content and tutorials
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Write blog posts and research summaries
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Host workshops and webinars
                </li>
                <li style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)',
                  marginBottom: '12px',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: 'var(--gold)',
                    fontSize: '12px'
                  }}>•</span>
                  Contribute to community resources
                </li>
              </ul>
            </div>
          </div>

          {/* ── Application Process ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Application Process</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--muted-txt)',
              maxWidth: '600px',
              margin: '0 auto 40px'
            }}>
              Ready to join our ambassador program? The application process is designed to find
              passionate individuals who are committed to advancing AI education.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '60px', flexWrap: 'wrap' }}>
              <div style={{
                textAlign: 'center',
                padding: '24px',
                border: '1px solid rgba(10, 10, 10, 0.12)',
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--opt-red)',
                  marginBottom: '12px'
                }}>01</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--ink)'
                }}>Submit Application</h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--muted-txt)'
                }}>
                  Fill out our comprehensive application form with your background,
                  experience, and motivation for becoming an ambassador.
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '24px',
                border: '1px solid rgba(10, 10, 10, 0.12)',
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--opt-red)',
                  marginBottom: '12px'
                }}>02</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--ink)'
                }}>Review Process</h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--muted-txt)'
                }}>
                  Our selection committee reviews applications and conducts interviews
                  with promising candidates within 2-3 weeks.
                </p>
              </div>

              <div style={{
                textAlign: 'center',
                padding: '24px',
                border: '1px solid rgba(10, 10, 10, 0.12)',
                borderRadius: '8px',
                minWidth: '200px'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'var(--opt-red)',
                  marginBottom: '12px'
                }}>03</div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: 'var(--ink)'
                }}>Onboarding</h3>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  color: 'var(--muted-txt)'
                }}>
                  Selected ambassadors undergo training and receive their official
                  ambassador kit and community access.
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '16px',
                color: 'var(--ink)'
              }}>
                Ready to Make an Impact?
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'var(--muted-txt)',
                marginBottom: '32px',
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Join the ranks of our Community Ambassadors and help build the future of AI education.
              </p>
              <a
                href="https://forms.cloud.microsoft/r/dbB4TEA4Ru"
                target="_blank"
                rel="noopener noreferrer"
                className="opt-btn-primary"
                style={{ fontSize: '12px', padding: '16px 32px' }}
              >
                Apply for Community Ambassador
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}