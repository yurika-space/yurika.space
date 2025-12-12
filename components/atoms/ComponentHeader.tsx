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
      className={`text-center animate-fade-in-up p-6 ${className}`}
      style={style}
    >
      <div className="inline-block p-6">
        <div className="power-up-badge py-2!">
          <span className="badge-icon ">
            {item}
          </span>
          <span className="badge-text ">
            {title}
          </span>
          <span className="badge-icon ">
            {item}
          </span>
        </div>
      </div>
    </div>
  );
}
