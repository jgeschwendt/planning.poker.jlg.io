"use strict";

const ecmaVersion = 2019;

const AllowedOneCharacterVariables = [
  "a", "b", "i", "j", "k", "m", "p", "x", "y", "z",
];

const ReactMagicNumbers = [
  ...[
  // eslint-disable-next-line no-magic-numbers -- grid options,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ],
  ...[
    // eslint-disable-next-line no-magic-numbers -- animation timings,
    100, 200, 250, 300, 350, 400, 450, 500, 1000,
  ],
];

module.exports = {
  extends: [
    "@eslint-calibrate",
    "plugin:@eslint-calibrate/calibrate",
  ],
  ignorePatterns: [
    "next-env.d.ts",
  ],
  overrides: [
    // Language — MDX
    {
      extends: [
        "plugin:mdx/recommended",
      ],
      files: [
        "*.md",
        "*.mdx",
      ],
      rules: {
        "import/unambiguous": "off",
      },
    },

    // Language — TypeScript
    {
      extends: [
        "@eslint-calibrate/typescript",
        "plugin:@eslint-calibrate/typescript",
      ],
      files: [
        "*.ts",
        "*.tsx",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/non-nullable-type-assertion-style": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
      },
    },

    // Environment — Next/React
    {
      extends: [
        "@eslint-calibrate/react",
      ],
      files: [
        "src/**/*.ts",
        "src/**/*.tsx",
      ],
      rules: {
        "@typescript-eslint/no-magic-numbers": ["error", {
          ignore: ReactMagicNumbers,
        }],
        "import/no-internal-modules": ["error", {
          allow: [
            "next/app",
            "next/head",
            "next/link",
            "next/router",
            "**/src/**",
          ],
        }],
        "import/no-named-export": "off",
        "import/no-nodejs-modules": ["error", { "allow": ["util"] }],
        "import/prefer-default-export": "off",
        "react-hooks/exhaustive-deps": ["warn", {
          additionalHooks: "useRecoilCallback",
        }],
        "react/prop-types": "off",
        // Not needed since React 17
        "react/react-in-jsx-scope": "off",
      },
      settings: {
        "import/extensions": [".ts", ".tsx"],
        "react": {
          version: "detect",
        },
      },
    },
    {
      // Next Page exports
      files: [
        "src/pages/api/**/*.ts",
        "src/pages/**/*.tsx",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },

    // Environment — Jest
    {
      extends: [
        "@eslint-calibrate/jest",
      ],
      files: [
        "*.test.js",
        "*.test.ts",
        "*.test.tsx",
      ],
      rules: {
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-magic-numbers": "off",
      },
    },

    // Environment — Node / CommonJS
    {
      extends: [
        "@eslint-calibrate/node",
        "@eslint-calibrate/node/script",
      ],
      files: [
        ".eslintrc.js",
      ],
    },
  ],

  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
    },
    ecmaVersion,
    sourceType: "module",
  },
  root: true,
  rules: {
    "dot-location": ["error", "property"],
    "id-length": ["error", {
      exceptions: AllowedOneCharacterVariables,
    }],
    "import/no-relative-parent-imports": "off",
    "no-warning-comments": "warn",
    "object-property-newline": ["error", {
      allowAllPropertiesOnSameLine: true,
    }],
  },
};