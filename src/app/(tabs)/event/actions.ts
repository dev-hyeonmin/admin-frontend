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
      order: true,
      created_at: true,
    },
    orderBy: {
      order: 'asc',
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
    items: formData.items || [],
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

    // 이벤트 아이템들 생성
    if (data.items.length > 0) {
      await db.event.createMany({
        data: data.items.map((item: any) => ({
          title: item.title,
          description: item.description,
          original_price: item.originalPrice,
          sale_price: item.salePrice,
          event_group_id: res.id,
        })),
      });
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

  // 트랜잭션으로 이벤트 그룹과 연관된 이벤트 상품들을 함께 삭제
  await db.$transaction(async (tx) => {
    // 먼저 연관된 이벤트 상품들을 삭제
    await tx.event.deleteMany({
      where: {
        event_group_id: id,
      },
    });

    // 그 다음 이벤트 그룹을 삭제
    await tx.eventGroup.delete({
      where: {
        id,
        branchId,
      },
    });
  });

  redirect('/event');
}

/**
 * UPDATE
 * @param formData
 */
export async function updateEventGroup(id: number, formData: Record<string, any>) {
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
    items: formData.items || [],
  };

  try {
    const res = await db.eventGroup.update({
      where: {
        id,
        branchId,
      },
      data: {
        title: data.title,
        start_date: new Date(data.startDate),
        end_date: new Date(data.endDate),
        image_url: '/',
      },
    });

    if (!res) {
      return {
        result: false,
        formErrors: ['이벤트 그룹을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.'],
      };
    }

    // 기존 이벤트 아이템들 삭제
    await db.event.deleteMany({
      where: {
        event_group_id: id,
      },
    });

    // 새로운 이벤트 아이템들 생성
    if (data.items.length > 0) {
      await db.event.createMany({
        data: data.items.map((item: any) => ({
          title: item.title,
          description: item.description,
          original_price: item.originalPrice,
          sale_price: item.salePrice,
          event_group_id: res.id,
        })),
      });
    }

    redirect('/event');
  } catch (error) {
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }

    console.error('이벤트 수정 중 오류가 발생했습니다:', error);
    return {
      result: false,
      formErrors: ['이벤트 그룹을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.'],
    };
  }
}

/**
 * GET
 * @param id
 */
export async function getEventGroup(id: number) {
  const branchId = await getBranchId();

  if (!branchId) {
    throw new Error('No branchId');
  }

  const result = await db.eventGroup.findUnique({
    where: {
      id,
      branchId,
    },
    include: {
      events: true,
    },
  });

  if (!result) {
    throw new Error('Event not found');
  }

  return result;
}

/**
 * UPDATE EVENT ORDER
 * @param eventIds
 */
export async function updateEventOrder(eventIds: number[]): Promise<{ success: boolean }> {
  const branchId = await getBranchId();

  if (!branchId) {
    throw new Error('No branchId');
  }

  try {
    // 트랜잭션으로 순서 업데이트
    await db.$transaction(async (tx) => {
      for (let i = 0; i < eventIds.length; i++) {
        await tx.eventGroup.update({
          where: {
            id: eventIds[i],
            branchId,
          },
          data: {
            order: i + 1,
          },
        });
      }
    });

    return { success: true };
  } catch (error) {
    console.error('이벤트 순서 업데이트 중 오류가 발생했습니다:', error);
    return { success: false };
  }
}
