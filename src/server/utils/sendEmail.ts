import * as nodemailer from 'nodemailer'

export const sendEmail = async ({
  to,
  subject,
  text
}: {
  to: string
  subject: string
  text: string
}) => {
  // Create a transporter object using Ethereal SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587, // or 465 if you're using SSL
    secure: false, // set to true for SSL
    auth: {
      user: process.env.ETHEREAL_EMAIL_USERNAME, // Your Ethereal username
      pass: process.env.ETHEREAL_EMAIL_PASSWORD // Your Ethereal password
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM, // Sender email
    to, // Receiver email
    subject, // Subject line
    html: text // HTML body content
  }

  try {
    // Send the email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
