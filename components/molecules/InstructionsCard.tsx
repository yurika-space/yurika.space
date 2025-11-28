// InstructionsCard.tsx
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  Card as ShadcnCard,
  CardAction as ShadcnCardAction,
  CardContent as ShadcnCardContent,
  CardDescription as ShadcnCardDescription,
  CardFooter as ShadcnCardFooter,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
} from "../atoms/Card";
import { RetroButton } from "../atoms/RetroButton";

// Define action types
export interface BaseAction {
  label?: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  disabled?: boolean;
}

export interface StateAction extends BaseAction {
  canDoState: true;
  isInState: boolean;
  // Labels for different states
  expectedStateLabel?: string;  // Label when expanded
  notExpectedStateLabel?: string; // Label when collapsed
  expectedStateContent?: React.ReactNode;
  notExpectedStateContent?: React.ReactNode;
}

export type ActionConfig = BaseAction & StateAction;

export interface CardActionProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  actions?: ActionConfig[];
  className?: string;
  font?: "normal" | "retro";
}

export const cardVariants = cva("", {
  variants: {
    font: {
      normal: "",
      retro: "retro",
    },
  },
  defaultVariants: {
    font: "retro",
  },
});

export interface InstructionsCardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

function Card({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <div
      className={cn("flex flex-col items-center justify-center align-middle text-center",
        className
      )}
    >
      <ShadcnCard
        {...props}
        className={cn(
          "rounded-none border-0 w-full!",
          font !== "normal" && "retro",
          className
        )}
      />
    </div>
  );
}

function CardHeader({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <ShadcnCardHeader
      className={cn(font !== "normal" && "retro", className)}
      {...props}
    />
  );
}

function CardTitle({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <ShadcnCardTitle
      className={cn(font !== "normal" && "retro", className)}
      {...props}
    />
  );
}

function CardDescription({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <ShadcnCardDescription
      className={cn(font !== "normal" && "retro", className)}
      {...props}
    />
  );
}

function CardAction({ className, font = "retro", actions }: CardActionProps) {
  return (
    <ShadcnCardAction className={cn(font !== "normal" && "retro", "flex-col gap-2", className)}>
      {actions?.map((action, index) => {
        // Check if it's an expandable action
        const canDoState = 'canDoState' in action && action.canDoState;
        
        // Determine the label to show
        let displayLabel = action.label;
        
        if (canDoState) {
          // Use state-specific labels if provided
          displayLabel = action.isInState 
            ? (action.expectedStateLabel)
            : (action.notExpectedStateLabel);
            
        }
        
        return (
          <div key={index} className="w-full flex flex-col items-center justify-center">
            <RetroButton
              className={cn(font !== "normal" && "retro", " mt-12 mb-6")}
              variant={action.variant || "default"}
              onClick={action.onClick}
              disabled={action.disabled}
              font={font}
            >
              {displayLabel}
              {/* Show default expand/collapse indicator if no custom labels */}
              {canDoState && !action.expectedStateLabel && !action.notExpectedStateLabel && (
                <span className="">{action.isInState ? action.notExpectedStateLabel : action.expectedStateLabel}</span>
              )}
            </RetroButton>
            
            {/* Render expanded content if it's an expandable action */}
            {canDoState && action.expectedStateContent && (
              <div 
                className={cn(
                  "w-full bg-muted/30 rounded-lg transition-all duration-500 ease-in-out overflow-hidden",
                  action.isInState 
                    ? "max-h-[500px] opacity-100 mt-2 p-4" 
                    : "max-h-0 opacity-0 p-0 mt-0"
                )}
              >
                {action.expectedStateContent}
              </div>
            )}
          </div>
        );
      })}
    </ShadcnCardAction>
  );
}

function CardContent({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <ShadcnCardContent
      className={cn(font !== "normal" && "retro", className)}
      {...props}
    />
  );
}

function CardFooter({ ...props }: InstructionsCardProps) {
  const { className, font } = props;

  return (
    <ShadcnCardFooter
      data-slot="card-footer"
      className={cn(font !== "normal" && "retro", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};