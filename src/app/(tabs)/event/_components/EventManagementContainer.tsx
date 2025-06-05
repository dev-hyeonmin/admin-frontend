'use client';

import EventList from '@/app/(tabs)/event/_components/EventList';
import EventManagementActions from '@/app/(tabs)/event/_components/EventManagementActions';
import { useOrderManagement } from '@/hooks/useOrderManagementContainer';
import { EventGroup } from '@/types/event';
import { getEvents, updateEventOrder } from '@/app/(tabs)/event/actions';

// 이벤트 전용 훅
export function useEventManagementContainer() {
  return useOrderManagement<EventGroup>({
    fetchItems: async () => {
      const data = await getEvents();
      return data as unknown as EventGroup[];
    },
    updateOrder: async (eventIds) => {
      return await updateEventOrder(eventIds as number[]);
    },
    successMessage: '이벤트 순서를 저장했어요.',
    errorMessage: '이벤트 순서를 저장하지 못했어요. 계속 문제가 생기면 문의해주세요.',
  });
}

export default function EventManagementContainer() {
  const {
    originalItems,
    currentItems,
    isEditMode,
    isLoading,
    handleSaveOrder,
    handleCancelEdit,
    handleStartEdit,
    handleDragEnd,
  } = useEventManagementContainer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <EventList
        events={currentItems}
        isEditMode={isEditMode}
        handleDragEndAction={handleDragEnd}
      />

      <EventManagementActions
        isEditMode={isEditMode}
        hasEvents={originalItems.length > 0}
        onStartEditAction={handleStartEdit}
        onCancelEditAction={handleCancelEdit}
        onSaveOrderAction={handleSaveOrder}
      />
    </>
  );
}
