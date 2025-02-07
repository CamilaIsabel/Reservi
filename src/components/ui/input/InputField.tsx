import React, { ReactNode, useState } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
  icon?: ReactNode;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  className = '',
  onChange,
  icon,
  placeholder = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className={`relative flex items-center ${className}`}>
      {icon && <span className='absolute left-3'>{icon}</span>}
      <input
        type='text'
        id={label}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={`peer flex w-full items-center py-2 text-white text-xs font-normal rounded-lg bg-transparent border border-gray-700 appearance-none focus:outline-none focus:ring-0 focus:border-gray-500 
          ${icon ? 'pl-10' : 'pl-3'}`}
      />
      {label && (
        <label
          htmlFor={label}
          className={`absolute text-gray-300 text-xs px-0.5 font-normal duration-300 z-10 
            ${icon ? 'left-10 bg-black' : 'left-3 bg-custom-gray-02'} 
            ${
              value || isFocused
                ? 'top-[-9px] text-gray-400'
                : 'top-2 text-gray-100'
            }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
