import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "OptimumAI - Leading AI Research & Innovation",
  description: "Advancing AI through collaborative research, groundbreaking products, and global community engagement.",
}

export default function Home() {
  const products = [
    {
      id: 1,
      title: "LLM Fine-tuning Platform",
      description: "State-of-the-art tools for fine-tuning large language models with minimal resources",
      image: "/ai-model-optimization.jpg",
      tags: ["LLM", "Fine-tuning", "NLP"],
    },
    {
      id: 2,
      title: "Vision AI Toolkit",
      description: "Comprehensive computer vision solutions for real-world applications",
      image: "/computer-vision-ai-technology.jpg",
      tags: ["Computer Vision", "Detection", "Segmentation"],
    },
    {
      id: 3,
      title: "Multimodal Research Suite",
      description: "Integrated tools for vision-language model research and development",
      image: "/multimodal-ai-vision-language.jpg",
      tags: ["Multimodal", "Vision-Language", "Research"],
    },
    {
      id: 4,
      title: "RAG Infrastructure",
      description: "Enterprise-grade retrieval-augmented generation systems",
      image: "/information-retrieval-system.jpg",
      tags: ["RAG", "Retrieval", "Enterprise"],
    },
  ]

  const stats = [
    { label: "Research Projects", value: "500+" },
    { label: "Active Researchers", value: "10K+" },
    { label: "Countries", value: "80+" },
    { label: "Published Papers", value: "250+" },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent">
                <Sparkles className="w-4 h-4" />
                <span>Pioneering AI Research</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                Transform AI Research Into
                <span className="block text-accent mt-2">Real-World Impact</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed">
                OptimumAI is at the forefront of AI innovation. We develop cutting-edge research products, publish groundbreaking papers, and foster a global community of AI pioneers.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Link href="/community">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
                    Explore Community
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  View Research
                </Button>
              </div>
            </div>

            <div className="relative h-96 lg:h-full rounded-2xl overflow-hidden">
              <Image
                src="/neural-network-architecture-visualization.jpg"
                alt="AI Research Visualization"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products/Research Highlight Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our AI Products & Research</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Cutting-edge tools and frameworks powering the next generation of AI applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button className="w-full gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why OptimumAI Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Choose OptimumAI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine research excellence with practical innovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Production-Ready</h3>
              <p className="text-muted-foreground">
                Our research directly translates to enterprise-grade products and tools.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Global Collaboration</h3>
              <p className="text-muted-foreground">
                Join a vibrant community of researchers and innovators worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold">Cutting-Edge</h3>
              <p className="text-muted-foreground">
                Access the latest breakthroughs in AI before they reach the mainstream.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Have questions about our research or products? We'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-muted-foreground">research@optimumai.com</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-muted-foreground">
                    San Francisco, CA
                    <br />
                    United States
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Connect With Us</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">Twitter</Button>
                    <Button variant="outline" size="sm">LinkedIn</Button>
                    <Button variant="outline" size="sm">GitHub</Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/ai-research-lab.png"
                alt="AI Research Lab"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">Join the AI Revolution</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Be part of a global movement shaping the future of artificial intelligence
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/community">
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Join Community
              </Button>
            </Link>
            <Link href="/research">
              <Button size="lg" variant="outline">
                Explore Research
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
