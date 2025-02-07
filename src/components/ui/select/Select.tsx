import IconArrowBottom from '@/components/icons/IconArrowBottom';
import IconThreeDots from '@/components/icons/IconThreeDots';
import { useState, useRef, useEffect } from 'react';

interface SelectProps<T> {
  options?: T[];
  label?: string;
  onChange?: (value: T | null) => void;
  value?: T | null;
  children?: React.ReactNode;
  iconOnly?: boolean;
  labelKey?: keyof T;
  valueKey?: keyof T;
}

const Select = <T extends Record<string, any>>({
  options = [],
  label = 'Selecciona',
  onChange,
  value = null,
  children,
  iconOnly = false,
  labelKey,
  valueKey,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: T) => {
    setSelectedOption(option);
    onChange?.(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
    <div
      className={`relative inline-block text-left ${
        iconOnly ? 'w-fit' : 'w-full'
      }`}
      ref={selectRef}
    >
      {!iconOnly ? (
        <button
          className='flex items-center justify-between w-full text-gray-300 text-xs font-normal py-2 px-3 border border-gray-700 rounded-md bg-custom-gray-02 text-white'
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption
            ? labelKey
              ? selectedOption[labelKey as keyof T]
              : JSON.stringify(selectedOption)
            : label}
          <IconArrowBottom className='w-2.5 h-2.5' />
        </button>
      ) : (
        <button
          className='flex lg:items-center lg:justify-center  z-0'
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconThreeDots className='w-4 h-4 md:w-5 md:h-5 text-gray-400' />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute mt-1 z-30 text-gray-200 text-xs font-normal border border-neutral-700 bg-custom-gray-02 rounded-md shadow-lg ${
            iconOnly ? 'right-0 w-28' : 'right-0 w-full'
          }`}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <button
                key={valueKey ? option[valueKey] : JSON.stringify(option)}
                className='flex rounded w-full px-4 py-2 text-left hover:text-white bg-custom-gray-02 hover:bg-neutral-700'
                onClick={() => handleSelect(option)}
              >
                {labelKey ? option[labelKey] : JSON.stringify(option)}
              </button>
            ))
          ) : (
            <div className='p-2'>{children}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
