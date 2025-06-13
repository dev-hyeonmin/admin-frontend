'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteBranch } from '../action';

interface BranchItemProps {
  id: number;
  name: string;
  createdAt: string;
}

export default function BranchItem({ id, name, createdAt }: BranchItemProps) {
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
    <div className="relative min-w-96 rounded-xl border border-zinc-200 p-4">
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-zinc-400">{createdAt}</p>

      <div className="absolute top-4 right-4 flex gap-1 text-sm">
        <button
          type="button"
          onClick={handleDelete}
          className="rounded bg-red-50 px-2 py-0.5 text-red-700"
        >
          삭제
        </button>
        <Link
          href={`/admin/branch/form/${id}`}
          className="rounded bg-blue-50 px-2 py-0.5 text-blue-700"
        >
          수정
        </Link>
      </div>
    </div>
  );
}
