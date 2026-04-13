import { NextResponse} from 'next/server';
import { cookies } from 'next/headers';
import axios from "axios";

const baseUrl = `${process.env.API_URL}/groups`;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const params = url.searchParams;
    const city = params.get("city");
    const country = params.get("country");
    const category = params.get("category");

    const backendUrl = new URL(baseUrl);
    if (city) backendUrl.searchParams.set("city", city);
    if (country) backendUrl.searchParams.set("country", country);
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
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}

