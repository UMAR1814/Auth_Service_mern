// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig({
    files: ['**/*.{js,ts}'],
    extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.recommended,
        {
            ignores: [
                'dist',
                'coverage',
                'eslint.config.mjs',
                'jest.config.js',
            ],
        },
    ],
    languageOptions: {
        parserOptions: {
            projectService: true,
        },
    },
    rules: {
        // 'no-console': 'error',
        'dot-notation': 'error', //It can fix code
        // 'no-unused-vars': 'off',
        // '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/no-misused-promises': 'off',
    },
});
