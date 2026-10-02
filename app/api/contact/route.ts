// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create the transporter OUTSIDE the handler so it's reused across requests
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true, // 👈 ENABLE POOLING
  maxConnections: 1, // Keep 1 connection open
  maxMessages: 100, // Send up to 100 emails per connection
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #f59e0b 0%, #e11d48 100%); padding: 30px 40px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; }
          .header p { color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px; }
          .content { padding: 40px; }
          .field { margin-bottom: 25px; }
          .field-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #9ca3af; font-weight: 600; margin-bottom: 6px; display: block; }
          .field-value { font-size: 16px; color: #1f2937; margin: 0; line-height: 1.5; }
          .message-box { background-color: #f9fafb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 0 8px 8px 0; margin-top: 5px; }
          .message-box p { margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap; }
          .footer { background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer p { color: #9ca3af; font-size: 12px; margin: 0; }
          .btn { display: inline-block; background-color: #f59e0b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 20px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Message Received</h1>
            <p>From your website contact form</p>
          </div>
          <div class="content">
            <div class="field">
              <span class="field-label">Sender Name</span>
              <p class="field-value"><strong>${name}</strong></p>
            </div>
            <div class="field">
              <span class="field-label">Sender Email</span>
              <p class="field-value"><a href="mailto:${email}" style="color: #e11d48; text-decoration: none;">${email}</a></p>
            </div>
            <div class="field">
              <span class="field-label">Message</span>
              <div class="message-box">
                <p>${message}</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${email}?subject=Re: Your message to Global Infinity Foundation" class="btn">Reply to ${name}</a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from the Global Infinity Foundation contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Global Infinity Foundation" <${process.env.EMAIL_USER}>`,
      to: 'Globalinfinityf@gmail.com',
      replyTo: email,
      subject: `📩 New Contact Form Message from ${name}`,
      text: `New Contact Form Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}