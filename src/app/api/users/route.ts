import { NextResponse} from 'next/server';
import axios from "axios";

const url = `${process.env.API_URL}/users`;

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const resp = await fetch(url, {
            method: "POST",
            body: data,
        });

        if (!resp.ok) {
            throw new Error("Request failed");
        }
        return await resp.json();
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}