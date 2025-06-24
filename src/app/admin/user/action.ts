'use server';

import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { checkEmailExists } from '@/app/(auth)/login/action';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import { validatedAction } from '@/lib/auth';
import { redirect } from 'next/navigation';

// validation
const baseFormSchema = z.object({
  name: z.string(),
  email: z.string().pipe(z.string().email()),
  branchId: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

const addFormSchema = baseFormSchema
  .extend({
    password: z
      .string()
      .nonempty('필수 입력 값이에요.')
      .pipe(z.string().min(PASSWORD_MIN_LENGTH, '비밀번호는 8자 이상이어야 해요.')),
    confirmPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // 이 필드에 에러를 달도록 지정
    message: '비밀번호가 일치하지 않습니다.',
  });

const updateFormSchema = baseFormSchema;

export async function getUsers() {
  return db.user.findMany({
    where: {
      deleted_at: null,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
      branch: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
}

/**
 * GET
 * @param id
 */
export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
      branch: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

/**
 * POST
 * @param prevState
 * @param formData
 */
export const addUser = validatedAction(addFormSchema, addUserHandler);
async function addUserHandler(data: z.infer<typeof addFormSchema>, formData: FormData) {
  const { name, email, password, branchId } = data;

  const exists = await checkEmailExists(email);
  if (exists) {
    return {
      success: false,
      error: { email: ['이미 존재하는 이메일이에요.'] },
      data,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const res = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      branchId: Number(branchId),
    },
  });

  if (!res) {
    return {
      success: false,
      error: { formErrors: ['사용자를 만들지 못했어요. 다시 시도해주세요.'] },
      data,
    };
  }

  redirect('/admin/user');
}

/**
 * PATCH
 * @param prevState
 * @param formData
 */
export const updateUser = validatedAction(updateFormSchema, updateUserHandler);
export async function updateUserHandler(
  data: z.infer<typeof updateFormSchema>,
  formData: FormData
) {
  const id = Number(formData.get('id'));
  const { name, email, password, confirmPassword, branchId } = data;

  if (!id) {
    return {
      success: false,
      error: { formErrors: ['사용자 id를 찾을 수 없어요.'] },
      data,
    };
  }

  const updateData: any = {
    name,
    email,
    branchId: Number(branchId),
  };

  // 비밀번호가 입력된 경우에만 처리
  if (password) {
    if (password !== confirmPassword) {
      return {
        success: false,
        error: { confirmPassword: ['비밀번호가 일치하지 않습니다.'] },
        data,
      };
    }

    updateData.password = await bcrypt.hash(password, 10);
  }

  const res = await db.user.update({
    data: updateData,
    where: { id },
  });

  if (!res) {
    return {
      success: false,
      error: { formErrors: ['사용자 정보를 수정하지 못했어요. 다시 시도해주세요.'] },
      data,
    };
  }

  redirect('/admin/user');
}

/**
 * DELETE
 * @param id
 */
export async function deleteUser(id: number) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}
