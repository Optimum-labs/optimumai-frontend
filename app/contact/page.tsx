"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, MapPin, Mail, Phone } from "lucide-react"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.")
      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />

      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />

        <div className="opt-page">

          {/* ── Page header ── */}
          <div className="opt-anim-1" style={{ marginBottom: "64px" }}>
            <p className="opt-kicker">Get in Touch</p>
            <h1 className="opt-headline" style={{ fontSize: "clamp(40px,6vw,72px)", marginBottom: "20px" }}>
              Contact <em>Us</em>
            </h1>
            <p className="opt-sub" style={{ borderLeft: "none", paddingLeft: 0 }}>
              Have a question, collaboration idea, or enquiry about our programmes?
              We'd love to hear from you.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div className="contact-grid opt-anim-2">

            {/* ─── Form column ─── */}
            <div>
              <p className="opt-shift-label" style={{ marginBottom: "28px" }}>Send us a Message</p>

              {submitted ? (
                <div className="contact-success">
                  <p className="opt-pillar-title" style={{ marginBottom: "8px" }}>Message received!</p>
                  <p className="opt-pillar-body">
                    Thank you for reaching out. We'll get back to you at{" "}
                    <strong>{form.email}</strong> within 1–2 business days.
                  </p>
                  <button
                    className="opt-btn-ghost"
                    style={{ marginTop: "24px" }}
                    onClick={() => { setForm({ name: "", email: "", phone: "", message: "" }); setSubmitted(false) }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-field">
                    <label className="contact-label" htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="contact-input"
                      placeholder="Muhammad Yahiya"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label" htmlFor="email">Email *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="contact-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label" htmlFor="phone">Phone *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="contact-input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label" htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="contact-input contact-textarea"
                      placeholder="Tell us what's on your mind…"
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {error && (
                    <p className="contact-error">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="opt-btn-primary"
                    style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.65 : 1, cursor: loading ? "wait" : "pointer" }}
                  >
                    {loading ? "Sending…" : <>{"Send Message"} <ArrowRight size={13} /></>}
                  </button>
                </form>
              )}
            </div>

            {/* ─── Info column ─── */}
            <div className="contact-info-col">

              <p className="opt-shift-label" style={{ marginBottom: "28px" }}>Our Details</p>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="contact-info-label">Office Address</p>
                  <address className="contact-info-text" style={{ fontStyle: "normal" }}>
                    Plot No 7/A, Alijapur<br />
                    ToliChowki, Hyderabad<br />
                    Telangana, India — 500008
                  </address>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="contact-info-label">Email Us</p>
                  <a
                    href="mailto:info@optimumai.in"
                    className="contact-info-link"
                  >
                    info@optimumai.in
                  </a>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-icon">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-text">+91-9100304045</p>
                </div>
              </div>

              {/* ── Office hours ── */}
              <div className="contact-hours">
                <p className="opt-shift-label" style={{ marginBottom: "16px" }}>Office Hours</p>
                <div className="contact-hours-row">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 6:00 PM IST</span>
                </div>
                <div className="contact-hours-row">
                  <span>Saturday</span>
                  <span>10:00 AM – 2:00 PM IST</span>
                </div>
                <div className="contact-hours-row" style={{ opacity: 0.45 }}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .contact-label {
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--muted-txt);
        }

        .contact-input {
          padding: 13px 16px;
          border: 1px solid rgba(10, 10, 10, 0.2);
          background: rgba(245, 240, 232, 0.6);
          color: var(--ink);
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          width: 100%;
          border-radius: 0;
          -webkit-appearance: none;
        }

        .contact-input::placeholder { color: var(--muted-txt); opacity: 0.5; }
        .contact-input:focus {
          border-color: var(--ink);
          background: #f5f0e8;
        }
        .contact-input:invalid:not(:placeholder-shown) {
          border-color: var(--opt-red);
        }

        .contact-textarea {
          resize: vertical;
          min-height: 140px;
          line-height: 1.7;
        }

        .contact-error {
          font-size: 12px;
          color: var(--opt-red);
          border-left: 2px solid var(--opt-red);
          padding-left: 12px;
          line-height: 1.6;
        }

        .contact-success {
          border: 1px solid rgba(10, 10, 10, 0.12);
          padding: 40px 36px;
          background: rgba(184, 150, 90, 0.05);
        }

        /* ── Info column ── */
        .contact-info-col {
          padding-top: 0;
        }

        .contact-info-block {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
        }
        .contact-info-block:last-of-type { border-bottom: none; }

        .contact-info-icon {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(10, 10, 10, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--gold);
        }

        .contact-info-label {
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--muted-txt);
          margin-bottom: 6px;
        }

        .contact-info-text {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          line-height: 1.75;
          color: var(--ink);
        }

        .contact-info-link {
          font-family: var(--font-dm-mono), 'DM Mono', monospace;
          font-size: 13px;
          color: var(--opt-red);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-info-link:hover { opacity: 0.7; }

        .contact-hours {
          border: 1px solid rgba(10, 10, 10, 0.1);
          padding: 24px 24px;
          background: rgba(10, 10, 10, 0.015);
        }

        .contact-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          line-height: 1.6;
          margin-bottom: 8px;
          color: var(--ink);
        }
        .contact-hours-row:last-child { margin-bottom: 0; }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </>
  )
}
