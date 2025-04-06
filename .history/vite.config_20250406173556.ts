import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// origianl
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
}); 


// export default defineConfig({
//   base: '/audiosculpt-speech-paint/', // Replace with your repository name
// })