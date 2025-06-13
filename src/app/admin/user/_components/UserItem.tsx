'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteUser } from '../action';

interface UserItemProps {
  id: number;
  name: string;
  email: string;
  branchName?: string;
  createdAt: string;
}

export default function UserItem({ id, name, email, branchName, createdAt }: UserItemProps) {
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
      {branchName && <p className="text-sm text-zinc-500">{branchName}</p>}
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
          href={`/admin/user/form/${id}`}
          className="rounded bg-blue-50 px-2 py-0.5 text-blue-700"
        >
          수정
        </Link>
      </div>
    </div>
  );
} 