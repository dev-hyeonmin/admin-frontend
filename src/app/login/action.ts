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
 * nomadcoder #6.2
 */

const checkEmailExists = async (email: string) => {
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
    .nonempty()
    .pipe(z.string().email())
    .pipe(z.string().refine(checkEmailExists, 'An account with this email does not exist.')),
  password: z
    .string()
    .nonempty()
    .pipe(z.string().min(PASSWORD_MIN_LENGTH, '비밀번호는 최소 8자 이상이어야 합니다')),
});

export const handleLogin = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = await formSchema.spa(data);

  if (!result.success) {
    return {
      ...data,
      error: result.error?.flatten().fieldErrors,
    };
  }

  /**
   * TODO login
   * 1. find user by id
   * 2. create session
   */
  const user = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  const ok = await bcrypt.compare(result.data.password, user!.password);

  if (ok) {
    const session = await createSession(user!.id);
    redirect('/popup');
  } else {
    return {
      ...data,
      error: {
        password: ['Wrong password.'],
        email: [],
      },
    };
  }
};
