'use server';

import db from '@/lib/db';
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';
import bcrypt from 'bcrypt';
import { createSession } from '@/lib/session';
import { redirect } from 'next/navigation';

/**
 * if you want to use more validation options
 * https://zod.dev
 */

export const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .nonempty('필수 입력 값이에요.')
    .pipe(z.string().email())
    .pipe(z.string().refine(checkEmailExists, '이메일 계정을 찾을 수 없어요.')),
  password: z
    .string()
    .nonempty('필수 입력 값이에요.')
    .pipe(z.string().min(PASSWORD_MIN_LENGTH, '비밀번호는 8자 이상이어야 해요.')),
});

export const handleLogin = async (prevState: any, formData: FormData) => {
  // validation
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      ...data,
      error: result.error?.flatten().fieldErrors,
    };
  }

  // find user
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
      branchId: true,
    },
  });

  // check password
  const ok = await bcrypt.compare(result.data.password, user!.password);

  if (ok) {
    await createSession(user!.id, user!.branchId);
    redirect('/');
  } else {
    return {
      ...data,
      error: {
        password: ['비밀번호를 확인해주세요.'],
        email: [],
      },
    };
  }
};
