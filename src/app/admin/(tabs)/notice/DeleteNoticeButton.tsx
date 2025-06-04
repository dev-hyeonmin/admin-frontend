'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { handleDeleteNotice } from '@/app/admin/(tabs)/notice/actions';

interface DeleteNoticeButtonProps {
  id: number;
}

export default function DeleteNoticeButton({ id }: DeleteNoticeButtonProps) {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    // 삭제 확인
    const result = confirm('해당 공지사항을 삭제할까요?');
    if (!result) {
      return;
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append('id', id.toString());
    await handleDeleteNotice(formData);

    // } catch (error) {
    //   console.error('공지사항 삭제 중 오류가 발생했습니다:', error);
    //   alert(error instanceof Error ? error.message : '공지사항 삭제에 실패했습니다.');
    //   setIsPending(false);
    // }
  };

  return (
    <button
      type="button"
      className="rounded-full p-3 hover:bg-zinc-100"
      onClick={(e) => handleDelete(e)}
    >
      <Trash2 className="h-4 w-4 text-red-500" />
    </button>
  );
}
