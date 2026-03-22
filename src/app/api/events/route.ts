import { NextResponse} from 'next/server';
import axios from "axios";

const baseUrl = `${process.env.API_URL}/events`;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;
    const lat = params.get("lat");
    const lon = params.get("lon");
    const radius = params.get("radius");
    console.log(`${baseUrl}?lat=${lat}&lon=${lon}`);
    
    try {
        const resp = await axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&radius=${radius}`);
        return NextResponse.json(resp.data)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}

