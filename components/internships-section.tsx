import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, DollarSign, Clock } from "lucide-react"

export function InternshipsSection() {
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
    },
  ]

  return (
    <section id="internships" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Internships</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Launch Your AI Career</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Access exclusive internship opportunities with leading organizations building the future of AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {internships.map((internship, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-all hover:border-accent/30">
              <div className="relative h-32 bg-gradient-to-br from-accent/10 to-muted">
                <img
                  src={internship.image || "/placeholder.svg"}
                  alt={internship.company}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold mb-1">{internship.role}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4" />
                      <span>{internship.company}</span>
                    </div>
                  </div>
                  <Badge variant="secondary">{internship.type}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-semibold">{internship.compensation}</span>
                  </div>
                </div>

                <div className="mb-4">
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
                  <span className="text-xs text-muted-foreground">Deadline: {internship.deadline}</span>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Opportunities
          </Button>
        </div>
      </div>
    </section>
  )
}
