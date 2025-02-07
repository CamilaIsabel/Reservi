import React from 'react';
import '@/components/ui/loading/Spinner.css';
const Spinner = () => {
  return (
    <svg
      className='spinner-wrap text-current'
      viewBox='0 0 66 66'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
    >
      <circle
        className='circle'
        fill='none'
        strokeWidth='6'
        strokeLinecap='round'
        cx='33'
        cy='33'
        r='30'
        stroke='currentColor'
      />
    </svg>
  );
};

export default Spinner;
