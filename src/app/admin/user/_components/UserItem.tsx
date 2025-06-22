'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../action';
import { formatDate } from '@/lib/utils';
import { UserData } from '@/types/user';
import { Pencil, Trash2 } from 'lucide-react';

type UserItemProps = UserData;

export default function UserItem({ id, name, email, branch, created_at }: UserItemProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('해당 사용자를 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteUser(id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('사용자 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="relative min-w-96 rounded-xl border border-zinc-200 p-4">
      <p className="text-lg font-semibold">{name}</p>
      <p className="text-sm text-zinc-600">{email}</p>
      {branch && <p className="text-sm text-zinc-500">{branch.name}</p>}
      <p className="text-sm text-zinc-400">{formatDate(created_at)}</p>

      <div className="absolute top-4 right-4 flex gap-1 text-sm">
        <button
          type="button"
          onClick={handleDelete}
          className="cursor-pointer rounded-full bg-red-50 p-2 text-red-700"
        >
          <Trash2 strokeWidth={1.2} size={16} />
        </button>

        <Link href={`/admin/user/${id}`} className="rounded-full bg-blue-50 p-2 text-blue-700">
          <Pencil strokeWidth={1.2} size={16} />
        </Link>
      </div>
    </div>
  );
}
