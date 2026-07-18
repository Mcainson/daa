const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  globalIgnores([
    '**/.expo/**',
    '**/coverage/**',
    '**/dist/**',
    '**/node_modules/**',
    'apps/mobile/expo-env.d.ts',
  ]),
  {
    files: ['apps/mobile/src/**/*.{ts,tsx}', 'packages/**/*.ts'],
    settings: {
      'import/resolver': {
        typescript: {
          project: [
            './apps/mobile/tsconfig.json',
            './packages/contracts/tsconfig.json',
            './packages/domain/tsconfig.json',
            './packages/coach-harness/tsconfig.json',
          ],
        },
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error'] }],
    },
  },
]);
