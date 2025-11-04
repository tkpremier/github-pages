const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const nextConfig = require('eslint-config-next');
const prettierConfig = require('eslint-config-prettier');
const unusedImports = require('eslint-plugin-unused-imports');
const prettierPlugin = require('eslint-plugin-prettier');

module.exports = [
  {
    ignores: ['node_modules/**', 'build/**', 'dist/**', '*.config.js']
  },
  eslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
      'unused-imports': unusedImports
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        window: 'readonly',
        document: 'readonly'
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    rules: {
      ...(tseslint.configs.recommended || {}).rules,
      'quote-props': ['error', 'as-needed', { unnecessary: false }],
      'comma-dangle': ['error', 'never'],
      'func-names': ['off'],
      'no-confusing-arrow': ['warn'],
      'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
      'object-shorthand': ['error', 'methods'],
      'prettier/prettier': ['off'],
      'arrow-body-style': ['error', 'as-needed'],
      'linebreak-style': 0,
      'no-nested-ternary': ['off'],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  nextConfig,
  prettierConfig
];
