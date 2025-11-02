import React from 'react';
import { Icon } from './Icon';

interface FreeToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export const FreeToolsModal: React.FC<FreeToolsModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-xl w-full max-w-2xl p-8 space-y-6 relative transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 end-4 text-slate-400 hover:text-white">
          <Icon name="close" className="w-6 h-6"/>
        </button>

        <div className="flex items-center space-x-4">
            <div className="bg-violet-500/20 p-3 rounded-lg">
                <Icon name="tools" className="h-8 w-8 text-violet-400"/>
            </div>
            <h2 className="text-2xl font-bold text-white">{t('modal_tools_title')}</h2>
        </div>
        
        <p className="text-slate-300">{t('modal_tools_desc_1')}</p>
        <p className="text-slate-300">{t('modal_tools_desc_2')}</p>

        <div className="space-y-4 pt-4 border-t border-slate-700">
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-400">{t('modal_tools_a1111_title')}</h3>
                <p className="text-sm text-slate-400">{t('modal_tools_a1111_desc')}</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-lg">
                <h3 className="font-semibold text-violet-400">{t('modal_tools_resrgan_title')}</h3>
                <p className="text-sm text-slate-400">{t('modal_tools_resrgan_desc')}</p>
            </div>
        </div>

        <div className="flex items-start space-x-3 bg-slate-700/50 p-4 rounded-lg">
            <Icon name="info" className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5"/>
            <div>
                <h4 className="font-semibold text-sky-400">{t('modal_tools_get_started')}</h4>
                <p className="text-sm text-slate-400">{t('modal_tools_get_started_desc')}</p>
            </div>
        </div>

        <button 
            onClick={onClose}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
            {t('modal_close_button')}
        </button>
      </div>
    </div>
  );
};