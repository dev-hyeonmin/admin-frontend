import PageTitle from '@/components/PageTitle';
import PopupItem from '@/app/(tabs)/popup/PopupItem';
import PopupPreview, { PopupPreviewProvider } from '@/app/(tabs)/popup/PopupPreview';
import { getPopups } from './actions';
import Link from 'next/link';
import { Smile } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';

export default async function Popup() {
  const popups = await getPopups();
  return (
    <div className="flex flex-col">
      <PageTitle title="Popup" subTitle="팝업" />

      <PopupPreviewProvider>
        {/* LIST */}
        <div className="space-y-4">
          {popups.map((popup) => (
            <PopupItem key={`popup-${popup.id}`} {...popup} />
          ))}
        </div>

        <PopupPreview />
      </PopupPreviewProvider>

      {/* 빈 리스트 */}
      {popups.length === 0 && (
        <EmptyState
          icon={Smile}
          title="📌 등록된 팝업이 없어요"
          description="지금 하나 추가해볼까요?"
        />
      )}

      {/* 하단 고정 메뉴 */}
      <div className="fixed right-0 bottom-0 left-64 flex justify-end border-t border-gray-200 bg-white px-12 py-4">
        <Link
          href={'/popup/add'}
          className="rounded-lg bg-blue-700 px-8 py-3 text-white hover:bg-blue-600"
        >
          팝업 추가
        </Link>
      </div>
    </div>
  );
}
