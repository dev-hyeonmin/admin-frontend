'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/admin/(tabs)/event/add/EventGroupForm';
import { EventItemForm } from '@/app/admin/(tabs)/event/add/EventItemForm';
import { addEventGroup } from '@/app/admin/(tabs)/event/actions';
import { useEventForm } from '@/hooks/useEventForm';
import { STEPS } from '@/constants/event';
import { EventFormData } from '@/types/event';

export default function AddEvent() {
  const {
    formData,
    currentStep,
    isSubmitting,
    setIsSubmitting,
    nextStep,
    prevStep,
    updateFormData,
  } = useEventForm();

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    try {
      const newData = updateFormData(data);

      if (currentStep === STEPS.GROUP_FORM) {
        nextStep();
        return;
      }

      if (!confirm('이벤트를 생성할까요?')) {
        return;
      }

      const result = await addEventGroup(newData);

      if (result?.formErrors) {
        alert(result.formErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 추가" subTitle="새로운 이벤트를 등록합니다" />

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
          formData={formData?.items}
        />
      )}
    </div>
  );
}
