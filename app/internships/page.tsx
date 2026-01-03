import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock, Briefcase, GraduationCap } from "lucide-react"

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
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Internships</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Launch Your AI Career</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            Access exclusive internship opportunities with leading organizations building the future of AI. Gain
            hands-on experience and accelerate your career.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                    <benefit.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            {internships.map((internship, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="relative h-48 lg:h-auto bg-gradient-to-br from-accent/10 to-muted">
                    <img
                      src={internship.image || "/placeholder.svg"}
                      alt={internship.company}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  <div className="lg:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{internship.role}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="w-4 h-4" />
                            <span>{internship.company}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{internship.type}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{internship.description}</p>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                      <div className="grid sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{internship.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>{internship.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent" />
                          <span className="font-semibold">{internship.compensation}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Key Responsibilities:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {internship.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Required Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">
                          Application deadline: {internship.deadline}
                        </span>
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
