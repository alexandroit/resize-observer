// ESLint 9 flat config — replaces legacy .eslintrc.json files
const tseslint = require('typescript-eslint');

module.exports = tseslint.config(
  {
    ignores: ['lib/**', 'docs/**', 'scripts/**'],
  },
  tseslint.configs.recommended,
  {
    // The codebase uses short-circuit (&&) and ternary (?:) expressions as
    // deliberate conditional side-effects — a pre-existing style choice.
    rules: {
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
    },
  },
  {
    files: ['test/**/*.ts'],
    rules: {
      // Tests intentionally use @ts-ignore to exercise invalid argument paths
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  }
);
