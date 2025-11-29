import LinkButton, { LinkProps } from "@/components/atoms/Link";
import { RetroButtonProps } from "@/components/atoms/RetroButton";


const FooterProps: LinkProps[] = [
    { href: "https://www.instagram.com/atlanticjohnson?igsh=MWFpdDM0Y3A0OWR1NA==", buttonName: "Linktree", size: "sm" as RetroButtonProps["size"] },
    // { href: "/terms-of-service", buttonName: "Terms of Service" },
    // { href: "/contact", buttonName: "Contact" },
]

export default function Footer() {
    return (
        <div className="flex flex-col pb-10 -mt-20 items-center space-evenly w-full gap-4 md:flex-row md:justify-between md:items-center md:space-evenly md:w-full">
            {/* <h1 className="w-full text-center text-lg font-bold">Learn More</h1> */}
            <nav className="flex items-center justify-center space-between w-full gap-10">
                {FooterProps.map((item) => (
                    <LinkButton size={item.size} key={item.href} href={item.href} buttonName={item.buttonName} className="text-foreground text-[10px]!important font-bold hover:text-foreground/80 transition-colors hover:bg-foreground/10 p-4" />
                    ))}
                </nav>
                <p className="font-sixtyfour text-[8px] text-foreground/50">Made by TeenyWeeny Studios</p>
                <p className="font-sixtyfour text-[8px] text-foreground/50">Copyright © 2025 yurika.space</p>
        </div>
    );
}