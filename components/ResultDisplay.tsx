
import React, { useState } from 'react';
import { Icon } from './Icon';

interface ResultDisplayProps {
  resultImage: string | null;
  isGenerating: boolean;
  error: string | null;
  t: (key: string) => string;
}

const ShareButton: React.FC<{
  icon: 'twitter' | 'facebook' | 'link' | 'download';
  text: string;
  onClick: () => void;
}> = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 bg-slate-700 hover:bg-slate-600 text-slate-200 px-3 py-1.5 rounded-md text-sm transition-colors"
  >
    <Icon name={icon} className="w-4 h-4" />
    <span>{text}</span>
  </button>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ resultImage, isGenerating, error, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    // In a real app, this would be a URL to the uploaded image
    if (!resultImage) return;
    navigator.clipboard.writeText(resultImage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = (platform: 'twitter' | 'facebook') => {
      const text = encodeURIComponent('Check out this image I created with AI Image Magic Editor!');
      const url = platform === 'twitter' 
          ? `https://twitter.com/intent/tweet?text=${text}`
          : `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `ai-magic-editor-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isGenerating) {
    return (
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-t-transparent border-violet-500 rounded-full animate-spin"></div>
            <div className="flex items-center justify-center w-full h-full">
                <Icon name="sparkles" className="w-10 h-10 text-violet-400 animate-pulse"/>
            </div>
        </div>
        <h3 className="text-xl font-semibold">{t('loading_message')}</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center bg-red-900/20 border border-red-500/50 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-red-400 mb-2">An Error Occurred</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (resultImage) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
        <div className="w-full h-full max-h-[70vh] aspect-square flex items-center justify-center">
             <img src={resultImage} alt="Generated result" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        </div>
        <div className="flex items-center space-x-2 flex-wrap justify-center gap-2">
            <ShareButton icon="twitter" text={t('share_on_twitter')} onClick={() => handleShare('twitter')} />
            <ShareButton icon="facebook" text={t('share_on_facebook')} onClick={() => handleShare('facebook')} />
            <ShareButton icon="link" text={copied ? t('copied_link') : t('copy_link')} onClick={handleCopyLink} />
            <ShareButton icon="download" text={t('download_image')} onClick={handleDownload} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
        <Icon name="sparkles" className="mx-auto h-16 w-16 text-slate-600"/>
      <h3 className="mt-4 text-2xl font-semibold text-white">{t('result_placeholder_title')}</h3>
      <p className="mt-1 text-md text-slate-400">{t('result_placeholder_desc')}</p>
    </div>
  );
};
