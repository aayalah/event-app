import { NextResponse} from 'next/server';
import axios from "axios";

const baseUrl = `${process.env.API_URL}/events`;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;
    const lat = params.get("lat");
    const lon = params.get("lon");
    const radius = params.get("radius");
    const date = params.get("date");
    const category = params.get("category");

    const backendUrl = new URL(baseUrl);
    if (lat) backendUrl.searchParams.set("lat", lat);
    if (lon) backendUrl.searchParams.set("lon", lon);
    if (radius) backendUrl.searchParams.set("radius", radius);
    if (date) backendUrl.searchParams.set("date", date);
    if (category) backendUrl.searchParams.set("category", category);

    try {
        const resp = await axios.get(backendUrl.toString());
        return NextResponse.json(resp.data)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}

