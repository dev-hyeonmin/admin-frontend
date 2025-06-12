import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// import { v4 as uuidv4 } from 'uuid';
// const hashedPassword = await bcrypt.hash('00000000', 10);
// const data = async () => {
//   await db.branch.create({
//     data: {
//       name: 'ADMIN',
//       uuid: uuidv4(),
//     },
//   });
//
//   await db.user.create({
//     data: {
//       email: 'admin@gmail.com',
//       name: '관리자',
//       password: hashedPassword,
//       role: 'ADMIN',
//       branchId: 1,
//     },
//   });
// };
// data();

export default db;
