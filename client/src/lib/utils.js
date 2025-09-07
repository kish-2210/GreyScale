import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import animationData from "@/assets/lottie-json.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const colors = [
  " bg-[#150E1C] text-[#9162C0] border-[1px] border-[#9162C0]",
  " bg-[#0A170D] text-[#449D5D] border-[1px] border-[#449D5D]",
  " bg-[#1E1105] text-[#BF6D21] border-[1px] border-[#BF6D21]",
  " bg-[#091422] text-[#3B88E9] border-[1px] border-[#3B88E9]",

];

export const shadows = [
  "#471575",
  "#095c1c",
  "#9d510b",
  "#1462c7"
]

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
}

export const getShadow = (shadow) => {
  if (shadow >= 0 && shadow < shadows.length) {
    return shadows[shadow];
  }
  return shadows[0];
}

export const animationDefaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
}