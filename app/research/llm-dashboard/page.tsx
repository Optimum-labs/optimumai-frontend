"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight, ChevronUp, ChevronDown, Info, SlidersHorizontal, LayoutGrid, List } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Capability = "text" | "code" | "vision" | "function-calling" | "streaming" | "json-mode" | "fine-tuning" | "embedding"

type LLM = {
  id: string
  name: string
  provider: string
  providerColor: string
  releaseDate: string
  parameters: string
  contextWindow: number
  contextLabel: string
  license: "Proprietary" | "Open-Source" | "Open-Weights"
  capabilities: Capability[]
  benchmarks: {
    mmlu?: number
    humanEval?: number
    gsm8k?: number
    math?: number
    hellaswag?: number
    arc?: number
  }
  pricing: {
    inputPer1M: number | null
    outputPer1M: number | null
    free?: boolean
  }
  description: string
  latency: "Fast" | "Medium" | "Slow"
  featured?: boolean
}

const llms: LLM[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    providerColor: "#10a37f",
    releaseDate: "May 2024",
    parameters: "~200B (estimated)",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Proprietary",
    capabilities: ["text", "code", "vision", "function-calling", "streaming", "json-mode", "fine-tuning"],
    benchmarks: { mmlu: 88.7, humanEval: 90.2, gsm8k: 97.0, math: 76.6, hellaswag: 95.7, arc: 96.7 },
    pricing: { inputPer1M: 5.0, outputPer1M: 15.0 },
    description: "OpenAI's flagship multimodal model. Combines text, vision, and audio processing in one unified model with strong reasoning and coding capabilities.",
    latency: "Fast",
    featured: true,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    providerColor: "#d4a96a",
    releaseDate: "Oct 2024",
    parameters: "~175B (estimated)",
    contextWindow: 200000,
    contextLabel: "200K",
    license: "Proprietary",
    capabilities: ["text", "code", "vision", "function-calling", "streaming", "json-mode"],
    benchmarks: { mmlu: 88.3, humanEval: 92.0, gsm8k: 96.4, math: 71.1, hellaswag: 95.4 },
    pricing: { inputPer1M: 3.0, outputPer1M: 15.0 },
    description: "Anthropic's most capable model. Exceptional at coding, analysis, and complex reasoning with a 200K context window and strong safety alignment.",
    latency: "Fast",
    featured: true,
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    providerColor: "#4285f4",
    releaseDate: "Feb 2024",
    parameters: "~170B (estimated)",
    contextWindow: 1000000,
    contextLabel: "1M",
    license: "Proprietary",
    capabilities: ["text", "code", "vision", "function-calling", "streaming", "json-mode", "embedding"],
    benchmarks: { mmlu: 85.9, humanEval: 84.1, gsm8k: 91.7, math: 58.5, hellaswag: 87.2 },
    pricing: { inputPer1M: 3.5, outputPer1M: 10.5 },
    description: "Google's multimodal model with an industry-leading 1M token context window. Excellent for long-document analysis, video understanding, and cross-modal reasoning.",
    latency: "Medium",
    featured: true,
  },
  {
    id: "llama-3-1-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    providerColor: "#0866ff",
    releaseDate: "Jul 2024",
    parameters: "70B",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Open-Weights",
    capabilities: ["text", "code", "function-calling", "streaming", "json-mode", "fine-tuning"],
    benchmarks: { mmlu: 83.6, humanEval: 80.5, gsm8k: 95.1, math: 68.0, hellaswag: 89.6 },
    pricing: { inputPer1M: 0.88, outputPer1M: 0.88 },
    description: "Meta's open-weights flagship model. Best open-source performance at 70B scale, competitive with leading proprietary models on many benchmarks.",
    latency: "Fast",
  },
  {
    id: "mistral-large-2",
    name: "Mistral Large 2",
    provider: "Mistral AI",
    providerColor: "#ff6b35",
    releaseDate: "Jul 2024",
    parameters: "123B",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Open-Weights",
    capabilities: ["text", "code", "function-calling", "streaming", "json-mode", "fine-tuning"],
    benchmarks: { mmlu: 84.0, humanEval: 92.0, gsm8k: 93.0, math: 69.0 },
    pricing: { inputPer1M: 3.0, outputPer1M: 9.0 },
    description: "Mistral's flagship model. Strong multilingual capabilities and excellent function-calling performance. Available open-weights for enterprise deployment.",
    latency: "Fast",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    providerColor: "#1a1a2e",
    releaseDate: "Dec 2024",
    parameters: "671B MoE (37B active)",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Open-Weights",
    capabilities: ["text", "code", "function-calling", "streaming", "json-mode"],
    benchmarks: { mmlu: 88.5, humanEval: 89.1, gsm8k: 97.1, math: 79.8 },
    pricing: { inputPer1M: 0.27, outputPer1M: 1.10 },
    description: "DeepSeek's mixture-of-experts model that achieves GPT-4o level performance at a fraction of the cost. Exceptional coding and math capabilities.",
    latency: "Fast",
    featured: true,
  },
  {
    id: "qwen-2-5-72b",
    name: "Qwen 2.5 72B",
    provider: "Alibaba",
    providerColor: "#ff6a00",
    releaseDate: "Sep 2024",
    parameters: "72B",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Open-Weights",
    capabilities: ["text", "code", "function-calling", "streaming", "json-mode", "fine-tuning"],
    benchmarks: { mmlu: 86.0, humanEval: 87.2, gsm8k: 95.5, math: 75.5 },
    pricing: { inputPer1M: 0.50, outputPer1M: 1.50 },
    description: "Alibaba's leading open-weights model with exceptional multilingual capabilities, strong coding performance, and impressive math reasoning.",
    latency: "Fast",
  },
  {
    id: "grok-2",
    name: "Grok-2",
    provider: "xAI",
    providerColor: "#000000",
    releaseDate: "Aug 2024",
    parameters: "~314B (estimated)",
    contextWindow: 131072,
    contextLabel: "128K",
    license: "Proprietary",
    capabilities: ["text", "code", "vision", "function-calling", "streaming"],
    benchmarks: { mmlu: 87.5, humanEval: 88.4, gsm8k: 92.0, math: 76.1 },
    pricing: { inputPer1M: 2.0, outputPer1M: 10.0 },
    description: "xAI's advanced reasoning model with real-time web access and knowledge of recent events. Strong at math, science, and complex multi-step reasoning.",
    latency: "Medium",
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    providerColor: "#39cdbe",
    releaseDate: "Apr 2024",
    parameters: "104B",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Proprietary",
    capabilities: ["text", "code", "function-calling", "streaming", "json-mode", "embedding"],
    benchmarks: { mmlu: 75.7, humanEval: 71.7, gsm8k: 85.5 },
    pricing: { inputPer1M: 2.5, outputPer1M: 10.0 },
    description: "Cohere's enterprise-grade model optimised for RAG, grounded generation, and multi-step tool use with excellent citation and retrieval accuracy.",
    latency: "Fast",
  },
  {
    id: "llama-3-2-90b-vision",
    name: "Llama 3.2 90B Vision",
    provider: "Meta",
    providerColor: "#0866ff",
    releaseDate: "Sep 2024",
    parameters: "90B",
    contextWindow: 128000,
    contextLabel: "128K",
    license: "Open-Weights",
    capabilities: ["text", "code", "vision", "function-calling", "streaming", "fine-tuning"],
    benchmarks: { mmlu: 86.0, humanEval: 72.0, gsm8k: 92.5 },
    pricing: { inputPer1M: 0.88, outputPer1M: 0.88 },
    description: "Meta's open-weights multimodal model bringing vision capabilities to the Llama family. Strong image understanding and document analysis.",
    latency: "Medium",
  },
  {
    id: "phi-4",
    name: "Phi-4",
    provider: "Microsoft",
    providerColor: "#00bcf2",
    releaseDate: "Dec 2024",
    parameters: "14B",
    contextWindow: 16384,
    contextLabel: "16K",
    license: "Open-Weights",
    capabilities: ["text", "code", "streaming", "json-mode", "fine-tuning"],
    benchmarks: { mmlu: 84.8, humanEval: 82.6, gsm8k: 95.8, math: 80.4 },
    pricing: { inputPer1M: 0.07, outputPer1M: 0.14 },
    description: "Microsoft's small but mighty model. Phi-4's 14B parameters punch well above their weight class, especially on math and reasoning tasks.",
    latency: "Fast",
  },
]

