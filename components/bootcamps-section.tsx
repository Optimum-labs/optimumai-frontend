import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

export function BootcampsSection() {
  const bootcamps = [
    {
      title: "Deep Learning Foundations",
      level: "Beginner",
      duration: "8 weeks",
      students: "1,200+",
      image: "/neural-network-visualization.png",
      topics: ["Neural Networks", "PyTorch", "Computer Vision", "NLP Basics"],
      nextStart: "Feb 15, 2026",
    },
    {
      title: "Advanced LLM Engineering",
      level: "Advanced",
      duration: "10 weeks",
      students: "800+",
      image: "/ai-language-model-architecture.jpg",
      topics: ["Transformers", "Fine-tuning", "RAG Systems", "Prompt Engineering"],
      nextStart: "Feb 22, 2026",
    },
    {
      title: "AI for Computer Vision",
      level: "Intermediate",
      duration: "8 weeks",
      students: "950+",
      image: "/computer-vision-ai-technology.jpg",
      topics: ["Object Detection", "Segmentation", "GANs", "Video Analysis"],
      nextStart: "Mar 1, 2026",
    },
  ]

  return (
    <section id="bootcamps" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Bootcamps</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Intensive AI Training Programs</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Transform your skills with project-based bootcamps led by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {bootcamps.map((bootcamp, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-accent/5">
                <img
                  src={bootcamp.image || "/placeholder.svg"}
                  alt={bootcamp.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{bootcamp.level}</Badge>
              </div>

              <CardHeader>
                <h3 className="text-xl font-bold mb-2">{bootcamp.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{bootcamp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{bootcamp.students}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2">Topics Covered:</div>
                  <div className="flex flex-wrap gap-2">
                    {bootcamp.topics.map((topic, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-sm text-muted-foreground">Next cohort starts</div>
                  <div className="font-semibold">{bootcamp.nextStart}</div>
                </div>

                <Button className="w-full bg-accent hover:bg-accent/90">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Bootcamps
          </Button>
        </div>
      </div>
    </section>
  )
}
