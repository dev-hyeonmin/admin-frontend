'use client';

import { useEffect, useState } from 'react';
import PageTitle from '@/components/PageTitle';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface Popup {
  id: number;
  title: string;
  image_url: string;
  order: number;
  created_at: string;
}

export default function Popup() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const response = await fetch('/api/popups');
        const { data } = await response.json();
        setPopups(data);
      } catch (error) {
        console.error('팝업 목록을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopups();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <PageTitle title="Popup" subTitle="팝업" />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popups.map((popup) => (
            <div
              key={popup.id}
              className="cursor-pointer overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:opacity-70"
            >
              <div className="relative aspect-[3/2] w-full">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: 삭제 로직 구현
                    console.log('Delete popup:', popup.id);
                  }}
                  className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-2 text-gray-600 hover:bg-white hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <Image
                  // src={popup.image_url}
                  alt={popup.title}
                  fill
                  className="object-cover"
                  src="https://placehold.co/400x400"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{popup.title}</h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(popup.created_at), 'PPP', { locale: ko })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
