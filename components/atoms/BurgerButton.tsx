'use client';
import Button from "./Button";


interface BurgerButtonProps {
    handleClick: () => void;
    isOpen: boolean;
    className?: string;
}

export default function BurgerButton({ handleClick, isOpen, className, ...props }: BurgerButtonProps) {
    return (
        <Button
        onClick={handleClick}
        className={`flex flex-col p-2 justify-center items-center lg:hidden ${className}`}
        ariaLabel="Burger Menu"
        aria-expanded={isOpen}
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
