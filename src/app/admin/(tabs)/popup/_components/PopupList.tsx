import { getPopups } from '@/app/admin/(tabs)/popup/actions';
import PopupPreview, {
  PopupPreviewProvider,
} from '@/app/admin/(tabs)/popup/_components/PopupPreview';
import { EmptyState } from '@/components/EmptyState';
import { Smile } from 'lucide-react';
import PopupListItem from '@/app/admin/(tabs)/popup/_components/PopupListItem';

export default async function PopupList() {
  const popups = await getPopups();

  return (
    <>
      {/* 팝업 리스트 */}
      <PopupPreviewProvider>
        <div className="space-y-4">
          {popups.map((popup) => (
            <PopupListItem key={`popup-${popup.id}`} {...popup} />
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
    </>
  );
}
