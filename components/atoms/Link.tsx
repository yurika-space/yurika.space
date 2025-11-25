import Link from "next/link";

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
            {buttonName}
        </Link>
    )
}