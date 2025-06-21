'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteBranch } from '../action';
import { Pencil, Trash2 } from 'lucide-react';
import { Branch } from '@/types/branch';
import { formatDate } from '@/lib/utils';

interface BranchItemProps extends Branch {}

export default function BranchItem({ id, name, created_at }: BranchItemProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('해당 지점을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteBranch(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete branch:', error);
      alert('지점 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="relative flex items-center justify-between rounded-xl p-4 hover:bg-zinc-50">
      <div>
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-xs font-light text-zinc-400">created at. {formatDate(created_at)}</p>
      </div>

      <div className="flex gap-2 text-sm">
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer rounded-full bg-red-50 p-2 text-red-700"
        >
          <Trash2 strokeWidth={1.2} size={16} />
        </button>

        <Link href={`/admin/branch/${id}`} className="rounded-full bg-blue-50 p-2 text-blue-700">
          <Pencil strokeWidth={1.2} size={16} />
        </Link>
      </div>
    </div>
  );
}
