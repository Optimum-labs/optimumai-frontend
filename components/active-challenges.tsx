'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Users, Clock } from 'lucide-react'
import { ChallengeRegModal } from './challenge-reg-modal'

interface Challenge {
  id: string
  title: string
  slug: string
  description: string
  level: string
  duration: string
  teamSize: number
  tags: string[]
  startsAt: string
  registrationCloses: string | null
  status: string
  _count: { registrations: number }
}

export function ActiveChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  useEffect(() => {
    fetch('/api/challenges')
      .then(res => res.json())
      .then(data => setChallenges(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: '12px', color: 'var(--muted-txt)' }}>Loading challenges...</p>
      </div>
    )
  }

  if (challenges.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono), monospace', fontSize: '12px', color: 'var(--muted-txt)' }}>No active challenges right now. Check back soon!</p>
      </div>
    )
  }

  return (
    <>
      <div className="challenges-grid">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="challenge-card">
            <div className="challenge-card-header">
              <span className={`challenge-status challenge-status--${challenge.status}`}>
                {challenge.status === 'open' ? '🚀 Open for Registration' : challenge.status}
              </span>
              <span className="comm-tag">{challenge.level}</span>
            </div>

            <h3 className="challenge-card-title">{challenge.title}</h3>
            <p className="challenge-card-desc">{challenge.description}</p>

            <div className="challenge-card-tags">
              {challenge.tags.map((tag, i) => (
                <span key={i} className="comm-tag">{tag}</span>
              ))}
            </div>

            <div className="challenge-card-meta">
              <div className="challenge-meta-row">
                <span className="challenge-meta-label">Duration</span>
                <span className="challenge-meta-value">{challenge.duration}</span>
              </div>
              <div className="challenge-meta-row">
                <span className="challenge-meta-label">Participants</span>
                <span className="challenge-meta-value">{challenge._count.registrations}</span>
              </div>
            </div>

            {challenge.registrationCloses && (
              <div className="challenge-reg-closes">
                Registration closes {new Date(challenge.registrationCloses).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            )}

            <button
              onClick={() => setSelectedChallenge(challenge)}
              className="opt-btn-primary challenge-apply-btn"
            >
              🚀 View Challenge & Register <ArrowRight size={12} />
            </button>

            <div className="challenge-starts">
              Starts {new Date(challenge.startsAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <ChallengeRegModal
          challenge={{
            id: selectedChallenge.id,
            title: selectedChallenge.title,
            teamSize: selectedChallenge.teamSize,
          }}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </>
  )
}
