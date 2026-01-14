/**
 * Rate Limiter utility para controlar conversiones de CSV
 * Usa localStorage para mantener timestamp de última conversión
 */

const COOLDOWN_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos
const STORAGE_KEY = 'csv_last_conversion';

export interface RateLimitResult {
  allowed: boolean;
  remainingTime: number; // milisegundos restantes
  lastConversion?: number; // timestamp de última conversión
}

/**
 * Verifica si el usuario puede realizar una nueva conversión
 */
export function canConvert(): RateLimitResult {
  if (typeof window === 'undefined') {
    return { allowed: true, remainingTime: 0 };
  }

  const lastConversion = localStorage.getItem(STORAGE_KEY);

  if (!lastConversion) {
    return { allowed: true, remainingTime: 0 };
  }

  const lastTimestamp = parseInt(lastConversion, 10);
  const now = Date.now();
  const timeSinceLastConversion = now - lastTimestamp;
  const remainingTime = COOLDOWN_DURATION - timeSinceLastConversion;

  if (remainingTime <= 0) {
    return { allowed: true, remainingTime: 0, lastConversion: lastTimestamp };
  }

  return {
    allowed: false,
    remainingTime,
    lastConversion: lastTimestamp,
  };
}

/**
 * Registra una nueva conversión en localStorage
 */
export function recordConversion(): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, Date.now().toString());
}

/**
 * Formatea el tiempo restante en formato legible
 * @param milliseconds Milisegundos restantes
 * @returns String formateado (ej: "4m 32s")
 */
export function formatRemainingTime(milliseconds: number): string {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * Resetea el rate limiter (útil para testing o admin)
 */
export function resetRateLimit(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(STORAGE_KEY);
}
