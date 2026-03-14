import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Shaping the Future of AI Innovation</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Advancing AI Through
            <span className="block text-accent mt-2">Collaborative Research</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Join a global community of AI researchers and innovators. Contribute to cutting-edge research projects,
            publish groundbreaking papers, and stay updated with the latest developments in AI and machine learning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              Explore Research
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">
              Join Community
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground mt-1">AI Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">80+</div>
              <div className="text-sm text-muted-foreground mt-1">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
