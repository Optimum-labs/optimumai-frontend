import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function BootcampsLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 24px", width: "100%" }}>
        <Skeleton className="h-10 w-56 mb-2" />
        <Skeleton className="h-5 w-80 mb-10" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: 24, border: "1px solid #e0ddd6", borderRadius: 8 }}>
              <Skeleton className="h-40 w-full mb-4 rounded" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-10 w-32 rounded" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
