import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

function createPrismaClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function checkData() {
  try {
    const courses = await prisma.course.findMany({ select: { title: true } });
    const challenges = await prisma.challenge.findMany({ select: { title: true } });
    const programs = await prisma.researchProgram.findMany({ select: { title: true } });
    const events = await prisma.event.findMany({ select: { title: true } });

    console.log('Courses:', courses.map(c => c.title));
    console.log('Challenges:', challenges.map(c => c.title));
    console.log('Research Programs:', programs.map(p => p.title));
    console.log('Events:', events.map(e => e.title));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();