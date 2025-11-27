import Link from "next/link";
import { RetroButton } from "./RetroButton";

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
            <RetroButton variant="default" size="full" className="font-press-start-2p cursor-pointer">
                {buttonName}
            </RetroButton>
        </Link>
    )
}