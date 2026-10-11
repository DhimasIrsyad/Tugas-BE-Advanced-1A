import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Mengimpor modul compiler v4

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Mendaftarkan fungsi compiler Tailwind v4 ke dalam Vite
  ],
});
