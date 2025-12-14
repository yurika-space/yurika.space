import { PixelAlert } from "../pages/FAQs";

interface ComponentHeaderProps {
  title: string;
  item: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ComponentHeader({
  title,
  item,
  className,
  style,
}: ComponentHeaderProps) {
  return (
    <div
      className={`text-center animate-fade-in-up pb-12 ${className}`}
      style={style}
    >
      <div className="flex items-center justify-center">
        <PixelAlert className="text-theme-secondary-foreground hover:translate-y-[-2px] transition-all duration-300">
          <span className="badge-icon px-2">
            {item}
          </span>
          <span className="font-jetbrains-mono text-theme-secondary font-bold px-2">
            {title}
          </span>
          <span className="badge-icon px-2">
            {item}
          </span>
        </PixelAlert>
      </div>
    </div>
  );
}
