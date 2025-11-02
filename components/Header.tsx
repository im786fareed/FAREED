import React from 'react';
import { Icon } from './Icon';

interface HeaderProps {
  onToolsClick: () => void;
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ onToolsClick, t }) => {
  return (
    <header className="py-4 px-6 md:px-10 flex justify-between items-center bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center space-x-3">
        <Icon name="sparkles" className="h-7 w-7 text-violet-400" />
        <h1 className="text-xl font-bold text-white tracking-tight">{t('app_title')}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onToolsClick}
          className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center space-x-2"
        >
          <Icon name="tools" className="w-5 h-5" />
          <span>{t('header_tools')}</span>
        </button>
        <a
          href="https://github.com/google/generative-ai-docs/tree/main/site/en/tutorials/node/image_captioning.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Icon name="github" className="w-6 h-6" />
        </a>
      </div>
    </header>
  );
};
