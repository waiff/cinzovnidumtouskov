import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

/** Build jednoho HTML souboru pro claude.ai artefakt: JS i CSS inline, fonty z Google Fonts. */
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  define: { 'import.meta.env.VITE_TARGET': JSON.stringify('artifact') },
  build: {
    outDir: 'dist-artifact',
    emptyOutDir: true,
    rollupOptions: { input: 'artifact.html' },
  },
})
