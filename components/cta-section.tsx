import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
          Ready to Transform Your AI Career?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Join thousands of practitioners building the future of AI through hands-on learning, collaborative research,
          and real-world experience.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
            Start Your Journey
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            Schedule a Call
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-6">No credit card required • Free resources available</p>
      </div>
    </section>
  )
}
