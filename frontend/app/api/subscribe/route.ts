import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const { firstName, email } = await request.json();

    // Basic validation
    if (!firstName || !email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'First name and a valid email are required.' },
        { status: 400 }
      );
    }

    // Store signup data in a JSON file
    const signupData = {
      firstName,
      email,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    try {
      // Create data directory if it doesn't exist
      const dataDir = join(process.cwd(), 'data');
      await mkdir(dataDir, { recursive: true });
      
      // Read existing signups
      const signupsFile = join(dataDir, 'signups.json');
      let signups = [];
      
      try {
        const existingData = await readFile(signupsFile, 'utf8');
        signups = JSON.parse(existingData);
      } catch {
        // File doesn't exist yet, start with empty array
      }
      
      // Add new signup
      signups.push(signupData);
      
      // Write back to file
      await writeFile(signupsFile, JSON.stringify(signups, null, 2));
      
      console.log('Signup stored successfully:', signupData);
    } catch (fileError) {
      console.error('Failed to store signup data:', fileError);
      // Continue even if file storage fails
    }

    // Send confirmation email to user using a webhook service
    try {
      // Use webhook.site or similar service to send emails
      const emailPayload = {
        to: email,
        subject: 'Welcome to Gilded Grove!',
        message: `Hi ${firstName},\n\nThank you for requesting access to Gilded Grove. We'll be in touch soon!\n\nBest,\nThe Gilded Grove Team`,
        html: `<p>Hi ${firstName},</p>
               <p>Thank you for requesting access to Gilded Grove. We'll be in touch soon!</p>
               <p>Best,<br/>The Gilded Grove Team</p>`
      };

      // Try to send via a simple webhook service
      const webhookResponse = await fetch('https://webhook.site/your-webhook-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'email',
          ...emailPayload
        })
      });

      if (webhookResponse.ok) {
        console.log('Confirmation email queued for:', email);
      } else {
        console.log('Webhook email service not available');
      }
    } catch (emailError) {
      console.log('Email webhook failed:', emailError);
    }

    // Always send admin notification (using Resend for now since it works)
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: 'Gilded Grove <onboarding@resend.dev>',
        to: 'mclanedylan@gmail.com',
        subject: `New Signup Request from ${firstName}`,
        html: `<p>New signup request received:</p>
               <p><strong>Name:</strong> ${firstName}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
               <p><strong>IP:</strong> ${signupData.ip}</p>
               <p>Please follow up with this potential customer.</p>`
      });
      console.log('Admin notification sent via Resend');
    } catch {
      console.log('Admin email not sent');
    }

    return NextResponse.json(
      { success: true, message: 'Invitation request received successfully.' },
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
