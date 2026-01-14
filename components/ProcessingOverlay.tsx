'use client';

import { useState, useEffect } from 'react';

interface ProcessingOverlayProps {
  stage: 'analyzing' | 'splitting' | null;
}

// Mensajes promocionales rotativos de Aurora33
const PROMO_MESSAGES = [
  {
    title: '¿Necesitas automatizar procesos?',
    description: 'Aurora33 crea soluciones personalizadas con IA para tu negocio',
    cta: 'Conocer más',
    link: 'https://aurora33.dev',
  },
  {
    title: 'Desde dashboards hasta APIs',
    description: 'Desarrollamos herramientas que impulsan tu productividad',
    cta: 'Ver proyectos',
    link: 'https://aurora33.dev',
  },
  {
    title: '¿Tienes un proyecto en mente?',
    description: 'Agenda una consulta gratuita y cotiza tu solución',
    cta: 'Contactar',
    link: 'https://aurora33.dev',
  },
  {
    title: 'Soluciones de IA para empresas',
    description: 'Automatización, análisis de datos y desarrollo personalizado',
    cta: 'Descubrir servicios',
    link: 'https://aurora33.dev',
  },
];

// Etapas del procesamiento con sus mensajes
const PROCESSING_STAGES = {
  analyzing: [
    { message: 'Analizando estructura del archivo...', duration: 2000 },
    { message: 'Validando formato CSV...', duration: 1500 },
    { message: 'Contando filas y columnas...', duration: 1500 },
  ],
  splitting: [
    { message: 'Preparando división de datos...', duration: 1500 },
    { message: 'Dividiendo archivo en partes...', duration: 2500 },
    { message: 'Optimizando resultados...', duration: 1500 },
    { message: 'Generando archivos finales...', duration: 1500 },
  ],
};

export function ProcessingOverlay({ stage }: ProcessingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [promoMessage, setPromoMessage] = useState(PROMO_MESSAGES[0]);

  useEffect(() => {
    if (!stage) return;

    // Seleccionar mensaje promocional aleatorio
    const randomPromo = PROMO_MESSAGES[Math.floor(Math.random() * PROMO_MESSAGES.length)];
    setPromoMessage(randomPromo);

    const stages = PROCESSING_STAGES[stage];
    let currentStageIndex = 0;
    let currentProgress = 0;

    const processStage = () => {
      if (currentStageIndex >= stages.length) {
        setProgress(100);
        return;
      }

      const stageConfig = stages[currentStageIndex];
      setCurrentMessage(stageConfig.message);

      // Calcular progreso por etapa
      const progressPerStage = 100 / stages.length;
      const targetProgress = progressPerStage * (currentStageIndex + 1);

      // Animar progreso gradualmente
      const steps = 20;
      const increment = (targetProgress - currentProgress) / steps;
      let step = 0;

      const progressInterval = setInterval(() => {
        step++;
        currentProgress += increment;
        setProgress(Math.min(currentProgress, targetProgress));

        if (step >= steps) {
          clearInterval(progressInterval);
        }
      }, stageConfig.duration / steps);

      // Pasar a la siguiente etapa
      setTimeout(() => {
        currentStageIndex++;
        processStage();
      }, stageConfig.duration);
    };

    processStage();
  }, [stage]);

  if (!stage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 flex items-center justify-center z-50 animate-fade-in px-4">
      <div className="bg-white dark:bg-container-dark rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
        {/* Spinner + Mensaje de procesamiento */}
        <div className="flex flex-col items-center space-y-6 mb-6">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-lg font-semibold text-text dark:text-text-dark mb-2">
              {currentMessage}
            </p>
            <p className="text-sm text-text-muted dark:text-text-muted-dark">
              Por favor espera un momento...
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text dark:text-text-dark">
              Progreso
            </span>
            <span className="text-sm font-bold text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mensaje promocional de Aurora33 */}
        <div className="bg-container dark:bg-bg-dark rounded-xl p-5 border-2 border-primary">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-text dark:text-text-dark text-sm mb-1">
                {promoMessage.title}
              </h3>
              <p className="text-text-muted dark:text-text-muted-dark text-xs mb-3">
                {promoMessage.description}
              </p>
              <a
                href={promoMessage.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs font-semibold text-primary hover:underline"
              >
                <span>{promoMessage.cta}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
