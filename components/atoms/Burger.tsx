import Button, { ButtonProps } from "./Button";

interface BurgerButtonProps {
	variant?: ButtonProps["variant"];
	size?: ButtonProps["size"];
    handleClick: () => void;
    isOpen: boolean;
    className?: string;
	ariaLabel: string;
	ariaExpanded: boolean;
}

export default function BurgerButton({ handleClick, isOpen, className, ariaLabel, ariaExpanded, variant, size }: BurgerButtonProps) {
    return (
        <Button
        onClick={handleClick}
        className={`flex flex-col p-2 justify-center items-center lg:hidden ${className}`}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        variant={variant}
        size={size}
      >
        <span className={`block transition-all duration-300 ease-out bg-foreground
                        h-0.5 w-6 rounded-sm ${isOpen ?
                        'rotate-45 translate-y-1' : '-translate-y-0.5'
                        }`} >
        </span>
        <span className={`bg-foreground block transition-all duration-300 ease-out
                        h-0.5 w-6 rounded-sm my-0.5 ${isOpen ?
                        'opacity-0' : 'opacity-100'
                        }`} >
        </span>
        <span className={`bg-foreground block transition-all duration-300 ease-out
                        h-0.5 w-6 rounded-sm ${isOpen ?
                        '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                        }`} >
        </span>
      </Button>
    )
}
