'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploader({ onFileSelect }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileSelect(file);
      } else {
        alert('Por favor, selecciona un archivo CSV válido');
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        onFileSelect(file);
      } else {
        alert('Por favor, selecciona un archivo CSV válido');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative cursor-pointer
          border-2 rounded-3xl
          transition-all duration-300 ease-in-out
          h-[455px]
          flex items-center justify-center
          ${
            isDragging
              ? 'border-primary-500 bg-primary-50/30 scale-[1.02]'
              : 'border-primary-500 hover:border-primary-600'
          }
        `}
        style={{ backgroundColor: '#FCF6F0' }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          {/* Icono */}
          <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
            <svg
              className="w-full h-full text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Texto principal */}
          <div>
            <p className="text-lg md:text-xl font-medium text-text mb-2">
              {isDragging ? '¡Suelta el archivo aquí!' : 'Arrastra y suelta archivos aquí'}
            </p>
            <p className="text-sm text-text-muted">
              o haz click para explorar tus archivos
            </p>
          </div>

          {/* Info */}
          <p className="text-xs text-text-muted mt-2">
            Por ahora solo aceptamos archivos de hasta 8 MB
          </p>
          <p className="text-xs text-text-muted">
            En el futuro permitiremos archivos más grandes
          </p>
        </div>
      </div>
    </div>
  );
}
