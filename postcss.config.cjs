// postcss.config.cjs
module.exports = {
  plugins: {
    // вместо 'tailwindcss' теперь '@tailwindcss/postcss'
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    // если нужно — другие плагины
  },
};
