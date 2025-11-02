import React from 'react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Upgrade to Pro</h2>
        <p className="text-slate-400 mb-6">Unlock unlimited image generations and more features!</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-700 rounded-md hover:bg-slate-600">
            Maybe Later
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
