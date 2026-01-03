import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Calendar, Zap } from "lucide-react"

export function ResearchSection() {
  const projects = [
    {
      title: "Building LLMs from Scratch",
      organization: "OptimumAI Research Lab",
      participants: 62,
      duration: "16 weeks",
      region: "Global",
      image: "/neural-network-architecture-visualization.jpg",
      tags: ["LLM", "Transformers", "Deep Learning", "PyTorch"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Learn to build and train large language models from the ground up, covering tokenization, architecture design, and training strategies.",
    },
    {
      title: "Fine-Tuning & PEFT Techniques",
      organization: "OptimumAI Research Lab",
      participants: 78,
      duration: "12 weeks",
      region: "Global",
      image: "/ai-model-training-dashboard.jpg",
      tags: ["Fine-tuning", "LoRA", "QLoRA", "PEFT"],
      status: "Accepting Applications",
      difficulty: "Intermediate",
      description:
        "Master parameter-efficient fine-tuning methods including LoRA, QLoRA, and prefix tuning for adapting LLMs to specific tasks.",
    },
    {
      title: "RAG Systems & Vector Databases",
      organization: "OptimumAI Applied AI",
      participants: 85,
      duration: "10 weeks",
      region: "Global",
      image: "/information-retrieval-system.jpg",
      tags: ["RAG", "Vector DB", "Embeddings", "LangChain"],
      status: "In Progress",
      difficulty: "Intermediate",
      description:
        "Build production-ready Retrieval Augmented Generation systems with advanced chunking, embedding strategies, and reranking.",
    },
    {
      title: "Multimodal AI Research",
      organization: "OptimumAI Vision Lab",
      participants: 54,
      duration: "14 weeks",
      region: "Global",
      image: "/multimodal-ai-vision-language.jpg",
      tags: ["Vision-Language", "CLIP", "Multimodal", "Diffusion"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Explore cutting-edge multimodal models combining vision, language, and audio for next-generation AI applications.",
    },
    {
      title: "LLM Agents & Tool Use",
      organization: "OptimumAI Agentic AI",
      participants: 67,
      duration: "10 weeks",
      region: "Global",
      image: "/ai-agent-workflow-automation.jpg",
      tags: ["Agents", "Tool Calling", "ReAct", "AutoGPT"],
      status: "Accepting Applications",
      difficulty: "Intermediate",
      description:
        "Design and implement autonomous AI agents with reasoning, planning, and tool-use capabilities for complex workflows.",
    },
    {
      title: "AI for Climate Change Prediction",
      organization: "Global Climate Initiative",
      participants: 45,
      duration: "8 weeks",
      region: "Global",
      image: "/climate-data-visualization.png",
      tags: ["Machine Learning", "Climate Science", "Data Analysis"],
      status: "In Progress",
      difficulty: "Intermediate",
      description: "Apply machine learning to climate data for predictive modeling and environmental impact analysis.",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Advanced":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Beginner":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-accent/10 text-accent border-accent/20"
    }
  }

  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Research Projects</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Collaborative AI Research</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Work on cutting-edge AI research projects from LLM development to multimodal systems with global teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-accent/10 to-muted">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                  <Badge variant={project.status === "In Progress" ? "secondary" : "default"}>{project.status}</Badge>
                </div>
              </div>

              <CardHeader>
                <h3 className="text-xl font-bold mb-2 text-balance">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.organization}</p>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-accent" />
                    <span>{project.participants} collaborators</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{project.duration} duration</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>{project.region}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full" variant={project.status === "In Progress" ? "outline" : "default"}>
                  {project.status === "In Progress" ? "View Details" : "Apply to Join"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Have a Research Idea?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Partner with us to launch collaborative AI research projects that make real-world impact
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Propose a Project
          </Button>
        </div>
      </div>
    </section>
  )
}
