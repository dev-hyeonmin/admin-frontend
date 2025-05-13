import { formatDate } from '@/lib/utils';
import { ChevronDown, Pencil } from 'lucide-react';
import Link from 'next/link';
import DeleteNoticeButton from '@/app/(tabs)/notice/DeleteNoticeButton';

interface NoticeItemProps {
  id: number;
  title: string;
  content: string | null;
  image_url: string | null;
  is_pinned: boolean;
  created_at: Date;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

export default function NoticeItem({
  id,
  title,
  created_at,
  content,
  isOpen,
  onToggle,
}: NoticeItemProps) {
  return (
    <div className="border-b border-zinc-200">
      {/* 제목 */}
      <div
        onClick={() => onToggle(id)}
        className="flex cursor-pointer items-center justify-between px-4 py-4 text-lg font-medium"
      >
        <div className="">{title}</div>
        <div className="flex items-center gap-8">
          <div>{formatDate(created_at, 'date')}</div>
          <div className="flex items-center gap-1">
            <Link
              href={`/notice/${id}/edit`}
              className="rounded-full p-3 hover:bg-zinc-100"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Pencil className="h-4 w-4 text-zinc-600" />
            </Link>

            <DeleteNoticeButton id={id} />

            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* 내용 */}
      <div
        className={`grid border-t border-zinc-200 transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        {content && (
          <div className="overflow-hidden">
            <div className="px-4 py-14">
              <p className="leading-relaxed whitespace-pre-wrap">{content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
