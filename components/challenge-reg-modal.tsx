'use client'

import { useState } from 'react'
import { X, CheckCircle2 } from 'lucide-react'

interface ChallengeRegModalProps {
  challenge: {
    id: string
    title: string
    teamSize: number
  }
  onClose: () => void
}

export function ChallengeRegModal({ challenge, onClose }: ChallengeRegModalProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [motivation, setMotivation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/challenges/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.id,
          fullName,
          email,
          linkedIn: linkedIn || undefined,
          motivation,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error)
      } else {
        setSuccess(true)
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {success ? (
          <div className="modal-success">
            <CheckCircle2 size={48} style={{ color: 'var(--gold)', marginBottom: '16px' }} />
            <h2 className="modal-title">Registration Successful!</h2>
            <p className="modal-desc">
              You&apos;ve been registered for <strong>{challenge.title}</strong>.
              You&apos;ll receive a confirmation email shortly.
            </p>
            <button onClick={onClose} className="opt-btn-primary" style={{ marginTop: '24px' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Register for Challenge</h2>
            <p className="modal-desc">
              You&apos;re about to register for <strong>{challenge.title}</strong>. Once registered, you&apos;ll be able to:
            </p>
            <ul className="modal-benefits">
              <li><CheckCircle2 size={14} /> Create or join a team (teams of {challenge.teamSize})</li>
              <li><CheckCircle2 size={14} /> Access learning resources and mentorship</li>
              <li><CheckCircle2 size={14} /> Submit your project and compete for prizes</li>
            </ul>

            {error && (
              <div className="modal-error">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="auth-field">
                <label htmlFor="reg-name" className="auth-label">Full Name *</label>
                <input
                  id="reg-name"
                  type="text"
                  className="auth-input"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-email" className="auth-label">Email Address *</label>
                <input
                  id="reg-email"
                  type="email"
                  className="auth-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-linkedin" className="auth-label">LinkedIn Profile (Optional)</label>
                <input
                  id="reg-linkedin"
                  type="url"
                  className="auth-input"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>
              <div className="auth-field">
                <label htmlFor="reg-motivation" className="auth-label">Why do you want to join this challenge? *</label>
                <textarea
                  id="reg-motivation"
                  className="auth-input modal-textarea"
                  placeholder="Tell us about your motivation, interests, and what you hope to build..."
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={onClose} className="opt-btn-ghost">Cancel</button>
                <button
                  type="submit"
                  className="opt-btn-primary"
                  disabled={loading}
                  style={{ opacity: loading ? 0.6 : 1 }}
                >
                  {loading ? 'Registering...' : 'Register Now'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
