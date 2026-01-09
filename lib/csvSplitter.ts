export interface CSVFile {
  name: string;
  content: string;
  size: number;
}

export interface SplitOptions {
  rowsPerFile: number;
  includeHeader: boolean;
}

export interface SplitResult {
  files: CSVFile[];
  totalRows: number;
  headerRow: string | null;
}

/**
 * Analiza un archivo CSV y retorna información básica
 */
export function analyzeCSV(content: string): { totalRows: number; hasHeader: boolean; preview: string[] } {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const preview = lines.slice(0, 5);

  return {
    totalRows: lines.length,
    hasHeader: true, // Asumimos que siempre hay header
    preview,
  };
}

/**
 * Divide un archivo CSV en múltiples archivos más pequeños
 */
export function splitCSV(content: string, options: SplitOptions): SplitResult {
  const lines = content.split('\n').filter(line => line.trim() !== '');

  if (lines.length === 0) {
    throw new Error('El archivo CSV está vacío');
  }

  const headerRow = options.includeHeader ? lines[0] : null;
  const dataRows = options.includeHeader ? lines.slice(1) : lines;

  if (dataRows.length === 0) {
    throw new Error('El archivo no contiene datos (solo tiene encabezado)');
  }

  const files: CSVFile[] = [];
  const totalFiles = Math.ceil(dataRows.length / options.rowsPerFile);

  for (let i = 0; i < totalFiles; i++) {
    const start = i * options.rowsPerFile;
    const end = Math.min(start + options.rowsPerFile, dataRows.length);
    const fileRows = dataRows.slice(start, end);

    let fileContent = '';
    if (headerRow && options.includeHeader) {
      fileContent = headerRow + '\n';
    }
    fileContent += fileRows.join('\n');

    files.push({
      name: `part_${i + 1}_of_${totalFiles}.csv`,
      content: fileContent,
      size: new Blob([fileContent]).size,
    });
  }

  return {
    files,
    totalRows: lines.length,
    headerRow,
  };
}

/**
 * Descarga un archivo CSV
 */
export function downloadCSV(file: CSVFile): void {
  const blob = new Blob([file.content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', file.name);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Descarga todos los archivos como ZIP (simplificado: descarga uno por uno)
 */
export function downloadAllCSVs(files: CSVFile[]): void {
  files.forEach((file, index) => {
    setTimeout(() => {
      downloadCSV(file);
    }, index * 100); // Pequeño delay entre descargas
  });
}

/**
 * Formatea el tamaño de archivo para mostrar
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
