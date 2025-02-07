import React from 'react';

function IconAvatar({ className = '' }) {
  return (
    <svg
      className={className}
      width='80'
      height='80'
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_7673_3537)'>
        <mask
          id='mask0_7673_3537'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='80'
          height='80'
        >
          <path
            d='M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask0_7673_3537)'>
          <mask
            id='mask1_7673_3537'
            maskUnits='userSpaceOnUse'
            x='0'
            y='0'
            width='80'
            height='80'
          >
            <path
              d='M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z'
              fill='white'
            />
          </mask>
          <g mask='url(#mask1_7673_3537)'>
            <path
              d='M80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40Z'
              fill='#737171'
            />
            <path
              d='M39.9991 51.21C47.9518 51.21 54.3931 44.7687 54.3931 36.816C54.3931 28.8633 47.9518 22.4219 39.9991 22.4219C32.0464 22.4219 25.605 28.8633 25.605 36.816C25.605 44.7687 32.0464 51.21 39.9991 51.21ZM39.9991 58.4068C30.3911 58.4068 11.2109 63.2294 11.2109 72.8012V79.9984H68.7871V72.8012C68.7871 63.2294 49.6071 58.4068 39.9991 58.4068Z'
              fill='white'
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id='clip0_7673_3537'>
          <rect width='80' height='80' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default IconAvatar;
