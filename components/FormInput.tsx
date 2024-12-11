import React, { FC } from 'react'

interface FormInputProps {
  label: string,
  placeHolder: string,
  name: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  type?: string,
  InputStyle?: {
    className?: string,
    style?: React.CSSProperties
  },
  value?: string,
  error?: boolean,
  errorText?: string,
  className?: string,
  disabled?: boolean,
  defaultValue?: string,
  min?: string | number,
  max?: string | number,
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const FormInput: FC<FormInputProps> = ({
  label,
  placeHolder,
  name,
  onChange,
  type,
  InputStyle,
  value,
  error,
  errorText,
  className,
  disabled,
  defaultValue,
  min,
  max,
  onBlur
}) => {
  return (
    <div className="flex flex-col w-full mb-2">
      <label htmlFor={name} className="text-[rgba(78,168,222,1)] font-[700] text-[14px] mb-2">
        {label}
      </label>

      <input
        type={type || "text"}
        placeholder={placeHolder}
        className={`border border-[rgba(51,51,51,1)] text-[#f2f2f2] font-[400] text-[14px] ${
          error ? "border border-red-500" : ""
        } ${className}  rounded-[8px]   h-[52px]  w-full pl-4 text-[#000] bg-[rgba(255,255,255,0.05)] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] text-md font-normal placeholder:font-normal placeholder:text-[#F2F2F2] outline-none ${
          InputStyle && InputStyle.className
        }`}
        style={InputStyle && InputStyle.style}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onBlur={onBlur}
      />
      {error && <p className="text-xs text-red-500">{errorText}</p>}
    </div>
  )
}

export default FormInput