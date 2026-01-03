import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Code, Brain, Zap, CheckCircle } from "lucide-react"

export default function BootcampsPage() {
  const bootcamps = [
    {
      title: "Deep Learning Foundations",
      level: "Beginner",
      duration: "8 weeks",
      students: "1,200+",
      image: "/neural-network-visualization.png",
      topics: ["Neural Networks", "PyTorch", "Computer Vision", "NLP Basics"],
      nextStart: "Feb 15, 2026",
      description:
        "Start your AI journey with comprehensive deep learning fundamentals. Learn neural network architectures, training techniques, and apply them to real-world computer vision and NLP tasks.",
      outcomes: [
        "Build neural networks from scratch",
        "Train computer vision models",
        "Create NLP applications",
        "Deploy ML models to production",
      ],
    },
    {
      title: "Advanced LLM Engineering",
      level: "Advanced",
      duration: "10 weeks",
      students: "800+",
      image: "/ai-language-model-architecture.jpg",
      topics: ["Transformers", "Fine-tuning", "RAG Systems", "Prompt Engineering"],
      nextStart: "Feb 22, 2026",
      description:
        "Master the art of building and deploying large language models. Learn transformer architectures, fine-tuning techniques, RAG implementations, and advanced prompt engineering strategies.",
      outcomes: [
        "Fine-tune LLMs for custom tasks",
        "Build production RAG systems",
        "Implement advanced prompting techniques",
        "Optimize model performance",
      ],
    },
    {
      title: "AI for Computer Vision",
      level: "Intermediate",
      duration: "8 weeks",
      students: "950+",
      image: "/computer-vision-ai-technology.jpg",
      topics: ["Object Detection", "Segmentation", "GANs", "Video Analysis"],
      nextStart: "Mar 1, 2026",
      description:
        "Dive deep into computer vision with state-of-the-art techniques. Master object detection, semantic segmentation, generative models, and real-time video processing.",
      outcomes: [
        "Implement object detection systems",
        "Build semantic segmentation models",
        "Create generative AI for images",
        "Process video streams in real-time",
      ],
    },
    {
      title: "MLOps & AI Infrastructure",
      level: "Intermediate",
      duration: "6 weeks",
      students: "650+",
      image: "/mlops-infrastructure.jpg",
      topics: ["CI/CD", "Model Monitoring", "Docker", "Kubernetes"],
      nextStart: "Mar 8, 2026",
      description:
        "Learn to deploy, monitor, and maintain AI systems at scale. Cover MLOps best practices, containerization, orchestration, and production monitoring.",
      outcomes: [
        "Build CI/CD pipelines for ML",
        "Deploy models with Docker/K8s",
        "Monitor model performance",
        "Implement A/B testing for models",
      ],
    },
    {
      title: "Reinforcement Learning",
      level: "Advanced",
      duration: "10 weeks",
      students: "420+",
      image: "/reinforcement-learning-agent.png",
      topics: ["Q-Learning", "Policy Gradients", "Multi-Agent RL", "Game AI"],
      nextStart: "Mar 15, 2026",
      description:
        "Master reinforcement learning algorithms and applications. Build intelligent agents that learn through interaction, from simple games to complex robotic control.",
      outcomes: [
        "Implement RL algorithms",
        "Train game-playing agents",
        "Build robotic control systems",
        "Design reward functions",
      ],
    },
    {
      title: "AI Product Management",
      level: "Beginner",
      duration: "6 weeks",
      students: "890+",
      image: "/ai-product-management.jpg",
      topics: ["Product Strategy", "User Research", "AI Ethics", "Go-to-Market"],
      nextStart: "Mar 22, 2026",
      description:
        "Learn to build and ship AI-powered products. Cover product strategy, user research, ethical considerations, and go-to-market strategies for AI applications.",
      outcomes: [
        "Define AI product strategy",
        "Conduct user research",
        "Navigate AI ethics",
        "Launch AI products successfully",
      ],
    },
  ]

  const features = [
    {
      icon: Code,
      title: "Hands-On Projects",
      description: "Build real-world applications that showcase your skills to employers",
    },
    {
      icon: Brain,
      title: "Expert Instructors",
      description: "Learn from industry practitioners at leading AI companies",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Work with peers in small cohorts for maximum engagement",
    },
    {
      icon: Zap,
      title: "Career Support",
      description: "Get resume reviews, interview prep, and job placement assistance",
    },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Bootcamps</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Intensive AI Training Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty mb-8">
            Transform your career with project-based bootcamps designed by industry experts. Go from beginner to
            job-ready in weeks.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            {bootcamps.map((bootcamp, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="relative h-64 md:h-auto bg-gradient-to-br from-accent/20 to-accent/5">
                    <img
                      src={bootcamp.image || "/placeholder.svg"}
                      alt={bootcamp.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">{bootcamp.level}</Badge>
                  </div>

                  <div className="md:col-span-2 p-6">
                    <CardHeader className="p-0 mb-4">
                      <h3 className="text-2xl font-bold mb-2">{bootcamp.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{bootcamp.description}</p>
                    </CardHeader>

                    <CardContent className="p-0 space-y-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span>{bootcamp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{bootcamp.students} students</span>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Topics Covered:</div>
                        <div className="flex flex-wrap gap-2">
                          {bootcamp.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">What You'll Learn:</div>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {bootcamp.outcomes.map((outcome, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-4">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground">Next cohort starts</div>
                          <div className="font-semibold">{bootcamp.nextStart}</div>
                        </div>
                        <Button className="bg-accent hover:bg-accent/90">Apply Now</Button>
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
