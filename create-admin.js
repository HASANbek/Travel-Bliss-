const bcrypt = require('bcryptjs');
const FileStorage = require('./src/utils/fileStorage');

/**
 * DEFAULT ADMIN YARATISH SCRIPTI
 *
 * Bu script admin foydalanuvchisini yaratadi:
 * Email: admin@travelbliss.uz
 * Parol: admin123
 *
 * MUHIM: Production'da parolni o'zgartiring!
 */

async function createAdmin() {
    try {
        console.log('🔐 Admin foydalanuvchi yaratilmoqda...\n');

        const usersStorage = new FileStorage('users.json');

        // Eski adminlarni tekshirish
        const existingUsers = await usersStorage.findAll();
        const adminExists = existingUsers.find(u => u.email === 'admin@travelbliss.uz');

        if (adminExists) {
            console.log('⚠️  Admin foydalanuvchi allaqachon mavjud!');
            console.log('📧 Email: admin@travelbliss.uz');
            console.log('🔑 Parol: admin123 (agar o\'zgartirilmagan bo\'lsa)\n');
            return;
        }

        // Parolni hash qilish
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        // Admin yaratish
        const admin = {
            id: '1',
            name: 'Admin',
            email: 'admin@travelbliss.uz',
            phone: '+998901234567',
            password: hashedPassword,
            role: 'admin',
            avatar: 'default-avatar.png',
            isEmailVerified: true,
            isPhoneVerified: true,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await usersStorage.create(admin);

        console.log('✅ Admin foydalanuvchi muvaffaqiyatli yaratildi!\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📧 Email:    admin@travelbliss.uz');
        console.log('🔑 Parol:    admin123');
        console.log('👤 Rol:      Admin');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('⚠️  DIQQAT: Production da parolni o\'zgartiring!\n');
        console.log('Login sahifa: http://localhost:4000/admin/login\n');

    } catch (error) {
        console.error('❌ Xato:', error.message);
        process.exit(1);
    }
}

createAdmin();
