const nodemailer = require('nodemailer');

/**
 * Create email transporter
 * Uses Gmail SMTP or falls back to console logging for development
 */
function createTransporter() {
  const EMAIL_USER = process.env.EMAIL_USER;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

  // If credentials not provided, return console logger
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    return {
      sendMail: async (mailOptions) => {
        console.log('\n📧 ===== EMAIL SENT (CONSOLE MODE) =====');
        console.log(`From: ${mailOptions.from}`);
        console.log(`To: ${mailOptions.to}`);
        console.log(`Subject: ${mailOptions.subject}`);
        console.log('--- EMAIL BODY ---');
        console.log(mailOptions.html || mailOptions.text);
        console.log('========================================\n');
        return { success: true, mode: 'console' };
      }
    };
  }

  // Create real transporter with Gmail
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  });
}

/**
 * Send email
 *
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML email body
 * @param {string} options.text - Plain text email body (optional)
 * @returns {Promise<Object>}
 */
async function sendEmail({ to, subject, html, text }) {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Travel Bliss" <${process.env.EMAIL_USER || 'noreply@travelbliss.uz'}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent to ${to}`);

    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);

    // Fallback to console
    console.log('\n📧 ===== EMAIL SENT (FALLBACK TO CONSOLE) =====');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('--- EMAIL BODY ---');
    console.log(html);
    console.log('===============================================\n');

    return {
      success: false,
      error: error.message,
      mode: 'console_fallback'
    };
  }
}

/**
 * Send booking confirmation email to customer
 *
 * @param {Object} booking - Booking details
 * @returns {Promise<Object>}
 */
async function sendBookingConfirmationEmail(booking) {
  const subject = `Buyurtma tasdiqlandi - ${booking.tourName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #0F16E6 0%, #667eea 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border-radius: 0 0 10px 10px;
        }
        .booking-details {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .detail-label {
            font-weight: bold;
            color: #666;
        }
        .detail-value {
            color: #333;
        }
        .total {
            font-size: 24px;
            font-weight: bold;
            color: #0F16E6;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #666;
            font-size: 12px;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Buyurtmangiz qabul qilindi!</h1>
            <p>Travel Bliss bilan sayohat qiling</p>
        </div>

        <div class="content">
            <p>Hurmatli <strong>${booking.customerName}</strong>,</p>

            <p>Sizning buyurtmangiz muvaffaqiyatli qabul qilindi. Quyida buyurtma tafsilotlari:</p>

            <div class="booking-details">
                <h2 style="color: #0F16E6; margin-top: 0;">📋 Buyurtma Tafsilotlari</h2>

                <div class="detail-row">
                    <span class="detail-label">Buyurtma ID:</span>
                    <span class="detail-value">${booking.id}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Tur nomi:</span>
                    <span class="detail-value">${booking.tourName}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Sana:</span>
                    <span class="detail-value">${new Date(booking.date).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Mehmonlar:</span>
                    <span class="detail-value">${booking.guests.adults} kattalar${booking.guests.children > 0 ? `, ${booking.guests.children} bolalar` : ''}</span>
                </div>

                <div class="detail-row">
                    <span class="detail-label">Telefon:</span>
                    <span class="detail-value">${booking.customerPhone}</span>
                </div>

                <div class="detail-row" style="border-bottom: none;">
                    <span class="detail-label">Holat:</span>
                    <span class="detail-value" style="color: #ff9800; font-weight: bold;">Kutilmoqda</span>
                </div>
            </div>

            <div class="total">
                💰 Jami: $${booking.totalPrice}
            </div>

            <p>Bizning menejerlarimiz tez orada siz bilan bog'lanadi va buyurtmani tasdiqlaydi.</p>

            <p>Agar savollaringiz bo'lsa, biz bilan bog'laning:</p>
            <ul>
                <li>📧 Email: info@travelbliss.uz</li>
                <li>📱 Telefon: +998 90 123 45 67</li>
            </ul>
        </div>

        <div class="footer">
            <p>© 2025 Travel Bliss. Barcha huquqlar himoyalangan.</p>
            <p>Bu avtomatik xabar. Iltimos, javob bermang.</p>
        </div>
    </div>
</body>
</html>
  `;

  return await sendEmail({
    to: booking.customerEmail,
    subject,
    html
  });
}

/**
 * Send new booking notification to admin
 *
 * @param {Object} booking - Booking details
 * @returns {Promise<Object>}
 */
