interface ComponentHeaderProps {
    title: string;
    item: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function ComponentHeader({ title, item, className, style }: ComponentHeaderProps) {
    return (
        <div className={`text-center mb-8 animate-fade-in-up ${className}`} style={style}>
          <div className="inline-block mb-4">
            <div className="power-up-badge py-4 px-4">
              <span className="badge-icon">{item}</span>
              <span className="badge-text text-base!">{title}</span>
              <span className="badge-icon">{item}</span>
            </div>
          </div>
        </div>
    )
}