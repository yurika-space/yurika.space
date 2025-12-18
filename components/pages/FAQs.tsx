"use client";
import React from "react";
import ComponentHeader from "../atoms/ComponentHeader";
import { Section } from "../atoms/Section";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import * as AvatarPrimitive from "@radix-ui/react-avatar";


export interface DialogueProps {
  className?: string;
  avatarSrc?: string;
  avatarFallback?: string;
  title?: string;
  description?: string;
  player?: boolean;
}

export default function FAQs(
  { className, player = true }: { className?: string, player: boolean }
) {
  const faqs = [
    {
      q: "Is this legal?",
      a: "We're building within existing regulatory frameworks for tokenized assets and revenue sharing.",
    },
    {
      q: "What if a founder disappears?",
      a: "The domain serves as collateral. Token holders can vote to take control.",
    },
    {
      q: "How do I make money as an investor?",
      a: "Revenue share from the business + selling tokens on secondary market.",
    },
    {
      q: "What's the minimum investment?",
      a: "As low as $50. No accreditation required.",
    },
    {
      q: "When is launch?",
      a: "Q2 2026 beta launch. Join the waitlist for early access.",
    },
  ];
  return (
    <Section sectionId="hero" background="terminal" className={className}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <ComponentHeader title="FAQ" item="🤔" className="mb-4" />
        </div>

        <div className="space-y-4">
              {faqs.map((faq, i) => (
                <>
                  <DialogueStatic key={i+2} title={faq.q} player={player} />
                  <DialoguePlayer key={i+1} description={faq.a} player={player} />
                </>
            ))}
        </div>
      </div>
    </Section>
  );
}

