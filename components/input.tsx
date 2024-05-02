import * as React from "react";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{
          display: 'flex',
          height: '2.5rem',
          width: '100%',
          borderRadius: '0.375rem',
          border: '1px solid #D1D5DB',
          backgroundColor: '#F3F4F6',
          padding: '0.5rem',
          fontSize: '0.875rem',
          outline: 'none',
          opacity: '0.5'
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
