'use server';

import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

// validation
const formSchema = z.object({
  name: z.string(),
});

export type BranchForm = z.infer<typeof formSchema>;

/**
 * create
 * @param prevState
 * @param formData
 */
export async function addBranch(prevState: any, formData: FormData) {
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

  const res = await db.branch.create({
    data: {
      name: validatedSchema.data.name,
      uuid: uuidv4(),
    },
  });

  if (!res) {
    return {
      result: false,
      formErrors: ['지점을 만들지 못했어요. 다시 시도해주세요.'],
    };
  }

  redirect('/branch');
}
