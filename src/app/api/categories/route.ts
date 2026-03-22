import { NextResponse } from 'next/server';
import axios from "axios";

const url = `${process.env.API_URL}/categories`;

export async function GET() {
    try {
        const resp = await axios.get(url);
        return NextResponse.json(resp.data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error' },
            { status: error.response?.status || 500 }
        );
    }
}
