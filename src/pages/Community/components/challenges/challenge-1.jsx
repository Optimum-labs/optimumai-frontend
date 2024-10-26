import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Timeline, TimelineItem, TimelineItemContent, TimelineItemIndicator, TimelineItemTitle } from "@/components/ui/timeline"

import img from "../../img/mock.png"
import leadImage from "../../img/lead.jpeg"
import leadImage2 from "../../img/lead2.jpeg"

export default function MultiAgentContentCreation() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Multi-Agent Content Creation Project</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
          <CardDescription>Revolutionizing content creation with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <Image
            src={img}
            width={800}
            height={400}
            alt="AI for Content Creation"
            className="rounded-lg mb-4 w-full h-auto"
          />
          <p className="text-muted-foreground">
            In today's fast-paced world, content creators face numerous challenges in producing high-quality material efficiently. Our Multi-Agent Content Creation Project aims to develop a comprehensive chatbot that automates and streamlines the creation of written, audio, and visual content.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="problem" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="problem">Problem Statement</TabsTrigger>
          <TabsTrigger value="goals">Project Goals</TabsTrigger>
          <TabsTrigger value="objectives">Project Objectives</TabsTrigger>
        </TabsList>
        <TabsContent value="problem">
          <Card>
            <CardHeader>
              <CardTitle>Problem Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <p>
                  Despite technological advancements, significant gaps remain in content creation tools. Current solutions often rely on unreliable sources, struggle with grammar and style issues, and fail to fully automate the writing process for various content types. Additionally, audio and visual content creators face unique challenges in finding and integrating relevant information while navigating copyright concerns.
                </p>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Project Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Generate high-quality content in multiple formats based on user prompts</li>
                <li>Ensure system flexibility to handle a wide range of topics and content types</li>
                <li>Provide a user-friendly interface for easy interaction and content customization</li>
                <li>Contribute to better understanding and adaptation to climate change impacts</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="objectives">
          <Card>
            <CardHeader>
              <CardTitle>Project Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Develop a Multi-Modal Content Generation Chatbot</li>
                <li>Ensure High-Quality Output Across Formats</li>
                <li>Provide Customization and Personalization Features</li>
                <li>Integrate Advanced AI Capabilities</li>
                <li>Focus on User Experience and Accessibility</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Skills You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>AI model development</Badge>
            <Badge>Multi-modal content generation</Badge>
            <Badge>Customization techniques</Badge>
            <Badge>Ethical AI considerations</Badge>
            <Badge>API development with Django</Badge>
            <Badge>AWS/Azure deployment</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
          <CardDescription>4 Weeks (Starts from 15th Sept 2024)</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline>
            <TimelineItem>
              <TimelineItemTitle>Week 1</TimelineItemTitle>
              <TimelineItemContent>Project Initiation, Planning, and Market Research</TimelineItemContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineItemTitle>Week 2</TimelineItemTitle>
              <TimelineItemContent>Designing Multi-Agent Architecture and LLM Integration</TimelineItemContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineItemTitle>Week 3</TimelineItemTitle>
              <TimelineItemContent>Developing the AI Content Creation Prototype, Testing and Refinement</TimelineItemContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineItemTitle>Week 4</TimelineItemTitle>
              <TimelineItemContent>Project Report Submission with a Final Demo</TimelineItemContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild>
            <Link href="https://docs.google.com/document/d/1K2kDCddwMrx0NLt6cokDdbyfsQzyuTWbIrIs1IrahiQ/edit?usp=sharing" target="_blank">View Problem Statement</Link>
          </Button>
          <Button asChild>
            <Link href="https://forms.gle/8na2REeK7pxXPKGn9" target="_blank">Apply for Challenge</Link>
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-3xl font-bold mb-4">Project Leads</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <Avatar className="w-24 h-24">
              <AvatarImage src={leadImage.src} alt="Vijaya Krishna" />
              <AvatarFallback>VK</AvatarFallback>
            </Avatar>
            <CardTitle>Vijaya Krishna</CardTitle>
            <CardDescription>Senior AI Researcher</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Detail-oriented data scientist specializing in GenAI Product Development. Proficient in utilizing Python for data extraction, statistical modeling, and generating actionable insights. Experienced in uncovering market trends and consumer behavior patterns through advanced analytics. Skilled in communicating findings to support strategic business decisions.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="https://www.linkedin.com/in/vijaya-krishna-k-139487297/" target="_blank">Connect on LinkedIn</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Avatar className="w-24 h-24">
              <AvatarImage src={leadImage2.src} alt="Swati Garg" />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>
            <CardTitle>Swati Garg</CardTitle>
            <CardDescription>AI Researcher & AWS Architect</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Ph.D. in Physics with over 3 years of postdoctoral research experience, complemented by 6+ months as a Data Analyst/Scientist. Expertise in feature engineering, machine learning, model building and deployment, and computer vision techniques. Skilled AWS Data Architect with experience in developing data pipelines, API implementation, and data modeling.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="https://www.linkedin.com/in/swati-garg-02513153/" target="_blank">Connect on LinkedIn</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
