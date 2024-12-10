import React from 'react';
import { COLOR_PALETTE } from '@/lib/validation/Form'; // Adjust import path as needed

interface ColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
  error?: boolean;
  errorText?: string;
  className?: string;
  name: string;
  label?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  error,
  errorText,
  className,
  name,
  label = 'Select Color'
}) => {
  return (
    <div className="flex flex-col w-full mb-4">
      {label && (
        <label htmlFor={name} className="text-[rgba(78,168,222,1)] font-[700] text-[14px] mb-2 block">
          {label}
        </label>
      )}
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {COLOR_PALETTE.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Select ${color} color`}
            onClick={() => onChange(color)}
            className={`
              w-[52px] h-[52px] rounded-full 
            
              ${value === color 
                ? '' 
                : 'hover:opacity-80'}
            `}
            style={{ 
              backgroundColor: color,
              border: value === color ? '2px solid white' : 'none'
            }}
          />
        ))}
      </div>
      {error && errorText && (
        <p className="text-xs text-red-500 mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default ColorPicker;