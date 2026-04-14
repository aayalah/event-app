import { NextResponse} from 'next/server';
import { cookies } from 'next/headers';

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

    const token = (await cookies()).get('auth_token')?.value;

    try {
        const resp = await fetch(backendUrl.toString(), {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (!resp.ok) {
            throw new Error("Request failed:")
        }

        const data = await resp.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal Server Error'},
            { status: 500 }
        );
    }
}

