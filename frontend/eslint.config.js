import js from '@eslint/js';

export default [
  {
    ignores: ['dist', 'node_modules'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    ...js.configs.recommended,
  },
];