const capabilityLabels: Record<Capability, string> = {
  "text": "Text",
  "code": "Code",
  "vision": "Vision",
  "function-calling": "Functions",
  "streaming": "Streaming",
  "json-mode": "JSON Mode",
  "fine-tuning": "Fine-Tuning",
  "embedding": "Embedding",
}

type SortKey = "mmlu" | "humanEval" | "gsm8k" | "math" | "context" | "price" | "params"

export default function LLMDashboardPage() {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")
  const [sortKey, setSortKey] = useState<SortKey>("mmlu")
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc")
  const [filterCapability, setFilterCapability] = useState<Capability | "all">("all")
  const [filterLicense, setFilterLicense] = useState<string>("all")
  const [filterProvider, setFilterProvider] = useState<string>("all")
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)

  const providers = Array.from(new Set(llms.map((m) => m.provider)))

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    )
  }

  const getSortValue = (m: LLM): number => {
    switch (sortKey) {
      case "mmlu": return m.benchmarks.mmlu ?? 0
      case "humanEval": return m.benchmarks.humanEval ?? 0
      case "gsm8k": return m.benchmarks.gsm8k ?? 0
      case "math": return m.benchmarks.math ?? 0
      case "context": return m.contextWindow
      case "price": return m.pricing.inputPer1M ?? 999
      case "params": return 0
    }
  }

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => d === "desc" ? "asc" : "desc")
    else { setSortKey(key); setSortDir("desc") }
  }

  const filtered = llms
    .filter((m) => filterCapability === "all" || m.capabilities.includes(filterCapability))
    .filter((m) => filterLicense === "all" || m.license === filterLicense)
    .filter((m) => filterProvider === "all" || m.provider === filterProvider)
    .sort((a, b) => {
      const av = getSortValue(a)
      const bv = getSortValue(b)
      return sortDir === "desc" ? bv - av : av - bv
    })

  const compareModels = llms.filter((m) => compareIds.includes(m.id))

  const ScoreBar = ({ score, max = 100 }: { score?: number; max?: number }) => {
    if (score == null) return <span style={{ color: "var(--muted-txt)", fontSize: "10px" }}>—</span>
    const pct = (score / max) * 100
    const color = score >= 90 ? "#2a7d4f" : score >= 75 ? "var(--gold)" : "var(--opt-red)"
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: 1, height: "4px", background: "rgba(10,10,10,0.08)", borderRadius: "2px" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: "2px" }} />
        </div>
        <span style={{ fontSize: "11px", fontFamily: "var(--font-dm-mono),monospace", color: "var(--ink)", minWidth: "36px" }}>{score}%</span>
      </div>
    )
  }

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} style={{ display: "flex", alignItems: "center", gap: "2px", fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", background: "none", border: "none", cursor: "pointer", color: sortKey === k ? "var(--ink)" : "var(--muted-txt)", fontWeight: sortKey === k ? 700 : 400, padding: "0", whiteSpace: "nowrap" }}>
      {label}
      {sortKey === k ? (sortDir === "desc" ? <ChevronDown size={10} /> : <ChevronUp size={10} />) : <ChevronDown size={10} style={{ opacity: 0.3 }} />}
    </button>
  )

  return (
    <>
      <Header />
      <main className="optimum-main">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="opt-page">

          {/* ── Hero ── */}
          <section className="opt-hero">
            <p className="opt-kicker opt-anim-1">LLM Intelligence Dashboard</p>
            <h1 className="opt-headline opt-anim-2">
              Compare Frontier<br /><em>AI Models</em>
            </h1>
            <p className="opt-sub opt-anim-3">
              Side-by-side benchmarks, capabilities, context windows, pricing, and parameters for every major LLM.
              Make informed decisions about which model to use for your use case.
            </p>
            <div className="opt-hero-cta opt-anim-4">
              <a href="#dashboard" className="opt-btn-primary">Explore Models <ArrowRight size={13} /></a>
              <Link href="/research" className="opt-btn-ghost">Research Hub</Link>
            </div>
          </section>

          {/* ── Stats ── */}
          <div className="opt-stats-bar opt-anim-5">
            {[
              { value: String(llms.length), label: "Models Tracked" },
              { value: "6",              label: "Benchmark Suites" },
              { value: "8",              label: "Capability Dimensions" },
              { value: "Live",           label: "Pricing Data" },
            ].map((s) => (
              <div key={s.label} className="opt-stat">
                <span className="opt-stat-value">{s.value}</span>
                <span className="opt-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── Benchmark Legend ── */}
          <div className="opt-rule"><span className="opt-rule-text">Benchmark Reference</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "48px" }}>
            {[
              { name: "MMLU", full: "Massive Multitask Language Understanding", desc: "57-subject academic benchmark covering STEM, humanities, law, and social sciences. Tests general knowledge breadth.", range: "0–100%" },
              { name: "HumanEval", full: "OpenAI HumanEval", desc: "Python coding benchmark. Measures ability to generate functionally correct code from docstring descriptions.", range: "0–100%" },
              { name: "GSM8K", full: "Grade School Math 8K", desc: "8,500 grade-school math word problems requiring multi-step reasoning to solve correctly.", range: "0–100%" },
              { name: "MATH", full: "MATH Benchmark", desc: "12,500 competition-level math problems from AMC/AIME. Tests advanced mathematical reasoning.", range: "0–100%" },
              { name: "HellaSwag", full: "HellaSwag NLI", desc: "Commonsense natural language inference. Tests ability to complete sentences in a contextually coherent way.", range: "0–100%" },
              { name: "ARC", full: "AI2 Reasoning Challenge", desc: "Science questions from 3rd–9th grade. Tests scientific reasoning and knowledge application.", range: "0–100%" },
            ].map((b, i) => (
              <div key={i} style={{ padding: "16px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", fontWeight: 700, color: "var(--ink)" }}>{b.name}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--gold)" }}>{b.range}</span>
                </div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)", marginBottom: "4px" }}>{b.full}</div>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.6, color: "var(--muted-txt)", margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Dashboard ── */}
          <div className="opt-rule" id="dashboard"><span className="opt-rule-text">Model Comparison Dashboard</span></div>

          {/* Filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "flex-start", marginBottom: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)" }}>Capability</label>
              <select value={filterCapability} onChange={(e) => setFilterCapability(e.target.value as Capability | "all")}
                style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", padding: "6px 10px", border: "1px solid rgba(10,10,10,0.2)", background: "transparent", color: "var(--ink)", borderRadius: "2px", cursor: "pointer" }}>
                <option value="all">All Capabilities</option>
                {Object.entries(capabilityLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)" }}>License</label>
              <select value={filterLicense} onChange={(e) => setFilterLicense(e.target.value)}
                style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", padding: "6px 10px", border: "1px solid rgba(10,10,10,0.2)", background: "transparent", color: "var(--ink)", borderRadius: "2px", cursor: "pointer" }}>
                <option value="all">All Licenses</option>
                <option value="Proprietary">Proprietary</option>
                <option value="Open-Weights">Open-Weights</option>
                <option value="Open-Source">Open-Source</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <label style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted-txt)" }}>Provider</label>
              <select value={filterProvider} onChange={(e) => setFilterProvider(e.target.value)}
                style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", padding: "6px 10px", border: "1px solid rgba(10,10,10,0.2)", background: "transparent", color: "var(--ink)", borderRadius: "2px", cursor: "pointer" }}>
                <option value="all">All Providers</option>
                {providers.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end", gap: "8px" }}>
              {compareIds.length > 0 && (
                <button onClick={() => setShowCompare(true)} className="opt-btn-primary" style={{ fontSize: "11px", padding: "8px 16px" }}>
                  Compare {compareIds.length} Models <ArrowRight size={11} />
                </button>
              )}
              <button onClick={() => setViewMode("table")} style={{ padding: "8px 10px", border: "1px solid", borderColor: viewMode === "table" ? "var(--ink)" : "rgba(10,10,10,0.2)", background: viewMode === "table" ? "var(--ink)" : "transparent", color: viewMode === "table" ? "var(--cream)" : "var(--muted-txt)", borderRadius: "2px", cursor: "pointer" }}>
                <List size={14} />
              </button>
              <button onClick={() => setViewMode("cards")} style={{ padding: "8px 10px", border: "1px solid", borderColor: viewMode === "cards" ? "var(--ink)" : "rgba(10,10,10,0.2)", background: viewMode === "cards" ? "var(--ink)" : "transparent", color: viewMode === "cards" ? "var(--cream)" : "var(--muted-txt)", borderRadius: "2px", cursor: "pointer" }}>
                <LayoutGrid size={14} />
              </button>
            </div>
          </div>

          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "16px" }}>
            {filtered.length} model{filtered.length !== 1 ? "s" : ""} · Select up to 3 to compare side-by-side
          </p>

          {/* ── Table View ── */}
          {viewMode === "table" && (
            <div style={{ overflowX: "auto", marginBottom: "48px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(10,10,10,0.15)" }}>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--muted-txt)", fontWeight: 400, whiteSpace: "nowrap" }}>Model</th>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--muted-txt)", fontWeight: 400 }}>Provider</th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="mmlu" label="MMLU" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="humanEval" label="HumanEval" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="gsm8k" label="GSM8K" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="math" label="MATH" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="context" label="Context" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}>Params</th>
                    <th style={{ textAlign: "left", padding: "10px 12px" }}><SortBtn k="price" label="$/1M in" /></th>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--muted-txt)", fontWeight: 400 }}>License</th>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--muted-txt)", fontWeight: 400 }}>Compare</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => {
                    const isComparing = compareIds.includes(m.id)
                    return (
                      <tr key={m.id} style={{ borderBottom: "1px solid rgba(10,10,10,0.06)", background: isComparing ? "rgba(212,169,106,0.05)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.3)" }}>
                        <td style={{ padding: "12px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: m.providerColor, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap" }}>{m.name}</div>
                              {m.featured && <div style={{ fontSize: "9px", color: "var(--gold)" }}>★ Featured</div>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "12px 12px", color: "var(--muted-txt)", whiteSpace: "nowrap" }}>{m.provider}</td>
                        <td style={{ padding: "12px 12px" }}>
                          {m.benchmarks.mmlu != null ? <span style={{ color: m.benchmarks.mmlu >= 88 ? "#2a7d4f" : m.benchmarks.mmlu >= 80 ? "var(--gold)" : "var(--muted-txt)", fontWeight: m.benchmarks.mmlu >= 88 ? 700 : 400 }}>{m.benchmarks.mmlu}%</span> : <span style={{ color: "var(--muted-txt)" }}>—</span>}
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          {m.benchmarks.humanEval != null ? <span style={{ color: m.benchmarks.humanEval >= 88 ? "#2a7d4f" : m.benchmarks.humanEval >= 75 ? "var(--gold)" : "var(--muted-txt)", fontWeight: m.benchmarks.humanEval >= 88 ? 700 : 400 }}>{m.benchmarks.humanEval}%</span> : <span style={{ color: "var(--muted-txt)" }}>—</span>}
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          {m.benchmarks.gsm8k != null ? <span style={{ color: m.benchmarks.gsm8k >= 95 ? "#2a7d4f" : m.benchmarks.gsm8k >= 88 ? "var(--gold)" : "var(--muted-txt)", fontWeight: m.benchmarks.gsm8k >= 95 ? 700 : 400 }}>{m.benchmarks.gsm8k}%</span> : <span style={{ color: "var(--muted-txt)" }}>—</span>}
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          {m.benchmarks.math != null ? <span style={{ color: m.benchmarks.math >= 75 ? "#2a7d4f" : m.benchmarks.math >= 60 ? "var(--gold)" : "var(--muted-txt)" }}>{m.benchmarks.math}%</span> : <span style={{ color: "var(--muted-txt)" }}>—</span>}
                        </td>
                        <td style={{ padding: "12px 12px", whiteSpace: "nowrap" }}>
                          <span style={{ fontWeight: 700, color: m.contextWindow >= 500000 ? "#2a7d4f" : m.contextWindow >= 100000 ? "var(--gold)" : "var(--muted-txt)" }}>{m.contextLabel}</span>
                        </td>
                        <td style={{ padding: "12px 12px", color: "var(--muted-txt)", whiteSpace: "nowrap" }}>{m.parameters}</td>
                        <td style={{ padding: "12px 12px", whiteSpace: "nowrap" }}>
                          {m.pricing.inputPer1M != null ? (
                            <span style={{ color: m.pricing.inputPer1M <= 1 ? "#2a7d4f" : m.pricing.inputPer1M <= 3.5 ? "var(--gold)" : "var(--muted-txt)" }}>${m.pricing.inputPer1M.toFixed(2)}</span>
                          ) : "Free"}
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          <span style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 7px", background: m.license === "Open-Weights" || m.license === "Open-Source" ? "rgba(42,125,79,0.1)" : "rgba(10,10,10,0.06)", borderRadius: "2px", color: m.license === "Open-Weights" || m.license === "Open-Source" ? "#2a7d4f" : "var(--muted-txt)", whiteSpace: "nowrap" }}>
                            {m.license}
                          </span>
                        </td>
                        <td style={{ padding: "12px 12px" }}>
                          <button onClick={() => toggleCompare(m.id)} style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", padding: "4px 10px", border: "1px solid", borderColor: isComparing ? "var(--gold)" : "rgba(10,10,10,0.2)", background: isComparing ? "rgba(212,169,106,0.1)" : "transparent", color: isComparing ? "var(--gold)" : "var(--muted-txt)", borderRadius: "2px", cursor: compareIds.length >= 3 && !isComparing ? "not-allowed" : "pointer", opacity: compareIds.length >= 3 && !isComparing ? 0.4 : 1 }}>
                            {isComparing ? "✓ Added" : "+ Add"}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Card View ── */}
          {viewMode === "cards" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginBottom: "48px" }}>
              {filtered.map((m) => {
                const isComparing = compareIds.includes(m.id)
                return (
                  <div key={m.id} style={{ padding: "24px", border: `1px solid ${isComparing ? "var(--gold)" : "rgba(10,10,10,0.1)"}`, background: isComparing ? "rgba(212,169,106,0.04)" : "rgba(255,255,255,0.4)", transition: "border-color 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: m.providerColor, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "16px", fontWeight: 700, color: "var(--ink)" }}>{m.name}</div>
                          <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{m.provider} · {m.releaseDate}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 7px", background: m.license === "Open-Weights" || m.license === "Open-Source" ? "rgba(42,125,79,0.1)" : "rgba(10,10,10,0.06)", borderRadius: "2px", color: m.license === "Open-Weights" || m.license === "Open-Source" ? "#2a7d4f" : "var(--muted-txt)" }}>
                        {m.license}
                      </span>
                    </div>

                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", marginBottom: "16px" }}>{m.description}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "14px" }}>
                      {[
                        { label: "Context", value: m.contextLabel, highlight: m.contextWindow >= 500000 },
                        { label: "Params", value: m.parameters, highlight: false },
                        { label: "$/1M in", value: m.pricing.inputPer1M != null ? `$${m.pricing.inputPer1M.toFixed(2)}` : "Free", highlight: (m.pricing.inputPer1M ?? 999) <= 1 },
                        { label: "$/1M out", value: m.pricing.outputPer1M != null ? `$${m.pricing.outputPer1M.toFixed(2)}` : "Free", highlight: false },
                      ].map((item, i) => (
                        <div key={i} style={{ padding: "8px 10px", background: "rgba(10,10,10,0.03)", borderRadius: "2px" }}>
                          <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                          <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "12px", fontWeight: 700, color: item.highlight ? "#2a7d4f" : "var(--ink)" }}>{item.value}</div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: "14px" }}>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>Benchmarks</div>
                      {[
                        { label: "MMLU", val: m.benchmarks.mmlu },
                        { label: "HumanEval", val: m.benchmarks.humanEval },
                        { label: "GSM8K", val: m.benchmarks.gsm8k },
                        { label: "MATH", val: m.benchmarks.math },
                      ].map((b, i) => b.val != null && (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "70px 1fr", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)" }}>{b.label}</span>
                          <ScoreBar score={b.val} />
                        </div>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "14px" }}>
                      {m.capabilities.map((cap, ci) => (
                        <span key={ci} style={{ fontSize: "9px", fontFamily: "var(--font-dm-mono),monospace", padding: "2px 7px", background: "rgba(10,10,10,0.05)", borderRadius: "2px", color: "var(--muted-txt)" }}>
                          {capabilityLabels[cap]}
                        </span>
                      ))}
                    </div>

                    <button onClick={() => toggleCompare(m.id)} style={{ width: "100%", fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", padding: "9px 16px", border: "1px solid", borderColor: isComparing ? "var(--gold)" : "rgba(10,10,10,0.2)", background: isComparing ? "rgba(212,169,106,0.1)" : "transparent", color: isComparing ? "var(--gold)" : "var(--muted-txt)", borderRadius: "2px", cursor: compareIds.length >= 3 && !isComparing ? "not-allowed" : "pointer", transition: "all 0.15s", opacity: compareIds.length >= 3 && !isComparing ? 0.4 : 1 }}>
                      {isComparing ? "✓ Added to Compare" : "+ Add to Compare"}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Comparison Modal ── */}
          {showCompare && compareModels.length > 0 && (
            <div style={{ position: "fixed", inset: 0, background: "rgba(10,10,10,0.7)", zIndex: 1000, overflow: "auto", padding: "24px" }}>
              <div style={{ background: "var(--cream)", padding: "40px", maxWidth: "900px", margin: "0 auto", position: "relative" }}>
                <button onClick={() => setShowCompare(false)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "var(--muted-txt)", fontSize: "22px" }}>×</button>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "8px" }}>Side-by-Side Comparison</p>
                <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "24px", fontWeight: 700, color: "var(--ink)", marginBottom: "28px" }}>
                  {compareModels.map((m) => m.name).join(" vs ")}
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: `repeat(${compareModels.length}, 1fr)`, gap: "16px", marginBottom: "24px" }}>
                  {compareModels.map((m) => (
                    <div key={m.id} style={{ padding: "20px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.5)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: m.providerColor }} />
                        <div>
                          <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>{m.name}</div>
                          <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{m.provider}</div>
                        </div>
                      </div>
                      <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", marginBottom: "16px" }}>{m.description}</p>
                      {[
                        { label: "MMLU", val: m.benchmarks.mmlu != null ? `${m.benchmarks.mmlu}%` : "—" },
                        { label: "HumanEval", val: m.benchmarks.humanEval != null ? `${m.benchmarks.humanEval}%` : "—" },
                        { label: "GSM8K", val: m.benchmarks.gsm8k != null ? `${m.benchmarks.gsm8k}%` : "—" },
                        { label: "MATH", val: m.benchmarks.math != null ? `${m.benchmarks.math}%` : "—" },
                        { label: "Context", val: m.contextLabel },
                        { label: "Parameters", val: m.parameters },
                        { label: "Input $/1M", val: m.pricing.inputPer1M != null ? `$${m.pricing.inputPer1M.toFixed(2)}` : "Free" },
                        { label: "Output $/1M", val: m.pricing.outputPer1M != null ? `$${m.pricing.outputPer1M.toFixed(2)}` : "Free" },
                        { label: "License", val: m.license },
                        { label: "Latency", val: m.latency },
                      ].map((row, ri) => (
                        <div key={ri} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: "8px", marginBottom: "6px", padding: "5px 0", borderBottom: "1px solid rgba(10,10,10,0.05)" }}>
                          <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)" }}>{row.label}</span>
                          <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", fontWeight: 600, color: "var(--ink)" }}>{row.val}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowCompare(false)} className="opt-btn-ghost" style={{ fontSize: "12px" }}>Close Comparison</button>
              </div>
            </div>
          )}

          {/* ── Notes ── */}
          <div style={{ padding: "20px 24px", border: "1px solid rgba(10,10,10,0.08)", background: "rgba(255,255,255,0.3)", marginBottom: "64px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <Info size={14} style={{ color: "var(--muted-txt)", flexShrink: 0, marginTop: "2px" }} />
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", margin: 0 }}>
              Benchmarks are latest publicly reported scores from official model cards, academic papers, and provider documentation as of March 2026. Parameter counts are estimates where not officially disclosed. Pricing reflects API rates at time of publication and may change. For the most current data, always refer to the provider&apos;s official documentation.
            </p>
          </div>

          {/* ── Rankings ── */}
          <div className="opt-rule"><span className="opt-rule-text">Model Rankings</span></div>
          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "28px", lineHeight: 1.7 }}>
            Top models ranked per benchmark. Green = world-class · Gold = strong · Grey = good. Higher is always better.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "64px" }}>
            {[
              {
                title: "🧠 General Intelligence (MMLU)",
                subtitle: "57-subject academic breadth",
                rows: [
                  { rank: 1, name: "GPT-4o",           score: 88.7, color: "#10a37f" },
                  { rank: 2, name: "DeepSeek-V3",       score: 88.5, color: "#1a1a2e" },
                  { rank: 3, name: "Claude 3.5 Sonnet", score: 88.3, color: "#d4a96a" },
                  { rank: 4, name: "Grok-2",            score: 87.5, color: "#000000" },
                  { rank: 5, name: "Mistral Large 2",   score: 84.0, color: "#ff6b35" },
                ],
              },
              {
                title: "💻 Coding (HumanEval)",
                subtitle: "Python function generation",
                rows: [
                  { rank: 1, name: "Claude 3.5 Sonnet", score: 92.0, color: "#d4a96a" },
                  { rank: 2, name: "Mistral Large 2",   score: 92.0, color: "#ff6b35" },
                  { rank: 3, name: "GPT-4o",            score: 90.2, color: "#10a37f" },
                  { rank: 4, name: "DeepSeek-V3",       score: 89.1, color: "#1a1a2e" },
                  { rank: 5, name: "Grok-2",            score: 88.4, color: "#000000" },
                ],
              },
              {
                title: "➗ Math Reasoning (GSM8K)",
                subtitle: "Grade-school word problems",
                rows: [
                  { rank: 1, name: "GPT-4o",            score: 97.0, color: "#10a37f" },
                  { rank: 2, name: "DeepSeek-V3",        score: 97.1, color: "#1a1a2e" },
                  { rank: 3, name: "Phi-4",              score: 95.8, color: "#00bcf2" },
                  { rank: 4, name: "Claude 3.5 Sonnet",  score: 96.4, color: "#d4a96a" },
                  { rank: 5, name: "Qwen 2.5 72B",       score: 95.5, color: "#ff6a00" },
                ],
              },
              {
                title: "💰 Best Value (Quality ÷ Price)",
                subtitle: "Top MMLU score per dollar",
                rows: [
                  { rank: 1, name: "DeepSeek-V3",       score: null, note: "$0.27/1M · 88.5% MMLU", color: "#1a1a2e" },
                  { rank: 2, name: "Phi-4",             score: null, note: "$0.07/1M · 84.8% MMLU", color: "#00bcf2" },
                  { rank: 3, name: "Qwen 2.5 72B",      score: null, note: "$0.50/1M · 86.0% MMLU", color: "#ff6a00" },
                  { rank: 4, name: "Llama 3.1 70B",     score: null, note: "$0.88/1M · 83.6% MMLU", color: "#0866ff" },
                  { rank: 5, name: "Claude 3.5 Sonnet", score: null, note: "$3.00/1M · 88.3% MMLU", color: "#d4a96a" },
                ],
              },
            ].map((cat, ci) => (
              <div key={ci} style={{ padding: "22px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.35)" }}>
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "15px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>{cat.title}</div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat.subtitle}</div>
                {cat.rows.map((row, ri) => (
                  <div key={ri} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: row.rank === 1 ? "#2a7d4f" : row.rank === 2 ? "var(--gold)" : "var(--muted-txt)", minWidth: "18px" }}>
                      #{row.rank}
                    </span>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--ink)", flex: 1 }}>{row.name}</span>
                    {row.score != null ? (
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: row.score >= 95 ? "#2a7d4f" : row.score >= 88 ? "var(--gold)" : "var(--muted-txt)" }}>
                        {row.score}%
                      </span>
                    ) : (
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)" }}>{row.note}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ── Trending Research Topics ── */}
          <div className="opt-rule"><span className="opt-rule-text">Trending in AI Research — 2026</span></div>
          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "28px", lineHeight: 1.7 }}>
            The hottest areas researchers and engineers are actively publishing, debating, and building in right now.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px", marginBottom: "64px" }}>
            {[
              { emoji: "🤖", tag: "HOT", title: "Agentic AI & Multi-Agent Systems", desc: "Building AI that plans, uses tools, and completes long tasks autonomously. Think mini-teams of AI workers that can browse the web, write code, and call APIs.", heat: 5 },
              { emoji: "🧩", tag: "RISING", title: "Reasoning Models (Chain-of-Thought)", desc: "Models like o1/o3 that think step-by-step before answering. Massively improves accuracy on math, logic, and multi-step coding tasks.", heat: 5 },
              { emoji: "📚", tag: "HOT", title: "Long Context & Memory", desc: "Models with 500K–1M token windows that can read entire codebases or books at once. Solving the \"the model forgot\" problem for ever.", heat: 4 },
              { emoji: "🔍", tag: "RISING", title: "RAG 2.0 — Smarter Retrieval", desc: "Going beyond basic vector search: hybrid retrieval, re-ranking, agentic document parsing, and real-time knowledge grounding.", heat: 4 },
              { emoji: "🏃", tag: "HOT", title: "Open Source vs Proprietary", desc: "Llama 3.1, DeepSeek-V3, Qwen 2.5 are now nearly matching GPT-4o at 1/10th the cost. Open-weights models are closing the gap fast.", heat: 5 },
              { emoji: "🗜️", tag: "GROWING", title: "Model Compression & Edge AI", desc: "Quantization, pruning, and distillation to run powerful models on laptops and phones. Phi-4 (14B) outperforms many 70B models.", heat: 4 },
              { emoji: "🌐", tag: "GROWING", title: "Multimodal Foundation Models", desc: "Models that see, hear, speak, and read images natively. GPT-4o, Gemini 1.5, Llama 3.2 Vision unify all modalities in one model.", heat: 4 },
              { emoji: "🛡️", tag: "CRITICAL", title: "AI Safety & Alignment", desc: "Red-teaming, constitutional AI, and RLHF to make models honest and safe. Increasingly required by enterprise buyers and regulators.", heat: 3 },
            ].map((t, i) => (
              <div key={i} style={{ padding: "20px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ fontSize: "22px" }}>{t.emoji}</span>
                  <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", padding: "2px 8px", background: t.tag === "HOT" || t.tag === "CRITICAL" ? "rgba(208,66,66,0.1)" : "rgba(212,169,106,0.1)", color: t.tag === "HOT" || t.tag === "CRITICAL" ? "var(--opt-red)" : "var(--gold)", borderRadius: "2px", letterSpacing: "0.06em" }}>
                    {t.tag}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "14px", fontWeight: 700, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.3 }}>{t.title}</div>
                <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", lineHeight: 1.7, color: "var(--muted-txt)", margin: "0 0 12px" }}>{t.desc}</p>
                <div style={{ display: "flex", gap: "3px" }}>
                  {Array.from({ length: 5 }).map((_, hi) => (
                    <div key={hi} style={{ width: "18px", height: "4px", borderRadius: "2px", background: hi < t.heat ? "var(--opt-red)" : "rgba(10,10,10,0.08)" }} />
                  ))}
                  <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", marginLeft: "6px" }}>heat</span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Open-Source Platform Guide ── */}
          <div className="opt-rule"><span className="opt-rule-text">Build with Open Source AI</span></div>
          <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", marginBottom: "32px", lineHeight: 1.7 }}>
            The essential tools every AI builder needs. Pick the right platform for your project — explained plainly, with starter code.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "64px" }}>
            {[
              {
                name: "Ollama",
                badge: "Run Locally",
                badgeColor: "#2a7d4f",
                emoji: "🦙",
                tagline: "Run any open-source LLM on your own Mac or PC — no cloud needed, no API bill.",
                bestFor: "Privacy-first apps, offline use, rapid prototyping without cost",
                install: "brew install ollama && ollama run llama3.1",
                code:
`# Pull a model and chat instantly
ollama run llama3.1

# Use from Python
import ollama
response = ollama.chat(model='llama3.1', messages=[
    {'role': 'user', 'content': 'Explain RAG in simple terms'}
])
print(response['message']['content'])`,
              },
              {
                name: "HuggingFace",
                badge: "Model Hub",
                badgeColor: "#ff6b35",
                emoji: "🤗",
                tagline: "The GitHub of AI — 500K+ open models, datasets, and Spaces. Download, fine-tune, and deploy anything.",
                bestFor: "Finding models, fine-tuning, hosting demos, sharing research",
                install: "pip install transformers torch",
                code:
`from transformers import pipeline

# Load any model from the hub in 2 lines
classifier = pipeline("text-classification",
    model="distilbert-base-uncased-finetuned-sst-2-english")

result = classifier("This research paper is excellent!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]`,
              },
              {
                name: "LangChain",
                badge: "LLM Framework",
                badgeColor: "#1c7c5d",
                emoji: "⛓️",
                tagline: "Build LLM-powered apps that chain prompts, tools, memory, and retrieval together. Works with any model.",
                bestFor: "Chatbots with memory, document Q&A, multi-step pipelines, RAG",
                install: "pip install langchain langchain-openai",
                code:
`from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain_community.vectorstores import FAISS

# Build a document Q&A chatbot in minutes
llm = ChatOpenAI(model="gpt-4o-mini")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm, retriever=vectorstore.as_retriever()
)
answer = qa_chain.invoke("What does the paper conclude?")`,
              },
              {
                name: "CrewAI",
                badge: "Multi-Agent",
                badgeColor: "#7c3aed",
                emoji: "👥",
                tagline: "Build teams of AI agents that talk to each other and collaborate on complex tasks — like having a mini startup inside your code.",
                bestFor: "Research workflows, automated content, data pipelines, autonomous teams",
                install: "pip install crewai",
                code:
`from crewai import Agent, Task, Crew

researcher = Agent(role="AI Researcher",
    goal="Find the latest LLM benchmark results",
    backstory="Expert at reading papers and extracting key findings")

writer = Agent(role="Technical Writer",
    goal="Write a clear summary for engineers",
    backstory="Explains complex AI research in plain English")

task = Task(description="Summarise GPT-4o vs Claude benchmarks",
    agent=researcher)

crew = Crew(agents=[researcher, writer], tasks=[task])
result = crew.kickoff()`,
              },
              {
                name: "OpenAI SDK",
                badge: "GPT / Automation",
                badgeColor: "#10a37f",
                emoji: "🟢",
                tagline: "The official Python/Node SDK for GPT-4o, DALL·E, and Whisper. Perfect for production automation workflows.",
                bestFor: "GPT-4o apps, code automation, structured outputs, batch jobs",
                install: "pip install openai",
                code:
`from openai import OpenAI

client = OpenAI()  # reads OPENAI_API_KEY from env

# Structured JSON output — great for automation
response = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},
    messages=[{"role": "user",
               "content": "List top 3 AI trends as JSON array"}]
)
print(response.choices[0].message.content)`,
              },
              {
                name: "Anthropic SDK",
                badge: "Claude / Automation",
                badgeColor: "#d4a96a",
                emoji: "🟠",
                tagline: "Build with Claude 3.5 Sonnet — best for long documents, complex coding, and safe enterprise automation.",
                bestFor: "Document analysis, safe automation, coding assistants, long context tasks",
                install: "pip install anthropic",
                code:
`import anthropic

client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY

# 200K context — send a whole codebase
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=1024,
    messages=[{"role": "user",
               "content": "Review this code for security issues:\\n" + code}]
)
print(message.content[0].text)`,
              },
            ].map((p, pi) => (
              <div key={pi} style={{ border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.35)" }}>
                {/* Header */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(10,10,10,0.07)", display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "24px" }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "3px" }}>
                      <span style={{ fontFamily: "var(--font-playfair),serif", fontSize: "18px", fontWeight: 700, color: "var(--ink)" }}>{p.name}</span>
                      <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", padding: "2px 8px", background: `${p.badgeColor}18`, color: p.badgeColor, borderRadius: "2px", letterSpacing: "0.06em" }}>{p.badge}</span>
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", color: "var(--muted-txt)", margin: 0, lineHeight: 1.6 }}>{p.tagline}</p>
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--muted-txt)", minWidth: "180px" }}>
                    <span style={{ color: "var(--ink)", fontWeight: 700 }}>Best for: </span>{p.bestFor}
                  </div>
                </div>
                {/* Code */}
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0" }}>
                  <div style={{ padding: "14px 16px", borderRight: "1px solid rgba(10,10,10,0.07)", background: "rgba(10,10,10,0.02)" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Install</div>
                    <code style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: p.badgeColor, whiteSpace: "nowrap" }}>
                      {p.install}
                    </code>
                  </div>
                  <div style={{ padding: "14px 18px", background: "rgba(10,10,10,0.025)", overflowX: "auto" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Starter Code</div>
                    <pre style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--ink)", margin: 0, lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {p.code}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Agentic AI Concept Strip ── */}
          <div style={{ padding: "32px 36px", border: "1px solid rgba(10,10,10,0.1)", background: "rgba(255,255,255,0.3)", marginBottom: "64px" }}>
            <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "10px" }}>How agentic AI works — simply</p>
            <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "22px", fontWeight: 700, color: "var(--ink)", marginBottom: "20px" }}>
              The Agentic AI Stack Explained in Plain English
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "0" }}>
              {[
                { step: "1", label: "LLM Brain",      tool: "GPT-4o / Claude / Llama", desc: "The model that reasons, plans, and decides what to do next." },
                { step: "→" },
                { step: "2", label: "Orchestration",  tool: "LangChain / CrewAI",       desc: "Manages memory, chains steps together, and routes tasks between agents." },
                { step: "→" },
                { step: "3", label: "Local Inference", tool: "Ollama / HuggingFace",     desc: "Run open models privately on your own hardware — no cloud bill." },
                { step: "→" },
                { step: "4", label: "Tools & APIs",   tool: "Search, Code, Databases",  desc: "Agents browse the web, write & run code, and read your documents." },
                { step: "→" },
                { step: "5", label: "Output",         tool: "Answer / Action / Report",  desc: "The final result: a written report, a working app, an automated task." },
              ].map((s, si) =>
                s.label ? (
                  <div key={si} style={{ padding: "14px 16px", borderRight: si < 8 ? "1px solid rgba(10,10,10,0.07)" : "none" }}>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "18px", fontWeight: 700, color: "rgba(10,10,10,0.06)", marginBottom: "4px" }}>{s.step}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "11px", fontWeight: 700, color: "var(--ink)", marginBottom: "4px" }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "10px", color: "var(--gold)", marginBottom: "6px" }}>{s.tool}</div>
                    <p style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: "9px", color: "var(--muted-txt)", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                  </div>
                ) : (
                  <div key={si} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted-txt)", fontSize: "18px" }}>→</div>
                )
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
