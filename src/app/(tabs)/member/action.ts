'use server';

import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getBranchId } from '@/lib/session';

// validation
const formSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
});

export type MemberForm = z.infer<typeof formSchema>;

/**
 * create member
 * @param prevState
 * @param formData
 */
export async function addMembers(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  // Get current user's branch ID
  const branchId = await getBranchId();
  if (!branchId) {
    return {
      result: false,
      formErrors: ['브랜치 정보를 찾을 수 없습니다.'],
    };
  }

  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: {
      email: validatedSchema.data.email,
    },
  });

  if (existingUser) {
    return {
      result: false,
      fieldErrors: {
        email: ['이미 사용 중인 이메일입니다.'],
      },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(validatedSchema.data.password, 10);

  try {
    const res = await db.user.create({
      data: {
        name: validatedSchema.data.name,
        email: validatedSchema.data.email,
        password: hashedPassword,
        branchId: Number(branchId),
      },
    });

    if (!res) {
      return {
        result: false,
        formErrors: ['멤버를 만들지 못했어요. 다시 시도해주세요.'],
      };
    }

    redirect('/member');
  } catch (error) {
    return {
      result: false,
      formErrors: ['멤버를 만들지 못했어요. 다시 시도해주세요.'],
    };
  }
} 