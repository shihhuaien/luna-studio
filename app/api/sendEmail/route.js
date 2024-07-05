import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import EmailTemplate from '@/emails';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    const response = await req.json();
    const result = response.data;

    try {
        const data = await resend.emails.send({
            from: 'helen@timothee.shop',
            to: [response.data.Email],
            subject: '預約確認信',
            react: EmailTemplate({ result }),
        });
        return NextResponse.json({ data })
    }
    catch (e) {
        return NextResponse.json({ e })
    }

}