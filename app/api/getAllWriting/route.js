import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posters = await prisma.writings.findMany();
    return new Response(JSON.stringify(posters), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to fetch arts:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch writings' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}