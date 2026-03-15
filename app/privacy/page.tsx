import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Privacy Policy — OptimumAI",
  description: "How OptimumAI collects, uses, and protects your personal data.",
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          <p className="opt-kicker">Legal</p>
          <h1 className="opt-headline" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            Privacy<br /><em>Policy</em>
          </h1>
          <p className="opt-sub">Effective: March 15, 2026 &nbsp;·&nbsp; OptimumAI, Inc.</p>

          <div className="opt-legal-body">

            <p>
              OptimumAI ("we", "our", or "us") is an AI research and education organisation. This Privacy Policy
              explains what personal data we collect when you use our website, platform, research tools, bootcamps,
              and community services (collectively, "Services"), how we use it, and the rights you have over it.
            </p>

            {/* ── 1 ── */}
            <div className="opt-rule"><span className="opt-rule-text">1. Data We Collect</span></div>

            <h3 className="opt-legal-h3">Information you provide directly</h3>
            <ul className="opt-legal-list">
              <li><strong>Account details</strong> — name, email address, password, and optional profile picture when you create an account.</li>
              <li><strong>Research & program submissions</strong> — papers, project briefs, bootcamp assignments, and any content you upload to the platform.</li>
              <li><strong>Communications</strong> — messages you send us via email, contact forms, or community channels.</li>
              <li><strong>Payment information</strong> — billing name, payment method details, and transaction history for paid programs. Card data is processed by our PCI-compliant payment processor; we do not store raw card numbers.</li>
              <li><strong>Profile information</strong> — institutional affiliation, research interests, and career goals you choose to share.</li>
            </ul>

            <h3 className="opt-legal-h3">Information collected automatically</h3>
            <ul className="opt-legal-list">
              <li><strong>Log data</strong> — IP address, browser type and version, pages visited, referring URL, and timestamps.</li>
              <li><strong>Device data</strong> — operating system, device identifiers, and screen resolution.</li>
              <li><strong>Usage data</strong> — features accessed, time spent, interactions with research tools, and content viewed.</li>
              <li><strong>Location data</strong> — approximate country/region derived from your IP address for fraud prevention and content localisation.</li>
              <li><strong>Cookies & similar technologies</strong> — see our Cookie Policy for full details.</li>
            </ul>

            <h3 className="opt-legal-h3">Information from third parties</h3>
            <ul className="opt-legal-list">
              <li>Academic databases and public research repositories used to surface relevant papers.</li>
              <li>OAuth providers (e.g. Google, GitHub) if you choose to sign in via a third-party identity provider.</li>
              <li>Fraud-prevention and security partners to protect the integrity of our Services.</li>
            </ul>

            {/* ── 2 ── */}
            <div className="opt-rule"><span className="opt-rule-text">2. How We Use Your Data</span></div>

            <ul className="opt-legal-list">
              <li><strong>Provide & improve our Services</strong> — process enrolments, facilitate research collaboration, personalise your dashboard, and develop new features.</li>
              <li><strong>Research & model development</strong> — with your explicit opt-in consent, anonymised usage patterns may inform improvements to OptimumAI's research tools. You can opt out at any time in account settings.</li>
              <li><strong>Communications</strong> — send transactional emails (receipts, application updates) and, where you have consented, program announcements and research digests.</li>
              <li><strong>Safety & security</strong> — detect abuse, enforce our Acceptable Use Policy, and protect other users.</li>
              <li><strong>Legal compliance</strong> — meet obligations under applicable law, respond to lawful government requests, and resolve disputes.</li>
            </ul>

            {/* ── 3 ── */}
            <div className="opt-rule"><span className="opt-rule-text">3. Sharing Your Data</span></div>

            <p>We do not sell or rent your personal data. We share it only in the following circumstances:</p>
            <ul className="opt-legal-list">
              <li><strong>Service providers</strong> — hosting, analytics, email delivery, payment processing, and customer support vendors acting under our instructions and bound by data-processing agreements.</li>
              <li><strong>Research partners & universities</strong> — anonymised or aggregated data may be shared with academic institutions for joint research. We will notify you before sharing identifiable data with a research partner and obtain your consent.</li>
              <li><strong>Business transfers</strong> — in a merger, acquisition, or asset sale your data may be transferred; we will notify affected users before this occurs.</li>
              <li><strong>Legal obligations</strong> — when required by law, court order, or to protect the rights and safety of our users or the public.</li>
              <li><strong>With your consent</strong> — for any purpose not listed above, we will ask for explicit consent first.</li>
            </ul>

            {/* ── 4 ── */}
            <div className="opt-rule"><span className="opt-rule-text">4. Data Retention</span></div>

            <p>
              We retain personal data only as long as necessary to provide our Services and fulfil the purposes
              described in this policy, or as required by law. When you delete your account we remove your personal
              data within 30 days, except where retention is required for legal, security, or financial
              record-keeping purposes. Anonymised or aggregated data may be retained indefinitely.
            </p>

            {/* ── 5 ── */}
            <div className="opt-rule"><span className="opt-rule-text">5. Your Rights</span></div>

            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="opt-legal-list">
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
              <li><strong>Erasure</strong> — ask us to delete your personal data ("right to be forgotten").</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format.</li>
              <li><strong>Restriction</strong> — limit how we process your data in certain circumstances.</li>
              <li><strong>Objection</strong> — object to processing based on legitimate interests or for direct marketing.</li>
              <li><strong>Withdraw consent</strong> — where processing is based on consent, withdraw it at any time without affecting prior lawful processing.</li>
            </ul>
            <p>To exercise any of these rights, email us at <strong>privacy@optimumai.in</strong>. We will respond within 30 days.</p>

            {/* ── 6 ── */}
            <div className="opt-rule"><span className="opt-rule-text">6. International Transfers</span></div>

            <p>
              OptimumAI operates globally. Your data may be processed in countries outside your own. Where we
              transfer data from the EEA, UK, or Switzerland to countries without an adequacy decision, we rely on
              Standard Contractual Clauses approved by the European Commission or equivalent safeguards.
            </p>

            {/* ── 7 ── */}
            <div className="opt-rule"><span className="opt-rule-text">7. Children</span></div>

            <p>
              Our Services are not directed to individuals under 13. We do not knowingly collect personal data from
              children under 13. If you believe a child has provided us data, contact us at
              <strong> privacy@optimumai.in</strong> and we will delete it promptly. Users aged 13–18 require
              parental or guardian consent.
            </p>

            {/* ── 8 ── */}
            <div className="opt-rule"><span className="opt-rule-text">8. Security</span></div>

            <p>
              We implement industry-standard technical and organisational safeguards including encryption in transit
              (TLS), encryption at rest, role-based access controls, and regular security audits. No transmission
              over the internet is 100% secure; please use strong, unique passwords and enable two-factor
              authentication.
            </p>

            {/* ── 9 ── */}
            <div className="opt-rule"><span className="opt-rule-text">9. Changes to This Policy</span></div>

            <p>
              We may update this policy from time to time. We will notify you of material changes by email or
              prominent in-app notice at least 14 days before they take effect. Continued use of our Services after
              the effective date constitutes acceptance of the revised policy.
            </p>

            {/* ── 10 ── */}
            <div className="opt-rule"><span className="opt-rule-text">10. Contact Us</span></div>

            <p>
              For privacy-related questions or to exercise your rights, contact our Data Protection team:<br />
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
