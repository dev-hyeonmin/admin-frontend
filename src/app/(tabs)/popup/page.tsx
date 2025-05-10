import PageTitle from '@/components/PageTitle';
import PopupItem from '@/app/(tabs)/popup/PopupItem';
import PopupPreview, { PopupPreviewProvider } from '@/app/(tabs)/popup/PopupPreview';
import { getPopups } from './actions';
import Link from 'next/link';
import { ScanFace, Smile, Sticker } from 'lucide-react';

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

      {popups.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600">
          <Smile size={64} strokeWidth={1.5} className="mb-6 text-zinc-400" />

          <p className="text-lg font-medium">📄 등록된 팝업이 없어요</p>
          <p className="mt-2 text-sm">지금 하나 추가해볼까요?</p>
        </div>
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
