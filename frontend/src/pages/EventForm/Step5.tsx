import React, { ChangeEvent } from 'react';
import { EventFormData } from './EventForm';

type Step5Props = {
  formData: EventFormData;
  updateForm: (fields: Partial<EventFormData>) => void;
  prevStep: () => void;
};

const Step5: React.FC<Step5Props> = ({ formData, updateForm, prevStep }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateForm({ proposalFile: e.target.files[0] });
    }
  };

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
            <button className="bg-purple-300 text-black px-6 py-2 rounded">Submit</button>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 justify-center p-8">
          <div className="mb-4">
            <div className="mb-2 text-lg">Enter Proposal below</div>
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center h-48">
              <input
                type="file"
                className="hidden"
                id="proposal-upload"
                onChange={handleFileChange}
              />
              <label htmlFor="proposal-upload" className="cursor-pointer text-gray-300">
                Drag a file<br />OR<br />Upload from Computer
              </label>
              {formData.proposalFile && (
                <div className="mt-2 text-green-400">{formData.proposalFile.name}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <button className="bg-gray-800 text-white px-6 py-2 rounded">Submit Pre-Made Proposal</button>
            <div className="text-center text-gray-400">OR</div>
            <button className="bg-gray-800 text-white px-6 py-2 rounded">Auto-Generate Proposal</button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex gap-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex flex-col items-center">
              <span className={n === 5 ? 'text-purple-400' : 'text-white'}>{n}.</span>
              <div className={`w-16 h-1 ${n === 5 ? 'bg-purple-400' : 'bg-white'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step5;
