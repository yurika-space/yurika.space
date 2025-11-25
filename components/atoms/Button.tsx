import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonName?: string;
    ariaLabel?: string;
}

export default function Button({
    buttonName,
    className,
    onClick,
    type = "button",
    disabled,
    ariaLabel,
    children,
    ...props
  }: ButtonProps) {
    return (
      <button
        className={className}
        onClick={onClick}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        {children ?? buttonName}
      </button>
    );
  }