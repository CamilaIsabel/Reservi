// components/Tooltip.tsx
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  children: ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className='relative inline-block '
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div className='absolute bottom-full mb-2 w-max px-3 py-1 text-sm text-white bg-custom-cyan-02 rounded-md shadow-lg'>
          {text}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
