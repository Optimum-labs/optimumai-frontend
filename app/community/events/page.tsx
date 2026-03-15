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
      <main className="opt-main">
        {/* Hero Section */}
        <section className="opt-section opt-section-hero">
          <div className="opt-container">
            <div className="opt-hero-content">
              <div className="opt-hero-badge">
                <Calendar size={16} />
                Community Events
              </div>
              <h1 className="opt-hero-title">
                Connect, Learn, and <span className="opt-text-gradient">Grow Together</span>
              </h1>
              <p className="opt-hero-subtitle">
                Join our vibrant community events featuring workshops, symposiums, panel discussions,
                and networking opportunities with fellow AI enthusiasts and experts.
              </p>
              <div className="opt-hero-actions">
                <Link href="#upcoming" className="opt-btn-primary">
                  View Upcoming Events
                  <ArrowRight size={16} />
                </Link>
                <Link href="/community" className="opt-btn-secondary">
                  Back to Community
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section id="upcoming" className="opt-section">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Upcoming Events</h2>
              <p className="opt-section-subtitle">
                Don't miss these exciting opportunities to learn, network, and contribute to the AI community.
              </p>
            </div>

            <div className="opt-events-grid">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="opt-event-card">
                  <div className="opt-event-header">
                    <div className="opt-event-type">{event.type}</div>
                    <div className="opt-event-status">{event.status}</div>
                  </div>

                  <h3 className="opt-event-title">{event.title}</h3>
                  <p className="opt-event-description">{event.description}</p>

                  <div className="opt-event-details">
                    <div className="opt-event-detail">
                      <Calendar size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className="opt-event-detail">
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className="opt-event-detail">
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className="opt-event-detail">
                      <Users size={16} />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  <button className="opt-btn-primary opt-event-register">
                    Register Now
                    <ExternalLink size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Types */}
        <section className="opt-section opt-section-alt">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Event Types</h2>
              <p className="opt-section-subtitle">
                We offer a variety of event formats to cater to different learning styles and interests.
              </p>
            </div>

            <div className="opt-grid opt-grid-3">
              <div className="opt-card">
                <div className="opt-card-icon">
                  <Users className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Workshops</h3>
                <p className="opt-card-text">
                  Hands-on learning experiences where you can practice AI techniques,
                  build projects, and get direct feedback from experts.
                </p>
              </div>

              <div className="opt-card">
                <div className="opt-card-icon">
                  <Calendar className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Symposiums</h3>
                <p className="opt-card-text">
                  Research presentations and discussions featuring the latest
                  breakthroughs and innovations in AI and machine learning.
                </p>
              </div>

              <div className="opt-card">
                <div className="opt-card-icon">
                  <ExternalLink className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Panel Discussions</h3>
                <p className="opt-card-text">
                  Expert panels discussing current trends, challenges, and future
                  directions in AI development and deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="opt-section">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Past Events</h2>
              <p className="opt-section-subtitle">
                Access recordings and materials from our previous events to continue your learning journey.
              </p>
            </div>

            <div className="opt-past-events">
              {pastEvents.map((event) => (
                <div key={event.id} className="opt-past-event">
                  <div className="opt-past-event-info">
                    <h4 className="opt-past-event-title">{event.title}</h4>
                    <div className="opt-past-event-meta">
                      <span className="opt-past-event-date">{event.date}</span>
                      <span className="opt-past-event-type">{event.type}</span>
                      <span className="opt-past-event-attendees">{event.attendees} attendees</span>
                    </div>
                  </div>
                  <div className="opt-past-event-actions">
                    <button className="opt-btn-secondary">
                      {event.recording}
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Host an Event */}
        <section className="opt-section opt-section-alt">
          <div className="opt-container">
            <div className="opt-cta-section">
              <h3 className="opt-cta-title">Want to Host an Event?</h3>
              <p className="opt-cta-text">
                Have an idea for a community event? We'd love to help you bring it to life.
                Share your proposal and let's collaborate on something amazing.
              </p>
              <div className="opt-hero-actions">
                <Link href="/community/volunteer" className="opt-btn-primary">
                  Become an Ambassador
                  <Users size={16} />
                </Link>
                <Link href="/contact" className="opt-btn-secondary">
                  Contact Us
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}