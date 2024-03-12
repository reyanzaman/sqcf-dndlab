import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const POST = async (req: Request, res: NextApiResponse) => {
    let body = await req.json()
    try {
        console.log("FROM ROUTE", body)
        const art = await prisma.art.create({
          data: {
            title: body.title.toUpperCase(),
            title_Bangla: body.title_Bangla,
            year: body.year,
            year_Bangla: body.year_Bangla,
            imageUrl: body.imageUrl,
            description: body.description,
            width: parseInt(body.height),
            height: parseInt(body.width),
            medium: body.medium,
            medium_Bangla: body.medium_Bangla,
            type: body.type.toLowerCase(),
            publication: body.publication,
            tags: body.tags,
            tags_Bangla: body.tags_Bangla,
          },
        });

        return new Response("Artwork successfully recorded", {
          status: 200
      })

    } catch (error) {
        console.error("Failed to add art:", error);
        return new Response("Artwork not recorded", {
          status: 500
      })
    }
}

export {POST};