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
 */
const formSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    startDate: z.string().min(1, '시작일을 입력해주세요'),
    endDate: z.string().min(1, '종료일을 입력해주세요'),
    image: z
      .instanceof(File)
      .refine((file) => {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
      }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
      .refine((file) => file.size <= 200 * 1024, '이미지 크기는 200KB 이하여야 해요.'),
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

export async function AddEventGroup(prevState: any, formData: FormData) {
  const branchId = await getBranchId();

  if (!branchId) {
    await deleteSession();
    redirect('/');
  }

  const data = {
    title: formData.get('title'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
    image: formData.get('image'),
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
    };
  }

  const res = await db.eventGroup.create({
    data: {
      title: validatedSchema.data.title,
      image_url: 'imageUrl',
      start_date: new Date(validatedSchema.data.startDate),
      end_date: new Date(validatedSchema.data.endDate),
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
