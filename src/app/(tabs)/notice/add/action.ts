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

export async function handleAddNotice(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const result = await formSchema.spa(data);

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

  await db.notice.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      branchId: Number(branchId),
    },
  });

  redirect('/notice');
}
