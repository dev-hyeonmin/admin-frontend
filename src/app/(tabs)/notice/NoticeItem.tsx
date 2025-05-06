import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface NoticeItemProps {
  id: number;
  title: string;
  is_pinned: boolean;
  created_at: Date;
}

export default function NoticeItem({ id, title, is_pinned, created_at }: NoticeItemProps) {
  return (
    <Link
      href={`notice/${id}`}
      className="flex items-center justify-between gap-6 border-t border-gray-100 py-4"
    >
      <div className="flex items-center gap-6">
        <div>{title}</div>
      </div>

      <div>{formatDate(created_at, 'date')}</div>
    </Link>
  );
}
