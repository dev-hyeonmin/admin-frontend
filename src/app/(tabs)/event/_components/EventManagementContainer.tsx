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
    successMessage: '이벤트 순서가 저장되었습니다.',
    errorMessage: '이벤트 순서 저장에 실패했습니다.',
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
    handleItemsReorder,
    handleStartEdit,
  } = useEventManagementContainer();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <EventList
        events={currentItems}
        isEditMode={isEditMode}
        onEventsReorderAction={handleItemsReorder}
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
