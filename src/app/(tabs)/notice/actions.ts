'use server';

import { z } from 'zod';
import { getBranchId } from '@/lib/session';
import { redirect } from 'next/navigation';
import db from '@/lib/db';

const formSchema = z
  .object({
    title: z.string().min(1, '팝업 제목을 입력해 주세요.'),

    content: z.string().max(1000, '내용은 1000자 이하여야 합니다.').optional().or(z.literal('')), // 빈 문자열도 optional로 허용

    image_url: z
      .any()
      .optional()
      .refine(
        (file) => {
          if (!file.size) return true; // 파일이 없으면 검증 건너뛰기
          if (!(file instanceof File) || file.size === 0) return false;

          const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
          return validTypes.includes(file.type);
        },
        { message: 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.' }
      )
      .refine(
        (file) => {
          if (!file) return true; // 파일이 없으면 검증 건너뛰기
          return file.size <= 200 * 1024;
        },
        { message: '이미지 크기는 200KB 이하여야 해요.' }
      ),
  })
  .superRefine((data, ctx) => {
    if (
      (!data.content || data.content.trim() === '') &&
      (!data.image_url || data.image_url.size === 0)
    ) {
      ctx.addIssue({
        code: 'custom',
        message: '내용과 이미지 중 하나는 반드시 입력해 주세요.',
        path: ['content', 'image'],
      });
    }
  });

interface UpsertActionState {
  success: boolean;
  data?: {
    id?: string;
    title?: string | null;
    content?: string | null;
    image_url?: File | null;
  };
  errors?: {
    formErrors?: string[];
    title?: string[];
    content?: string[];
    image_url?: string[];
  };
}

export async function getNotice(id: number) {
  const notice = await db.notice.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      image_url: true,
      is_pinned: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!notice) {
    return null;
  }

  return notice;
}

/**
 * CREATE & UPDATE
 */
export async function upsertNotice(
  prevState: UpsertActionState,
  formData: FormData
): Promise<UpsertActionState> {
  const data = {
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    image_url: formData.get('image_url') as File,
  };

  console.log(data.image_url);
  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      success: false,
      errors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  let res;
  const branchId = await getBranchId();
  const id = Number(formData.get('id'));
  const { title, content, image_url } = validatedSchema.data;

  if (!branchId) {
    return {
      success: false,
      errors: { formErrors: ['지점 ID를 찾을 수 없습니다'] },
      data,
    };
  }

  if (formData.get('id')) {
    // update
    res = await updateNotice(branchId, id, title, content, image_url);
  } else {
    // add
    res = await addNotice(branchId, title, content, image_url);
  }

  if (!res) {
    return {
      success: false,
      errors: { formErrors: ['다시 시도해주세요.'] },
      data,
    };
  }

  redirect('/notice');
}

export async function addNotice(
  branchId: number,
  title: string,
  content?: string,
  image_url?: File
) {
  // TODO upload image
  // let imageUrl;
  // if (data.image) {
  // 이미지 업로드 로직 구현 필요 (예: S3 or 클라우드 스토리지)
  // imageUrl = await uploadImage(data.image);
  // }

  return db.notice.create({
    data: {
      title: title,
      content: content,
      image_url: '/',
      branchId: branchId,
    },
  });
}

/**
 * UPDATE
 */
export async function updateNotice(
  branchId: number,
  id: number,
  title: string,
  content?: string,
  image_url?: File
) {
  // TODO upload image
  // let imageUrl;
  // if (data.image) {
  // imageUrl = await uploadImage(data.image);
  // }

  return db.notice.update({
    where: {
      id,
      branchId: branchId,
    },
    data: {
      title: title,
      content: content,
      image_url: '/', // 이미지 URL 저장
    },
  });
}

/**
 * Delete
 */
export async function handleDeleteNotice(formData: FormData): Promise<void> {
  const branchId = await getBranchId();
  if (!branchId) {
    throw new Error('로그인이 필요합니다');
  }

  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    throw new Error('잘못된 요청입니다');
  }

  await db.notice.delete({
    where: {
      id,
      branchId: Number(branchId),
    },
  });

  redirect('/notice');
}
