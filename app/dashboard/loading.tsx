import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--paper)" }}>
      <Header />
      <main style={{ flex: 1, maxWidth: 1100, margin: "0 auto", padding: "48px 24px", width: "100%" }}>
        {/* Profile header skeleton */}
        <div style={{ display: "flex", gap: 24, marginBottom: 40, alignItems: "center" }}>
          <Skeleton className="h-16 w-16 rounded-full" />
          <div style={{ flex: 1 }}>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        {/* Stats grid skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: 20, border: "1px solid #e0ddd6", borderRadius: 8 }}>
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-8 w-12" />
            </div>
          ))}
        </div>

        {/* Content sections skeleton */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ padding: 16, border: "1px solid #e0ddd6", borderRadius: 8, marginBottom: 12 }}>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ padding: 12, marginBottom: 8 }}>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
