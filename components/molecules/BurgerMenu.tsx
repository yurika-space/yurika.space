"use client";
import React, { useEffect, useRef, useState } from "react";
import BurgerButton from "../atoms/BurgerButton";
import Logo from "../atoms/Logo";

interface BurgerMenuProps {
  children?: React.ReactNode;
  className?: string;
}

export default function BurgerMenu({ children, className }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(true);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`flex w-[50%] md:w-[75%] p-0 m-0 ${className}`}
      ref={menuRef}
    >
      <BurgerButton
        handleClick={handleClick}
        isOpen={isOpen}
        className="lg:hidden w-full flex justify-self-end justify-center items-center text-center align-middle"
      />
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute inset-0 right-0 h-screen w-screen m-0 p-0 bg-transparent z-20 lg:hidden animate-in fade-in slide-in-from-top-500 ease-in-out">
          <Logo
            src="/logo_white.png"
            alt={"Logo"}
            width={164}
            height={96}
            className="box-content m-0 p-0 absolute top-4 left-8 md:left-20 justify-self-center justify-center items-center text-center align-middle md:-ml-10!"
          />
          <BurgerButton
            handleClick={handleClick}
            isOpen={isOpen}
            className="absolute bg-transparent top-5 right-9 slide-out-to-top-500 ease-in-out duration-300 animate-out justify-self-center justify-center items-center text-center align-middle"
          />
          <div className="flex flex-col bg-background min-h-full w-screen justify-self-center justify-center items-center text-center align-middle">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
