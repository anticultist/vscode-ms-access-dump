import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['**/node_modules', '**/out', '**/dist', '**/*.d.ts'],
  },
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 6,
      sourceType: 'module',
    },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/camelcase': 'off',
      'no-throw-literal': 'warn',
      camelcase: 'off',
      curly: 'warn',
      eqeqeq: 'warn',
      semi: [2, 'always'],
    },
  },
];
