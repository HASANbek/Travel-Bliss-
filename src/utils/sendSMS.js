const axios = require('axios');

/**
 * Send SMS using Eskiz.uz API
 *
 * @param {string} phone - Phone number in format +998XXXXXXXXX
 * @param {string} message - SMS message text
 * @returns {Promise<Object>} - Response from Eskiz API
 */
async function sendSMS(phone, message) {
  try {
    // Eskiz.uz API endpoint
    const ESKIZ_API = 'https://notify.eskiz.uz/api';
    const ESKIZ_EMAIL = process.env.ESKIZ_EMAIL;
    const ESKIZ_PASSWORD = process.env.ESKIZ_PASSWORD;

    // If credentials not provided, fallback to console logging
    if (!ESKIZ_EMAIL || !ESKIZ_PASSWORD) {
      console.log('\n⚠️  ESKIZ_EMAIL and ESKIZ_PASSWORD not found in .env');
      console.log('📱 ===== SMS SENT (CONSOLE MODE) =====');
      console.log(`To: ${phone}`);
      console.log(`Message: ${message}`);
      console.log('======================================\n');
      return {
        success: true,
        mode: 'console',
        message: 'SMS logged to console (Eskiz credentials not configured)'
      };
    }

    // Step 1: Get auth token from Eskiz
    console.log('🔐 Getting Eskiz auth token...');
    const authResponse = await axios.post(`${ESKIZ_API}/auth/login`, {
      email: ESKIZ_EMAIL,
      password: ESKIZ_PASSWORD
    });

    if (!authResponse.data || !authResponse.data.data || !authResponse.data.data.token) {
      throw new Error('Failed to get Eskiz auth token');
    }

    const token = authResponse.data.data.token;
    console.log('✅ Eskiz auth token received');

    // Step 2: Send SMS
    console.log(`📤 Sending SMS to ${phone}...`);

    // Clean phone number (remove + and spaces)
    const cleanPhone = phone.replace(/[\s+]/g, '');

    const smsResponse = await axios.post(
      `${ESKIZ_API}/message/sms/send`,
      {
        mobile_phone: cleanPhone,
        message: message,
        from: '4546', // Eskiz default sender (you can customize)
        callback_url: '' // Optional webhook URL
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ SMS sent successfully!');
    console.log(`📱 Message ID: ${smsResponse.data.id || 'N/A'}`);

    return {
      success: true,
      mode: 'eskiz',
      data: smsResponse.data,
      message: 'SMS sent successfully via Eskiz.uz'
    };

  } catch (error) {
    console.error('❌ SMS sending failed:', error.message);

    if (error.response) {
      console.error('Eskiz API Error:', error.response.data);
    }

    // Fallback to console if API fails
    console.log('\n📱 ===== SMS SENT (FALLBACK TO CONSOLE) =====');
    console.log(`To: ${phone}`);
    console.log(`Message: ${message}`);
    console.log('============================================\n');

    return {
      success: false,
      mode: 'console_fallback',
      error: error.message,
      message: 'SMS API failed, logged to console'
    };
  }
}

/**
 * Send OTP SMS for password reset
 *
 * @param {string} phone - Phone number
 * @param {string} otp - 6-digit OTP code
 * @param {string} userName - User's name
 * @returns {Promise<Object>}
 */
async function sendOTPSMS(phone, otp, userName = '') {
  const greeting = userName ? `Salom ${userName}!\n\n` : '';

  const message = `${greeting}Travel Bliss - Parolni tiklash

🔐 OTP KOD: ${otp}

Bu kod 10 daqiqa amal qiladi.

Agar siz bu so'rovni yubormasangiz, bu SMS'ni e'tiborsiz qoldiring.`;

  return await sendSMS(phone, message);
}

/**
 * Send OTP SMS (short version for testing)
 *
 * @param {string} phone - Phone number
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise<Object>}
 */
async function sendOTPSMSShort(phone, otp) {
  const message = `Travel Bliss\n\nOTP: ${otp}\n\nKod 10 daqiqa amal qiladi.`;

  return await sendSMS(phone, message);
}

module.exports = {
  sendSMS,
  sendOTPSMS,
  sendOTPSMSShort
};
