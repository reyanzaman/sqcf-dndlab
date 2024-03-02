import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const id = url.searchParams.get('id');
    console.log("ID: ", id);

    if (!id) {
        return new Response("ID Not Found", {
            status: 400
        })
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
                status: 404
            })
        }
    } catch (error) {
        console.error("Failed to get art:", error);
        return new Response("Error occurred during artwork retrieval", {
            status: 500
        })
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        return GET(req, res);
    } else {
        // Handle any other HTTP methods if necessary
        res.setHeader('Allow', ['GET']);
        return new Response(`Method ${req.method} Not Allowed`, {
            status: 405
        })
    }
}

export { GET };