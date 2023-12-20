import React, { forwardRef } from "react";

interface Props {
  value?: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  register?: any;
}

function Select({
  value,
  options,
  required,
  placeholder,
  disabled,
  register,
}: Props) {
  return (
    <select
      {...register}
      required={required}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full h-[30px] pl-2 text-xs border border-[#E2E2E2] rounded-[5px] placeholder:text-[#D3D3D3] ${
        disabled ? "bg-color_gray_50" : ""
      } ${value?.length ? "" : "text-[#D3D3D3]"}`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option.length ? option : "選択してください"}
        </option>
      ))}
    </select>
  );
}

Select.displayName = "Select";

export default Select;
