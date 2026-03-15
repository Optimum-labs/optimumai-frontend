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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
