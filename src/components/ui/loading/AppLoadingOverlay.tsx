import React from 'react';
import Spinner from '@/components/ui/loading/Spinner';

// Define prop types for size and color
type ComponentSize = 'small' | 'medium' | 'large' | 'x-large';
type ComponentColor = 'blue' | 'cyan' | 'red' | 'orange' | 'green' | 'dark';

interface AppLoadingOverlayProps {
  loading: boolean;
  size?: ComponentSize;
  color?: ComponentColor;
}

// Define default props
const defaultProps = {
  loading: false,
  size: 'large',
  color: 'blue',
};

const AppLoadingOverlay: React.FC<AppLoadingOverlayProps> = (props) => {
  const { loading, size, color } = { ...defaultProps, ...props };

  // Define classes for size
  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return 'text-base';
      case 'medium':
        return 'text-xl';
      case 'large':
        return 'text-3xl';
      case 'x-large':
        return 'text-6xl';
      default:
        return 'text-xl';
    }
  })();

  // Define classes for color
  const colorClasses = (() => {
    switch (color) {
      case 'blue':
        return 'text-indigo-600';
      case 'cyan':
        return 'text-teal-500';
      case 'red':
        return 'text-red-700';
      case 'orange':
        return 'text-orange-500';
      case 'green':
        return 'text-lime-600';
      case 'dark':
        return 'text-gray-600';
      default:
        return 'text-indigo-600';
    }
  })();

  return (
    <React.Fragment>
      {loading && (
        <div
          className={`absolute inset-0 z-50 flex cursor-wait items-center justify-center bg-black bg-opacity-70 ${sizeClasses} ${colorClasses}`}
        >
          <Spinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default AppLoadingOverlay;
