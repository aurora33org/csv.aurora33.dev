'use client';

import { useState, useEffect } from 'react';
import FileUploader from '@/components/FileUploader';
import CSVConfigurator from '@/components/CSVConfigurator';
import ResultsViewer from '@/components/ResultsViewer';
import { ProcessingOverlay } from '@/components/ProcessingOverlay';
import { analyzeCSV, splitCSV, CSVFile } from '@/lib/csvSplitter';
import { canConvert, recordConversion, formatRemainingTime } from '@/lib/rateLimiter';

type Step = 'upload' | 'configure' | 'results';
type ProcessingStage = 'analyzing' | 'splitting' | null;

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [totalRows, setTotalRows] = useState<number>(0);
  const [splitFiles, setSplitFiles] = useState<CSVFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<ProcessingStage>(null);
  const [cooldownError, setCooldownError] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Efecto para actualizar contador regresivo de cooldown
  useEffect(() => {
    if (remainingTime <= 0) {
      setCooldownError(null);
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          setCooldownError(null);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setProcessingStage('analyzing');
    setSelectedFile(file);

    try {
      const content = await file.text();
      setFileContent(content);

      const analysis = analyzeCSV(content);
      setTotalRows(analysis.totalRows);

      // Esperar 5 segundos (simulación de procesamiento con stages)
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingStage(null);
        setCurrentStep('configure');
      }, 5000); // Aumentado de 500ms a 5000ms
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      alert('Error al procesar el archivo. Por favor, intenta de nuevo.');
      setIsProcessing(false);
      setProcessingStage(null);
    }
  };

  const handleConfigure = (rowsPerFile: number, includeHeader: boolean) => {
    // Verificar rate limit antes de procesar
    const rateLimitCheck = canConvert();

    if (!rateLimitCheck.allowed) {
      setCooldownError(
        `Por favor espera ${formatRemainingTime(rateLimitCheck.remainingTime)} antes de realizar otra conversión.`
      );
      setRemainingTime(rateLimitCheck.remainingTime);
      // Scroll al top para mostrar el error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);
    setProcessingStage('splitting');

    try {
      const result = splitCSV(fileContent, { rowsPerFile, includeHeader });
      setSplitFiles(result.files);

      // Registrar conversión exitosa
      recordConversion();

      // Esperar 7.5 segundos (simulación de procesamiento con stages)
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingStage(null);
        setCurrentStep('results');
      }, 7500); // Aumentado de 500ms a 7500ms
    } catch (error) {
      console.error('Error al dividir el archivo:', error);
      alert('Error al dividir el archivo. Por favor, intenta de nuevo.');
      setIsProcessing(false);
      setProcessingStage(null);
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
    <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-[60px] py-8 md:py-12">
      {/* Mensaje de error de cooldown */}
      {cooldownError && (
        <div className="mb-6 p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-xl animate-fade-in">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-700 dark:text-red-400 mb-2 text-lg">
                Límite de conversiones alcanzado
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-3">
                {cooldownError}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="font-semibold text-red-700 dark:text-red-400">
                  Tiempo restante: {formatRemainingTime(remainingTime)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Siempre visible */}
      {currentStep === 'upload' && (
        <div className="animate-fade-in">
          {/* Título */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Divide tus archivos CSV.
              <br />
              <span className="text-text dark:text-text-dark">Para cualquier proyecto.</span>
            </h1>
          </div>

          {/* Dos columnas */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Columna Izquierda - Texto y Checks */}
            <div className="space-y-6">
              <p className="text-text-muted dark:text-text-muted-dark text-base md:text-lg leading-relaxed">
                Ya sea que diseñes, desarrolles, vendas o crees contenido—nosotros redimensionamos,
                comprimimos y optimizamos tus archivos CSV automáticamente. Una herramienta. Múltiples
                necesidades. Sin complicaciones.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-text dark:text-text-dark text-sm md:text-base">División automática por número de filas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-text dark:text-text-dark text-sm md:text-base">Mantén el encabezado en todos los archivos si lo necesitas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-text dark:text-text-dark text-sm md:text-base">100% privado - procesamiento local en tu navegador</p>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Drag and Drop */}
            <div className="space-y-6">
              <FileUploader onFileSelect={handleFileSelect} />

              {/* Info badges */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-sm text-text-muted dark:text-text-muted-dark font-medium">100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-text-muted dark:text-text-muted-dark font-medium">Procesamiento Seguro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-sm text-text-muted dark:text-text-muted-dark font-medium">División Rápida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cómo funciona */}
      {currentStep === 'upload' && (
        <div id="how-it-works" className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
              Divide tus archivos CSV en tres simples pasos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-text dark:text-text-dark mb-3">Sube tu archivo CSV</h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Arrastra y suelta tu archivo o haz clic para seleccionarlo desde tu computadora.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-text dark:text-text-dark mb-3">Configura la división</h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Elige cuántas filas quieres en cada archivo. Puedes usar las opciones rápidas o ingresar un valor personalizado.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-text dark:text-text-dark mb-3">Descarga tus archivos</h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Descarga todos los archivos de una vez o uno por uno según tus necesidades.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Propósitos / Características */}
      {currentStep === 'upload' && (
        <div id="features" className="mt-16 md:mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4">
              ¿Para qué lo puedes usar?
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
              Herramienta versátil para múltiples escenarios de trabajo con datos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Importación de bases de datos</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Divide archivos grandes para importarlos más fácilmente en sistemas con límites de tamaño.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Análisis de datos</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Procesa conjuntos de datos grandes dividiéndolos en partes manejables para análisis.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Envío por email</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Reduce el tamaño de archivos para cumplir con los límites de adjuntos de correo electrónico.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Distribución de trabajo</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Distribuye datos entre diferentes equipos o departamentos de manera organizada.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Respaldo de datos</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Crea respaldos segmentados de tus datos para mejor organización y recuperación.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-container dark:bg-container-dark rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">Testing y desarrollo</h3>
              <p className="text-text-muted dark:text-text-muted-dark text-sm">
                Crea datasets más pequeños para pruebas sin necesidad de procesar archivos completos.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAQs */}
      {currentStep === 'upload' && (
        <div className="mt-16 md:mt-24 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-text-muted dark:text-text-muted-dark max-w-2xl mx-auto">
              Respuestas a las dudas más comunes
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Es seguro subir mis archivos?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                ¡Completamente seguro! Todo el procesamiento ocurre en tu navegador. Tus archivos nunca se envían a ningún servidor externo. El procesamiento es 100% local en tu computadora.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Hay límite de tamaño de archivo?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Por ahora recomendamos archivos de hasta 8 MB para un mejor rendimiento. En futuras versiones permitiremos archivos más grandes. El límite depende principalmente de la memoria de tu navegador.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Puedo mantener el encabezado en todos los archivos?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Sí, en el paso de configuración puedes elegir si quieres incluir la primera fila (encabezado) en cada uno de los archivos generados. Esto es útil cuando cada archivo necesita ser independiente.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Qué formato tienen los archivos generados?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Los archivos generados son archivos CSV estándar (.csv) comprimidos en un archivo ZIP para facilitar la descarga. Puedes extraer el ZIP y abrir los archivos CSV con Excel, Google Sheets, o cualquier aplicación que soporte este formato. Mantienen la misma estructura del archivo original.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Es gratis usar esta herramienta?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Sí, CSV Splitter es completamente gratuito. No hay límites de uso ni necesitas crear una cuenta. Puedes usar la herramienta cuantas veces necesites.
              </p>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text dark:text-text-dark text-lg mb-2">
                ¿Funciona en dispositivos móviles?
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark">
                Sí, la herramienta está optimizada para funcionar en dispositivos móviles y tablets. Sin embargo, para archivos muy grandes recomendamos usar una computadora de escritorio para mejor rendimiento.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Processing Overlay con ads rotativos */}
      <ProcessingOverlay stage={processingStage} />

      {/* Configure Step */}
      {currentStep === 'configure' && (
        <div className="animate-fade-in">
          <CSVConfigurator
            totalRows={totalRows}
            onConfigure={handleConfigure}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Results Step */}
      {currentStep === 'results' && (
        <div className="animate-fade-in">
          <ResultsViewer files={splitFiles} onReset={handleReset} />
        </div>
      )}
    </div>
  );
}
