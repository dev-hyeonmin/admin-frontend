'use client';

import { formatDate } from '@/lib/utils';
import { memo } from 'react';
import { usePopupPreview } from '@/app/(tabs)/popup/_components/PopupPreview';
import { GripVertical } from 'lucide-react';

interface PopupListItemProps {
  id: number;
  title: string;
  image_url: string;
  created_at: Date;
  isEditMode?: boolean;
}

// 실제 UI를 렌더링하는 컴포넌트
const PopupItemView = memo(function PopupItemView({
  title,
  image_url,
  created_at,
  isEditMode = false,
}: PopupListItemProps) {
  return (
    <div className="flex items-center gap-4">
      {isEditMode && (
        <div className="cursor-grab text-gray-400 hover:text-gray-600">
          <GripVertical size={20} />
        </div>
      )}

      <div className="size-24 overflow-hidden rounded bg-gray-300">
        {/*<img src={image_url} alt={title} className="h-full w-full object-cover" />*/}
      </div>

      <div>
        <div className="text-lg font-medium">{title}</div>
        <div className="text-sm text-gray-400">created at {formatDate(created_at, 'date')}</div>
      </div>
    </div>
  );
});

// Context를 사용하는 컨테이너 컴포넌트
export default function PopupItem(props: PopupListItemProps) {
  const { setSelectedPopup } = usePopupPreview();

  return (
    <div
      className={`flex items-center justify-between ${
        props.isEditMode ? 'cursor-default' : 'cursor-pointer hover:opacity-80'
      }`}
      onClick={props.isEditMode ? undefined : () => setSelectedPopup(props)}
    >
      <PopupItemView {...props} />
    </div>
  );
}
