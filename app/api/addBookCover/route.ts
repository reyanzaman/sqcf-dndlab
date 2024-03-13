import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const POST = async (req: Request, res: NextApiResponse) => {
    let body = await req.json()
    try {
        console.log("FROM ROUTE", body)
        const bookcover = await prisma.bookCover.create({
          data: {
            title: body.title,
            title_Bangla: body.title_Bangla,
            author: body.author,
            author_Bangla: body.author_Bangla,
            publisher: body.publisher,
            publisher_Bangla: body.publisher_Bangla,
            date: body.date,
            date_Bangla: body.date_Bangla,
            imageUrl: body.imageUrl,
            description: body.description,
            type: body.type,
            type_Bangla: body.type_Bangla,
            tags: body.tags,
            tags_Bangla: body.tags_Bangla,
          },
        });

        return new Response("Book Cover successfully recorded", {
          status: 200
      })

    } catch (error) {
        console.error("Failed to add Book Cover:", error);
        return new Response("Book Cover not recorded", {
          status: 500
      })
    }
}

export {POST};