'use server';

import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { checkEmailExists } from '@/app/(auth)/login/action';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

// validation
const baseFormSchema = z.object({
  name: z.string(),
  email: z.string().pipe(z.string().email()),
  branchId: z.string(),
});

const addFormSchema = baseFormSchema.extend({
  password: z
    .string()
    .nonempty('필수 입력 값이에요.')
    .pipe(z.string().min(PASSWORD_MIN_LENGTH, '비밀번호는 8자 이상이어야 해요.')),
});

const updateFormSchema = baseFormSchema;

export async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      branchId: true,
    },
  });

  if (!user) {
    return null;
  }

  return user;
}

/**
 * create & update
 * @param prevState
 * @param formData
 */
export async function upsertUser(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    branchId: formData.get('branchId'),
  };

  const validatedSchema = await formSchema.safeParseAsync(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const { name, email, password, branchId } = validatedSchema.data;
  let res;

  if (formData.get('id')) {
    // update
    res = await updateUser(Number(formData.get('id')), name, email, Number(branchId));
  } else {
    // add
    res = await addUser(name, email, password, Number(branchId));
  }

  if (!res) {
    return {
      result: false,
      formErrors: ['사용자를 만들지 못했어요. 다시 시도해주세요.'],
    };
  }

  redirect('/admin/user');
}

export async function addUser(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    branchId: formData.get('branchId'),
  };

  const validatedSchema = await addFormSchema.safeParseAsync(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const { name, email, password, branchId } = validatedSchema.data;

  const exists = await checkEmailExists(email);
  if (exists) {
    throw new Error('이미 존재하는 이메일이에요.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      branchId: Number(branchId),
    },
  });
}

export async function updateUser(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    branchId: formData.get('branchId'),
  };

  const validatedSchema = await updateFormSchema.safeParseAsync(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const id = Number(formData.get('id'));
  const { name, email, branchId } = validatedSchema.data;

  return db.user.update({
    data: {
      name,
      email,
      branchId: Number(branchId),
    },
    where: {
      id,
    },
  });

  if (!res) {
    return {
      result: false,
      formErrors: ['사용자를 만들지 못했어요. 다시 시도해주세요.'],
    };
  }
}

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
