'use client';

import { createContext, useContext, useState } from 'react';
import { deletePopup } from '@/app/(tabs)/popup/actions';
import { useRouter } from 'next/navigation';

interface Popup {
  id: number;
  title: string;
  image_url: string;
  created_at: Date;
}

interface PopupPreviewContextType {
  selectedPopup: Popup | null;
  setSelectedPopup: (popup: Popup | null) => void;
}

// Context 객체 생성
// :: Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때, React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로 부터 현재값을 읽습니다.
const PopupPreviewContext = createContext<PopupPreviewContextType>({
  selectedPopup: null,
  setSelectedPopup: () => {},
});

// Provider
export function PopupPreviewProvider({ children }: { children: React.ReactNode }) {
  const [selectedPopup, setSelectedPopup] = useState<Popup | null>(null);

  return (
    <PopupPreviewContext.Provider value={{ selectedPopup, setSelectedPopup }}>
      {children}
    </PopupPreviewContext.Provider>
  );
}

export function usePopupPreview() {
  const context = useContext(PopupPreviewContext);
  if (!context) {
    throw new Error('usePopupPreview must be used within a PopupPreviewProvider');
  }
  return context;
}

export default function PopupPreview() {
  const router = useRouter();
  const { selectedPopup, setSelectedPopup } = usePopupPreview();

  if (!selectedPopup) return null;

  const handleDelete = async () => {
    await deletePopup(selectedPopup.id);
    setSelectedPopup(null);
    router.push('/popup');
  };

  return (
    <div className="fixed inset-0 z-50 flex w-full items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" onClick={() => setSelectedPopup(null)} />
      <div className="relative z-10 rounded-xl bg-white">
        <div className="flex items-center justify-between p-6 pb-0">
          <h3 className="text-xl font-semibold">{selectedPopup.title}</h3>
          <button
            onClick={() => setSelectedPopup(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="w-fit overflow-hidden rounded-lg p-6">
          {/*aspect-video*/}
          <div className="size-96 bg-gray-100" />
          {/*<img*/}
          {/*  src={selectedPopup.image_url}*/}
          {/*  alt={selectedPopup.title}*/}
          {/*  className="h-full w-full object-cover"*/}
          {/*/>*/}
        </div>

        <div className="flex flex-col gap-2 p-6 pt-0">
          <button
            onClick={handleDelete}
            className="rounded-lg bg-red-600 py-3 text-white hover:bg-red-500"
          >
            삭제하기
          </button>

          <button
            onClick={() => setSelectedPopup(null)}
            className="rounded-lg border border-zinc-200 py-3 hover:opacity-70"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
