import { NextResponse} from 'next/server';

const url = `${process.env.API_URL}/login`;

export async function POST(req: Request) {
    const data = await req.json();

    try {
        const resp = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!resp.ok) {
            throw {
                status: resp.status,
            }
        }

        const { token, user } = await resp.json();
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
            { error: 'Internal Server Error'},
            { status: 500 }
        );
    }
}

