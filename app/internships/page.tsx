import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Building2, MapPin, DollarSign, Clock, GraduationCap, Briefcase, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function InternshipsPage() {
  const internships = [
    {
      role: "ML Engineering Intern",
      company: "TechCorp AI",
      location: "Remote",
      type: "Full-time",
      duration: "3-6 months",
      compensation: "$4,000-6,000/mo",
      image: "/modern-tech-office.png",
      skills: ["Python", "TensorFlow", "MLOps"],
      deadline: "Feb 28, 2026",
      description:
        "Work on building and deploying machine learning models for production systems. Collaborate with senior engineers on model optimization and infrastructure.",
      responsibilities: [
        "Develop ML models for recommendation systems",
        "Optimize model inference performance",
        "Build data pipelines",
        "Participate in code reviews",
      ],
    },
    {
      role: "AI Research Intern",
      company: "Innovation Labs",
      location: "San Francisco, CA",
      type: "Full-time",
      duration: "4 months",
      compensation: "$5,500/mo",
      image: "/ai-research-lab.png",
      skills: ["PyTorch", "Research", "Computer Vision"],
      deadline: "Mar 5, 2026",
      description:
        "Join our research team working on cutting-edge computer vision projects. Contribute to papers and open-source projects.",
      responsibilities: [
        "Conduct literature reviews",
        "Implement research papers",
        "Run experiments and analyze results",
        "Contribute to publications",
      ],
    },
    {
      role: "NLP Engineer Intern",
      company: "DataSolutions Inc",
      location: "Remote",
      type: "Part-time",
      duration: "6 months",
      compensation: "$3,500/mo",
      image: "/natural-language-processing.png",
      skills: ["Transformers", "NLP", "API Development"],
      deadline: "Mar 10, 2026",
      description:
        "Build NLP applications using state-of-the-art language models. Work on chatbots, document processing, and sentiment analysis.",
      responsibilities: [
        "Fine-tune language models",
        "Develop NLP APIs",
        "Improve model accuracy",
        "Create documentation",
      ],
    },
    {
      role: "Computer Vision Intern",
      company: "RoboTech Systems",
      location: "Boston, MA",
      type: "Full-time",
      duration: "3 months",
      compensation: "$5,000/mo",
      image: "/robotics-computer-vision.jpg",
      skills: ["OpenCV", "Deep Learning", "Edge Computing"],
      deadline: "Mar 15, 2026",
      description:
        "Develop computer vision algorithms for robotics applications. Work with real-time processing and edge deployment.",
      responsibilities: [
        "Build object detection models",
        "Optimize for edge devices",
        "Test on robotic platforms",
        "Document algorithms",
      ],
    },
    {
      role: "AI Product Intern",
      company: "StartupAI",
      location: "Remote",
      type: "Full-time",
      duration: "4-6 months",
      compensation: "$4,500/mo",
      image: "/ai-product-development.jpg",
      skills: ["Product Management", "AI/ML", "User Research"],
      deadline: "Mar 20, 2026",
      description:
        "Help shape AI product strategy and roadmap. Work closely with engineering and design teams to ship features.",
      responsibilities: [
        "Conduct user interviews",
        "Define product requirements",
        "Analyze product metrics",
        "Support feature launches",
      ],
    },
    {
      role: "Data Science Intern",
      company: "Analytics Pro",
      location: "New York, NY",
      type: "Full-time",
      duration: "3 months",
      compensation: "$4,800/mo",
      image: "/data-science-analytics.jpg",
      skills: ["Python", "Statistics", "Data Visualization"],
      deadline: "Mar 25, 2026",
      description:
        "Analyze large datasets to derive business insights. Build dashboards and predictive models for stakeholders.",
      responsibilities: [
        "Perform statistical analysis",
        "Create data visualizations",
        "Build predictive models",
        "Present insights to stakeholders",
      ],
    },
    {
      role: "LLM Research Intern",
      company: "FutureLabs AI",
      location: "Remote",
      type: "Full-time",
      duration: "5 months",
      compensation: "$6,000/mo",
      image: "/language-model-research.jpg",
      skills: ["LLMs", "Fine-tuning", "Research", "PyTorch"],
      deadline: "Apr 1, 2026",
      description:
        "Research and develop novel techniques for large language model training and fine-tuning. Publish findings.",
      responsibilities: [
        "Experiment with training techniques",
        "Fine-tune models for specific domains",
        "Write research papers",
        "Collaborate with global researchers",
      ],
    },
    {
      role: "AI Ethics Intern",
      company: "Responsible AI Foundation",
      location: "Remote",
      type: "Part-time",
      duration: "4 months",
      compensation: "$3,000/mo",
      image: "/ai-ethics-responsibility.jpg",
      skills: ["AI Ethics", "Policy", "Research", "Communication"],
      deadline: "Apr 5, 2026",
      description:
        "Help develop frameworks and guidelines for responsible AI development. Conduct research on AI bias and fairness.",
      responsibilities: [
        "Research AI ethics issues",
        "Develop guidelines",
        "Write policy recommendations",
        "Present findings",
      ],
    },
  ]

  const benefits = [
    {
      icon: GraduationCap,
      title: "Mentorship Program",
      description: "Get paired with experienced industry professionals",
    },
    {
      icon: Briefcase,
      title: "Real Projects",
      description: "Work on production systems that impact millions",
    },
    {
      icon: Building2,
      title: "Full-Time Conversion",
      description: "High potential for conversion to full-time roles",
    },
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Industry-leading compensation packages",
    },
  ]

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">Careers</p>
            <h1 className="opt-headline opt-anim-2">
              Launch Your<br /><em>AI Career</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Access exclusive internship opportunities with leading organisations building the future of AI.
              Gain hands-on experience and accelerate your career.
            </p>
          </section>

          {/* ── Benefits ── */}
          <div className="opt-rule"><span className="opt-rule-text">Why Join</span></div>

          <div className="opt-pillars" style={{ gridTemplateColumns: "repeat(4, 1fr)", marginBottom: "64px" }}>
            {benefits.map((b, i) => (
              <div key={i} className="opt-pillar" style={{ borderBottom: "none" }}>
                <b.icon size={20} style={{ color: "var(--gold)", marginBottom: "12px" }} />
                <div className="opt-pillar-title" style={{ fontSize: "15px" }}>{b.title}</div>
                <p className="opt-pillar-body">{b.description}</p>
              </div>
            ))}
          </div>

          {/* ── Listings ── */}
          <div className="opt-rule"><span className="opt-rule-text">Open Positions</span></div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
            {internships.map((intern, i) => (
              <div key={i} className="ed-card">
                <div className="ed-card-img">
                  <img src={intern.image || "/placeholder.svg"} alt={intern.company} />
                  <span className="ed-badge">{intern.type}</span>
                </div>
                <div className="ed-card-body">
                  <div className="ed-card-title">{intern.role}</div>
                  <div className="ed-card-subtitle" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <Building2 size={12} /> {intern.company}
                  </div>
                  <p className="ed-card-desc">{intern.description}</p>

                  <div className="ed-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><MapPin size={13} /> {intern.location}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><Clock size={13} /> {intern.duration}</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}><DollarSign size={13} /> {intern.compensation}</span>
                  </div>

                  <ul className="ed-list">
                    {intern.responsibilities.map((r, j) => (
                      <li key={j}>{r}</li>
                    ))}
                  </ul>

                  <div className="ed-tags">
                    {intern.skills.map((s, j) => (
                      <span key={j} className="ed-tag">{s}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid rgba(10,10,10,0.08)" }}>
                    <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: "10px", color: "var(--muted-txt)" }}>
                      Deadline: {intern.deadline}
                    </span>
                    <button className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 18px" }}>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="opt-cta-block">
            <p className="opt-kicker" style={{ marginBottom: "16px" }}>Ready to start?</p>
            <p className="opt-cta-headline">
              Your AI career<br />begins here.
            </p>
            <div className="opt-cta-actions">
              <Link href="/signup" className="opt-btn-primary">Create an Account <ArrowRight size={13} /></Link>
              <Link href="/contact" className="opt-btn-ghost">Get in Touch</Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
