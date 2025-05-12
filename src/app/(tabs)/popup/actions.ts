'use server';

import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { z } from 'zod';
import { redirect } from 'next/navigation';

export async function getPopups() {
  const branchId = await getBranchId();

  if (!branchId) {
    return [];
  }

  return db.popup.findMany({
    where: {
      branchId,
    },
    select: {
      id: true,
      title: true,
      image_url: true,
      created_at: true,
    },
  });
}

/**
 * CREATE
 */
const formSchema = z.object({
  title: z.string().min(1, '팝업 제목을 입력해 주세요.'),
  image: z
    .instanceof(File)
    .refine((file) => {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      return validTypes.includes(file.type);
    }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
    .refine((file) => file.size <= 200 * 1024, '이미지 크기는 200KB 이하여야 해요.'),
});

export async function handleAddPopup(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    image: formData.get('image'),
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
    };
  }

  const branchId = await getBranchId();
  if (!branchId) {
    redirect('/');
  }

  const res = await db.popup.create({
    data: {
      title: validatedSchema.data.title,
      image_url: '/',
      branchId: Number(branchId),
    },
  });

  if (!res) {
    return {
      result: true,
      formErrors: ['팝업을 만들지 못했어요. 잠시 후 다시 시도해 주세요.'],
    };
  }

  redirect('/popup');
}

/**
 * Delete
 * @param id
 */
export async function deletePopup(id: number) {
  const branchId = await getBranchId();

  if (!branchId) {
    return;
  }

  await db.popup.delete({
    where: {
      id,
      branchId,
    },
  });
}
