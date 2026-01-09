# CSV Splitter 📊

Una herramienta moderna y fácil de usar para dividir archivos CSV grandes en archivos más pequeños.

## ✨ Características

- 🎨 **Interfaz moderna**: Diseñada con Tailwind CSS 3 y Next.js
- 🔒 **100% Privado**: Todo el procesamiento ocurre en tu navegador
- ⚡ **Super rápido**: Sin esperas ni subidas a servidores
- 🎯 **Intuitivo**: Interfaz drag & drop fácil de usar
- 📱 **Responsive**: Funciona perfectamente en móviles y escritorio
- 🎨 **UX/UI cuidado**: Animaciones suaves y feedback visual constante

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build

```bash
npm run build
npm start
```

## 🎯 Cómo usar

1. **Sube tu archivo CSV**: Arrastra y suelta o haz clic para seleccionar
2. **Configura**: Elige cuántas filas quieres por archivo
3. **Descarga**: Obtén tus archivos divididos instantáneamente

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16+ (App Router)
- **Estilos**: Tailwind CSS 3
- **Lenguaje**: TypeScript
- **React**: 19+

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx       # Layout principal
│   ├── page.tsx         # Página principal
│   └── globals.css      # Estilos globales
├── components/
│   ├── FileUploader.tsx      # Componente de carga
│   ├── CSVConfigurator.tsx   # Configuración
│   └── ResultsViewer.tsx     # Vista de resultados
├── lib/
│   └── csvSplitter.ts   # Lógica de división
└── tailwind.config.js   # Configuración de Tailwind
```

## 🎨 Características de Diseño

- Paleta de colores moderna basada en Indigo
- Animaciones suaves con Tailwind
- Componentes con glassmorphism
- Feedback visual inmediato
- Estados de carga intuitivos
- Diseño mobile-first

## 🔐 Privacidad

Esta aplicación procesa todos los archivos localmente en tu navegador. Ningún dato se envía a servidores externos.

## 📝 Licencia

ISC

---

Hecho con ❤️ usando Next.js y Tailwind CSS
