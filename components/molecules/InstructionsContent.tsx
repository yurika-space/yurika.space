import { InstructionStep, StepVariant } from "../organisms/Instructions";
import { CardAction, CardActionProps, CardContent } from "./InstructionsCard";
import React from "react";
import { CardActionProps as CardActionPropsType, ActionConfig } from "./InstructionsCard";


export interface InstructionsContentProps {
    actions: ActionConfig[];
    stepNumber: number;
    step: StepVariant;
    text: string;
}

export default function InstructionsContent({ actions = [], stepNumber, step, text }: InstructionsContentProps): React.ReactNode {
    return (
      <CardContent className="w-full h-full space-y-6 flex flex-col items-center justify-center">
          {text && <InstructionStep stepNumber={stepNumber} text={text} step={step} className="w-full font-pixel! abso">
            {actions && <CardAction actions={[
                        {
                          label: actions[0].isInState ? actions[0].notExpectedStateLabel : actions[0].expectedStateLabel,
                          onClick: actions[0].onClick,
                          variant: actions[0].variant,
                          disabled: actions[0].disabled,
                          canDoState: true,
                          isInState: actions[0].isInState,
                          expectedStateLabel: actions[0].expectedStateLabel!,
                          notExpectedStateLabel: actions[0].notExpectedStateLabel!,
                          expectedStateContent: actions[0].expectedStateContent!,
                          notExpectedStateContent: actions[0].notExpectedStateContent!,
                        }]} />}
            </InstructionStep>}
          </CardContent>
    );
  }