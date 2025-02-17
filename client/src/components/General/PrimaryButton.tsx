import { ReactNode } from "react";

export interface PrimaryButtonProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
  text,
  icon,
  onClick,
  className = "inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {icon}
      {text}
    </button>
  );
}
