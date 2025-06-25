'use client';

import { useState } from 'react';
import { Notice } from '@/types/notice';
import NoticeItem from '@/app/(tabs)/notice/_components/NoticeItem';

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
          notice={notice}
          isOpen={openNoticeId === notice.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
