'use client';

import { useState } from 'react';

interface CSVConfiguratorProps {
  totalRows: number;
  onConfigure: (rowsPerFile: number, includeHeader: boolean) => void;
  onCancel: () => void;
}

export default function CSVConfigurator({
  totalRows,
  onConfigure,
  onCancel,
}: CSVConfiguratorProps) {
  const [rowsPerFile, setRowsPerFile] = useState<number>(1000);
  const [includeHeader, setIncludeHeader] = useState<boolean>(true);

  const estimatedFiles = Math.ceil((totalRows - (includeHeader ? 1 : 0)) / rowsPerFile);

  const presetOptions = [
    { label: '500 filas', value: 500 },
    { label: '1,000 filas', value: 1000 },
    { label: '5,000 filas', value: 5000 },
    { label: '10,000 filas', value: 10000 },
  ];

  const handleSubmit = () => {
    if (rowsPerFile > 0) {
      onConfigure(rowsPerFile, includeHeader);
    }
  };

  return (
    <div className="w-full animate-slide-up">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Configurar división
          </h2>
          <p className="text-slate-600">
            Tu archivo contiene <span className="font-semibold text-primary-600">{totalRows.toLocaleString()}</span> filas en total
          </p>
        </div>

        {/* Opciones rápidas */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Opciones rápidas:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presetOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setRowsPerFile(option.value)}
                className={`
                  py-3 px-4 rounded-lg font-medium
                  transition-all duration-200
                  ${
                    rowsPerFile === option.value
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input personalizado */}
        <div className="mb-6">
          <label htmlFor="rowsPerFile" className="block text-sm font-medium text-slate-700 mb-2">
            O ingresa un valor personalizado:
          </label>
          <div className="relative">
            <input
              id="rowsPerFile"
              type="number"
              min="1"
              max={totalRows}
              value={rowsPerFile}
              onChange={(e) => setRowsPerFile(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg font-semibold text-slate-700"
              placeholder="Ej: 1000"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
              filas
            </span>
          </div>
        </div>

        {/* Checkbox de incluir header */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={includeHeader}
              onChange={(e) => setIncludeHeader(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-2 focus:ring-primary-500 cursor-pointer"
            />
            <div>
              <span className="font-medium text-slate-700">
                Incluir encabezado en cada archivo
              </span>
              <p className="text-sm text-slate-500">
                La primera fila se copiará en todos los archivos generados
              </p>
            </div>
          </label>
        </div>

        {/* Resumen */}
        <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-indigo-50 rounded-lg border-2 border-primary-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Resultado estimado:</h3>
              <p className="text-slate-700">
                Se generarán aproximadamente{' '}
                <span className="font-bold text-primary-700 text-xl">{estimatedFiles}</span>{' '}
                {estimatedFiles === 1 ? 'archivo' : 'archivos'}
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 btn-primary"
          >
            <span className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <span>Dividir archivo</span>
            </span>
          </button>
          <button
            onClick={onCancel}
            className="sm:w-auto btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
