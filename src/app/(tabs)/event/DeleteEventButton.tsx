'use client';

import { deleteEvent } from './actions';
import { useRouter } from 'next/navigation';

interface DeleteEventButtonProps {
  id: number;
}

export default function DeleteEventButton({ id }: DeleteEventButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('정말로 이 이벤트를 삭제하시겠습니까?')) {
      const formData = new FormData();
      formData.append('id', id.toString());

      try {
        await deleteEvent(formData);
        router.refresh();
      } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
          // 리디렉션 오류는 다시 던져서 처리되도록 함
          throw error;
        }

        console.error('이벤트 삭제 중 오류가 발생했습니다:', error);
        alert('이벤트 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <button onClick={handleDelete} className="border-l border-zinc-200 px-4 hover:text-red-500">
      삭제
    </button>
  );
}
