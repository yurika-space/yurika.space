'use client';
import React, { useState, useEffect, useRef } from 'react';
import BurgerButton from '../atoms/BurgerButton';

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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`flex flex-row-reverse w-full ${className}`} ref={menuRef}>
      <BurgerButton handleClick={handleClick} isOpen={isOpen}/>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 right-0 h-screen w-screen m-0 p-0 bg-transparent z-50 md:hidden animate-in fade-in slide-in-from-top-500 ease-in-out">
          <BurgerButton handleClick={handleClick} isOpen={isOpen} className="absolute bg-transparent top-2.5 right-14.5 slide-out-to-top-500 ease-in-out duration-300 animate-out justify-self-center justify-center items-center text-center align-middle"/>
          <div className="flex flex-col bg-background gap-5 mx-auto h-full w-full justify-self-center justify-center items-center text-center align-middle justify-self-center justify-center items-center text-center align-middle">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}