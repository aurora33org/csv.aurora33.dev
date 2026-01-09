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
    <div className="w-full animate-fade-in">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative cursor-pointer
          border-3 border-dashed rounded-2xl
          transition-all duration-300 ease-in-out
          ${
            isDragging
              ? 'border-primary-500 bg-primary-50 scale-105'
              : 'border-slate-300 bg-white hover:border-primary-400 hover:bg-slate-50'
          }
          p-12 text-center
          shadow-lg hover:shadow-xl
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-4">
          {/* Icono animado */}
          <div
            className={`
            w-20 h-20 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${
              isDragging
                ? 'bg-primary-100 scale-110'
                : 'bg-gradient-to-br from-primary-100 to-primary-200'
            }
          `}
          >
            <svg
              className={`w-10 h-10 text-primary-600 transition-transform duration-300 ${
                isDragging ? 'scale-110' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          {/* Texto principal */}
          <div>
            <p className="text-xl font-semibold text-slate-700 mb-2">
              {isDragging ? '¡Suelta el archivo aquí!' : 'Arrastra tu archivo CSV aquí'}
            </p>
            <p className="text-sm text-slate-500">
              o haz clic para seleccionar un archivo
            </p>
          </div>

          {/* Badge informativo */}
          <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
            <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-slate-600 font-medium">Solo archivos .csv</span>
          </div>
        </div>

        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  );
}
