import type { Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.tsx"],
  plugins: [TailwindAnimate]
};
export default config;
