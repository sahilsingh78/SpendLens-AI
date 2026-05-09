import { Resend } from "resend";
import { AuditResult } from "@/lib/types";
import {
  APP_URL,
  CREDEX_CONSULT_URL,
  FROM_EMAIL,
  THRESHOLD_HIGH_SAVINGS,
} from "@/lib/constants";
import { formatCurrencyFull } from "@/lib/helpers";

/* =========================================
   Resend Client — lazy, never runs at build time
========================================= */

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is missing");
  return new Resend(key);
}

/* =========================================
   Send Audit Email
========================================= */

export async function sendAuditEmail(
  email: string,
  audit: AuditResult
): Promise<void> {
  const resend = getResendClient();

  const isHighSavings =
    audit.totalMonthlySavings >= THRESHOLD_HIGH_SAVINGS;

  const shareUrl = `${APP_URL}/audit/${audit.id}`;

  /* =========================================
     Recommendations HTML
  ========================================= */

  const recommendationRows = audit.recommendations
    .map(
      (rec) => `
<tr>
  <td style="padding:10px;border-bottom:1px solid #222;color:#f5f5f5;">
    ${rec.toolName}
  </td>
  <td style="padding:10px;border-bottom:1px solid #222;color:#888;text-transform:capitalize;">
    ${rec.action}
  </td>
  <td style="
    padding:10px;
    border-bottom:1px solid #222;
    color:${rec.monthlySavings > 0 ? "#00ff88" : "#888"};
    font-weight:700;
  ">
    ${rec.monthlySavings > 0
      ? `${formatCurrencyFull(rec.monthlySavings)}/mo`
      : "Optimal"}
  </td>
</tr>
`
    )
    .join("");

  /* =========================================
     HTML Email
  ========================================= */

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SpendLens Audit</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#0a0a0a;
  color:#f5f5f5;
  font-family:Arial,sans-serif;
">
  <div style="max-width:640px;margin:0 auto;padding:40px 24px;">

    <!-- Logo -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:32px;">
      <div style="
        width:38px;
        height:38px;
        border-radius:10px;
        background:#00ff88;
        color:#000;
        font-weight:900;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:18px;
      ">
        S
      </div>
      <div>
        <div style="font-size:18px;font-weight:800;">SpendLens</div>
        <div style="font-size:12px;color:#777;">AI Spend Audit</div>
      </div>
    </div>

    <!-- Hero -->
    <h1 style="font-size:36px;line-height:1.1;margin:0 0 10px;">
      ${audit.totalMonthlySavings > 0
        ? `You could save ${formatCurrencyFull(audit.totalMonthlySavings)}/month`
        : "Your AI stack looks optimized"}
    </h1>

    <p style="color:#888;font-size:16px;line-height:1.7;margin-bottom:32px;">
      ${audit.totalMonthlySavings > 0
        ? `We identified ${formatCurrencyFull(audit.totalAnnualSavings)}/year in potential savings across your AI tooling stack.`
        : `No major pricing inefficiencies were identified across your current stack.`}
    </p>

    <!-- Summary -->
    <div style="
      background:#111;
      border:1px solid #222;
      border-radius:16px;
      padding:24px;
      margin-bottom:32px;
    ">
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
        <span style="color:#888;">Current spend</span>
        <span style="color:#f5f5f5;font-weight:700;">
          ${formatCurrencyFull(audit.totalMonthlySpend)}/mo
        </span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;">
        <span style="color:#888;">Potential savings</span>
        <span style="color:#00ff88;font-weight:700;">
          ${formatCurrencyFull(audit.totalMonthlySavings)}/mo
        </span>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span style="color:#888;">Annual impact</span>
        <span style="color:#00ff88;font-weight:700;">
          ${formatCurrencyFull(audit.totalAnnualSavings)}/yr
        </span>
      </div>
    </div>

    <!-- Recommendations -->
    <table style="
      width:100%;
      border-collapse:collapse;
      background:#111;
      border:1px solid #222;
      border-radius:16px;
      overflow:hidden;
      margin-bottom:32px;
    ">
      <thead>
        <tr style="background:#151515;">
          <th style="text-align:left;padding:12px;color:#888;font-size:12px;">Tool</th>
          <th style="text-align:left;padding:12px;color:#888;font-size:12px;">Action</th>
          <th style="text-align:left;padding:12px;color:#888;font-size:12px;">Savings</th>
        </tr>
      </thead>
      <tbody>
        ${recommendationRows}
      </tbody>
    </table>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      
        href="${shareUrl}"
        style="
          display:inline-block;
          background:#00ff88;
          color:#000;
          padding:14px 28px;
          border-radius:12px;
          text-decoration:none;
          font-weight:800;
        "
      >
        View Full Audit →
      </a>
    </div>

    <!-- Credex CTA -->
    ${isHighSavings ? `
    <div style="
      background:#001a0d;
      border:1px solid rgba(0,255,136,0.2);
      border-radius:16px;
      padding:24px;
      margin-bottom:32px;
    ">
      <div style="color:#00ff88;font-weight:800;margin-bottom:8px;">
        💡 Additional savings available through Credex
      </div>
      <p style="color:#888;font-size:14px;line-height:1.7;margin-bottom:18px;">
        Credex helps startups access discounted Anthropic and OpenAI credits
        at significantly lower rates. Same official API endpoints.
      </p>
      
        href="${CREDEX_CONSULT_URL}?ref=spendlens&savings=${audit.totalMonthlySavings}"
        style="
          display:inline-block;
          background:#00ff88;
          color:#000;
          padding:12px 20px;
          border-radius:10px;
          text-decoration:none;
          font-weight:700;
        "
      >
        Book Free Consultation →
      </a>
    </div>
    ` : ""}

    <!-- Footer -->
    <div style="
      border-top:1px solid #222;
      padding-top:24px;
      text-align:center;
      color:#666;
      font-size:12px;
      line-height:1.8;
    ">
      SpendLens by Credex<br />
      AI spend optimization for startups
    </div>

  </div>
</body>
</html>`;

  /* =========================================
     Plain Text
  ========================================= */

  const text = `
SpendLens Audit

Monthly Savings: ${formatCurrencyFull(audit.totalMonthlySavings)}/month
Annual Savings: ${formatCurrencyFull(audit.totalAnnualSavings)}/year

View Audit: ${shareUrl}
`;

  /* =========================================
     Subject
  ========================================= */

  const subject =
    audit.totalMonthlySavings > 0
      ? `SpendLens Audit: ${formatCurrencyFull(audit.totalMonthlySavings)}/mo savings identified`
      : "Your SpendLens audit is ready";

  /* =========================================
     Send Email
  ========================================= */

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject,
    html,
    text,
    replyTo: "hello@credex.rocks",
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
}