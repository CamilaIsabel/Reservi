import React from 'react';

function IconSearch({ className = '' }) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.89149 9.88368L13.6693 13.6615M6.74334 11.1429C4.3092 11.1429 2.33594 9.16968 2.33594 6.73553C2.33594 4.30139 4.3092 2.32812 6.74334 2.32812C9.17749 2.32812 11.1508 4.30139 11.1508 6.73553C11.1508 9.16968 9.17749 11.1429 6.74334 11.1429Z'
        stroke='currentColor'
        strokeWidth='1.25926'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default IconSearch;
