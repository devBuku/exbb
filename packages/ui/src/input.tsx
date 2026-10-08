"use client";

interface InputProps {
  placeholder: string;
  className?: string;
  type: string;
}

export const Input = ({ placeholder, className, type }: InputProps) => {
  return (
    <input className={className} placeholder={placeholder} type={type}></input>
  );
};
