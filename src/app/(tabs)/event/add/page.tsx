'use client';

import PageTitle from '@/components/PageTitle';
import { EventGroupForm } from '@/app/(tabs)/event/add/EventGroupForm';
import { useState } from 'react';
import { EventItemForm } from '@/app/(tabs)/event/add/EventItemForm';
import { addEventGroup } from '@/app/(tabs)/event/actions';
import { formatDate } from '@/lib/utils';

// 상수 분리
const STEPS = {
  GROUP_FORM: 1,
  ITEM_FORM: 2,
} as const;

type Step = (typeof STEPS)[keyof typeof STEPS];

// 타입 정의
export type EventItem = {
  title: string;
  description?: string;
  originalPrice?: number;
  salePrice?: number;
};

export type EventFormData = {
  title?: string;
  description?: string;
  imageUrl?: File | null;
  startDate?: string;
  endDate?: string;
  items?: EventItem[];
};

const initialEventForm: EventFormData = {
  title: '',
  description: '',
  imageUrl: null,
  startDate: formatDate(new Date(), 'date'),
  endDate: formatDate(new Date(), 'date'),
  items: [],
};

export default function AddEvent() {
  const [formData, setFormData] = useState<EventFormData>(initialEventForm);
  const [currentStep, setCurrentStep] = useState<Step>(STEPS.GROUP_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    setCurrentStep((curr) => (curr + 1) as Step);
  };

  const prevStep = (data: EventFormData) => {
    updateFormData(data);
    setCurrentStep((curr) => (curr - 1) as Step);
  };

  const updateFormData = (data: EventFormData) => {
    const updatedFormData = {
      ...formData,
      ...data,
    };

    setFormData(updatedFormData);

    return updatedFormData;
  };

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true); // loading start

    try {
      const newData = updateFormData(data);

      // IF (STEP 01)
      if (currentStep === STEPS.GROUP_FORM) {
        nextStep();
        return;
      }

      // IF (STEP 02)
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
          formData={formData.items}
        />
      )}
    </div>
  );
}
