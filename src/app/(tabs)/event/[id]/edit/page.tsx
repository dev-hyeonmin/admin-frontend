'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/(tabs)/event/add/EventGroupForm';
import { EventItemForm } from '@/app/(tabs)/event/add/EventItemForm';
import { getEventGroup, updateEventGroup } from '@/app/(tabs)/event/actions';
import { useEventForm } from '@/hooks/useEventForm';
import { STEPS } from '@/constants/event';
import { EventFormData } from '@/types/event';
import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const {
    formData,
    currentStep,
    isSubmitting,
    setIsSubmitting,
    nextStep,
    prevStep,
    updateFormData,
  } = useEventForm();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEventGroup(Number(id));
        updateFormData({
          title: event.title,
          startDate: event.start_date.toISOString().split('T')[0],
          endDate: event.end_date?.toISOString().split('T')[0] || '',
          items: event.events.map((item) => ({
            title: item.title,
            description: item.description || '',
            originalPrice: item.original_price,
            salePrice: item.sale_price,
          })),
        });
      } catch (error) {
        console.error('이벤트를 불러오는데 실패했습니다:', error);
        router.push('/event');
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    try {
      const newData = updateFormData(data);

      if (currentStep === STEPS.GROUP_FORM) {
        nextStep();
        return;
      }

      if (!confirm('이벤트를 수정할까요?')) {
        return;
      }

      const result = await updateEventGroup(Number(id), newData);

      if (result?.formErrors) {
        alert(result.formErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return 'loading';
  }

  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 수정" subTitle="이벤트 정보를 수정합니다" />

      {currentStep === STEPS.GROUP_FORM && (
        <EventGroupForm
          onSubmitAction={handleSubmit}
          isSubmitting={isSubmitting}
          formData={formData}
        />
      )}

      {currentStep === STEPS.ITEM_FORM && (
        <EventItemForm
          onSubmitAction={handleSubmit}
          onCancelAction={prevStep}
          isSubmitting={isSubmitting}
          formData={formData.items}
          isEdit={true}
        />
      )}
    </div>
  );
}
