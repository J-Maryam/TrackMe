import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [
    {
      name: 'test-plugin',
      config: () => {
        console.log('Vite config loaded!');
      },
    },
  ],
});
