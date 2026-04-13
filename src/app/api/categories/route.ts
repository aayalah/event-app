import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from "axios";

const url = `${process.env.API_URL}/categories`;

export async function GET() {
    const token = (await cookies()).get('auth_token')?.value;

    try {
        const resp = await fetch(url, {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        
        if (!resp.ok) {
            throw new Error("Request failed:")
        }

        return await resp.json();
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error' },
            { status: error.response?.status || 500 }
        );
    }
}
