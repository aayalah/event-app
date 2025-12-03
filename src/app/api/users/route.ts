import { NextResponse} from 'next/server';
import axios from "axios";

const url = `${process.env.API_URL}/users`;

export async function POST(req: Request) {
    const data = await req.json();
    try {
        console.log(data);
        console.log(url);
        const resp = await axios.post(url, data);
        return NextResponse.json(resp.data)
    } catch (error: any) {
        return NextResponse.json(
            { error: error.response?.data || 'Internal Server Error'},
            { status: error.response?.status || 500 }
        );
    }
}