import { formatDate } from '@/lib/utils';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Notice } from '@/types/notice';
import { handleDeleteNotice } from '@/app/(tabs)/notice/actions';

interface NoticeItemProps {
  notice: Notice;
  isOpen: boolean;
  onToggle: (id: number) => void;
}

export default function NoticeItem({ notice, isOpen, onToggle }: NoticeItemProps) {
  const { id, title, content, image_url, created_at, updated_at } = notice;

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    // 삭제 확인
    const result = confirm('해당 공지사항을 삭제할까요?');
    if (!result) {
      return;
    }

    const formData = new FormData();
    formData.append('id', id.toString());
    await handleDeleteNotice(formData);
  };

  return (
    <div className="border-b border-zinc-200">
      {/* Title */}
      <div
        onClick={() => onToggle(id)}
        className="flex cursor-pointer items-center justify-between px-4 py-4 text-lg font-medium"
      >
        <div className="">{title}</div>

        <div className="flex items-center gap-8">
          <div>{formatDate(created_at, 'date')}</div>
          <div className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer rounded-full bg-red-50 p-2 text-red-700"
            >
              <Trash2 strokeWidth={1.2} size={16} />
            </button>

            <Link href={`/notice/${id}`} className="rounded-full bg-blue-50 p-2 text-blue-700">
              <Pencil strokeWidth={1.2} size={16} />
            </Link>

            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Detail */}
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
