import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function InternshipsLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 24px", width: "100%" }}>
        <Skeleton className="h-10 w-52 mb-2" />
        <Skeleton className="h-5 w-80 mb-10" />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: 24, border: "1px solid #e0ddd6", borderRadius: 8 }}>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div style={{ display: "flex", gap: 8 }}>
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
