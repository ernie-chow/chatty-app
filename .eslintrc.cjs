/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
    env: {
        "vue/setup-compiler-macros": true,
    },
    rules: {
        indent: [1, 4],
        quotes: [1, "double"],
        semi: [1, "always"],
        "vue/html-indent": [
            "off",
            4,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        "vue/multi-word-component-names": ["off"],
    },
};
