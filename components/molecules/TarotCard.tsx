"use client";

import Button, { ButtonProps } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import "../stylesheets/join-the-fight.css";

interface QuestButton extends ButtonProps {
  text: string;
  variant: ButtonProps["variant"];
}

interface ContentParagraph {
  text: string | ReactNode;
  className?: string;
  hidden?: boolean;
}

interface TarotCardProps {
  // Header
  title: string;
  icon: string;

  // Image
  imageSrc: string;
  imageAlt?: string;
  imageClassName?: string;

  // Content
  paragraphs: ContentParagraph[];
  buttons: QuestButton[];

  // Styling
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  animationDelay?: string;

  // Layout options
  showDivider?: boolean;
}

export function TarotCard({
  imageSrc,
  //imageAlt,
  imageClassName,
  paragraphs = [],
  buttons = [],
  className: cardClassName,
  contentClassName,
  animationDelay = "0s",
  showDivider = true,
}: TarotCardProps) {
  const containerClassNames = cn(
    "tarot-card-container flex flex-col items-center justify-center animate-fade-in-up h-full",
    cardClassName
  );
  const contentClassNames = cn(
    "tarot-card-content text-center relative z-10",
    contentClassName
  );
  return (
    <div className={containerClassNames} style={{ animationDelay }}>
      <div className="tarot-card w-auto h-[580px] lg:h-[620px] relative overflow-hidden rounded-2xl">
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50",
            imageClassName
          )}
          style={{ backgroundImage: `url(${imageSrc})` }}
        />

        <div className="relative z-10 flex flex-col-reverse items-center text-center justify-between w-full h-full">

          <div className={contentClassNames}>
          <div className="relative z-10 space-y-6 pb-12">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className={cn("path-option", paragraph.hidden && "hidden")}
              >
                {typeof paragraph.text === "string" ? (
                  <p
                    className={cn(
                      "font-pixel text-wrap text-xl w-full text-yurika-text-primary leading-relaxed max-w-[320px] mx-auto",
                      paragraph.className
                    )}
                  >
                    {paragraph.text}
                  </p>
                ) : (
                  paragraph.text
                )}
              </div>
            ))}

            {showDivider && <div className="path-divider" />}

            <div className="space-y-2">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  variant={
                    button.variant
                  }
                  size="lg"
                  onClick={button.onClick}
                  isLoading={button.isLoading || false}
                  icon={button.icon as ReactNode}
                  hidden={button.hidden || false}
                >
                  {button.text}
                  {button.icon && button.icon}
                </Button>
              ))}
            </div>
          </div>
        </div>
        </div>


      </div>
    </div>
  );
}

export default TarotCard;
