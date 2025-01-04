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
    port: 587,
    auth: {
      user: process.env.ETHEREAL_EMAIL_USERNAME,
      pass: process.env.ETHEREAL_EMAIL_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html: text
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
