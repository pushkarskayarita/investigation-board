module.exports = {
    parser: 'babel-eslint',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            impliedStrict: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    extends: ['airbnb', 'prettier', 'prettier/react'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    rules: {
        'no-set-state': 0,
        'no-console': 'off',
        indent: ['error', 4, { SwitchCase: 1, VariableDeclarator: 1 }],
        'no-tabs': 0,
        'react/prop-types': 0,
        'object-curly-newline': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-boolean-value': 0,
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                labelComponents: ['CustomInputLabel'],
                labelAttributes: ['label'],
                controlComponents: ['CustomInput'],
                depth: 3,
            },
        ],
        // 'no-use-before-define': ['error', { variables: false }],
    },
};
