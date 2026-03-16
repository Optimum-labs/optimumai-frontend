import { config } from "dotenv"
import path from "path"

// Load .env first, then .env.local overrides
config({ path: path.resolve(process.cwd(), ".env") })
config({ path: path.resolve(process.cwd(), ".env.local"), override: true })

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET")

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const courses = [
  {
    title: "Deep Learning Foundations",
    slug: "deep-learning-foundations",
    description: "Master neural network architectures, backpropagation, CNNs, RNNs, and transformer models from the ground up.",
    category: "bootcamp",
    duration: "8 weeks",
    level: "intermediate",
    tags: ["deep-learning", "neural-networks", "pytorch", "transformers"],
  },
  {
    title: "Advanced LLM Engineering",
    slug: "advanced-llm-engineering",
    description: "Build production-ready LLM applications with fine-tuning, RLHF, prompt engineering, and deployment strategies.",
    category: "bootcamp",
    duration: "10 weeks",
    level: "advanced",
    tags: ["llm", "fine-tuning", "rlhf", "prompt-engineering"],
  },
  {
    title: "AI for Computer Vision",
    slug: "ai-computer-vision",
    description: "Learn image classification, object detection, segmentation, and generative models for visual AI.",
    category: "bootcamp",
    duration: "8 weeks",
    level: "intermediate",
    tags: ["computer-vision", "cnns", "object-detection", "image-generation"],
  },
  {
    title: "MLOps & Production ML",
    slug: "mlops-production-ml",
    description: "Deploy, monitor, and scale ML models with CI/CD, Docker, Kubernetes, and feature stores.",
    category: "bootcamp",
    duration: "6 weeks",
    level: "advanced",
    tags: ["mlops", "docker", "kubernetes", "ci-cd"],
  },
  {
    title: "Reinforcement Learning",
    slug: "reinforcement-learning",
    description: "Master RL algorithms from Q-learning to PPO and apply them to games, robotics, and optimization.",
    category: "bootcamp",
    duration: "8 weeks",
    level: "advanced",
    tags: ["reinforcement-learning", "ppo", "q-learning", "robotics"],
  },
  {
    title: "AI Product Management",
    slug: "ai-product-management",
    description: "Learn to scope, plan, and ship AI-powered products with cross-functional teams.",
    category: "bootcamp",
    duration: "4 weeks",
    level: "beginner",
    tags: ["product-management", "ai-strategy", "roadmapping"],
  },
  {
    title: "Python for Machine Learning",
    slug: "python-ml",
    description: "Essential Python skills for ML including NumPy, Pandas, Scikit-learn, and data visualization.",
    category: "learning",
    duration: "4 weeks",
    level: "beginner",
    tags: ["python", "numpy", "pandas", "scikit-learn"],
  },
  {
    title: "Mathematics for AI",
    slug: "math-for-ai",
    description: "Linear algebra, calculus, probability, and statistics foundations for understanding AI algorithms.",
    category: "learning",
    duration: "6 weeks",
    level: "beginner",
    tags: ["linear-algebra", "calculus", "probability", "statistics"],
  },
  {
    title: "Natural Language Processing",
    slug: "nlp",
    description: "Text processing, sentiment analysis, named entity recognition, and language model fundamentals.",
    category: "learning",
    duration: "6 weeks",
    level: "intermediate",
    tags: ["nlp", "text-processing", "sentiment-analysis", "transformers"],
  },
  {
    title: "Data Engineering Fundamentals",
    slug: "data-engineering",
    description: "Build data pipelines, ETL workflows, and data warehouses for ML systems.",
    category: "learning",
    duration: "5 weeks",
    level: "intermediate",
    tags: ["data-engineering", "etl", "pipelines", "sql"],
  },
  {
    title: "Generative AI & Diffusion Models",
    slug: "generative-ai",
    description: "Understand GANs, VAEs, diffusion models, and build image and text generation systems.",
    category: "learning",
    duration: "6 weeks",
    level: "advanced",
    tags: ["generative-ai", "diffusion", "gans", "stable-diffusion"],
  },
  {
    title: "AI Ethics & Responsible AI",
    slug: "ai-ethics",
    description: "Explore bias, fairness, transparency, and responsible AI practices for real-world systems.",
    category: "learning",
    duration: "3 weeks",
    level: "beginner",
    tags: ["ethics", "fairness", "bias", "responsible-ai"],
  },
]

