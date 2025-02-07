import IconClose from '@/components/icons/IconClose';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  closeOnEsc?: boolean;
  closeOnClickOutside?: boolean;
  fullScreen?: boolean;
  fullScreenOnMobile?: boolean;
  className?: string;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title = '',
  subtitle = '',
  showCloseButton = true,
  closeOnEsc = true,
  closeOnClickOutside = true,
  fullScreen = false,
  fullScreenOnMobile = false,
  className = '',
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeOnEsc]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      closeOnClickOutside &&
      modalRef.current &&
      !modalRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnClickOutside]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  useEffect(() => {
    setIsVisible(false);
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-end bg-black/50'>
      <div
        ref={modalRef}
        className={`relative bg-custom-gray-02 p-6 shadow-lg rounded-l-lg transition-all duration-300 ease-in-out 
          ${
            isClosing
              ? 'translate-x-full opacity-0'
              : isVisible
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0'
          }
          ${fullScreen ? 'w-[560px] h-full' : 'w-[560px] max-w-full'}
          ${fullScreenOnMobile ? 'sm:w-[560px]' : ''} ${className}`}
      >
        {showCloseButton && (
          <button onClick={handleClose} className='absolute top-6 right-6'>
            <IconClose className='w-5 h-5 text-neutral-500 hover:text-neutral-400' />
          </button>
        )}
        {title && (
          <h1 className='text-base font-semibold text-gray-200'>{title}</h1>
        )}
        {subtitle && <p className='text-sm text-gray-400 mt-2'>{subtitle}</p>}
        <div className='mt-4'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
