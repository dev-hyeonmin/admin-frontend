import { useState } from 'react';
import { EventFormData } from '@/types/event';
import { Step, STEPS } from '@/constants/event';
import { formatDate } from '@/lib/utils';

const initialEventForm: EventFormData = {
  title: '',
  description: '',
  imageUrl: null,
  startDate: formatDate(new Date(), 'date'),
  endDate: formatDate(new Date(), 'date'),
  items: [],
};

export function useEventForm() {
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

  return {
    formData,
    currentStep,
    isSubmitting,
    setIsSubmitting,
    nextStep,
    prevStep,
    updateFormData,
  };
} 