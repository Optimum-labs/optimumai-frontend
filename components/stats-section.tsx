export function StatsSection() {
  const stats = [
    { value: "300+", label: "Partner Organizations" },
    { value: "1000+", label: "AI Developers" },
    { value: "50+", label: "Research Papers" },
    { value: "95%", label: "Job Placement Rate" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
