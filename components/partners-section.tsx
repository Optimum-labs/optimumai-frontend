export function PartnersSection() {
  const partners = [
    { name: "TechCorp", logo: "T" },
    { name: "AI Labs", logo: "AI" },
    { name: "DataSys", logo: "DS" },
    { name: "Innovation", logo: "IN" },
    { name: "RoboTech", logo: "RT" },
    { name: "CloudAI", logo: "CA" },
    { name: "NeuroNet", logo: "NN" },
    { name: "Quantum", logo: "Q" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted by Leading Organizations</h2>
          <p className="text-muted-foreground">Partnering with innovators across 80+ countries</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center font-bold text-accent">
                {partner.logo}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
