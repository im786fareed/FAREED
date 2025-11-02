import React from 'react';
import { ImageUploader } from './ImageUploader';

interface EditorPanelProps {
  sourceFile: File | null;
  setSourceFile: (file: File | null) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  handleSubmit: () => void;
  t: (key: string) => string;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  sourceFile,
  setSourceFile,
  prompt,
  setPrompt,
  isGenerating,
  handleSubmit,
  t
}) => {
  const canGenerate = sourceFile && prompt.trim().length > 0 && !isGenerating;

  return (
    <div className="bg-slate-900 border-r border-slate-800 p-6 space-y-6 overflow-y-auto">
      <p className="text-sm text-slate-400">
        {t('app_description')}
      </p>
      
      <div className="space-y-4">
        <ImageUploader
          id="source-image"
          onImageUpload={setSourceFile}
          title={t('source_image_title')}
          description={t('source_image_description')}
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="prompt" className="block text-lg font-semibold text-white">
          {t('edit_instructions_title')}
        </label>
        <textarea
          id="prompt"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition"
          placeholder={t('edit_instructions_placeholder')}
          disabled={isGenerating}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canGenerate}
        className="w-full flex items-center justify-center bg-violet-600 hover:bg-violet-700 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
      >
        {isGenerating ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('generating_button')}
            </>
        ) : (
            t('generate_button')
        )}
      </button>
    </div>
  );
};
