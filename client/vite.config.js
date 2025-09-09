import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  },
  test: {
    globals: true,          // Enable globals (test, expect, etc.)
    environment: 'jsdom',   // React DOM environment
    setupFiles: ['./src/setupTests.js']
  }
});
