import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 rounded-md gap-1 px-2 has-[>svg]:px-1.5",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        full: "w-full h-8 rounded-md",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export const retroButtonVariants = cva("", {
    variants: {
      font: {
        normal: "pixelify-sans",
        retro: "press-start-2p",
      },
      variant: {
        default: "bg-foreground",
        destructive: "bg-foreground",
        outline: "bg-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 rounded-md gap-1 px-2 has-[>svg]:px-1.5",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        full: "w-full h-8 rounded-md",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}


  function RetroButton({ children, asChild, ...props }: RetroButtonProps) {
    const { variant, size, className, font, onClick, disabled } = props;

    return (
      <Button
        {...props}
        className={cn(
          "rounded-none active:translate-y-1 transition-transform relative inline-flex items-center justify-center gap-1.5 border-none",
          font !== "normal" && "retro",
          className
        )}
        size={size}
        variant={variant}
        asChild={asChild}
      >
        {asChild ? (
          <span className="relative inline-flex items-center justify-center gap-1.5" >
            {children}

            {variant !== "ghost" && variant !== "link" && size !== "icon" && (
              <>
                {/* Pixelated border */}
                <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-1.5 -left-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-1.5 -right-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring" />
                {variant !== "outline" && (
                  <>
                    {/* Top shadow */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-foreground/20" />
                    <div className="absolute top-1.5 left-0 w-3 h-1.5 bg-foreground/20" />

                    {/* Bottom shadow */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-foreground/20" />
                    <div className="absolute bottom-1.5 right-0 w-3 h-1.5 bg-foreground/20" />
                  </>
                )}
              </>
            )}

            {size === "icon" && (
              <>
                <div className="absolute top-0 left-0 w-full h-[5px] md:h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-0 w-full h-[5px] md:h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute top-1 -left-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-1 -left-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute top-1 -right-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-1 -right-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
              </>
            )}
          </span>
        ) : (
          <span
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? undefined : onClick}
          >
            {children}

            {variant !== "ghost" && variant !== "link" && size !== "icon" && (
              <>
                {/* Pixelated border */}
                <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute bottom-0 left-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute bottom-0 right-0 size-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-1.5 -left-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring" />
                <div className="absolute top-1.5 -right-1.5 h-[calc(100%-12px)] w-1.5 bg-foreground dark:bg-ring" />
                {variant !== "outline" && (
                  <>
                    {/* Top shadow */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-foreground/20" />
                    <div className="absolute top-1.5 left-0 w-3 h-1.5 bg-foreground/20" />

                    {/* Bottom shadow */}
                    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-foreground/20" />
                    <div className="absolute bottom-1.5 right-0 w-3 h-1.5 bg-foreground/20" />
                  </>
                )}
              </>
            )}

            {size === "icon" && (
              <>
                <div className="absolute top-0 left-0 w-full h-[5px] md:h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-0 w-full h-[5px] md:h-1.5 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute top-1 -left-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-1 -left-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute top-1 -right-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
                <div className="absolute bottom-1 -right-1 w-[5px] md:w-1.5 h-1/2 bg-foreground dark:bg-ring pointer-events-none" />
              </>
            )}
          </span>
        )}
      </Button>
    );
  }

  export { RetroButton };
