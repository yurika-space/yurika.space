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
        <Link href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
            <RetroButton variant="default" size={size as RetroButtonProps["size"]} className="font-press-start-2p cursor-pointer">
                {buttonName}
            </RetroButton>
        </Link>
    )
}