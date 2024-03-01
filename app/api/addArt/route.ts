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
            artist: body.artist,
            year: body.year,
            imageUrl: body.imageUrl,
            description: body.description,
            width: parseInt(body.height),
            height: parseInt(body.width),
            Medium: body.Medium,
            Medium_Bangla: body.Medium_Bangla,
            type: body.type,
            tags: body.tags,
            tags_Bangla: body.tags_Bangla,
          },
        });

        return NextResponse.json({ message: "Successfully Recorded" });
    } catch (error) {
        console.error("Failed to add art:", error);
        return NextResponse.json({ message: "Artwork not recorded" });
    }
}

export {POST};