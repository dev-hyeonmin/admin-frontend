'use client';

import { useState } from 'react';
import { deleteEvent } from './actions';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

interface DeleteEventButtonProps {
  id: number;
}

export default function DeleteEventButton({ id }: DeleteEventButtonProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('정말로 이 이벤트를 삭제하시겠습니까?')) {
      return;
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append('id', id.toString());

    try {
      await deleteEvent(formData);
      router.refresh();
    } catch (error) {
      if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
        throw error;
      }

      console.error('이벤트 삭제 중 오류가 발생했습니다:', error);
      alert('이벤트 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="border-l border-zinc-200 px-4 hover:text-red-500 disabled:opacity-50"
    >
      {isPending ? '삭제 중...' : '삭제'}
    </button>
  );
}
