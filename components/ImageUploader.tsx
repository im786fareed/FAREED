
import React, { useState, useCallback } from 'react';
import { Icon } from './Icon';

interface ImageUploaderProps {
  id: string;
  onImageUpload: (file: File) => void;
  title: string;
  description: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, onImageUpload, title, description }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <label
        htmlFor={id}
        className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ease-in-out
          ${isDragging ? 'border-violet-500 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500 bg-slate-800'}`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-2">
            <Icon name="upload" className="w-8 h-8 mb-4 text-slate-400" />
            <p className="mb-2 text-sm text-slate-400">
              <span className="font-semibold text-violet-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500">PNG, JPG, WEBP (max 10MB)</p>
          </div>
        )}
        <input id={id} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e.target.files)} />
      </label>
    </div>
  );
};
   