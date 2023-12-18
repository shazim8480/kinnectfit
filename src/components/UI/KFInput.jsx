import { extendVariants, Input } from "@nextui-org/react";

export const KFInput = extendVariants(Input, {
  variants: {
    color: {
      stone: {
        inputWrapper: [
          "border",
          "shadow",
          "transition-colors",
          "focus-within:bg-zinc-100",
          "data-[hover=true]:border-[#0C134F]",
          "data-[hover=true]:bg-white",
          "group-data-[focus=true]:border-[#0C134F]",
        ],
        input: ["text-zinc-800", "placeholder:text-zinc-600"],
      },
    },
    width: {},
    size: {
      xs: {
        inputWrapper: "h-unit-6 min-h-unit-6 px-1",
        input: "text-tiny",
      },
      md: {
        inputWrapper: "h-unit-10 min-h-unit-10",
        input: "text-small",
      },
      xl: {
        inputWrapper: "h-unit-14 min-h-unit-14 py-3.5",
        input: "text-medium",
      },
    },
    radius: {
      xs: {
        inputWrapper: "rounded",
      },
      sm: {
        inputWrapper: "rounded-[4px]",
      },
    },
    textSize: {
      base: {
        input: "text-base",
      },
    },
    removeLabel: {
      true: {
        label: "hidden",
      },
      false: {},
    },
  },
  defaultVariants: {
    color: "stone",
    textSize: "base",
    removeLabel: true,
  },
});
