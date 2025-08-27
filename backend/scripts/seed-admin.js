require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // ✅ correct path to your db.js
const { QueryTypes } = require('sequelize');

(async () => {
  try {
    const name = 'System Administrator Default ADMIN';
    const email = 'admin@example.com';
    const address = 'HQ';
    const rawPass = 'Admin@123';

    const hash = await bcrypt.hash(rawPass, 12);

    // check if user exists
    const rows = await db.query(
      'SELECT id FROM users WHERE email = :email',
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (!rows.length) {
      await db.query(
        'INSERT INTO users (name, email, address, password, role) VALUES (:name, :email, :address, :password, "ADMIN")',
        {
          replacements: { name, email, address, password: hash },
          type: QueryTypes.INSERT,
        }
      );
      console.log('✅ Admin seeded:', email, 'password:', rawPass);
    } else {
      await db.query(
        'UPDATE users SET role="ADMIN", password=:password WHERE email=:email',
        {
          replacements: { password: hash, email },
          type: QueryTypes.UPDATE,
        }
      );
      console.log('🔄 Admin updated:', email, 'password reset to:', rawPass);
    }

    process.exit(0);
  } catch (e) {
    console.error('❌ Error:', e);
    process.exit(1);
  }
})();
