'use server';

import { z } from 'zod';
import { getBranchId } from '@/lib/session';
import { redirect } from 'next/navigation';
import db from '@/lib/db';

/**
 * CREATE
 */
const formSchema = z
  .object({
    // title은 필수값
    title: z.string().min(1, '팝업 제목을 입력해 주세요.'),

    // content는 선택적이지만, 입력 시 최소/최대 길이 검증
    content: z
      .string()
      .min(1, '내용을 입력해 주세요.')
      .max(1000, '내용은 1000자 이하여야 합니다.')
      .optional(),

    // image는 선택적이지만, 입력 시 파일 타입과 크기 검증
    image: z
      .instanceof(File)
      .refine((file) => {
        // File 객체이면서 크기가 0보다 큰 경우에만 체크
        if (!(file instanceof File) || file.size === 0) return false;

        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return validTypes.includes(file.type);
      }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
      .refine((file) => file.size <= 200 * 1024, '이미지 크기는 200KB 이하여야 해요.')
      .optional(),
  })
  .superRefine((data, ctx) => {
    // content와 image 중 하나는 반드시 입력되어야 함
    if ((!data.content || data.content.trim() === '') && (!data.image || data.image.size === 0)) {
      ctx.addIssue({
        code: 'custom',
        message: '내용과 이미지 중 하나는 반드시 입력해 주세요.',
        path: ['content', 'image'],
      });
    }
  });

export async function handleAddNotice(prevState: any, formData: FormData) {
  // 실제 데이터 추출 시 빈 파일 처리
  const data = {
    title: formData.get('title') as string,
    content: (formData.get('content') as string) || undefined,
    image:
      formData.get('image') instanceof File && (formData.get('image') as File).size > 0
        ? (formData.get('image') as File)
        : undefined,
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const branchId = await getBranchId();
  if (!branchId) {
    redirect('/');
  }

  // TODO upload image
  // let imageUrl;
  // if (data.image) {
  // 이미지 업로드 로직 구현 필요 (예: S3 or 클라우드 스토리지)
  // imageUrl = await uploadImage(data.image);
  // }

  const res = await db.notice.create({
    data: {
      title: validatedSchema.data.title,
      content: validatedSchema.data.content,
      image_url: '/', // 이미지 URL 저장
      branchId: Number(branchId),
    },
  });

  if (!res) {
    return {
      result: false,
      formErrors: ['공지사항을 만들지 못했어요. 잠시 후 다시 시도해 주세요.'],
    };
  }

  redirect('/notice');
}

/**
 * UPDATE
 */
export async function handleEditNotice(prevState: any, formData: FormData) {
  // 실제 데이터 추출 시 빈 파일 처리
  const data = {
    id: Number(formData.get('id')),
    title: formData.get('title') as string,
    content: (formData.get('content') as string) || undefined,
    image:
      formData.get('image') instanceof File && (formData.get('image') as File).size > 0
        ? (formData.get('image') as File)
        : undefined,
  };

  const validatedSchema = formSchema.safeParse(data);

  if (!validatedSchema.success) {
    return {
      result: false,
      fieldErrors: validatedSchema.error.flatten().fieldErrors,
      data: data,
    };
  }

  const branchId = await getBranchId();
  if (!branchId) {
    redirect('/');
  }

  // TODO upload image
  // let imageUrl;
  // if (data.image) {
  // 이미지 업로드 로직 구현 필요 (예: S3 or 클라우드 스토리지)
  // imageUrl = await uploadImage(data.image);
  // }

  const res = await db.notice.update({
    where: {
      id: data.id,
      branchId: Number(branchId),
    },
    data: {
      title: validatedSchema.data.title,
      content: validatedSchema.data.content,
      image_url: '/', // 이미지 URL 저장
    },
  });

  if (!res) {
    return {
      result: false,
      formErrors: ['공지사항을 수정하지 못했어요. 잠시 후 다시 시도해 주세요.'],
    };
  }

  redirect('/notice');
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
