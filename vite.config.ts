import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['src/main.tsx', './index.html',"./manage_customers.html","./src/manage_customers.tsx","./src/mytable_component/table.tsx"]
    }
  }
});

