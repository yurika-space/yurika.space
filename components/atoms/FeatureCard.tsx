interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={`flex flex-col w-full items-center justify-center align-center animate-fade-in-up ${className}`}
      style={{ animationDelay: "0.8s" }}
    >
      <div className="feature-icon text-2xl pt-4 m-0">{icon}</div>
      <div className="text-2xl md:text-3xl lg:text-4xl text-[var(--accent)] font-bold -mt-4 mb-2">
        {title}
      </div>
      <p className="text-2xl p-4 leading-relaxed pl-8 mb-2 text-[var(--secondary-foreground)]">
        {description}
      </p>
    </div>
  );
}
