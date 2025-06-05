'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteEventButton from '@/app/(tabs)/event/DeleteEventButton';
import { EventGroup } from '@/types/event';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

interface EventListProps {
  events: EventGroup[];
  isEditMode: boolean;
  onEventsReorderAction: (reorderedEvents: EventGroup[]) => void;
}

export default function EventList({ events, isEditMode, onEventsReorderAction }: EventListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !isEditMode) return;

    const items = Array.from(events);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onEventsReorderAction(items);
  };

  return (
    <>
      {/* 편집 모드 안내 */}
      {isEditMode && (
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-700">
            <strong>이벤트 순서 편집 모드</strong>
            <br />
            드래그하여 이벤트의 순서를 변경할 수 있습니다. 완료 후 [순서 저장] 버튼을 눌러주세요.
          </p>
        </div>
      )}

      {/* 헤더 - 편집 모드가 아닐 때만 표시 */}
      {!isEditMode && (
        <div className="flex pb-4 text-sm text-zinc-500">
          <div className="w-6/12">이벤트명</div>
          <div className="w-2/12 text-center">시작일</div>
          <div className="w-2/12 text-center">종료일</div>
          <div className="w-2/12 text-center">관리</div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="events" isDropDisabled={!isEditMode}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {events.map((event, index) => (
                <Draggable
                  key={`event-${event.id}`}
                  draggableId={`event-${event.id}`}
                  index={index}
                  isDragDisabled={!isEditMode}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`rounded-lg border p-4 transition-all ${
                        snapshot.isDragging
                          ? 'scale-105 rotate-2 border-blue-200 bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      } ${isEditMode ? 'cursor-grab active:cursor-grabbing' : ''}`}
                    >
                      <div className={`flex items-center ${isEditMode ? '' : 'justify-between'}`}>
                        {/* 드래그 핸들 - 편집 모드일 때만 표시 */}
                        {isEditMode && (
                          <div className="mr-4 cursor-grab text-gray-400 hover:text-gray-600">
                            <GripVertical size={20} />
                          </div>
                        )}

                        <div
                          className={`flex items-center gap-4 ${isEditMode ? 'flex-1' : 'w-6/12'}`}
                        >
                          <div className="size-24 overflow-hidden rounded bg-gray-300">
                            {event.image_url && (
                              <img
                                src={event.image_url}
                                alt={event.title}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="text-lg font-medium">{event.title}</div>
                            <div className="text-sm text-gray-400">
                              created at {formatDate(event.created_at, 'date')}
                            </div>
                          </div>
                        </div>

                        {/* 편집 모드가 아닐 때만 표시되는 정보들 */}
                        {!isEditMode && (
                          <>
                            <div className="text-zinc-30 w-2/12 text-center font-medium">
                              {formatDate(event.start_date, 'date')}
                            </div>

                            <div className="text-zinc-30 w-2/12 text-center font-medium">
                              {event.end_date ? formatDate(event.end_date, 'date') : '진행중'}
                            </div>

                            <div className="w-2/12 font-medium text-zinc-500">
                              <Link
                                href={`/event/form/${event.id}`}
                                className="px-4 hover:text-blue-600"
                              >
                                수정
                              </Link>
                              <DeleteEventButton id={event.id} />
                            </div>
                          </>
                        )}

                        {/* 편집 모드일 때 표시되는 추가 정보 */}
                        {isEditMode && (
                          <div className="ml-4 text-sm text-gray-500">
                            <div>시작: {formatDate(event.start_date, 'date')}</div>
                            <div>
                              종료: {event.end_date ? formatDate(event.end_date, 'date') : '진행중'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
