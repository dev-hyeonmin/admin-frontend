'use server';

import { z } from 'zod';
import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { redirect } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
});

export type FormState = {
  title: string;
  content: string;
  error?: {
    title?: string[];
    content?: string[];
    form?: string[];
  };
};

export async function handleEditNotice(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const result = await formSchema.safeParse(data);

  if (!result.success) {
    return {
      ...data,
      error: result.error.flatten().fieldErrors,
    };
  }

  const branchId = await getBranchId();
  if (!branchId) {
    return {
      ...data,
      error: {
        form: ['로그인이 필요합니다'],
      },
    };
  }

  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    return {
      ...data,
      error: {
        form: ['잘못된 요청입니다'],
      },
    };
  }

  await db.notice.update({
    where: {
      id,
      branchId: Number(branchId),
    },
    data: {
      title: result.data.title,
      content: result.data.content,
    },
  });

  redirect('/notice');
}

export async function handleDeleteNotice(formData: FormData): Promise<void> {
  const branchId = await getBranchId();
  if (!branchId) {
    throw new Error('로그인이 필요합니다');
  }

  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    throw new Error('잘못된 요청입니다');
  }

  await db.notice.delete({
    where: {
      id,
      branchId: Number(branchId),
    },
  });

  redirect('/notice');
} 