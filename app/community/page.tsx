'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Newspaper, FileText, ArrowRight } from "lucide-react"
import { useState } from "react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('bootcamps')

  const bootcamps = [
    {
      title: "LLM Fine-Tuning Bootcamp",
      description: "Master the art of fine-tuning large language models for specific tasks and domains.",
      duration: "4 weeks",
      level: "Intermediate",
      image: "/ai-model-training-dashboard.jpg"
    },
    {
      title: "Building LLMs from Scratch",
      description: "Learn to build and train large language models from the ground up using transformers.",
      duration: "6 weeks",
      level: "Advanced",
      image: "/language-model-research.jpg"
    },
    {
      title: "RAG Systems Bootcamp",
      description: "Build retrieval-augmented generation systems for enhanced AI applications.",
      duration: "3 weeks",
      level: "Intermediate",
      image: "/information-retrieval-system.jpg"
    },
    {
      title: "Multimodal AI Bootcamp",
      description: "Work with vision-language models and multimodal architectures in production.",
      duration: "4 weeks",
      level: "Advanced",
      image: "/multimodal-ai-vision-language.jpg"
    }
  ]

  const learnings = [
    {
      title: "Understanding Transformers",
      author: "Dr. Sarah Chen",
      duration: "8 hours",
      difficulty: "Intermediate"
    },
    {
      title: "Fine-tuning Techniques for Production Models",
      author: "Prof. James Wilson",
      duration: "6 hours",
      difficulty: "Advanced"
    },
    {
      title: "Evaluation Metrics for Language Models",
      author: "Dr. Aisha Patel",
      duration: "4 hours",
      difficulty: "Beginner"
    },
    {
      title: "Efficient Training with Quantization",
      author: "Prof. David Kumar",
      duration: "5 hours",
      difficulty: "Advanced"
    }
  ]

  const news = [
    {
      title: "OptimumAI Launches New Research Initiative on AI Safety",
      date: "March 10, 2024",
      excerpt: "We're excited to announce our new research initiative focusing on AI safety and alignment challenges."
    },
    {
      title: "10 Papers Published in Top-Tier Venues This Quarter",
      date: "March 5, 2024",
      excerpt: "Our community members published groundbreaking research at NeurIPS, ICML, and ICLR."
    },
    {
      title: "Community Wins: 3 AI Startups Launched",
      date: "February 28, 2024",
      excerpt: "Celebrate our community members who launched three AI startups based on research from OptimumAI."
    },
    {
      title: "Partnership Announcement: Collaborating with Leading Universities",
      date: "February 20, 2024",
      excerpt: "OptimumAI partners with top universities to bring research opportunities to students worldwide."
    }
  ]

  const papers = [
    {
      title: "Efficient Fine-Tuning of Large Language Models with Low-Rank Adaptation",
      authors: "Smith, J., Johnson, A., et al.",
      venue: "NeurIPS 2024",
      abstract: "We present a novel approach to efficiently fine-tune large language models..."
    },
    {
      title: "Scaling Laws for Multi-Task Learning in Language Models",
      authors: "Chen, S., Kumar, D., et al.",
      venue: "ICML 2024",
      abstract: "This paper investigates the scaling properties of multi-task learning..."
    },
    {
      title: "Safety-Aware Training of Large Language Models",
      authors: "Patel, A., Wilson, J., et al.",
      venue: "ICLR 2024",
      abstract: "We propose a novel training framework that prioritizes safety..."
    },
    {
      title: "Cross-Lingual Transfer Learning in Transformer Models",
      authors: "Liu, M., Brown, R., et al.",
      venue: "ACL 2024",
      abstract: "This work explores cross-lingual capabilities in transformer models..."
    }
  ]

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance">
              Join Our AI Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Learn, collaborate, and grow with thousands of AI researchers and practitioners worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant={activeTab === 'bootcamps' ? 'default' : 'outline'}
              onClick={() => setActiveTab('bootcamps')}
              className="gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Bootcamps
            </Button>
            <Button
              variant={activeTab === 'learnings' ? 'default' : 'outline'}
              onClick={() => setActiveTab('learnings')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Learning Resources
            </Button>
            <Button
              variant={activeTab === 'news' ? 'default' : 'outline'}
              onClick={() => setActiveTab('news')}
              className="gap-2"
            >
              <Newspaper className="w-4 h-4" />
              News
            </Button>
            <Button
              variant={activeTab === 'papers' ? 'default' : 'outline'}
              onClick={() => setActiveTab('papers')}
              className="gap-2"
            >
              <FileText className="w-4 h-4" />
              Papers
            </Button>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Bootcamps Tab */}
          {activeTab === 'bootcamps' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Bootcamps</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Intensive training programs to master cutting-edge AI technologies
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {bootcamps.map((bootcamp, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5" />
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{bootcamp.title}</h3>
                      <p className="text-muted-foreground mb-4">{bootcamp.description}</p>
                      <div className="flex items-center gap-4 mb-6 text-sm">
                        <span className="px-3 py-1 bg-accent/10 rounded-full text-accent font-medium">{bootcamp.duration}</span>
                        <span className="px-3 py-1 bg-secondary rounded-full">{bootcamp.level}</span>
                      </div>
                      <Button className="w-full gap-2">
                        Enroll Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Learning Resources Tab */}
          {activeTab === 'learnings' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Learning Resources</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Curated tutorials and educational content from industry experts
                </p>
              </div>
              <div className="space-y-4">
                {learnings.map((learning, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">{learning.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">By {learning.author}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>{learning.duration}</span>
                            <span className="px-2 py-1 bg-secondary rounded text-xs font-medium">{learning.difficulty}</span>
                          </div>
                        </div>
                        <Button variant="outline" className="ml-4">
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Latest News</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Stay updated with community highlights and announcements
                </p>
              </div>
              <div className="space-y-6">
                {news.map((newsItem, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <p className="text-sm text-accent font-medium mb-2">{newsItem.date}</p>
                      <h3 className="text-xl font-bold mb-3">{newsItem.title}</h3>
                      <p className="text-muted-foreground mb-4">{newsItem.excerpt}</p>
                      <Button variant="ghost" className="gap-2">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Papers Tab */}
          {activeTab === 'papers' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Published Papers</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Research publications from our community at top-tier venues
                </p>
              </div>
              <div className="space-y-6">
                {papers.map((paper, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <p className="text-sm text-accent font-medium mb-2">{paper.venue}</p>
                      <h3 className="text-lg font-bold mb-2">{paper.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{paper.authors}</p>
                      <p className="text-muted-foreground mb-4">{paper.abstract}</p>
                      <div className="flex gap-4">
                        <Button variant="outline" className="gap-2">
                          Read Paper
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline">Cite</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
