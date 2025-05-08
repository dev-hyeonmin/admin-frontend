'use client';

import { handleDeleteNotice } from './edit/action';
import FormButton from '@/components/form-button';

interface DeleteNoticeButtonProps {
  id: number;
}

export default function DeleteNoticeButton({ id }: DeleteNoticeButtonProps) {
  return (
    <form action={handleDeleteNotice} className="inline">
      <input type="hidden" name="id" value={id} />
      <FormButton type="submit" text="삭제" variant="danger" fullWidth={false} />
    </form>
  );
} 