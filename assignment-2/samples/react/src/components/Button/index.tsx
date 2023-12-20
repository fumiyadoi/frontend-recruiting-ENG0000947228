import React from "react";

interface Props {
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ type = "button", children, disabled, onClick }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full h-10 text-xs text-white bg-[#5DD669] rounded-[10px] flex items-center justify-center whitespace-nowrap ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";

export default Button;
