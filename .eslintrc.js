module.exports = {
    "env": {
        "browser": false,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    },
    "globals": {
        "$": true
    }
};