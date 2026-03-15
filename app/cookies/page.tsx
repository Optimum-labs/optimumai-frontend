import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Cookie Policy — OptimumAI",
  description: "How OptimumAI uses cookies and similar tracking technologies on its platform.",
}

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          <p className="opt-kicker">Legal</p>
          <h1 className="opt-headline" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Cookie<br /><em>Policy</em>
          </h1>
          <p className="opt-sub">Effective: March 15, 2026 &nbsp;·&nbsp; OptimumAI, Inc.</p>

          <div className="opt-legal-body">

            <p>
              This Cookie Policy explains how OptimumAI, Inc. ("OptimumAI", "we", "our", or "us") uses cookies
              and similar tracking technologies when you visit our website or use our platform. It should be
              read alongside our <a href="/privacy" style={{ color: "var(--opt-red)" }}>Privacy Policy</a> and{" "}
              <a href="/terms" style={{ color: "var(--opt-red)" }}>Terms of Service</a>.
            </p>

            {/* ── 1 ── */}
            <div className="opt-rule"><span className="opt-rule-text">1. What Are Cookies?</span></div>

            <p>
              Cookies are small text files placed on your device by websites you visit. They are widely used to
              make websites work efficiently, remember your preferences, and provide information to site owners.
              Cookies can be "session cookies" — which expire when you close your browser — or "persistent
              cookies" — which remain on your device for a set period or until deleted.
            </p>
            <p>
              We also use similar technologies such as web beacons, pixel tags, local storage, and fingerprinting
              for comparable purposes. This policy refers to all of these collectively as "cookies".
            </p>

            {/* ── 2 ── */}
            <div className="opt-rule"><span className="opt-rule-text">2. Categories of Cookies We Use</span></div>

            <h3 className="opt-legal-h3">Strictly Necessary</h3>
            <p>
              These cookies are essential for the website to function and cannot be switched off. They enable
              core functionality such as account authentication, session management, and security protections.
            </p>
            <ul className="opt-legal-list">
              <li><strong>Auth session cookies</strong> — Keep you logged in across page loads.</li>
              <li><strong>CSRF tokens</strong> — Protect against cross-site request forgery attacks.</li>
              <li><strong>Load balancer cookies</strong> — Route your requests to a consistent server.</li>
              <li><strong>Cookie consent record</strong> — Remember your cookie preferences.</li>
            </ul>

            <h3 className="opt-legal-h3">Functional</h3>
            <p>
              These cookies enable enhanced functionality and personalisation. Disabling them may affect how the
              platform works for you.
            </p>
            <ul className="opt-legal-list">
              <li><strong>Language & region preferences</strong> — Remember your locale settings.</li>
              <li><strong>Dark / light mode</strong> — Persist your UI theme choice.</li>
              <li><strong>Research tool settings</strong> — Save workspace layout and tool configurations.</li>
              <li><strong>Recently viewed content</strong> — Surface research articles you recently accessed.</li>
            </ul>

            <h3 className="opt-legal-h3">Analytics & Performance</h3>
            <p>
              These cookies help us understand how visitors interact with our platform so we can improve it.
              All data is aggregated and anonymised where possible.
            </p>
            <ul className="opt-legal-list">
              <li><strong>Page-view analytics</strong> — Track which pages, features, and flows are used most.</li>
              <li><strong>Error logging</strong> — Capture client-side errors to support debugging.</li>
              <li><strong>A/B test assignment</strong> — Assign you to an experiment variant (content, UI, features) so your experience is consistent across sessions.</li>
              <li><strong>Performance metrics</strong> — Measure load times, API latency, and core web vitals.</li>
            </ul>

            <h3 className="opt-legal-h3">Marketing & Attribution</h3>
            <p>
              We may use these cookies to understand how users reach OptimumAI and measure the effectiveness
              of our outreach. We do not currently run third-party advertising campaigns, but these cookies
              enable attribution if that changes.
            </p>
            <ul className="opt-legal-list">
              <li><strong>Referral attribution</strong> — Record the source (e.g. newsletter link, partner site) that led to your visit.</li>
              <li><strong>Conversion tracking</strong> — Understand which content or campaigns drive sign-ups.</li>
            </ul>

            {/* ── 3 ── */}
            <div className="opt-rule"><span className="opt-rule-text">3. Third-Party Cookies</span></div>

            <p>
              Certain features of our platform embed or interact with third-party services that may place their
              own cookies on your device. We do not control these cookies.
            </p>
            <ul className="opt-legal-list">
              <li><strong>Authentication providers</strong> (e.g. Google, GitHub OAuth) — Set cookies to manage the OAuth flow and remember your linked account.</li>
              <li><strong>Embedded video content</strong> — Bootcamp lectures hosted on YouTube or Vimeo may set cookies for playback tracking.</li>
              <li><strong>Analytics services</strong> (e.g. Vercel Analytics, Plausible) — Collect anonymised usage telemetry. These services are selected for their privacy-preserving design.</li>
              <li><strong>Payment processors</strong> — Stripe sets cookies for fraud prevention and session continuity during checkout for paid programs.</li>
            </ul>
            <p>
              Third-party services have their own privacy and cookie policies; we encourage you to review them.
            </p>

            {/* ── 4 ── */}
            <div className="opt-rule"><span className="opt-rule-text">4. Your Choices</span></div>

            <h3 className="opt-legal-h3">Cookie consent banner</h3>
            <p>
              When you first visit our platform, you will be presented with a cookie consent notice. You can
              accept all cookies, or select specific categories. You can change your preferences at any time
              via the <strong>"Cookie Preferences"</strong> link in the site footer.
            </p>

            <h3 className="opt-legal-h3">Browser settings</h3>
            <p>
              Most browsers allow you to block or delete cookies through their settings. Be aware that blocking
              strictly necessary cookies may prevent the platform from functioning correctly. Common browser
              cookie controls:
            </p>
            <ul className="opt-legal-list">
              <li><strong>Chrome</strong> — Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox</strong> — Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari</strong> — Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge</strong> — Settings → Cookies and site permissions</li>
            </ul>

            <h3 className="opt-legal-h3">Do Not Track</h3>
            <p>
              Some browsers send a "Do Not Track" signal. Because there is no consistent industry standard for
              responding to this signal, our platform does not currently alter its behaviour based on it.
              You can use the cookie consent manager above to control tracking instead.
            </p>

            {/* ── 5 ── */}
            <div className="opt-rule"><span className="opt-rule-text">5. Cookie Retention Periods</span></div>

            <ul className="opt-legal-list">
              <li><strong>Session cookies</strong> — Expire when you close your browser tab or window.</li>
              <li><strong>Auth & preference cookies</strong> — Retained for up to 12 months or until you sign out and clear data.</li>
              <li><strong>Analytics cookies</strong> — Retained for up to 13 months, after which data is aggregated and the cookie is reset.</li>
              <li><strong>Attribution cookies</strong> — Retained for up to 90 days from the attributed visit.</li>
            </ul>

            {/* ── 6 ── */}
            <div className="opt-rule"><span className="opt-rule-text">6. Legal Basis (EEA / UK Users)</span></div>

            <p>
              For users in the European Economic Area (EEA) and United Kingdom (UK), we process cookies on the
              following legal bases under the GDPR / UK GDPR:
            </p>
            <ul className="opt-legal-list">
              <li><strong>Strictly necessary cookies</strong> — Legitimate interest and contractual necessity to deliver the service you requested.</li>
              <li><strong>Functional, analytics, and marketing cookies</strong> — Your explicit consent, given via the cookie consent banner.</li>
            </ul>
            <p>
              You have the right to withdraw consent at any time. Withdrawing consent does not affect the
              lawfulness of processing before withdrawal.
            </p>

            {/* ── 7 ── */}
            <div className="opt-rule"><span className="opt-rule-text">7. Changes to This Policy</span></div>

            <p>
              We may update this Cookie Policy to reflect changes in our practices or applicable law. When we
              make material changes, we will update the "Effective" date at the top and, where appropriate,
              display a notice on the platform. Continued use of our Services after changes take effect
              constitutes your acceptance of the updated policy.
            </p>

            {/* ── 8 ── */}
            <div className="opt-rule"><span className="opt-rule-text">8. Contact Us</span></div>

            <p>
              If you have questions about how we use cookies, please contact:<br />
              <strong>Email:</strong> privacy@optimumai.in<br />
              <strong>Mail:</strong> OptimumAI, Inc. · Attn: Privacy Team · [Address on file]
            </p>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
