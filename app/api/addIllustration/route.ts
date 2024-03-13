import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const POST = async (req: Request, res: NextApiResponse) => {
    let item = await req.json()
    try {
        console.log("FROM ROUTE", item)
        const illustration = await prisma.illustrationCard.create({
          data: {
            title: item.title,
            title_Bangla: item.title_Bangla,
            subtitle: item.subtitle,
            subtitle_Bangla: item.subtitle_Bangla,
            publisher: item.publisher,
            publisher_Bangla: item.publisher_Bangla,
            year: item.year,
            year_Bangla: item.year_Bangla,
            imageUrl: item.imageUrl,
            description: item.description,
            tags: item.tags,
            tags_Bangla: item.tags_Bangla,
          },
        });

        return new Response("Illustration successfully recorded", {
          status: 200
      })

    } catch (error) {
        console.error("Failed to add Illustration:", error);
        return new Response("Illustration not recorded", {
          status: 500
      })
    }
}

export {POST};