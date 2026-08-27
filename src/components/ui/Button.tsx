import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "checkout";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-orange-500 text-white hover:bg-orange-600",
  secondary:
    "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
  checkout:
    "bg-teal-600 text-white hover:bg-teal-700",
};

export function Button({
  variant = "primary",
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`h-11 px-6 rounded-xl text-sm font-semibold transition-colors duration-200 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : variantStyles[variant]
      } ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
