import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function CourseDetailLoading() {
  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">
          {/* Breadcrumb */}
          <div style={{ marginBottom: "32px" }}>
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Hero */}
          <section style={{ marginBottom: "48px" }}>
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-28" />
            </div>
            <Skeleton className="h-10 w-96 mb-4" />
            <Skeleton className="h-4 w-full max-w-[700px] mb-2" />
            <Skeleton className="h-4 w-3/4 max-w-[500px]" />
          </section>

          {/* Tags */}
          <section style={{ marginBottom: "48px" }}>
            <Skeleton className="h-px w-full mb-4" />
            <div style={{ display: "flex", gap: "6px" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-20" />
              ))}
            </div>
          </section>

          {/* Enrollment form */}
          <section style={{ marginBottom: "64px" }}>
            <Skeleton className="h-px w-full mb-6" />
            <div style={{ padding: "32px", border: "1px solid #e0ddd6", maxWidth: "480px" }}>
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full mb-3" />
              <Skeleton className="h-10 w-full" />
            </div>
          </section>

          {/* Related */}
          <section style={{ marginBottom: "64px" }}>
            <Skeleton className="h-px w-full mb-6" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} style={{ padding: "24px", border: "1px solid #e0ddd6" }}>
                  <Skeleton className="h-6 w-20 mb-3" />
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-12 w-full mb-3" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
