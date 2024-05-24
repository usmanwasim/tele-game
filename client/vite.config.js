import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        react(),
        // nodePolyfills({
        //     include: ['crypto', 'http', 'zlib', 'https', 'url', 'stream', 'buffer'],
        // }),
    ],
    define: {
        'process.env': {},
    },
    resolve: {
        alias: {
            '@': '/src',
            '@/components': './src/Components/*',
            '@/utils': './src/utils/*',
            '@/Pages': './src/Pages/*',
        },
    },
});
