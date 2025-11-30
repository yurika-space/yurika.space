import React from "react";
import { cn } from "@/lib/utils";

interface ComponentBodyProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ComponentBody({ children, className, delay }: ComponentBodyProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center animate-fade-in-up mb-8 w-full", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