const challenges = [
  {
    title: "InterviewBot: AI-Powered Interview Preparation Platform",
    slug: "interviewbot-ai-powered-interview-preparation-platform",
    description: "Build a complete interview preparation platform from PoC to validated product — using agentic AI, modern frameworks, and cloud infrastructure.",
    level: "Intermediate",
    duration: "14 weeks",
    maxTeams: 10,
    teamSize: 5,
    tags: ["Flexible - Research-based", "LLMs (OpenAI/Claude/etc)", "Cloud Platforms", "Modern Web Framework"],
    startsAt: new Date("2026-03-08"),
    status: "open",
  },
  {
    title: "AI-Powered Education Platform",
    slug: "ai-education-platform",
    description: "Design and build an adaptive learning platform that personalises education using AI agents, knowledge graphs, and real-time student modelling.",
    level: "Advanced",
    duration: "12 weeks",
    maxTeams: 8,
    teamSize: 4,
    tags: ["Adaptive Learning", "Knowledge Graphs", "RAG Systems", "Next.js"],
    startsAt: new Date("2026-04-01"),
    registrationCloses: new Date("2026-03-28"),
    status: "open",
  },
  {
    title: "Autonomous Research Agent",
    slug: "autonomous-research-agent",
    description: "Create an AI agent that can autonomously conduct literature reviews, synthesize findings, and generate research hypotheses across scientific domains.",
    level: "Advanced",
    duration: "10 weeks",
    maxTeams: 12,
    teamSize: 3,
    tags: ["Multi-Agent Systems", "Scientific Computing", "NLP", "Python"],
    startsAt: new Date("2026-04-15"),
    registrationCloses: new Date("2026-04-10"),
    status: "open",
  },
]

const researchPrograms = [
  {
    title: "Building LLMs from Scratch",
    slug: "building-llms-from-scratch",
    description: "Learn to build and train large language models from the ground up, covering tokenization, architecture design, and training strategies.",
    organization: "OptimumAI Research Lab",
    difficulty: "Advanced",
    duration: "16 weeks",
    tags: ["LLM", "Transformers", "Deep Learning", "PyTorch"],
    objectives: ["Implement transformer architecture from scratch", "Design tokenization strategies", "Train models on distributed systems", "Optimize inference performance"],
    prerequisites: ["Strong Python skills", "Deep learning fundamentals", "PyTorch experience", "Linear algebra"],
    status: "accepting",
  },
  {
    title: "Fine-Tuning & PEFT Techniques",
    slug: "fine-tuning-peft-techniques",
    description: "Master parameter-efficient fine-tuning methods including LoRA, QLoRA, and prefix tuning for adapting LLMs to specific tasks.",
    organization: "OptimumAI Research Lab",
    difficulty: "Intermediate",
    duration: "12 weeks",
    tags: ["Fine-tuning", "LoRA", "QLoRA", "PEFT"],
    objectives: ["Implement LoRA and QLoRA techniques", "Fine-tune models with limited compute", "Evaluate fine-tuned model performance", "Deploy fine-tuned models in production"],
    prerequisites: ["Python programming", "Basic ML knowledge", "Familiarity with transformers", "GPU access"],
    status: "accepting",
  },
  {
    title: "RAG Systems & Vector Databases",
    slug: "rag-systems-vector-databases",
    description: "Build production-ready Retrieval Augmented Generation systems with advanced chunking, embedding strategies, and reranking.",
    organization: "OptimumAI Applied AI",
    difficulty: "Intermediate",
    duration: "10 weeks",
    tags: ["RAG", "Vector DB", "Embeddings", "LangChain"],
    objectives: ["Design optimal chunking strategies", "Implement vector database solutions", "Build RAG pipelines with LangChain", "Optimize retrieval accuracy"],
    prerequisites: ["Python programming", "API development", "Database fundamentals", "LLM basics"],
    status: "in-progress",
  },
  {
    title: "Multimodal AI Research",
    slug: "multimodal-ai-research",
    description: "Explore cutting-edge multimodal models combining vision, language, and audio for next-generation AI applications.",
    organization: "OptimumAI Vision Lab",
    difficulty: "Advanced",
    duration: "14 weeks",
    tags: ["Vision-Language", "CLIP", "Multimodal", "Diffusion"],
    objectives: ["Train vision-language models", "Implement multimodal embeddings", "Build cross-modal retrieval systems", "Create generative multimodal applications"],
    prerequisites: ["Computer vision experience", "NLP knowledge", "PyTorch/TensorFlow", "Research experience"],
    status: "accepting",
  },
  {
    title: "LLM Agents & Tool Use",
    slug: "llm-agents-tool-use",
    description: "Design and implement autonomous AI agents with reasoning, planning, and tool-use capabilities for complex workflows.",
    organization: "OptimumAI Agentic AI",
    difficulty: "Intermediate",
    duration: "10 weeks",
    tags: ["Agents", "Tool Calling", "ReAct", "AutoGPT"],
    objectives: ["Implement ReAct and ReWOO patterns", "Build multi-step reasoning agents", "Design tool-calling interfaces", "Create agentic workflow systems"],
    prerequisites: ["Python development", "LLM API experience", "Software architecture", "Problem-solving skills"],
    status: "accepting",
  },
  {
    title: "Model Compression & Optimization",
    slug: "model-compression-optimization",
    description: "Master techniques for compressing and optimizing large models for edge deployment and inference efficiency.",
    organization: "OptimumAI Efficiency Lab",
    difficulty: "Advanced",
    duration: "8 weeks",
    tags: ["Quantization", "Pruning", "Distillation", "ONNX"],
    objectives: ["Implement quantization techniques", "Apply model pruning strategies", "Perform knowledge distillation", "Optimize for edge devices"],
    prerequisites: ["Deep learning expertise", "Model architectures", "C++/CUDA helpful", "Hardware understanding"],
    status: "accepting",
  },
]

