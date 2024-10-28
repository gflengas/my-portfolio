import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Add type safety for environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RESEND_FROM_EMAIL: string;
      RESEND_TO_EMAIL: string;
      RESEND_DOMAIN: string;
      RESEND_API_KEY: string;
    }
  }
}

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL || !process.env.RESEND_DOMAIN) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const { name, email, subject, message } = await req.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const fromEmail = `Contact Form <${process.env.RESEND_FROM_EMAIL}>`;
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}