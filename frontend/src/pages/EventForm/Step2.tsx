import React, { ChangeEvent } from 'react';
import { EventFormData } from './EventForm';

type Step2Props = {
  formData: EventFormData;
  updateForm: (fields: Partial<EventFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const Step2: React.FC<Step2Props> = ({ formData, updateForm, nextStep, prevStep }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-2xl flex flex-row">
        <div className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-4 border-l-4 border-teal-400 pl-4">Have an Event upcoming?</h1>
          <p className="mb-2">Have an Event upcoming? want to find Sponsors for it? dfwjiwjd frfr</p>
          <p className="mb-2">just fill in a few details on the sid</p>
          <p className="mb-6">and Voila !</p>
          <div className="flex gap-4 mt-8">
            <button className="bg-teal-400 text-black px-6 py-2 rounded" onClick={prevStep}>←</button>
            <button className="bg-purple-300 text-black px-6 py-2 rounded" onClick={nextStep}>Next</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-center p-8">
          <textarea
            className="bg-gray-900 text-white p-4 rounded h-40"
            placeholder="Add Description"
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => updateForm({ description: e.target.value })}
          />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex gap-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <span className={n === 2 ? 'text-purple-400' : 'text-white'}>{n}.</span>
              <div className={`w-16 h-1 ${n === 2 ? 'bg-purple-400' : 'bg-white'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
