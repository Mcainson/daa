import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['packages/*/src/**/*.ts'],
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    include: ['packages/**/*.test.ts'],
  },
});
