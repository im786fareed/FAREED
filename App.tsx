import React, { useState } from 'react';
import { EditorPanel } from './components/EditorPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { FreeToolsModal } from './components/FreeToolsModal';
import { useTranslation } from './hooks/useTranslation';
import { fileToBase64 } from './util/fileUtils';
import { editImageWithGemini } from './services/geminiService';
import type { ImageData } from './types';

function App() {
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!sourceFile || !prompt) return;

    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const sourceImageData: ImageData = await fileToBase64(sourceFile);
      const generatedImageData: string = await editImageWithGemini(prompt, sourceImageData);
      setResultImage(`data:image/png;base64,${generatedImageData}`);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'POLICY_VIOLATION') {
            setError(t('error_policy_violation'));
        } else {
            setError(err.message || t('error_generic'));
        }
      } else {
        setError(t('error_generic'));
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      <Header onToolsClick={() => setIsModalOpen(true)} t={t} />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        <EditorPanel
          sourceFile={sourceFile}
          setSourceFile={setSourceFile}
          prompt={prompt}
          setPrompt={setPrompt}
          isGenerating={isGenerating}
          handleSubmit={handleSubmit}
          t={t}
        />
        <div className="bg-slate-800/50 p-6 md:p-10 flex items-center justify-center">
          <ResultDisplay
            resultImage={resultImage}
            isGenerating={isGenerating}
            error={error}
            t={t}
          />
        </div>
      </main>
      <FreeToolsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t}/>
    </div>
  );
}

export default App;
