import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    // Try to connect to MongoDB (if configured)
    let existing = null;
    try {
      const client = await clientPromise;
      const db = client.db();
      const customers = db.collection('customers');

      // Check for duplicate email
      existing = await customers.findOne({ email });
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
    } catch (error) {
      console.warn('MongoDB not configured, skipping database operations:', error);
      // Continue without database operations
    }

    // Send welcome email with Resend (if configured)
    if (resend) {
      await resend.emails.send({
        from: 'Gilded Grove <gildedgrove@dylanmclane.com>',
        to: email,
        subject: 'Welcome to Gilded Grove!',
        html: `<p>Hi ${firstName},</p>
               <p>Thank you for requesting access to Gilded Grove. We'll be in touch soon!</p>
               <p>Best,<br/>The Gilded Grove Team</p>`
      });
    }

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