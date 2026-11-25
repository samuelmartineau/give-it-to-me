import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    ignores: ['src/routeTree.gen.ts'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': typescript,
    },
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly',
        fetch: 'readonly',
        EventSource: 'readonly',

        // DOM types
        HTMLInputElement: 'readonly',
        HTMLButtonElement: 'readonly',
        SVGRectElement: 'readonly',

        // Event types
        Event: 'readonly',
        MouseEvent: 'readonly',
        UIEvent: 'readonly',

        // Other globals
        File: 'readonly',
        Window: 'readonly',

        // Node.js globals
        process: 'readonly',
      },
    },
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      'no-extra-boolean-cast': 'error',
      'no-undef': 'error',
    },
  },
];
