'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/(tabs)/event/add/EventGroupForm';
import { useState } from 'react';
import { EventItemForm } from '@/app/(tabs)/event/add/EventItemForm';
import { addEventGroup } from '@/app/(tabs)/event/actions';

const FINAL_STEP = 2;

export default function AddEvent() {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((curr) => curr + 1);
  };

  const prevStep = () => {
    setCurrentStep((curr) => curr - 1);
  };

  const handleSubmit = async (data: Record<string, FormDataEntryValue | null>) => {
    // 1. 데이터 변환
    const transformedData = Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value || null,
      }),
      {} as Record<string, FormDataEntryValue | null>
    );

    // 2. formData에 데이터 추가
    setFormData((prev) => ({
      ...prev,
      ...transformedData,
    }));

    // 3. next step
    if (!(currentStep === FINAL_STEP)) {
      nextStep();
      return;
    }

    // 4. final submit
    try {
      const result = await addEventGroup(formData);
      console.log('이벤트 그룹 추가 결과:', result);
    } catch (error) {
      console.error('이벤트 그룹 추가 실패:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="이벤트 추가" subTitle="새로운 이벤트를 등록합니다" />

      {currentStep === 1 && <EventGroupForm onSubmit={handleSubmit} />}
      {currentStep === 2 && <EventItemForm onSubmit={handleSubmit} onCancel={prevStep} />}
    </div>
  );
}
