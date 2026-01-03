import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, FlaskConical, Briefcase, ArrowRight } from "lucide-react"

export function ProgramsSection() {
  const programs = [
    {
      icon: GraduationCap,
      title: "AI Bootcamps",
      description:
        "Intensive, project-based learning programs that take you from fundamentals to advanced AI applications in weeks.",
      features: ["Hands-on Projects", "Expert Mentorship", "Industry Certificate"],
      link: "#bootcamps",
    },
    {
      icon: FlaskConical,
      title: "Research Programs",
      description:
        "Collaborate with global teams on cutting-edge AI research solving real-world challenges across industries.",
      features: ["Published Work", "Global Collaboration", "Portfolio Building"],
      link: "#research",
    },
    {
      icon: Briefcase,
      title: "AI Internships",
      description:
        "Gain practical experience working with leading organizations on production AI systems and products.",
      features: ["Paid Opportunities", "Career Support", "Industry Connections"],
      link: "#internships",
    },
  ]

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Your Path to AI Excellence</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose from our comprehensive programs designed to accelerate your AI career
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 hover:border-accent/50 transition-all hover:shadow-lg group"
            >
              <CardContent className="p-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <program.icon className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-2xl font-bold mb-4">{program.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{program.description}</p>

                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="ghost" className="w-full group/btn" asChild>
                  <a href={program.link}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
