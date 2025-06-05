'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import DeleteEventButton from '@/app/(tabs)/event/_components/DeleteEventButton';
import { EventGroup } from '@/types/event';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Calendar, Clock, GripVertical } from 'lucide-react';

interface EventListProps {
  events: EventGroup[];
  isEditMode: boolean;
  handleDragEndAction: (result: DropResult) => void;
}

export default function EventList({ events, isEditMode, handleDragEndAction }: EventListProps) {
  return (
    <>
      {/* 편집 모드 안내 */}
      {isEditMode && (
        <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
              <GripVertical className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">이벤트 순서 편집</h3>
          </div>
          <p className="text-sm leading-relaxed text-blue-700">
            드래그하여 이벤트의 순서를 변경할 수 있습니다. 완료 후 [순서 저장] 버튼을 눌러주세요.
          </p>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEndAction}>
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
                      className={`group relative flex items-center gap-6 overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                        snapshot.isDragging
                          ? 'scale-[1.02] rotate-1 border-2 border-blue-200 bg-white'
                          : 'hover:-translate-y-1'
                      } ${
                        isEditMode
                          ? 'cursor-grab border border-gray-200 bg-white active:cursor-grabbing'
                          : 'border border-gray-100 bg-white hover:border-gray-200'
                      }`}
                    >
                      {/* 드래그 핸들 - 편집 모드일 때만 표시 */}
                      {isEditMode && (
                        <div className="flex-shrink-0 cursor-grab text-gray-400 transition-colors hover:text-blue-500">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-blue-50">
                            <GripVertical size={18} />
                          </div>
                        </div>
                      )}

                      {/* 이벤트 이미지 */}
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Calendar className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* 이벤트 정보 */}
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-2 truncate text-xl font-bold text-gray-900">
                          {event.title}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            <span>시작: {formatDate(event.start_date, 'date')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span>
                              종료: {event.end_date ? formatDate(event.end_date, 'date') : '진행중'}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-gray-400">
                          생성일: {formatDate(event.created_at, 'date')}
                        </div>
                      </div>

                      {/* 액션 버튼 - 편집 모드가 아닐 때만 */}
                      {!isEditMode && (
                        <div className="flex flex-shrink-0 items-center gap-3">
                          <Link
                            href={`/event/form/${event.id}`}
                            className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-50 px-4 text-sm font-medium text-blue-600 transition-all hover:scale-105 hover:bg-blue-100 active:scale-95"
                          >
                            수정
                          </Link>
                          <DeleteEventButton id={event.id} />
                        </div>
                      )}

                      {/* 호버 시 표시되는 그라데이션 */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
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
