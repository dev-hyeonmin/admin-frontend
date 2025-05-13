'use client';

import { Trash2 } from 'lucide-react';
import { handleDeleteNotice } from '@/app/(tabs)/notice/actions';

interface DeleteNoticeButtonProps {
  id: number;
}

export default function DeleteNoticeButton({ id }: DeleteNoticeButtonProps) {
  return (
    <form action={handleDeleteNotice} className="inline">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full p-3 hover:bg-zinc-100"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </button>
    </form>
  );
}
