// netlify/functions/contact.ts
import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const handler: Handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

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

    await transporter.sendMail({
      from: `"Global Infinity Foundation" <${process.env.EMAIL_USER}>`,
      to: 'Globalinfinityf@gmail.com',
      replyTo: email,
      subject: `📩 New Contact Form Message from ${name}`,
      text: `New Contact Form Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: htmlTemplate,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' }),
    };
  }
};

export { handler };