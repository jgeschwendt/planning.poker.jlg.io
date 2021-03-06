'use strict';

const ecmaVersion = 2020;

const AllowedOneCharacterVariables = [
  'a', 'b', 'i', 'j', 'k', 'm', 'p', 'x', 'y', 'z',
];

const MaxDepthJSX = 5;

const ReactMagicNumbers = [
  ...[
  // eslint-disable-next-line no-magic-numbers -- grid options,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ],
  ...[
    // eslint-disable-next-line no-magic-numbers -- animation timings,
    100, 200, 250, 300, 350, 400, 450, 500,
  ],
  ...[
    // eslint-disable-next-line no-magic-numbers -- multiplier,
    -1, 1000,
  ],
];

// https://webpack.js.org/api/module-methods/#magic-comments
const WebpackMagicComments = [
  'webpackChunkName',
  'webpackExclude',
  'webpackInclude',
  'webpackMode',
  'webpackPrefetch',
  'webpackPreload',
];

module.exports = {
  extends: [
    '@eslint-calibrate',
    'plugin:@eslint-calibrate/calibrate',
  ],
  ignorePatterns: [
    'next-env.d.ts',
  ],
  overrides: [
    // Language — MDX
    {
      extends: [
        'plugin:mdx/recommended',
      ],
      files: [
        '*.md',
        '*.mdx',
      ],
      rules: {
        'import/unambiguous': 'off',
      },
    },

    // Language — TypeScript
    {
      extends: [
        '@eslint-calibrate/typescript',
        'plugin:@eslint-calibrate/typescript',
      ],
      files: [
        '*.ts',
        '*.tsx',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      },
    },

    // Environment — Next/React
    {
      extends: [
        '@eslint-calibrate/react',
        'plugin:@eslint-calibrate/react',
        '@eslint-calibrate/node',
        '@eslint-calibrate/node/typescript',
      ],
      files: [
        'src/**/*.ts',
        'src/**/*.tsx',
      ],
      rules: {
        '@typescript-eslint/no-magic-numbers': ['error', {
          ignore: ReactMagicNumbers,
        }],
        'capitalized-comments': [
          'error',
          'always',
          {
            ignoreInlineComments: false,
            ignorePattern: WebpackMagicComments.join('|'),
          },
        ],
        'import/no-internal-modules': ['error', {
          allow: [
            'next/app',
            'next/head',
            'next/dynamic',
            'next/link',
            'next/router',
            '**/src/**',
          ],
        }],
        'import/no-named-export': 'off',
        'import/no-nodejs-modules': ['error', {
          allow: ['util'],
        }],
        'import/no-unassigned-import': ['error', {
          allow: ['**/*.scss'],
        }],
        'import/prefer-default-export': 'off',
        'lines-around-comment': ['error', {
          ignorePattern: WebpackMagicComments.join('|'),
        }],
        'node/file-extension-in-import': ['error', 'always', {
          '.ts': 'never',
          '.tsx': 'never',
          'tryExtensions': ['.ts', '.tsx'],
        }],
        'react/default-props-match-prop-types': 'off',
        'react/jsx-max-depth': ['error', {
          max: MaxDepthJSX,
        }],

        // Redundant in TS applications
        'react/prop-types': 'off',

        // Handled by babel jsx-transform
        'react/react-in-jsx-scope': 'off',
      },
      settings: {
        'import/extensions': ['.ts', '.tsx'],
        'react': {
          version: 'detect',
        },
      },
    },
    {
      // Next Page exports
      files: [
        'src/pages/api/**/*.ts',
        'src/pages/**/*.tsx',
      ],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },

    // Environment — Jest
    {
      extends: [
        '@eslint-calibrate/jest',
      ],
      files: [
        '*.test.ts',
        '*.test.tsx',
      ],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },

    // Environment — Node / CommonJS
    {
      extends: [
        '@eslint-calibrate/node',
        '@eslint-calibrate/node/script',
      ],
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'next.config.js',
      ],
    },
  ],

  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
    },
    ecmaVersion,
    sourceType: 'module',
  },
  root: true,
  rules: {
    'id-length': ['error', {
      exceptions: AllowedOneCharacterVariables,
    }],
    'import/no-relative-parent-imports': 'off',
    'no-warning-comments': 'warn',
    'unicorn/filename-case': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-keyword-prefix': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
  },
};
