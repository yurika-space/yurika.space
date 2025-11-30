import Link from "next/link";
import { RetroButton, RetroButtonProps } from "./RetroButton";

export interface LinkProps extends RetroButtonProps{
    href: string;
    buttonName: string;
    className?: string;
    target?: string;
    rel?: string;
    ariaLabel?: string;
    size?: RetroButtonProps["size"];
}


export default function LinkButton({ href, buttonName, className, target, rel, ariaLabel, size }: LinkProps) {
    return (
        <RetroButton variant="default" size={size as RetroButtonProps["size"]} className={`cursor-pointer ${className}`}>
            <Link href={href} target={target} rel={rel} aria-label={ariaLabel} className={`flex items-center justify-center font-press-start-2p text-black text-[10px]!`}>
                {buttonName}
            </Link>
        </RetroButton>
    )
}
