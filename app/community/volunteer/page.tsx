'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, Users, Award, Heart, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function VolunteerPage() {
  return (
    <>
      <Header />
      <main className="opt-main">
        {/* Hero Section */}
        <section className="opt-section opt-section-hero">
          <div className="opt-container">
            <div className="opt-hero-content">
              <div className="opt-hero-badge">
                <Users size={16} />
                Community
              </div>
              <h1 className="opt-hero-title">
                Become a <span className="opt-text-gradient">Community Ambassador</span>
              </h1>
              <p className="opt-hero-subtitle">
                Join our elite team of Community Ambassadors and help shape the future of AI education and research.
                Lead workshops, mentor aspiring AI researchers, and represent OptimumAI in the global AI community.
              </p>
              <div className="opt-hero-actions">
                <a
                  href="https://forms.cloud.microsoft/r/dbB4TEA4Ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opt-btn-primary"
                >
                  Apply Now
                  <ExternalLink size={16} />
                </a>
                <Link href="/community" className="opt-btn-secondary">
                  Back to Community
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ambassador Benefits */}
        <section className="opt-section">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Ambassador Benefits</h2>
              <p className="opt-section-subtitle">
                As a Community Ambassador, you'll gain exclusive access to resources, networking opportunities,
                and professional development that will accelerate your AI career.
              </p>
            </div>

            <div className="opt-grid opt-grid-3">
              <div className="opt-card">
                <div className="opt-card-icon">
                  <Award className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Recognition & Credibility</h3>
                <p className="opt-card-text">
                  Earn official recognition as an OptimumAI Community Ambassador with certificates,
                  badges, and LinkedIn endorsements that showcase your expertise.
                </p>
              </div>

              <div className="opt-card">
                <div className="opt-card-icon">
                  <Users className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Exclusive Networking</h3>
                <p className="opt-card-text">
                  Connect with leading AI researchers, industry professionals, and fellow ambassadors
                  through our private community channels and events.
                </p>
              </div>

              <div className="opt-card">
                <div className="opt-card-icon">
                  <Heart className="opt-icon-primary" size={24} />
                </div>
                <h3 className="opt-card-title">Professional Growth</h3>
                <p className="opt-card-text">
                  Access to cutting-edge research, early product releases, speaking opportunities,
                  and career advancement support in the AI field.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Responsibilities */}
        <section className="opt-section opt-section-alt">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Ambassador Responsibilities</h2>
              <p className="opt-section-subtitle">
                Community Ambassadors play a vital role in growing and supporting our AI community.
                Your contributions help thousands of aspiring AI researchers worldwide.
              </p>
            </div>

            <div className="opt-grid opt-grid-2">
              <div className="opt-content-block">
                <h3 className="opt-content-title">Community Leadership</h3>
                <ul className="opt-content-list">
                  <li>Lead and moderate community discussions</li>
                  <li>Organize virtual meetups and study groups</li>
                  <li>Mentor new community members</li>
                  <li>Share knowledge and best practices</li>
                </ul>
              </div>

              <div className="opt-content-block">
                <h3 className="opt-content-title">Content Creation</h3>
                <ul className="opt-content-list">
                  <li>Create educational content and tutorials</li>
                  <li>Write blog posts and research summaries</li>
                  <li>Host workshops and webinars</li>
                  <li>Contribute to community resources</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="opt-section">
          <div className="opt-container">
            <div className="opt-section-header">
              <h2 className="opt-section-title">Application Process</h2>
              <p className="opt-section-subtitle">
                Ready to join our ambassador program? The application process is designed to find
                passionate individuals who are committed to advancing AI education.
              </p>
            </div>

            <div className="opt-process-steps">
              <div className="opt-process-step">
                <div className="opt-process-number">01</div>
                <h3 className="opt-process-title">Submit Application</h3>
                <p className="opt-process-text">
                  Fill out our comprehensive application form with your background,
                  experience, and motivation for becoming an ambassador.
                </p>
              </div>

              <div className="opt-process-step">
                <div className="opt-process-number">02</div>
                <h3 className="opt-process-title">Review Process</h3>
                <p className="opt-process-text">
                  Our selection committee reviews applications and conducts interviews
                  with promising candidates within 2-3 weeks.
                </p>
              </div>

              <div className="opt-process-step">
                <div className="opt-process-number">03</div>
                <h3 className="opt-process-title">Onboarding</h3>
                <p className="opt-process-text">
                  Selected ambassadors undergo training and receive their official
                  ambassador kit and community access.
                </p>
              </div>
            </div>

            <div className="opt-cta-section">
              <h3 className="opt-cta-title">Ready to Make an Impact?</h3>
              <p className="opt-cta-text">
                Join the ranks of our Community Ambassadors and help build the future of AI education.
              </p>
              <a
                href="https://forms.cloud.microsoft/r/dbB4TEA4Ru"
                target="_blank"
                rel="noopener noreferrer"
                className="opt-btn-primary opt-btn-large"
              >
                Apply for Community Ambassador
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}