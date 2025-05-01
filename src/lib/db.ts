import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

// const hashedPassword = await bcrypt.hash('00000000', 10);
// const data = async () => {
//   const result = await db.user.create({
//     data: {
//       email: 'admin@gmail.com',
//       name: '관리자',
//       password: hashedPassword,
//       role: 'ADMIN',
//       branchId: 1,
//     },
//   });
// };

export default db;
