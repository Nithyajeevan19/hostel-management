import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

interface VisitApprovalPayload {
  name: string
  email: string
  phone: string
  visitType: 'in-person' | 'virtual'
  preferredDate: string
  preferredTime: string
  branchPreference: string
}

function getVisitDateLabel(date: string) {
  if (!date || date === 'TBD') return 'to be decided'

  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  const visit = (await request.json()) as VisitApprovalPayload

  if (!visit.name || !visit.email || !visit.phone) {
    return NextResponse.json({ error: 'Missing customer details.' }, { status: 400 })
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { error: 'Email service is not configured. Please add SMTP environment variables.' },
      { status: 503 }
    )
  }

  const visitDate = getVisitDateLabel(visit.preferredDate)
  const visitTime = visit.preferredTime && visit.preferredTime !== 'TBD'
    ? visit.preferredTime
    : 'to be decided'
  const customerName = escapeHtml(visit.name)
  const branchPreference = escapeHtml(visit.branchPreference)
  const safeVisitDate = escapeHtml(visitDate)
  const safeVisitTime = escapeHtml(visitTime)

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: visit.email,
    subject: 'Your SURYA PG visit is approved',
    text: `Hi ${visit.name},

Your visit to SURYA PG has been approved.

Visit type: ${visit.visitType === 'in-person' ? 'In-person visit' : 'Virtual tour'}
Branch: ${visit.branchPreference}
Date: ${visitDate}
Time: ${visitTime}

For help, call or WhatsApp us at 7013392233.

Thank you,
SURYA PG`,
    html: `
      <p>Hi ${customerName},</p>
      <p>Your visit to <strong>SURYA PG</strong> has been approved.</p>
      <ul>
        <li><strong>Visit type:</strong> ${visit.visitType === 'in-person' ? 'In-person visit' : 'Virtual tour'}</li>
        <li><strong>Branch:</strong> ${branchPreference}</li>
        <li><strong>Date:</strong> ${safeVisitDate}</li>
        <li><strong>Time:</strong> ${safeVisitTime}</li>
      </ul>
      <p>For help, call or WhatsApp us at <strong>7013392233</strong>.</p>
      <p>Thank you,<br />SURYA PG</p>
    `,
  })

  return NextResponse.json({ success: true })
}
