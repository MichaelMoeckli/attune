import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

// Test-Konfiguration fuer die Unit-Tests der Kuratierungslogik.
// Bildet den `@/`-Alias aus tsconfig.json nach. Beeinflusst den Next.js-Build nicht.
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
