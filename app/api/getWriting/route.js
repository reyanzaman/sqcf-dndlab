import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

const GET = async (req) => {
    const url = new URL(req.url || '', 'http://localhost');
    const id = url.searchParams.get('writingId');
    // console.log("ID: ", id)

    if (!id) {
        return NextResponse.json({ message: "ID Not Found" });
    }

    try {
        const writing = await prisma.writings.findUnique({
            where: {
                id: String(id),
            },
        });

        if (writing) {
            return NextResponse.json(writing);
        } else {
            return NextResponse.json({ message: "writing not found" });
        }
    } catch (error) {
        console.error("Failed to get writing:", error);
        return NextResponse.json({ message: "writing not found" });
    }
}

export { GET };