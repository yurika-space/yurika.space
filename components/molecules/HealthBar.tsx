import { type BitProgressProps, Progress } from "../atoms/Progress";

interface ManaBarProps extends React.ComponentProps<"div"> {
  className?: string;
  props?: BitProgressProps;
  variant?: "retro" | "default";
  value?: number;
  animateOnView?: boolean;
  animationDuration?: number;
}

export default function HealthBar({
  className,
  variant,
  value,
  animateOnView,
  animationDuration,
  ...props
}: ManaBarProps) {
  return (
    <Progress
      {...props}
      value={value}
      variant={variant}
      className={className}
      progressBg="bg-red-500"
      animateOnView={animateOnView}
      animationDuration={animationDuration}
    />
  );
}
