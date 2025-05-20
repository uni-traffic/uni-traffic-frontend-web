import type { Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [TailwindAnimate],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"]
      },
      colors: {
        "green-start": "#42d126",
        "green-end": "#26d15f"
      },
      animation: {
        "fade-in-down": "fade-in-down 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-left": "fade-in-left 0.5s ease-out",
        "fade-in-right": "fade-in-right 0.5s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        }
      }
    }
  }
};
export default config;
