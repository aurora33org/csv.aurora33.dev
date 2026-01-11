import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CSV Splitter - Aurora 33',
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
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl md:text-2xl font-bold">
                    <span className="text-primary-500">csv splitter.</span>
                    <span className="text-text">aurora</span>
                    <span className="text-text align-super text-sm">33</span>
                  </h1>
                </div>
                <nav className="flex items-center space-x-4">
                  <div className="hidden md:flex space-x-4">
                    <a href="#how-it-works" className="text-text-muted hover:text-primary-500 transition-colors text-sm">
                      Cómo funciona
                    </a>
                    <a href="#features" className="text-text-muted hover:text-primary-500 transition-colors text-sm">
                      Características
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 border border-slate-200 rounded-full px-3 py-1.5">
                    <button className="text-xs font-medium text-text hover:text-primary-500 transition-colors">ES</button>
                    <span className="text-slate-300">|</span>
                    <button className="text-xs font-medium text-text-muted hover:text-primary-500 transition-colors">EN</button>
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-white border-t border-slate-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center space-y-3">
                <p className="text-text-muted text-sm">
                  Hecho con IA y ❤️ por{' '}
                  <a
                    href="https://aurora33.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 font-semibold hover:text-primary-600 transition-colors"
                  >
                    Aurora33
                  </a>
                </p>
                <p className="text-text-muted text-sm">
                  ¿Necesitas soluciones personalizadas para tu negocio?{' '}
                  <a
                    href="https://aurora33.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 font-semibold hover:text-primary-600 transition-colors underline"
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
