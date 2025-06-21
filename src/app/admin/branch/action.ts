'use server';

import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { z } from 'zod';

// validation
const formSchema = z.object({
  name: z.string(),
});

export type BranchForm = z.infer<typeof formSchema>;

export async function getBranches() {
  return db.branch.findMany({
    where: {
      deleted_at: null,
    },
    orderBy: {
      name: 'asc',
    },
  });
}

export async function getBranch(id: number) {
  const branch = await db.branch.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      created_at: true,
    },
  });

  if (!branch) {
    return null;
  }

  return branch;
}

/**
 * create & update
 * @param prevState
 * @param formData
 */
export async function upsertBranch(prevState: any, formData: FormData) {
  const data = {
    name: formData.get('name'),
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const validatedName = validatedSchema.data.name;
  let res;

  if (formData.get('id')) {
    // update
    res = await updateBranch(Number(formData.get('id')), validatedName);
  } else {
    // add
    res = await addBranch(validatedName);
  }

  if (!res) {
    return {
      result: false,
      formErrors: ['지점을 만들지 못했어요. 다시 시도해주세요.'],
    };
  }

  redirect('/admin/branch');
}

export async function addBranch(name: string) {
  return db.branch.create({
    data: {
      name: name,
    },
  });
}

export async function updateBranch(id: number, name: string) {
  return db.branch.update({
    data: {
      name: name,
    },
    where: {
      id,
    },
  });
}

export async function deleteBranch(id: number) {
  return db.branch.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
}
