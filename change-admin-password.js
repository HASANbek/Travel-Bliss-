const bcrypt = require('bcryptjs');
const FileStorage = require('./src/utils/fileStorage');

/**
 * ADMIN PAROLINI O'ZGARTIRISH SCRIPTI
 *
 * Bu script admin parolini o'zgartiradi
 *
 * Ishlatish:
 * node change-admin-password.js
 */

async function changeAdminPassword() {
    try {
        console.log('🔐 Admin parolini o\'zgartirish...\n');

        const usersStorage = new FileStorage('users.json');

        // Admin foydalanuvchini topish
        const users = await usersStorage.findAll();
        const admin = users.find(u => u.email === 'admin@travelbliss.uz');

        if (!admin) {
            console.log('❌ Admin foydalanuvchi topilmadi!');
            console.log('Avval admin yaratish: node create-admin.js\n');
            process.exit(1);
        }

        // Yangi parol kiritish
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Yangi parolni kiriting (kamida 8 ta belgi): ', async (newPassword) => {
            rl.close();

            // Validatsiya
            if (!newPassword || newPassword.length < 8) {
                console.log('\n❌ Parol kamida 8 ta belgidan iborat bo\'lishi kerak!\n');
                process.exit(1);
            }

            // Parolni hash qilish
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Parolni yangilash
            admin.password = hashedPassword;
            admin.updatedAt = new Date();

            await usersStorage.update(admin.id, {
                password: hashedPassword,
                updatedAt: new Date()
            });

            console.log('\n✅ Admin paroli muvaffaqiyatli o\'zgartirildi!\n');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('📧 Email:       admin@travelbliss.uz');
            console.log('🔑 Yangi Parol: ' + '*'.repeat(newPassword.length) + ' (xavfsiz)');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            console.log('💡 Endi login sahifasiga kiring va yangi parol bilan kirish qiling:\n');
            console.log('   http://localhost:4000/gofly/admin-login.html\n');

            process.exit(0);
        });

    } catch (error) {
        console.error('❌ Xato:', error.message);
        process.exit(1);
    }
}

changeAdminPassword();
