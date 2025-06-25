import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    // Basic validation
    if (!firstName || !lastName || !email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'First name, last name, and a valid email are required.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const customers = db.collection('customers');

    // Check for duplicate email
    const existing = await customers.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: 'This email is already registered.' },
        { status: 409 }
      );
    }

    // Insert new customer
    await customers.insertOne({
      firstName,
      lastName,
      email,
      phone: phone || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Send welcome email with Resend
    await resend.emails.send({
      from: 'Gilded Grove <gildedgrove@dylanmclane.com>',
      to: email,
      subject: 'Welcome to Gilded Grove!',
      html: `<p>Hi ${firstName},</p>
             <p>Thank you for requesting access to Gilded Grove. We'll be in touch soon!</p>
             <p>Best,<br/>The Gilded Grove Team</p>`
    });

    return NextResponse.json(
      { success: true, message: 'Customer registered and email sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 