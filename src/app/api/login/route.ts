import { NextResponse} from 'next/server';
import axios from "axios";

const url = `${process.env.API_URL}/login`;

export async function POST(req: Request) {
    const data = await req.json();
    try {
        const resp = await axios.post(url, data);
        const { token, user } = resp.data;
        const response = NextResponse.json({ user });
        response.cookies.set('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}

