import { NextResponse} from 'next/server';

const url = `${process.env.API_URL}/users`;

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

        const respData = await resp.json();
        return NextResponse.json(respData);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal Server Error'},
            { status: error.status || 500 }
        );
    }
}