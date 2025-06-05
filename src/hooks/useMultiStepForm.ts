import { useState } from 'react';

interface UseMultiStepFormProps<T, S> {
  initialStep: S;
  initialData?: T;
}

interface UseMultiStepFormReturn<T, S> {
  formData: T | undefined;
  currentStep: S;
  nextStep: () => void;
  prevStep: (data?: T) => void;
  updateFormData: (data: Partial<T>) => T;
  resetForm: () => void;
  goToStep: (step: S) => void;
}

export function useMultiStepForm<T, S extends number>({
  initialStep,
  initialData,
}: UseMultiStepFormProps<T, S>): UseMultiStepFormReturn<T, S> {
  const [formData, setFormData] = useState<T | undefined>(initialData);
  const [currentStep, setCurrentStep] = useState<S>(initialStep);

  const nextStep = () => {
    setCurrentStep((curr) => (curr + 1) as S);
  };

  const prevStep = (data?: T) => {
    if (data) {
      updateFormData(data);
    }
    setCurrentStep((curr) => (curr - 1) as S);
  };

  const updateFormData = (data: Partial<T>): T => {
    const updatedFormData = {
      ...formData,
      ...data,
    } as T;

    setFormData(updatedFormData);
    return updatedFormData;
  };

  const resetForm = () => {
    setFormData(initialData);
    setCurrentStep(initialStep);
  };

  const goToStep = (step: S) => {
    setCurrentStep(step);
  };

  return {
    formData,
    currentStep,
    nextStep,
    prevStep,
    updateFormData,
    resetForm,
    goToStep,
  };
} 