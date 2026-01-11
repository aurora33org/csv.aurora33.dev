'use client';

import { useState } from 'react';
import { CSVFile, downloadCSV, downloadAllCSVs, formatFileSize } from '@/lib/csvSplitter';

interface ResultsViewerProps {
  files: CSVFile[];
  onReset: () => void;
}

export default function ResultsViewer({ files, onReset }: ResultsViewerProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const totalSize = files.reduce((acc, file) => acc + file.size, 0);

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await downloadAllCSVs(files);
    } catch (error) {
      console.error('Error al descargar archivos:', error);
      alert('Error al generar el archivo ZIP. Por favor, intenta de nuevo.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="card">
        {/* Header con éxito */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse-slow">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">
            ¡División completada!
          </h2>
          <p className="text-text-muted">
            Tu archivo ha sido dividido en{' '}
            <span className="font-semibold text-primary-500">{files.length}</span>{' '}
            {files.length === 1 ? 'archivo' : 'archivos'}
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium">Archivos</p>
                <p className="text-2xl font-bold text-text">{files.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium">Tamaño total</p>
                <p className="text-2xl font-bold text-text">{formatFileSize(totalSize)}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-text-muted font-medium">Promedio</p>
                <p className="text-2xl font-bold text-text">{formatFileSize(totalSize / files.length)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de descargar todos */}
        <div className="mb-6">
          <button
            onClick={handleDownloadAll}
            disabled={isDownloading}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generando archivo ZIP...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Descargar todo en ZIP</span>
              </>
            )}
          </button>
        </div>

        {/* Lista de archivos */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-text mb-3">Archivos generados:</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background-secondary hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text truncate">{file.name}</p>
                    <p className="text-sm text-text-muted">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadCSV(file)}
                  className="ml-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors flex items-center space-x-2 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="hidden sm:inline">Descargar</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Botón para procesar otro archivo */}
        <button
          onClick={onReset}
          className="w-full btn-secondary flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Procesar otro archivo</span>
        </button>
      </div>
    </div>
  );
}
