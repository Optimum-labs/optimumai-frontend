'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar, Clock, MapPin, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "AI Research Symposium 2024",
      date: "March 25, 2024",
      time: "2:00 PM - 6:00 PM EST",
      location: "Virtual Event",
      type: "Symposium",
      description: "Join leading AI researchers for presentations on the latest breakthroughs in machine learning and artificial intelligence.",
      attendees: 250,
      status: "Registering"
    },
    {
      id: 2,
      title: "LLM Fine-Tuning Workshop",
      date: "April 2, 2024",
      time: "10:00 AM - 4:00 PM EST",
      location: "Virtual Event",
      type: "Workshop",
      description: "Hands-on workshop covering advanced techniques for fine-tuning large language models for specific domains and tasks.",
      attendees: 150,
      status: "Registering"
    },
    {
      id: 3,
      title: "AI Ethics & Safety Discussion",
      date: "April 10, 2024",
      time: "7:00 PM - 9:00 PM EST",
      location: "Virtual Event",
      type: "Panel Discussion",
      description: "Expert panel discussing the ethical implications and safety considerations in modern AI development.",
      attendees: 180,
      status: "Registering"
    }
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Neural Networks Deep Dive",
      date: "February 15, 2024",
      type: "Workshop",
      attendees: 200,
      recording: "Available"
    },
    {
      id: 5,
      title: "Computer Vision Bootcamp",
      date: "January 28, 2024",
      type: "Bootcamp",
      attendees: 175,
      recording: "Available"
    },
    {
      id: 6,
      title: "AI in Healthcare Summit",
      date: "January 12, 2024",
      type: "Summit",
      attendees: 300,
      recording: "Available"
    }
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        {/* Grain texture */}
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker">Community Events</p>
            <h1 className="opt-headline">
              Connect, Learn, and <em>Grow Together</em>
            </h1>
            <p className="opt-sub">
              Join our vibrant community events featuring workshops, symposiums, panel discussions,
              and networking opportunities with fellow AI enthusiasts and experts.
            </p>
            <div className="opt-hero-cta">
              <a href="#upcoming" className="opt-btn-primary">
                View Upcoming Events
                <ArrowRight size={16} />
              </a>
              <Link href="/community" className="opt-btn-ghost">
                Back to Community
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* ── Upcoming Events ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Upcoming Events</span>
          </div>

          <div style={{ marginBottom: '80px' }}>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--muted-txt)',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Don't miss these exciting opportunities to learn, network, and contribute to the AI community.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
              {upcomingEvents.map((event) => (
                <div key={event.id} style={{
                  border: '1px solid rgba(10, 10, 10, 0.12)',
                  padding: '32px',
                  transition: 'background 0.25s ease'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <span style={{
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      padding: '4px 12px',
                      border: '1px solid var(--gold)',
                      borderRadius: '4px'
                    }}>{event.type}</span>
                    <span style={{
                      fontSize: '10px',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--opt-red)',
                      fontWeight: 'bold'
                    }}>{event.status}</span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    lineHeight: 1.2,
                    color: 'var(--ink)'
                  }}>{event.title}</h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'var(--muted-txt)',
                    marginBottom: '24px'
                  }}>{event.description}</p>

                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: 'var(--muted-txt)'
                    }}>
                      <Calendar size={14} />
                      <span>{event.date}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: 'var(--muted-txt)'
                    }}>
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '13px',
                      color: 'var(--muted-txt)'
                    }}>
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--muted-txt)'
                    }}>
                      <Users size={14} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  <button className="opt-btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Register Now
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Event Types ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Event Types</span>
          </div>

          <div style={{ marginBottom: '80px' }}>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--muted-txt)',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              We offer a variety of event formats to cater to different learning styles and interests.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
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
                  Workshops
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)'
                }}>
                  Hands-on learning experiences where you can practice AI techniques,
                  build projects, and get direct feedback from experts.
                </p>
              </div>

              <div style={{
                padding: '32px',
                border: '1px solid rgba(10, 10, 10, 0.12)',
                transition: 'background 0.25s ease'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <Calendar size={32} style={{ color: 'var(--opt-red)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  lineHeight: 1.2,
                  color: 'var(--ink)'
                }}>
                  Symposiums
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)'
                }}>
                  Research presentations and discussions featuring the latest
                  breakthroughs and innovations in AI and machine learning.
                </p>
              </div>

              <div style={{
                padding: '32px',
                border: '1px solid rgba(10, 10, 10, 0.12)',
                transition: 'background 0.25s ease'
              }}>
                <div style={{ marginBottom: '20px' }}>
                  <ExternalLink size={32} style={{ color: 'var(--opt-red)' }} />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  lineHeight: 1.2,
                  color: 'var(--ink)'
                }}>
                  Panel Discussions
                </h3>
                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--muted-txt)'
                }}>
                  Expert panels discussing current trends, challenges, and future
                  directions in AI development and deployment.
                </p>
              </div>
            </div>
          </div>

          {/* ── Past Events ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Past Events</span>
          </div>

          <div style={{ marginBottom: '80px' }}>
            <p style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--muted-txt)',
              textAlign: 'center',
              marginBottom: '40px',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Access recordings and materials from our previous events to continue your learning journey.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
              {pastEvents.map((event) => (
                <div key={event.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px',
                  border: '1px solid rgba(10, 10, 10, 0.12)',
                  transition: 'background 0.25s ease'
                }}>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '8px',
                      color: 'var(--ink)'
                    }}>{event.title}</h4>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      fontSize: '12px',
                      color: 'var(--muted-txt)'
                    }}>
                      <span>{event.date}</span>
                      <span>{event.type}</span>
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                  <button className="opt-btn-ghost" style={{ fontSize: '11px', padding: '8px 16px' }}>
                    {event.recording}
                    <ExternalLink size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Host an Event ── */}
          <div className="opt-rule">
            <span className="opt-rule-text">Get Involved</span>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '28px',
              fontWeight: 700,
              marginBottom: '16px',
              color: 'var(--ink)'
            }}>
              Want to Host an Event?
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
              Have an idea for a community event? We'd love to help you bring it to life.
              Share your proposal and let's collaborate on something amazing.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/community/volunteer" className="opt-btn-primary">
                Become an Ambassador
                <Users size={16} />
              </Link>
              <Link href="/contact" className="opt-btn-ghost">
                Contact Us
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}