# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CSV Splitter is a client-side web application built with Next.js 16+ that allows users to split large CSV files into smaller chunks. All processing happens in the browser - no data is sent to any server.

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.9.3
- **React**: 19.2.3
- **Styling**: Tailwind CSS 3.4.19
- **Build Tool**: Next.js built-in compiler
- **File Processing**: JSZip (for ZIP file generation)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run Next.js linter
npm run lint
```

## Architecture

### Application Flow

The application follows a three-step wizard pattern managed by state in `app/page.tsx`:

1. **Upload** (`currentStep: 'upload'`) - User uploads CSV file via drag-and-drop or file picker
2. **Configure** (`currentStep: 'configure'`) - User specifies rows per file and header inclusion
3. **Results** (`currentStep: 'results'`) - User downloads individual or all split files

### Directory Structure

```
app/
├── layout.tsx       # Root layout with header/footer, metadata
├── page.tsx         # Main page with wizard state management
└── globals.css      # Global Tailwind styles and custom CSS

components/
├── FileUploader.tsx      # Step 1: File upload with drag-and-drop
├── CSVConfigurator.tsx   # Step 2: Configuration form
└── ResultsViewer.tsx     # Step 3: Download interface

lib/
└── csvSplitter.ts   # Core CSV splitting logic and utilities
```

### Key Components

- **`app/page.tsx`**: Main orchestrator component that manages the wizard flow, file state, and processing state. Handles transitions between steps with simulated processing delays for UX.

- **`lib/csvSplitter.ts`**: Contains all CSV processing logic:
  - `analyzeCSV()` - Analyzes uploaded file to get row count
  - `splitCSV()` - Splits CSV into multiple files based on configuration
  - `downloadCSV()` - Triggers browser download for a single file
  - `downloadAllCSVs()` - Downloads all files with staggered delays
  - `formatFileSize()` - Formats byte sizes for display

### TypeScript Configuration

- Path alias `@/*` maps to project root for clean imports
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js default)

### Styling System

Tailwind is configured with custom extensions in `tailwind.config.js`:

- **Custom color palette**: Aurora 33 brand colors
  - Primary: Red (#F84733) with shades from 50-900
  - Background: #F8F8F8 (default), #FCF6F0 (secondary)
  - Text: #191A1B (default), #838A8D (muted)
- **Custom fonts**:
  - Headings (h1, h2, h3, h4): Kangge (local font from `/public/fonts/`)
  - Body text: Quicksand (Google Fonts)
  - Available Tailwind classes: `font-sans`, `font-heading`, `font-quicksand`, `font-kangge`
- **Custom animations**: `fade-in`, `slide-up`, `pulse-slow`
- **Content paths**: Scans `app/**` and `components/**` for classes

### State Management

No external state management library. All state is local to `app/page.tsx`:
- `currentStep` - Wizard step tracking
- `selectedFile` - Original File object
- `fileContent` - CSV content as string
- `totalRows` - Analyzed row count
- `splitFiles` - Array of split CSV file objects
- `isProcessing` - Loading state for transitions

## Important Implementation Details

### CSV Processing

- Files are read as text using `File.text()` API
- Lines are split by `\n` and empty lines are filtered out
- Header row is always assumed to exist (line 27 in csvSplitter.ts)
- File downloads use Blob API and temporary object URLs
- **ZIP Download**: All files are compressed into a single ZIP file using JSZip library
  - Individual files can still be downloaded separately
  - ZIP filename includes timestamp: `csv_files_YYYY-MM-DD.zip`
  - Loading state shown while ZIP is being generated

### Client-Side Only

This is a purely client-side application:
- All pages use `'use client'` directive
- No server-side rendering for the main application logic
- No API routes or server actions
- Privacy-focused: no data leaves the user's browser

### UI/UX Patterns

- Loading states use a full-screen modal overlay with spinner
- Step indicators show progress with checkmarks and color transitions
- Artificial 500ms delays added for smoother perceived UX during transitions
- Responsive design with mobile-first approach
- Glassmorphism effects on header with backdrop blur

## Notes

- The project name in package.json ("random-csv-converter") doesn't match the actual purpose (CSV Splitter)
- No testing framework is currently configured
- No error boundaries implemented
- Large files may cause browser memory issues as entire content is loaded into strings