async function sendAdminBookingNotification(booking) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@travelbliss.uz';
  const subject = `🔔 Yangi buyurtma - ${booking.tourName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #0F16E6 0%, #667eea 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px 20px;
        }
        .booking-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #0F16E6;
        }
        .detail-row {
            padding: 8px 0;
        }
        .label {
            font-weight: bold;
            color: #666;
            display: inline-block;
            width: 150px;
        }
        .value {
            color: #333;
        }
        .action-button {
            display: inline-block;
            padding: 12px 30px;
            background: #0F16E6;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
            font-weight: bold;
        }
        .total-amount {
            font-size: 28px;
            font-weight: bold;
            color: #0F16E6;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 Yangi Buyurtma!</h1>
            <p>Mijozdan yangi tur buyurtmasi</p>
        </div>

        <div class="content">
            <div class="booking-card">
                <h2 style="color: #0F16E6; margin-top: 0;">📋 Buyurtma Ma'lumotlari</h2>

                <div class="detail-row">
                    <span class="label">Buyurtma ID:</span>
                    <span class="value">${booking.id}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Tur:</span>
                    <span class="value">${booking.tourName}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Mijoz:</span>
                    <span class="value">${booking.customerName}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span class="value">${booking.customerEmail}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Telefon:</span>
                    <span class="value">${booking.customerPhone}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Sana:</span>
                    <span class="value">${new Date(booking.date).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                </div>

                <div class="detail-row">
                    <span class="label">Mehmonlar:</span>
                    <span class="value">${booking.guests.adults} kattalar${booking.guests.children > 0 ? `, ${booking.guests.children} bolalar` : ''}</span>
                </div>

                <div class="total-amount">
                    💰 Jami: $${booking.totalPrice}
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <a href="http://localhost:4000/admin#bookings" class="action-button">
                        Admin Panelga O'tish
                    </a>
                </div>
            </div>

            <p style="color: #666; font-size: 14px;">
                ⏰ Buyurtma vaqti: ${new Date(booking.createdAt).toLocaleString('uz-UZ')}
            </p>
        </div>
    </div>
</body>
</html>
  `;

  return await sendEmail({
    to: adminEmail,
    subject,
    html
  });
}

/**
 * Send booking confirmation notification to customer
 *
 * @param {Object} booking - Booking details
 * @returns {Promise<Object>}
 */
async function sendBookingConfirmedNotification(booking) {
  const subject = `✅ Buyurtmangiz tasdiqlandi - ${booking.tourName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #4caf50 0%, #8bc34a 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border-radius: 0 0 10px 10px;
        }
        .success-icon {
            font-size: 60px;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✅ Buyurtma Tasdiqlandi!</h1>
        </div>

        <div class="content">
            <div class="success-icon">🎉</div>

            <p>Hurmatli <strong>${booking.customerName}</strong>,</p>

            <p>Sizning <strong>${booking.tourName}</strong> buyurtmangiz tasdiqlandi!</p>

            <p><strong>📅 Sana:</strong> ${new Date(booking.date).toLocaleDateString('uz-UZ', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>

            <p><strong>👥 Mehmonlar:</strong> ${booking.guests.adults} kattalar${booking.guests.children > 0 ? `, ${booking.guests.children} bolalar` : ''}</p>

            <p><strong>💰 Jami:</strong> $${booking.totalPrice}</p>

            <p>Biz tez orada siz bilan bog'lanib, qo'shimcha ma'lumotlar beramiz.</p>

            <p>Yaxshi sayohat!</p>

            <p>Hurmat bilan,<br><strong>Travel Bliss jamoasi</strong></p>
        </div>
    </div>
</body>
</html>
  `;

  return await sendEmail({
    to: booking.customerEmail,
    subject,
    html
  });
}

/**
 * Send booking cancellation notification to customer
 *
 * @param {Object} booking - Booking details
 * @returns {Promise<Object>}
 */
async function sendBookingCancelledNotification(booking) {
  const subject = `❌ Buyurtma bekor qilindi - ${booking.tourName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #f44336 0%, #e91e63 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px 10px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px 20px;
            border-radius: 0 0 10px 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>❌ Buyurtma Bekor Qilindi</h1>
        </div>

        <div class="content">
            <p>Hurmatli <strong>${booking.customerName}</strong>,</p>

            <p>Sizning <strong>${booking.tourName}</strong> buyurtmangiz bekor qilindi.</p>

            <p><strong>Buyurtma ID:</strong> ${booking.id}</p>

            <p>Agar bu xato bo'lsa yoki savollaringiz bo'lsa, biz bilan bog'laning:</p>
            <ul>
                <li>📧 Email: info@travelbliss.uz</li>
                <li>📱 Telefon: +998 90 123 45 67</li>
            </ul>

            <p>Hurmat bilan,<br><strong>Travel Bliss jamoasi</strong></p>
        </div>
    </div>
</body>
</html>
  `;

  return await sendEmail({
    to: booking.customerEmail,
    subject,
    html
  });
}

module.exports = {
  sendEmail,
  sendBookingConfirmationEmail,
  sendAdminBookingNotification,
  sendBookingConfirmedNotification,
  sendBookingCancelledNotification
};
