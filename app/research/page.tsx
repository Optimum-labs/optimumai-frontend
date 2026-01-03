import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, Users, Calendar, Zap, CheckCircle, GitBranch } from "lucide-react"

export default function ResearchPage() {
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
      objectives: [
        "Implement transformer architecture from scratch",
        "Design tokenization strategies",
        "Train models on distributed systems",
        "Optimize inference performance",
      ],
      prerequisites: ["Strong Python skills", "Deep learning fundamentals", "PyTorch experience", "Linear algebra"],
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
      objectives: [
        "Implement LoRA and QLoRA techniques",
        "Fine-tune models with limited compute",
        "Evaluate fine-tuned model performance",
        "Deploy fine-tuned models in production",
      ],
      prerequisites: ["Python programming", "Basic ML knowledge", "Familiarity with transformers", "GPU access"],
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
      objectives: [
        "Design optimal chunking strategies",
        "Implement vector database solutions",
        "Build RAG pipelines with LangChain",
        "Optimize retrieval accuracy",
      ],
      prerequisites: ["Python programming", "API development", "Database fundamentals", "LLM basics"],
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
      objectives: [
        "Train vision-language models",
        "Implement multimodal embeddings",
        "Build cross-modal retrieval systems",
        "Create generative multimodal applications",
      ],
      prerequisites: ["Computer vision experience", "NLP knowledge", "PyTorch/TensorFlow", "Research experience"],
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
      objectives: [
        "Implement ReAct and ReWOO patterns",
        "Build multi-step reasoning agents",
        "Design tool-calling interfaces",
        "Create agentic workflow systems",
      ],
      prerequisites: ["Python development", "LLM API experience", "Software architecture", "Problem-solving skills"],
    },
    {
      title: "Model Compression & Optimization",
      organization: "OptimumAI Efficiency Lab",
      participants: 41,
      duration: "8 weeks",
      region: "Global",
      image: "/ai-model-optimization.jpg",
      tags: ["Quantization", "Pruning", "Distillation", "ONNX"],
      status: "Accepting Applications",
      difficulty: "Advanced",
      description:
        "Master techniques for compressing and optimizing large models for edge deployment and inference efficiency.",
      objectives: [
        "Implement quantization techniques",
        "Apply model pruning strategies",
        "Perform knowledge distillation",
        "Optimize for edge devices",
      ],
      prerequisites: ["Deep learning expertise", "Model architectures", "C++/CUDA helpful", "Hardware understanding"],
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
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Research Projects</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Collaborative AI Research</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            Join cutting-edge research projects on LLM development, fine-tuning, RAG systems, and more. Collaborate with
            global teams to push the boundaries of AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Browse Projects
            </Button>
            <Button size="lg" variant="outline">
              Propose a Project
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-8 mb-16">
            {projects.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-accent/10 to-muted">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className={getDifficultyColor(project.difficulty)}>{project.difficulty}</Badge>
                    </div>
                  </div>

                  <div className="lg:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-2xl font-bold text-balance">{project.title}</h3>
                        <Badge variant={project.status === "In Progress" ? "secondary" : "default"}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.organization}</p>
                      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{project.participants} collaborators</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-accent" />
                          <span>{project.region}</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2 flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          Research Objectives:
                        </div>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {project.objectives.map((objective, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Technologies:</div>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Prerequisites:</div>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {project.prerequisites.map((prereq, idx) => (
                            <span key={idx}>
                              {prereq}
                              {idx < project.prerequisites.length - 1 && " • "}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        <Button className="bg-accent hover:bg-accent/90">
                          {project.status === "In Progress" ? "View Details" : "Apply to Join"}
                        </Button>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-accent/5 to-muted border-accent/20">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Have a Research Idea?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Partner with us to launch collaborative AI research projects that make real-world impact. We provide
                infrastructure, mentorship, and a global community of researchers.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Propose a Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
