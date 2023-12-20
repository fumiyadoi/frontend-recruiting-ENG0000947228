import React, { forwardRef } from "react";

interface Props {
  type?: "text" | "email";
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  register?: any;
}

// テキストフィールド用の共通コンポーネント
function TextField({ type, required, placeholder, disabled, register }: Props) {
  return (
    <input
      type={type}
      className={`w-full h-[30px] pl-2 text-xs border border-[#E2E2E2] rounded-[5px] placeholder:text-[#D3D3D3] ${
        disabled ? "bg-color_gray_50" : ""
      }`}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      {...register}
    />
  );
}

TextField.displayName = "TextField";

export default TextField;
