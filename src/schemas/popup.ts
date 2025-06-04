import { z } from 'zod';

export const popupSchema = z.object({
  title: z.string().min(1, '팝업 제목을 입력해 주세요.'),
  image: z
    .instanceof(File)
    .refine((file) => {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      return validTypes.includes(file.type);
    }, 'PNG, JPG, JPEG 형식의 이미지만 업로드 가능해요.')
    .refine((file) => file.size <= 200 * 1024, '이미지 크기는 200KB 이하여야 해요.'),
});

export type PopupFormData = z.infer<typeof popupSchema>; 