import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  // Styles based on CorePay reference: Rounded pills, clean typography, soft hover states
  const baseStyles = "font-sans font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  
  const variants = {
    primary: "bg-brand-orange text-white hover:bg-orange-600 shadow-soft hover:shadow-soft-lg", // The "Sign Up" / "Try for free" button
    secondary: "bg-brand-black text-white hover:bg-gray-800 shadow-soft",
    accent: "bg-brand-lime text-brand-black hover:bg-[#c2e62e] shadow-soft", // The green buttons in reference
    outline: "bg-transparent text-brand-black border border-gray-300 hover:border-black",
    ghost: "bg-transparent text-gray-600 hover:text-black hover:bg-gray-100"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};