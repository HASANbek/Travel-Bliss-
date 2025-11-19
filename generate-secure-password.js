/**
 * XAVFSIZ PAROL GENERATOR
 *
 * Bu script kuchli parol yaratadi
 *
 * Ishlatish:
 * node generate-secure-password.js
 */

function generateSecurePassword(length = 16) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';

    // Ensure at least one of each type
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest randomly
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

console.log('\n🔐 XAVFSIZ PAROL GENERATOR\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Generate 5 strong passwords
for (let i = 1; i <= 5; i++) {
    const password = generateSecurePassword(16);
    console.log(`${i}. ${password}`);
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('\n💡 Yuqoridagi parollardan birini tanlang va quyidagi script bilan o\'rnating:\n');
console.log('   node change-admin-password.js\n');
console.log('⚠️  MUHIM: Parolni xavfsiz joyda saqlang!\n');
