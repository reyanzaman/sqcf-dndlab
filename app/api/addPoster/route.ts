import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const POST = async (req: Request, res: NextApiResponse) => {
    let body = await req.json()
    try {
        console.log("FROM ROUTE", body)
        const poster = await prisma.poster.create({
          data: {
            title: body.title,
            title_Bangla: body.title_Bangla,
            imageUrl: body.imageUrl,
            description: body.description,
            category: body.category,
            tags: body.tags,
            tags_Bangla: body.tags_Bangla,
            year: body.year,
            year_Bangla: body.year_Bangla,
            for_whom: body.for_whom,
            width: parseFloat(body.width),
            height: parseFloat(body.height),
          },
        });

        return new Response("Poster successfully recorded", {
          status: 200
      })

    } catch (error) {
        console.error("Failed to add poster:", error);
        return new Response("Poster not recorded", {
          status: 500
      })
    }
}

export {POST};