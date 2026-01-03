import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Users, Zap, Globe, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in education, research, and mentorship",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global network of AI practitioners who support each other",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge research and novel approaches",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making world-class AI education available to everyone, everywhere",
    },
    {
      icon: Award,
      title: "Impact",
      description: "Creating real-world solutions that benefit society and advance the field",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Operating with transparency, ethics, and respect for all participants",
    },
  ]

  const stats = [
    { value: "10,000+", label: "Students Trained" },
    { value: "150+", label: "Research Projects" },
    { value: "85%", label: "Job Placement Rate" },
    { value: "50+", label: "Partner Companies" },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">About OptimumAI</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Building the Future of AI Education</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            OptimumAI is a global platform connecting aspiring AI practitioners with world-class education, cutting-edge
            research opportunities, and career-launching internships.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 leading-relaxed">
              To democratize access to world-class AI education and create pathways for talented individuals to
              contribute to cutting-edge research and innovation. We believe that the next breakthrough in AI could come
              from anywhere, and we're committed to nurturing talent globally.
            </p>

            <Card className="bg-gradient-to-br from-accent/5 to-muted">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">What We Do</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">Intensive Bootcamps:</strong> We offer project-based training
                    programs that transform beginners into job-ready AI practitioners in weeks, covering everything from
                    deep learning foundations to advanced LLM engineering.
                  </p>
                  <p>
                    <strong className="text-foreground">Collaborative Research:</strong> Our research projects bring
                    together global teams to work on cutting-edge problems like building LLMs from scratch, fine-tuning
                    techniques, RAG systems, multimodal AI, and agentic systems.
                  </p>
                  <p>
                    <strong className="text-foreground">Career Opportunities:</strong> We connect our students with
                    exclusive internship opportunities at leading AI companies and research labs, with a high conversion
                    rate to full-time positions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4">
                      <value.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-br from-accent/10 to-background border-accent/20">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're just starting your AI journey or looking to contribute to cutting-edge research, we have
                opportunities for you to learn, grow, and make an impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  Explore Programs
                </Button>
                <Button size="lg" variant="outline">
                  Contact Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
