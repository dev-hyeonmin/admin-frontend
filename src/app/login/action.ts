'use server';

import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

/**
 * if you want to use more validation options
 * https://zod.dev
 * nomadcoder #6.2
 */

const formSchema = z.object({
  email: z.string().trim().nonempty().pipe(z.string().email()),
  password: z
    .string()
    .trim()
    .nonempty()
    .pipe(z.string().min(PASSWORD_MIN_LENGTH, '비밀번호는 최소 8자 이상이어야 합니다')),
});

export const handleLogin = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      ...data,
      error: result.error?.flatten().fieldErrors,
    };
  }
};
