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
      <div className="feature-title text-base font-bold -mt-4 mb-2">
        {title}
      </div>
      <p className="feature-description text-md p-4 leading-relaxed pl-8 mb-2">
        {description}
      </p>
    </div>
  );
}
