'use server';

import db from '@/lib/db';
import { deleteSession, getBranchId } from '@/lib/session';
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
 *
 */
const eventItemSchema = z.object({
  title: z.string().min(1, '어떤 이름으로 할까요?'),
  description: z.string().optional(),
  originalPrice: z.number().optional(),
  salePrice: z.number().min(1, '이벤트 가격은 필수 항목이에요.'),
});

export async function ValidateEventItemFrom(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    originalPrice: formData.get('originalPrice'),
    salePrice: formData.get('salePrice'),
  };

  // const validatedSchema = eventItemSchema.safeParse(data);
  //
  // if (!validatedSchema.success) {
  //   return {
  //     result: false,
  //     fieldErrors: validatedSchema.error.flatten().fieldErrors,
  //   };
  // }

  return {
    result: true,
    data: data,
  };
}

export async function addEventGroup(formData: Record<string, any>) {
  const branchId = await getBranchId();

  if (!branchId) {
    await deleteSession();
    redirect('/');
  }

  const data = {
    title: formData.title,
    startDate: formData.startDate,
    endDate: formData.endDate,
    image: formData.image,
  };

  try {
    const res = await db.eventGroup.create({
      data: {
        title: data.title,
        start_date: new Date(data.startDate),
        end_date: new Date(data.endDate),
        image_url: '/',
        branchId,
      },
    });

    if (!res) {
      return {
        result: false,
        formErrors: ['이벤트 그룹을 만들지 못했어요. 잠시 후 다시 시도해 주세요.'],
      };
    }

    redirect('/event');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      // 리디렉션 오류는 다시 던져서 처리되도록 함
      throw error;
    }

    console.error('이벤트 생성 중 오류가 발생했습니다:', error);
    return {
      result: false,
      formErrors: ['이벤트 그룹을 만들지 못했어요. 잠시 후 다시 시도해 주세요.'],
    };
  }
}

/**
 * DELETE
 * @param formData
 */
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
