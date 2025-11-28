"use client";
import React, { useState } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
  CardDescription,
} from "@/components/molecules/InstructionsCard";

import { ActionConfig } from "@/components/molecules/InstructionsCard";
import { CardActionProps } from "@/components/molecules/InstructionsCard";
import InstructionsContent from "@/components/molecules/InstructionsContent";
import { InstructionsContentProps } from "@/components/molecules/InstructionsContent";

const InstructionItemVariants = cva(
  "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
  {
    variants: {
      step: {
        default: "bg-muted/50 hover:bg-muted",
        first:
          "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400 hover:from-yellow-400/30 hover:to-yellow-600/30",
        second:
          "bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-2 border-gray-400 hover:from-gray-300/30 hover:to-gray-500/30",
        third:
          "bg-gradient-to-r from-amber-600/20 to-amber-800/20 border-2 border-amber-600 hover:from-amber-600/30 hover:to-amber-800/30",
        current: "bg-primary/20 border-2 border-primary hover:bg-primary/30",
      },
    },
    defaultVariants: {
      step: "default",
    },
  }
);

const InstructionStepVariants = cva(
  "flex items-center justify-center size-8 text-sm font-bold",
  {
    variants: {
        step: {
        default: "bg-muted text-muted-foreground",
        first:
          "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900 shadow-lg",
        second:
          "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900 shadow-lg",
        third:
          "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-lg",
        current: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      step: "default",
    },
  }
);

type StepVariant = VariantProps<typeof InstructionItemVariants>["step"];

interface InstructionStepProps {
  stepNumber: number;
  text: string;
  step?: StepVariant;
  className?: string;
  children?: React.ReactNode;
}

export function InstructionStep({ stepNumber, text, step = "default", className, children }: InstructionStepProps) {
  return (
    <div className={cn(InstructionItemVariants({ step }), "flex-col items-start gap-2 relative", className)}>
      <div className="flex flex-col items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className={cn(InstructionStepVariants({ step }), "font-bold font-press-start-2p text-xl rounded-full absolute -top-5 -left-3 h-12 w-12")}>
            {stepNumber}
          </span>
          <span className="text-2xl font-bold pt-6">{text}</span>
        </div>
        {children && <div className="flex flex-col items-center justify-between w-full gap-2">{children}</div>}
      </div>
    </div>
  );
}

interface InstructionsProps {
  title?: string;
  description?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Instructions({ 
  className, 
  title, 
  description,
  style,
}: InstructionsProps) {

  return (
    <Card
      data-slot="instructions"
      className={cn("w-full", className)}
      font="normal"
      style={style}
    >
      <CardHeader className="w-full h-25 flex flex-col items-center justify-around font-sixtyfour">
        <CardTitle className="text-center leading-relaxed">{title}</CardTitle>
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardHeader>
    </Card>
  );
}

export default Instructions;
export type { InstructionStepProps, StepVariant };