const events = [
  {
    title: "AI Research Symposium 2024",
    slug: "ai-research-symposium-2024",
    description: "Join leading AI researchers for presentations on the latest breakthroughs in machine learning and artificial intelligence.",
    date: new Date("2026-03-25"),
    time: "2:00 PM - 6:00 PM EST",
    location: "Virtual Event",
    type: "Symposium",
    maxAttendees: 250,
    status: "upcoming",
  },
  {
    title: "LLM Fine-Tuning Workshop",
    slug: "llm-fine-tuning-workshop",
    description: "Hands-on workshop covering advanced techniques for fine-tuning large language models for specific domains and tasks.",
    date: new Date("2026-04-02"),
    time: "10:00 AM - 4:00 PM EST",
    location: "Virtual Event",
    type: "Workshop",
    maxAttendees: 150,
    status: "upcoming",
  },
  {
    title: "AI Ethics & Safety Discussion",
    slug: "ai-ethics-safety-discussion",
    description: "Expert panel discussing the ethical implications and safety considerations in modern AI development.",
    date: new Date("2026-04-10"),
    time: "7:00 PM - 9:00 PM EST",
    location: "Virtual Event",
    type: "Panel Discussion",
    maxAttendees: 180,
    status: "upcoming",
  },
]

async function main() {
  console.log("Seeding courses...")

  for (const course of courses) {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: course,
      create: course,
    })
  }

  console.log(`Seeded ${courses.length} courses.`)

  console.log("Seeding challenges...")

  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { slug: challenge.slug },
      update: challenge,
      create: challenge,
    })
  }

  console.log(`Seeded ${challenges.length} challenges.`)

  console.log("Seeding research programs...")

  for (const program of researchPrograms) {
    await prisma.researchProgram.upsert({
      where: { slug: program.slug },
      update: program,
      create: program,
    })
  }

  console.log(`Seeded ${researchPrograms.length} research programs.`)

  console.log("Seeding events...")

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    })
  }

  console.log(`Seeded ${events.length} events.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
