'use server';

import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { uploadFile } from '@/lib/upload';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function getEvents() {
  const branchId = await getBranchId();

  if (!branchId) {
    throw new Error('No branchId');
  }

  const result = await db.eventGroup.findMany({
    where: {
      branchId,
    },
    select: {
      id: true,
      title: true,
      image_url: true,
      start_date: true,
      end_date: true,
      created_at: true,
    },
  });

  return result;
}

/**
 * CRATE
 * @param prevState
 * @param formData
 */
const formSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    startDate: z.string().min(1, '시작일을 입력해주세요'),
    endDate: z.string().min(1, '종료일을 입력해주세요'),
    // imageFile: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return new Date(data.startDate) <= new Date(data.endDate);
      }
      return true;
    },
    {
      message: '종료일은 시작일보다 이후여야 합니다',
      path: ['endDate'],
    }
  );

type CreateEventState = {
  errors?: {
    title?: string[];
    startDate?: string[];
    endDate?: string[];
  };
  success?: boolean;
  message?: string;
};

export async function createEvent(
  prevState: CreateEventState,
  formData: FormData
): Promise<CreateEventState> {
  const branchId = await getBranchId();

  if (!branchId) {
    return {
      errors: {},
      success: false,
      message: '지점 정보를 찾을 수 없습니다.',
    };
  }

  const data = {
    title: formData.get('title'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    imageFile: formData.get('imageFile'),
  };

  const validatedSchema = formSchema.safeParse(data);
  if (!validatedSchema.success) {
    return {
      errors: validatedSchema.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    await db.eventGroup.create({
      data: {
        title: validatedSchema.data.title,
        image_url: 'imageUrl',
        start_date: new Date(validatedSchema.data.startDate),
        end_date: new Date(validatedSchema.data.endDate),
        branchId,
      },
    });

    redirect('/event');
  } catch (error) {
    // NEXT_REDIRECT 오류인지 확인
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      // 리디렉션 오류는 다시 던져서 처리되도록 함
      throw error;
    }

    console.error(error);

    return {
      success: false,
      message: '이벤트 생성 중 오류가 발생했습니다.',
    };
  }
}

export async function deleteEvent(formData: FormData): Promise<void> {
  const branchId = await getBranchId();
  if (!branchId) {
    throw new Error('로그인이 필요합니다');
  }

  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    throw new Error('잘못된 요청입니다');
  }

  await db.eventGroup.delete({
    where: {
      id,
      branchId,
    },
  });

  redirect('/event');
}
