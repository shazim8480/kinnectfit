import { extendVariants, Button } from "@nextui-org/react";

export const KFButton = extendVariants(Button, {
  variants: {
    color: {
      primary: "bg-[#0C134F] text-[#fff]",
      secondary: "bg-[#1D267D] text-[#fff]",
      tertiary: "bg-[#5C469C] text-[#fff]",
    },
    variant: {
      solid: "bg-[#0C134F]",
      bordered: "bg-[#0C134F]",
      faded: "bg-[#0C134F]",
      shadow: "bg-[#0C134F]",
    },
    isDisabled: {
      true: "bg-[#0C134F] text-[#fff] opacity-50 cursor-not-allowed",
    },
    size: {
      xs: "px-unit-2 min-w-unit-12 h-unit-6 text-tiny gap-unit-1 rounded-small",
      md: "px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-small",
      xl: "px-unit-8 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-medium",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "xl",
  },
  compoundVariants: [
    {
      isDisabled: true,
      color: "primary",
      class: "bg-[#0C134F]/80 opacity-100",
    },
  ],
});
