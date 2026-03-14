import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award, BookOpen } from "lucide-react"

export function ResearchHighlights() {
  const highlights = [
    {
      icon: BookOpen,
      title: "Fine-Tuning Large Language Models",
      description: "Explore efficient techniques for adapting pre-trained LLMs to specific domains and tasks.",
      participants: "245 researchers",
      status: "Active"
    },
    {
      icon: Users,
      title: "Building LLMs from Scratch",
      description: "Learn the complete pipeline for training transformer models from the ground up.",
      participants: "189 researchers",
      status: "Active"
    },
    {
      icon: Award,
      title: "Multimodal AI & Vision-Language Models",
      description: "Research on combining vision and language understanding for next-generation AI.",
      participants: "156 researchers",
      status: "Active"
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Research Areas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the cutting-edge research initiatives driving AI innovation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-2 hover:border-accent/50">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <highlight.icon className="w-7 h-7 text-accent" />
                </div>

                <h3 className="text-xl font-bold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{highlight.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{highlight.participants}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-accent font-medium">{highlight.status}</span>
                  </div>
                </div>

                <Button variant="ghost" className="w-full gap-2">
                  Explore Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
