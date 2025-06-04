'use server';

import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { popupSchema } from '@/schemas/popup';
import { redirect } from 'next/navigation';

export async function getPopups() {
  const branchId = await getBranchId();

  if (!branchId) {
    return [];
  }

  return db.popup.findMany({
    where: {
      branchId,
      deleted_at: null,
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
export async function handleAddPopup(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    image: formData.get('image'),
  };

  const validatedSchema = popupSchema.safeParse(data);

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
      result: false,
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

  await db.popup.update({
    where: {
      id,
      branchId,
      deleted_at: null,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}
