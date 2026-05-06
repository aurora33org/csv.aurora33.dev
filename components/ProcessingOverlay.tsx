'use client';

import { useState, useEffect } from 'react';

interface ProcessingOverlayProps {
  stage: 'analyzing' | 'splitting' | null;
}

const PROMO_MESSAGES = [
  {
    title: '¿Necesitas automatizar procesos?',
    description: 'Aurora33 crea soluciones personalizadas con IA para tu negocio',
    cta: 'Conocer más',
    link: 'https://aurora33.org',
  },
  {
    title: 'Desde dashboards hasta APIs',
    description: 'Desarrollamos herramientas que impulsan tu productividad',
    cta: 'Ver proyectos',
    link: 'https://aurora33.org',
  },
  {
    title: '¿Tienes un proyecto en mente?',
    description: 'Agenda una consulta gratuita y cotiza tu solución',
    cta: 'Contactar',
    link: 'mailto:hola@aurora33.org',
  },
  {
    title: 'Soluciones de IA para empresas',
    description: 'Automatización, análisis de datos y desarrollo personalizado',
    cta: 'Descubrir servicios',
    link: 'https://aurora33.org',
  },
];

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
  const [ctaHovered, setCtaHovered] = useState(false);

  useEffect(() => {
    if (!stage) return;

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

      const progressPerStage = 100 / stages.length;
      const targetProgress = progressPerStage * (currentStageIndex + 1);

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

      setTimeout(() => {
        currentStageIndex++;
        processStage();
      }, stageConfig.duration);
    };

    processStage();
  }, [stage]);

  if (!stage) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 dark:bg-opacity-85 flex items-center justify-center z-50 animate-fade-in px-4">
      <div className="bg-card p-6 sm:p-8 md:p-10 max-w-md sm:max-w-lg md:max-w-xl w-full border border-border">
        {/* Spinner + Mensaje */}
        <div className="flex flex-col items-center space-y-4 mb-6">
          <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-center">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-1">
              {currentMessage}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Por favor espera un momento...
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">Progreso</span>
            <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-muted h-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-card px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Mientras esperas
            </span>
          </div>
        </div>

        {/* Mensaje promocional */}
        <div className="bg-secondary p-6 border-2 border-primary">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-primary flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-base sm:text-lg mb-2 leading-tight">
                {promoMessage.title}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-4 leading-relaxed">
                {promoMessage.description}
              </p>
              <a
                href={promoMessage.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCtaHovered(true)}
                onMouseLeave={() => setCtaHovered(false)}
                style={{
                  backgroundColor: ctaHovered ? 'oklch(var(--primary))' : 'oklch(var(--card))',
                  color: ctaHovered ? 'oklch(var(--primary-foreground))' : 'oklch(var(--primary))',
                  border: '2px solid oklch(var(--primary))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
              >
                <span>{promoMessage.cta}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Herramienta desarrollada por{' '}
            <span className="font-semibold text-primary">Aurora33</span>
          </p>
        </div>
      </div>
    </div>
  );
}
