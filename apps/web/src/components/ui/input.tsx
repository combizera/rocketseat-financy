import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "w-full min-w-0 rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors",

        // Placeholder
        "placeholder:text-md placeholder:text-gray-500",

        // Default state (cinza claro)
        "border-gray-200 text-gray-800",

        // Focus state (borda verde)
        "focus-visible:border-gray-500 focus-visible:ring-1 focus-visible:ring-gray-500/20",

        // Error/Invalid state (borda vermelha)
        "aria-invalid:border-red-500 aria-invalid:ring-1 aria-invalid:ring-red-500/20",

        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",

        // File input específico
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-800",

        className,
      )}
      {...props}
    />
  );
}

export { Input };