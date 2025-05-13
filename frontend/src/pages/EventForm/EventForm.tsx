import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

export type EventFormData = {
  eventName: string;
  date: string;
  time: string;
  description: string;
  type: string;
  targetAudience: string;
  location: string;
  budget: string;
  footfall: string;
  proposalFile?: File | null;
};

const initialFormData: EventFormData = {
  eventName: '',
  date: '',
  time: '',
  description: '',
  type: '',
  targetAudience: '',
  location: '',
  budget: '',
  footfall: '',
  proposalFile: null,
};

const EventForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<EventFormData>(initialFormData);

  const nextStep = () => setStep((s: number) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s: number) => Math.max(s - 1, 1));

  const updateForm = (fields: Partial<EventFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  return (
    <div>
      {step === 1 && <Step1 formData={formData} updateForm={updateForm} nextStep={nextStep} />}
      {step === 2 && <Step2 formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <Step3 formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <Step4 formData={formData} updateForm={updateForm} nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <Step5 formData={formData} updateForm={updateForm} prevStep={prevStep} />}
      {/* Add stepper UI here if needed */}
    </div>
  );
};

export default EventForm;
