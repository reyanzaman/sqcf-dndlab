import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const POST = async (req: Request, res: NextApiResponse) => {
    let body = await req.json()
    try {
        console.log("FROM ROUTE", body)
        const poster = await prisma.writings.create({
          data: {
            title: body.title,
            title_Bangla: body.title_Bangla,
            subtitle: body.subtitle,
            subtitle_Bangla: body.subtitle_Bangla,
            publisher: body.publisher,
            publisher_Bangla: body.publisher_Bangla,
            link: body.link,
            writer: body.writer,
            writer_Bangla: body.writer_Bangla,
            category: body.category, //Poem, Prose etc.
            type: body.type, //By QC or On QC etc.
            day: body.day,
            day_Bangla: body.day_Bangla,
            month: body.month,
            month_Bangla: body.month_Bangla,
            year: body.year,
            year_Bangla: body.year_Bangla,
            imageUrl: body.imageUrl,
            imageAlt: body.imageAlt,
            text: body.text,
            tags: body.tags,
            tags_Bangla: body.tags_Bangla,
          },
        });

        return new Response("Writing successfully recorded", {
          status: 200
      })

    } catch (error) {
        console.error("Failed to add Writing:", error);
        return new Response("Writing not recorded", {
          status: 500
      })
    }
}

export {POST};