import Link from "next/link";
import { RetroButton } from "./RetroButton";
import { cva } from "class-variance-authority";
import { retroButtonVariants } from "./RetroButton";
import { cn } from "@/lib/utils";

interface LinkProps {
    href: string;
    buttonName: string;
    className?: string;
    target?: string;
    rel?: string;
    ariaLabel?: string;
}


export default function LinkButton({ href, buttonName, className, target, rel, ariaLabel }: LinkProps) {
    return (
        <Link href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
            <RetroButton variant="default" size="sm" className="font-press-start-2p cursor-pointer">
                {buttonName}
            </RetroButton>
        </Link>
    )
}