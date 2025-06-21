import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // store in Vercel secrets

export default async function handler(req, res) {
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: 'ragulagenc714@gmail.com',
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error.response?.body || error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
}
