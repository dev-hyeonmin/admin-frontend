'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/(tabs)/event/_components/EventGroupForm';
import { EventItemForm } from '@/app/(tabs)/event/_components/EventItemForm';
import { addEventGroup, getEventGroup, updateEventGroup } from '@/app/(tabs)/event/actions';
import { EventFormData, Step, STEPS } from '@/types/event';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils';

export default function EventForm() {
  const params = useParams();
  const eventId = params.id?.[0];
  const router = useRouter();

  const isEdit = !!eventId;

  const { formData, currentStep, nextStep, prevStep, updateFormData } = useMultiStepForm<
    EventFormData,
    Step
  >({
    initialStep: STEPS.GROUP_FORM,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 다음 OR 제출 버튼 이벤트
  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    try {
      const newData = updateFormData(data);

      if (currentStep === STEPS.GROUP_FORM) {
        nextStep();
        return;
      }

      const confirmMessage = isEdit ? '이벤트를 수정할까요?' : '이벤트를 생성할까요?';
      if (!confirm(confirmMessage)) {
        return;
      }

      const result = isEdit
        ? await updateEventGroup(Number(eventId), newData)
        : await addEventGroup(newData);

      if (result?.formErrors) {
        alert(result.formErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // 수정 페이지인 경우 데이터 불러오기
  useEffect(
    function getEvents() {
      if (!eventId) {
        return;
      }

      const fetchEvent = async () => {
        try {
          const { title, description, start_date, end_date, events } = await getEventGroup(
            Number(eventId)
          );

          const formatData = {
            title,
            description: description,
            startDate: formatDate(start_date, 'date'),
            endDate: end_date ? formatDate(end_date, 'date') : null,
            items: events.map((item) => ({
              title: item.title,
              description: item.description || null,
              originalPrice: item.original_price,
              salePrice: item.sale_price,
            })),
          };

          updateFormData(formatData);
        } catch (error) {
          console.error('이벤트를 불러오는데 실패했습니다:', error);
          router.push('/event');
        }
      };

      fetchEvent();
    },
    [eventId]
  );

  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 추가" subTitle="새로운 이벤트를 등록합니다" />

      {/* 1단계: 이벤트 그룹 정보 입력 */}
      {currentStep === STEPS.GROUP_FORM && (
        <EventGroupForm
          onSubmitAction={handleSubmit}
          isSubmitting={isSubmitting}
          formData={formData}
        />
      )}

      {/* 2단계: 이벤트 아이템 목록 입력 */}
      {currentStep === STEPS.ITEM_FORM && (
        <EventItemForm
          onSubmitAction={handleSubmit}
          onCancelAction={prevStep}
          isSubmitting={isSubmitting}
          formData={formData?.items}
        />
      )}
    </div>
  );
}
