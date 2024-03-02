import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const url = new URL(req.url || '', 'http://localhost');
    const id = url.searchParams.get('id');
    console.log("ID: ", id)

    if (!id) {
        return NextResponse.json({ message: "ID Not Found" });
    }

    try {
        const art = await prisma.art.findUnique({
            where: {
                id: String(id),
            },
        });

        if (art) {
            return NextResponse.json(art);
        } else {
            return new Response("Artwork not found", {
                status: 500
            })
        }
    } catch (error) {
        console.error("Failed to get art:", error);
        return new Response("Error occured during artwork retrieval", {
            status: 500
        })
    }
}

export { GET };