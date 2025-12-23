import { Input as InputPrimitive } from "@base-ui/react/input";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    if (Icon) {
      return (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <Icon className="size-4.5 text-gray-400" />
          </div>
          <InputPrimitive
            ref={ref}
            type={type}
            data-slot="input"
            className={cn(
              // Base styles
              "w-full min-w-0 rounded-lg border bg-transparent py-3 text-sm outline-none transition-colors",

              // Padding com ícone
              "pl-10 pr-4",

              // Placeholder
              "placeholder:text-md placeholder:text-gray-500",

              // Default state (cinza claro)
              "border-gray-200 text-gray-800",

              // Focus state
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
        </div>
      );
    }

    return (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          // Base styles
          "w-full min-w-0 rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors",

          // Placeholder
          "placeholder:text-md placeholder:text-gray-500",

          // Default state (cinza claro)
          "border-gray-200 text-gray-800",

          // Focus state
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
);

Input.displayName = "Input";

export { Input };