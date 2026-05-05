import type { Metadata } from 'next'
import './globals.css'
import { ThemeToggle } from '@/components/ThemeToggle'
import { geistSans, geistMono, instrumentSerif, jetbrainsMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'csv.aurora33 | Herramientas CSV',
  description: 'Divide tus archivos CSV fácilmente. Herramienta gratuita y segura de Aurora33.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <div className="min-h-screen">
          <header className="bg-card border-b border-border sticky top-0 z-50 mb-4">
            <nav className="py-4 sm:py-5 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <a href="/" className="flex items-center">
                    <span className="font-instrument italic text-primary text-2xl font-normal leading-none">
                      aurora33
                    </span>
                    <span className="hud-cursor" aria-hidden="true" />
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex space-x-4">
                    <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      Cómo funciona
                    </a>
                    <a href="#features" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      Características
                    </a>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-card border-t border-border mt-16">
            <div className="py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-[120px] max-w-[1720px] mx-auto">
              <div className="text-center space-y-3">
                <p className="text-muted-foreground text-sm">
                  Hecho con IA y ❤️ por{' '}
                  <a
                    href="https://aurora33.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline transition-colors"
                  >
                    Aurora33
                  </a>
                </p>
                <p className="text-muted-foreground text-sm">
                  ¿Necesitas soluciones personalizadas para tu negocio?{' '}
                  <a
                    href="mailto:hola@aurora33.org"
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
