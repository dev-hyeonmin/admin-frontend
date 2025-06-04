'use client';

import { useState } from 'react';
import NoticeItem from './NoticeItem';
import { EmptyState } from '@/components/EmptyState';
import { Smile } from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  content: string | null;
  image_url: string | null;
  is_pinned: boolean;
  created_at: Date;
}

interface NoticeListProps {
  notices: Notice[];
}

export default function NoticeList({ notices }: NoticeListProps) {
  const [openNoticeId, setOpenNoticeId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenNoticeId(openNoticeId === id ? null : id);
  };

  return (
    <div
      className={`mt-6 flex w-full flex-col ${notices.length === 0 || 'border-t border-zinc-200'}`}
    >
      {notices.map((notice) => (
        <NoticeItem
          key={`notice-${notice.id}`}
          {...notice}
          isOpen={openNoticeId === notice.id}
          onToggle={handleToggle}
        />
      ))}

      {/* 빈 리스트 */}
      {notices.length === 0 && (
        <EmptyState
          icon={Smile}
          title="📌 등록된 공지사항이 없어요"
          description="지금 하나 추가해볼까요?"
        />
      )}
    </div>
  );
}
