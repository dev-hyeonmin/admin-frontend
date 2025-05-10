'use server';

import db from '@/lib/db';
import { getBranchId } from '@/lib/session';
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
