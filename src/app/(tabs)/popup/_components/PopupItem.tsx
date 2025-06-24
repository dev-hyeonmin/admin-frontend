'use client';

import { formatDate } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Popup } from '@/types/popup';
import { useRouter } from 'next/navigation';
import { deletePopup } from '@/app/(tabs)/popup/actions';

interface PopupItemProps {
  popup: Popup;
  isEditMode?: boolean;
}

export default function PopupItem({ popup, isEditMode }: PopupItemProps) {
  const { id, title, created_at } = popup;

  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('해당 지점을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deletePopup(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete branch:', error);
      alert('팝업 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="relative flex items-center justify-between rounded-xl p-4 hover:bg-zinc-50">
      <div className="flex items-center gap-4">
        <div className="size-24 overflow-hidden rounded-lg bg-zinc-200" />

        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-xs font-light text-zinc-400">created at. {formatDate(created_at)}</p>
        </div>
      </div>

      {/* Action Button */}
      {!isEditMode && (
        <div className="flex gap-2 text-sm">
          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer rounded-full bg-red-50 p-2 text-red-700"
          >
            <Trash2 strokeWidth={1.2} size={16} />
          </button>

          <Link href={`/popup/${id}`} className="rounded-full bg-blue-50 p-2 text-blue-700">
            <Pencil strokeWidth={1.2} size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
