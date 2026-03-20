import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--paper)" }}>
      {/* Sidebar skeleton */}
      <div style={{ width: 240, borderRight: "1px solid #e0ddd6", padding: 24 }}>
        <Skeleton className="h-7 w-32 mb-8" />
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full mb-2 rounded-md" />
        ))}
      </div>

      {/* Main content skeleton */}
      <div style={{ flex: 1, padding: 32 }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: 20, border: "1px solid #e0ddd6", borderRadius: 8 }}>
              <Skeleton className="h-4 w-24 mb-3" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div style={{ border: "1px solid #e0ddd6", borderRadius: 8, overflow: "hidden" }}>
          {/* Header row */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 16, padding: "12px 16px", borderBottom: "1px solid #e0ddd6" }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
          {/* Data rows */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr", gap: 16, padding: "12px 16px", borderBottom: "1px solid #e0ddd6" }}>
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
