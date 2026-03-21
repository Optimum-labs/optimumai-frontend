import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="opt-footer">
      <div className="opt-footer-inner">
        <div className="opt-footer-grid">
          <div>
            <span className="opt-footer-col-heading">Products</span>
            <ul className="opt-footer-links">
              <li><Link href="/research/llm-dashboard" className="opt-footer-link">LLM Dashboard</Link></li>
              <li><Link href="/research" className="opt-footer-link">Research</Link></li>
              <li><Link href="/beta-outreach" className="opt-footer-link">Beta Outreach</Link></li>
            </ul>
          </div>

          <div>
            <span className="opt-footer-col-heading">Company</span>
            <ul className="opt-footer-links">
              <li><Link href="/about" className="opt-footer-link">About Us</Link></li>
              <li><Link href="/about#mission" className="opt-footer-link">Mission &amp; Vision</Link></li>
              <li><Link href="/team" className="opt-footer-link">Team</Link></li>
              <li><Link href="/internships" className="opt-footer-link">Careers</Link></li>
              <li><Link href="/contact" className="opt-footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <span className="opt-footer-col-heading">Resources</span>
            <ul className="opt-footer-links">
              <li><Link href="#" className="opt-footer-link">Blog</Link></li>
              <li><Link href="#" className="opt-footer-link">Documentation</Link></li>
              <li><Link href="#" className="opt-footer-link">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <span className="opt-footer-col-heading">Legal</span>
            <ul className="opt-footer-links">
              <li><Link href="/privacy" className="opt-footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="opt-footer-link">Terms of Service</Link></li>
              <li><Link href="/cookies" className="opt-footer-link">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="opt-footer-divider" />

        <div className="opt-footer-bottom">
          <Link href="/" className="opt-footer-brand">
            <div className="opt-footer-brand-mark">O</div>
            <span className="opt-footer-brand-text">OptimumAI</span>
          </Link>

          <p className="opt-footer-copy">© 2026 OptimumAI. All rights reserved. · <em>Making Humans Better Humans.</em></p>

          <div className="opt-footer-socials">
            <a href="#" aria-label="Twitter" className="opt-footer-social"><Twitter size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="opt-footer-social"><Linkedin size={16} /></a>
            <a href="#" aria-label="GitHub" className="opt-footer-social"><Github size={16} /></a>
            <a href="#" aria-label="YouTube" className="opt-footer-social"><Youtube size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
