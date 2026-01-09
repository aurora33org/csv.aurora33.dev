'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import CSVConfigurator from '@/components/CSVConfigurator';
import ResultsViewer from '@/components/ResultsViewer';
import { analyzeCSV, splitCSV, CSVFile } from '@/lib/csvSplitter';

type Step = 'upload' | 'configure' | 'results';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [totalRows, setTotalRows] = useState<number>(0);
  const [splitFiles, setSplitFiles] = useState<CSVFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setSelectedFile(file);

    try {
      const content = await file.text();
      setFileContent(content);

      const analysis = analyzeCSV(content);
      setTotalRows(analysis.totalRows);

      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('configure');
      }, 500);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      alert('Error al procesar el archivo. Por favor, intenta de nuevo.');
      setIsProcessing(false);
    }
  };

  const handleConfigure = (rowsPerFile: number, includeHeader: boolean) => {
    setIsProcessing(true);

    try {
      const result = splitCSV(fileContent, { rowsPerFile, includeHeader });
      setSplitFiles(result.files);

      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep('results');
      }, 500);
    } catch (error) {
      console.error('Error al dividir el archivo:', error);
      alert('Error al dividir el archivo. Por favor, intenta de nuevo.');
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setFileContent('');
    setTotalRows(0);
    setSplitFiles([]);
  };

  const handleCancel = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setFileContent('');
    setTotalRows(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Divide tus archivos CSV{' '}
          <span className="bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
            fácilmente
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Herramienta gratuita y segura para dividir archivos CSV grandes en archivos más pequeños.
          Todo se procesa en tu navegador, tus datos nunca salen de tu computadora.
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="mb-12">
        <div className="flex items-center justify-center space-x-4">
          {/* Paso 1 */}
          <div className="flex items-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold
              transition-all duration-300
              ${
                currentStep === 'upload'
                  ? 'bg-primary-600 text-white scale-110'
                  : 'bg-green-600 text-white'
              }
            `}
            >
              {currentStep === 'upload' ? (
                '1'
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:inline">
              Subir
            </span>
          </div>

          {/* Línea */}
          <div className={`w-12 h-1 rounded ${currentStep !== 'upload' ? 'bg-green-600' : 'bg-slate-300'}`} />

          {/* Paso 2 */}
          <div className="flex items-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold
              transition-all duration-300
              ${
                currentStep === 'configure'
                  ? 'bg-primary-600 text-white scale-110'
                  : currentStep === 'results'
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-300 text-slate-600'
              }
            `}
            >
              {currentStep === 'results' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                '2'
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:inline">
              Configurar
            </span>
          </div>

          {/* Línea */}
          <div className={`w-12 h-1 rounded ${currentStep === 'results' ? 'bg-green-600' : 'bg-slate-300'}`} />

          {/* Paso 3 */}
          <div className="flex items-center">
            <div
              className={`
              w-10 h-10 rounded-full flex items-center justify-center font-semibold
              transition-all duration-300
              ${
                currentStep === 'results'
                  ? 'bg-primary-600 text-white scale-110'
                  : 'bg-slate-300 text-slate-600'
              }
            `}
            >
              3
            </div>
            <span className="ml-2 text-sm font-medium text-slate-700 hidden sm:inline">
              Descargar
            </span>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-lg font-semibold text-slate-800">Procesando...</p>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="mb-12">
        {currentStep === 'upload' && <FileUploader onFileSelect={handleFileSelect} />}

        {currentStep === 'configure' && (
          <CSVConfigurator
            totalRows={totalRows}
            onConfigure={handleConfigure}
            onCancel={handleCancel}
          />
        )}

        {currentStep === 'results' && <ResultsViewer files={splitFiles} onReset={handleReset} />}
      </div>

      {/* Features Section */}
      <div id="features" className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">100% Privado</h3>
          <p className="text-sm text-slate-600">
            Todo se procesa en tu navegador. Tus datos nunca se envían a ningún servidor.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Super Rápido</h3>
          <p className="text-sm text-slate-600">
            Procesamiento instantáneo sin necesidad de esperas o subidas lentas.
          </p>
        </div>

        <div className="card text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Totalmente Flexible</h3>
          <p className="text-sm text-slate-600">
            Elige cuántas filas quieres por archivo y si incluir el encabezado.
          </p>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="card">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          ¿Cómo funciona?
        </h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Sube tu archivo CSV</h3>
              <p className="text-slate-600">
                Arrastra y suelta tu archivo o haz clic para seleccionarlo desde tu computadora.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Configura la división</h3>
              <p className="text-slate-600">
                Elige cuántas filas quieres en cada archivo. Puedes usar las opciones rápidas o ingresar un valor personalizado.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 mb-1">Descarga tus archivos</h3>
              <p className="text-slate-600">
                Descarga todos los archivos de una vez o uno por uno según tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
