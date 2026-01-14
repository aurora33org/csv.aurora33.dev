import type { Metadata } from 'next'
import './globals.css'
import { ThemeToggle } from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'csv.aurora33 - Herramientas CSV',
  description: 'Divide tus archivos CSV fácilmente. Herramienta gratuita y segura de Aurora 33.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="min-h-screen">
          <header className="bg-white dark:bg-bg-dark border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 mb-4">
            <nav className="py-4 sm:py-6 md:py-8 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">
                    <span className="text-primary">csv.</span>
                    <span className="text-text dark:text-text-dark">aurora</span>
                    <span className="text-text dark:text-text-dark align-super text-sm">33</span>
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex space-x-4">
                    <a href="#how-it-works" className="text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors text-sm">
                      Cómo funciona
                    </a>
                    <a href="#features" className="text-text-muted dark:text-text-muted-dark hover:text-primary transition-colors text-sm">
                      Características
                    </a>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-white dark:bg-bg-dark border-t border-gray-200 dark:border-gray-700 mt-16">
            <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto">
              <div className="text-center space-y-3">
                <p className="text-text-muted dark:text-text-muted-dark text-sm">
                  Hecho con IA y ❤️ por{' '}
                  <a
                    href="https://aurora33.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline transition-colors"
                  >
                    Aurora33
                  </a>
                </p>
                <p className="text-text-muted dark:text-text-muted-dark text-sm">
                  ¿Necesitas soluciones personalizadas para tu negocio?{' '}
                  <a
                    href="https://aurora33.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline transition-colors"
                  >
                    Contáctanos
                  </a>
                  .
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
