import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FlaskConical, BookOpen, FileText, Users, ArrowRight } from "lucide-react"

export function ProgramsSection() {
  const programs = [
    {
      icon: FlaskConical,
      title: "Research Projects",
      description:
        "Collaborate on cutting-edge AI research solving real-world challenges in NLP, Computer Vision, LLMs, and more.",
      features: ["Published Work", "Global Collaboration", "Portfolio Building"],
      link: "/research",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Join a vibrant community of AI researchers, access bootcamps, learning resources, news, and published papers.",
      features: ["Bootcamps", "Learning Materials", "News & Updates"],
      link: "/community",
    },
    {
      icon: BookOpen,
      title: "AI Internships",
      description:
        "Gain practical experience working with leading organizations on production AI systems and research initiatives.",
      features: ["Paid Opportunities", "Career Support", "Research Experience"],
      link: "/internships",
    },
  ]

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Engage With OptimumAI</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore research opportunities, connect with the community, and advance your AI career
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
