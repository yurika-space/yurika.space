"use client";

import Image from "next/image";
import ComponentHeader from "@/components/atoms/ComponentHeader";
import Button from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ContentCardProps {
  // Header props
  title: string;
  icon?: string;

  // Image props
  imageSrc: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;

  // Content
  description: string | ReactNode;

  // Button props
  buttonText: string;
  buttonIcon?: ReactNode;
  buttonVariant?: "primary" | "secondary" | "terminal" | "purple" | "ghost" | "destructive";
  onButtonClick?: () => void;

  // Styling
  className?: string;
  headerClassName?: string;
  imageClassName?: string;
  contentClassName?: string;
  animationDelay?: string;
}

export function ContentCard({
  title,
  icon = "⚡",
  imageSrc,
  imageAlt,
  imageWidth = 1455,
  imageHeight = 900,
  description,
  buttonText,
  buttonIcon,
  buttonVariant = "primary",
  onButtonClick,
  className,
  headerClassName,
  imageClassName,
  contentClassName,
  animationDelay = "0s",
}: ContentCardProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-4xl mx-auto",
        "border-2 border-border rounded-lg overflow-hidden",
        "bg-card backdrop-blur-sm",
        "animate-fade-in-up",
        className
      )}
      style={{ animationDelay }}
    >
      {/* Header */}
      <div className="w-full">
        <ComponentHeader
          title={title}
          item={icon}
          className={cn(
            "text-center items-center justify-center pt-10",
            headerClassName
          )}
        />
      </div>

      {/* Image - Same width as header */}
      <div className="w-full flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          className={cn("w-full h-auto object-contain", imageClassName)}
        />
      </div>

      {/* Content */}
      <div className={cn("w-full px-6 py-8 space-y-6", contentClassName)}>
        {/* Description */}
        <div className="text-center">
          {typeof description === "string" ? (
            <p className="font-mono text-sm md:text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          ) : (
            description
          )}
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            variant={buttonVariant}
            size="lg"
            onClick={onButtonClick}
            icon={buttonIcon}
            className="w-full sm:w-auto"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default ContentCard;
