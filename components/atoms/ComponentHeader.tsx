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
      className={`text-center animate-fade-in-up ${className}`}
      style={style}
    >
      <div className="inline-block mb-8 sm:mb-4! sm:mt-4! md:mb-4 lg:mb-4 sm:p-4!">
        <div className="power-up-badge py-4 sm:p-4! md:px-4 lg:px-4">
          <span className="badge-icon text-xl! sm:text-2xl! md:text-3xl! lg:text-4xl!">
            {item}
          </span>
          <span className="badge-text text-xl! sm:text-2xl! md:text-3xl! lg:text-4xl!">
            {title}
          </span>
          <span className="badge-icon text-xl! sm:text-2xl! md:text-3xl! lg:text-4xl!">
            {item}
          </span>
        </div>
      </div>
    </div>
  );
}
