'use server';

import { z } from 'zod';
import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

const formSchema = z.object({
  title: z.string().nonempty(),
});

export async function handleAddPopup(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      errors: validatedSchema.error.flatten().fieldErrors,
    };
  }

  const branchId = await getBranchId();
  if (!branchId) {
    return {
      errors: [],
    };
  }

  try {
    await db.popup.create({
      data: {
        title: validatedSchema.data.title,
        image_url: 'temp',
        branchId: Number(branchId),
      },
    });

    redirect('/popup');
  } catch (error) {
    // NEXT_REDIRECT 오류인지 확인
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      // 리디렉션 오류는 다시 던져서 처리되도록 함
      throw error;
    }

    // Prisma 오류나 다른 오류만 처리
    console.error('팝업 생성 중 오류 발생:', error);
    return {
      errors: {
        _form: ['팝업 생성 중 오류가 발생했습니다. 다시 시도해주세요.'],
      },
    };
  }
}