export function DialogueStatic({
  className,
  avatarSrc,
  avatarFallback,
  title,
  player = true,
  ...props
}: DialogueProps) {
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      {player && (
        <Avatar variant="retro" className="size-16">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      <PixelAlert className={cn(!player && "text-right")}>
        <PixelAlertTitle>{title}</PixelAlertTitle>
      </PixelAlert>
      {!player && (
        <Avatar variant="retro" className="size-16">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function DialoguePlayer({
  className,
  avatarSrc,
  avatarFallback,
  description,
  player = false,
  ...props
}: DialogueProps) {
  return (
    <div className={cn("flex gap-3", className)} {...props}>
      {!player && (
        <Avatar variant="retro" className="size-16">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      <PixelAlert className={cn(!player && "text-right")}>
        <PixelAlertDescription>{description}</PixelAlertDescription>
      </PixelAlert>

      {player && (
        <Avatar variant="retro" className="size-16">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

export const avatarVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
    variant: {
      default: "",
      retro: "",
      pixel: "",
    },
  },
  defaultVariants: {
    font: "retro",
    variant: "pixel",
  },
});

export const pixelAlertVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
    variant: {
      default: "bg-card text-card-foreground",
      destructive:
        "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface BitAlertProps
  extends
    React.ComponentProps<"div">,
    VariantProps<typeof pixelAlertVariants> {}

function PixelAlert({ children, ...props }: BitAlertProps) {
  const { variant, className, font } = props;

  return (
    <div className={cn("relative m-1.5", className)}>
      <Alert
        {...props}
        variant={variant}
        className={cn(
          "relative rounded-none border-none bg-background",
          className, font === "retro" && "retro"
        )}
      >
        {children}
      </Alert>

      <div className="absolute -top-1.5 w-1/2 left-1.5 h-1.5 bg-theme-primary" />
      <div className="absolute -top-1.5 w-1/2 right-1.5 h-1.5 bg-theme-primary" />
      <div className="absolute -bottom-1.5 w-1/2 left-1.5 h-1.5 bg-theme-primary" />
      <div className="absolute -bottom-1.5 w-1/2 right-1.5 h-1.5 bg-theme-primary" />
      <div className="absolute top-0 left-0 size-1.5 bg-theme-primary" />
      <div className="absolute top-0 right-0 size-1.5 bg-theme-primary" />
      <div className="absolute bottom-0 left-0 size-1.5 bg-theme-primary" />
      <div className="absolute bottom-0 right-0 size-1.5 bg-theme-primary" />
      <div className="absolute top-1.5 -left-1.5 h-1/2 w-1.5 bg-theme-primary" />
      <div className="absolute bottom-1.5 -left-1.5 h-1/2 w-1.5 bg-theme-primary" />
      <div className="absolute top-1.5 -right-1.5 h-1/2 w-1.5 bg-theme-primary" />
      <div className="absolute bottom-1.5 -right-1.5 h-1/2 w-1.5 bg-theme-primary" />
    </div>
  );
}

function PixelAlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AlertTitle
      className={cn("line-clamp-1 font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function PixelAlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <AlertDescription
      className={cn(
        "text-muted-foreground grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
}

export { PixelAlert, PixelAlertTitle, PixelAlertDescription };

const Avatar = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    font?: "normal" | "retro";
    variant?: "default" | "retro" | "pixel";
  }
>(({ className = "", font, variant = "pixel", ...props }, ref) => {
  const isPixel = variant === "pixel";

  return (
    <div className={cn("relative size-max", className)}>
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 10 }}
        >
          {/* Top section - Row 1 */}
          <div className="absolute top-0 left-[23%] right-[23%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Top section - Row 2 */}
          <div className="absolute top-[6.25%] left-[17%] right-[17%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Top section - Row 3 */}
          <div className="absolute top-[12.5%] left-[11%] h-[7%] bg-foreground dark:bg-ring w-[20%]"></div>
          <div className="absolute top-[12.5%] right-[11%] h-[7%] bg-foreground dark:bg-ring w-[20%]"></div>

          {/* Top section - Row 4 */}
          <div className="absolute top-[18.75%] left-[5%] w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[18.75%] right-[5%] w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Top section - Row 5 */}
          <div className="absolute top-[25%] left-0 w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[25%] right-0 w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Top section - Rows 6-7 */}
          <div className="absolute top-[31.25%] left-0 w-[13.5%] h-[13%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[31.25%] right-0 w-[13.5%] h-[13%] bg-foreground dark:bg-ring"></div>

          {/* Top section - Rows 8-10 */}
          <div className="absolute top-[43.75%] left-0 w-[13.5%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[43.75%] right-0 w-[13.5%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Rows 8-10 (mirror) */}
          <div className="absolute top-[50%] left-0 w-[13.5%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[50%] right-0 w-[13.5%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Rows 6-7 (mirror) */}
          <div className="absolute top-[56.25%] left-0 w-[13.5%] h-[13%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[56.25%] right-0 w-[13.5%] h-[13%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Row 5 (mirror) */}
          <div className="absolute top-[68.75%] left-0 w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[68.75%] right-0 w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Row 4 (mirror) */}
          <div className="absolute top-[75%] left-[5%] w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>
          <div className="absolute top-[75%] right-[5%] w-[20%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Row 3 (mirror) */}
          <div className="absolute top-[81.25%] left-[11%] h-[7%] bg-foreground dark:bg-ring w-[20%]"></div>
          <div className="absolute top-[81.25%] right-[11%] h-[7%] bg-foreground dark:bg-ring w-[20%]"></div>

          {/* Bottom section - Row 2 (mirror) */}
          <div className="absolute top-[87.5%] left-[17%] right-[17%] h-[7%] bg-foreground dark:bg-ring"></div>

          {/* Bottom section - Row 1 (mirror) */}
          <div className="absolute bottom-0 left-[23%] right-[23%] h-[7%] bg-foreground dark:bg-ring"></div>
        </div>

      <AvatarPrimitive.Root
        ref={ref}
        data-slot="avatar"
        className={cn(
          "relative flex size-10 shrink-0 overflow-hidden text-xs",
          !isPixel && "rounded-none",
          isPixel && "rounded-full",
          font !== "normal" && "retro",
          variant === "retro" && "image-rendering-pixelated",
          className
        )}
        {...props}
      />

      {/* Original border styling (only show if not pixel variant) */}
    </div>
  );
});
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface BitAvatarImageProps extends React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
> {
  font?: "normal" | "retro";
  variant?: "default" | "retro" | "pixel";
}

const AvatarImage = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Image>,
  BitAvatarImageProps
>(({ className, font, ...props }, ref) => {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn(
        "aspect-square h-full w-full",
        font === "retro" && "retro",
        className
      )}
      {...props}
    />
  );
});
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
  React.ComponentRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-foreground",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
