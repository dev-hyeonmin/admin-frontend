'use server';

import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const popupSchema = z.object({
  title: z.string().min(1, '팝업 제목을 입력해 주세요.'),
  image: z
    .instanceof(File)
    .refine((file) => {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      return validTypes.includes(file.type);
    }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
    .refine((file) => file.size <= 200 * 1024, '이미지 크기는 200KB 이하여야 해요.'),
});

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
      order: true,
      created_at: true,
    },
    orderBy: {
      order: 'asc',
    },
  });
}

/**
 * CREATE
 */
export async function handleAddPopup(prevState: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    image: formData.get('image') as File,
  };

  const validatedSchema = popupSchema.safeParse(data);
  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
    };
  }

  const branchId = 1; //await getBranchId();
  if (!branchId) {
    redirect('/');
  }

  // 현재 가장 큰 order 값을 찾아서 새 팝업의 order 값을 설정
  const lastPopup = await db.popup.findFirst({
    where: {
      branchId,
      deleted_at: null,
    },
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });

  const nextOrder = lastPopup ? lastPopup.order + 1 : 0;

  const res = await db.popup.create({
    data: {
      title: validatedSchema.data.title,
      image_url: '/',
      order: nextOrder,
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

/**
 * Update popup order
 */
export async function updatePopupOrder(popupIds: number[]) {
  const branchId = await getBranchId();

  if (!branchId) {
    return { success: false, message: 'Branch ID not found' };
  }

  try {
    // 각 팝업의 순서를 업데이트
    const updatePromises = popupIds.map((id, index) =>
      db.popup.update({
        where: {
          id,
          branchId,
          deleted_at: null,
        },
        data: {
          order: index,
        },
      })
    );

    await Promise.all(updatePromises);

    return { success: true, message: 'Popup order updated successfully' };
  } catch (error) {
    console.error('Error updating popup order:', error);
    return { success: false, message: 'Failed to update popup order' };
  }
}
