// Tailwind configuration file for CSS customization.
//
// For more information, visit https://tailwindcss.com/docs/configuration.

import { addDynamicIconSelectors } from "@iconify/tailwind";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

export default {
  content: ["src/**/*.{html,ts,vue}"],
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          accent: "#60e1e0",
          "base-100": "#fff6ea",
          error: "#f6657e",
          info: "#45b6f2",
          neutral: "#292524",
          primary: "#c084fc",
          secondary: "#fdc182",
          success: "#4ade80",
          warning: "#f97316",
        },
      },
      "dark",
    ],
  },
  plugins: [addDynamicIconSelectors(), daisyui],
  theme: {
    extend: {},
  },
} satisfies Config;
