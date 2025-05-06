import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// import bcrypt from 'bcrypt';
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
