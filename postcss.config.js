// PostCSS file for transforming CSS.
//
// Form more information, visit https://postcss.org.

export default {
  plugins: {
    autoprefixer: {},
    tailwindcss: {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
