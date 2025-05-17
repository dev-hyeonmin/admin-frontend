'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/(tabs)/event/add/EventGroupForm';
import { useState } from 'react';
import { EventItemForm } from '@/app/(tabs)/event/add/EventItemForm';
import { addEventGroup } from '@/app/(tabs)/event/actions';

// 상수 분리
const STEPS = {
  GROUP_FORM: 1,
  ITEM_FORM: 2,
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

// 타입 정의
interface EventFormData {
  [key: string]: FormDataEntryValue | null;
}

export default function AddEvent() {
  const [formData, setFormData] = useState<EventFormData>({});
  const [currentStep, setCurrentStep] = useState<Step>(STEPS.GROUP_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    setCurrentStep((curr) => (curr + 1) as Step);
  };

  const prevStep = () => {
    setCurrentStep((curr) => (curr - 1) as Step);
  };

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);

    // 1. 데이터 변환
    const transformedData = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || null,
      }),
      {} as EventFormData
    );

    // 2. formData에 데이터 추가
    setFormData((prev) => ({
      ...prev,
      ...transformedData,
    }));

    // 3-1. 마지막 단계가 아닌 경우 다음 단계로
    if (currentStep !== STEPS.ITEM_FORM) {
      nextStep();
      setIsSubmitting(false);
      return;
    }

    // 3-2. 최종 제출
    const result = await addEventGroup(formData);

    if (result?.formErrors) {
      alert(result.formErrors);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 추가" subTitle="새로운 이벤트를 등록합니다" />

      {currentStep === STEPS.GROUP_FORM && (
        <EventGroupForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      )}
      {currentStep === STEPS.ITEM_FORM && (
        <EventItemForm onSubmit={handleSubmit} onCancel={prevStep} isSubmitting={isSubmitting} />
      )}
    </div>
  );
}
