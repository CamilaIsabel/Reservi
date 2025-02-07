'use client';

import CreateUserModal from '@/components/header/components/CreateUserModal';
import CreateTimeBlockModal from '@/components/header/components/CreateTimeBlockModal';

interface ModalProviderProps {
  openModal: 'user' | 'timeBlock' | null;
  setOpenModal: React.Dispatch<
    React.SetStateAction<'user' | 'timeBlock' | null>
  >;
}

export default function ModalProvider({
  openModal,
  setOpenModal,
}: ModalProviderProps) {
  return (
    <>
      <CreateUserModal
        isOpen={openModal === 'user'}
        closeModal={() => setOpenModal(null)}
      />
      <CreateTimeBlockModal
        isOpen={openModal === 'timeBlock'}
        closeModal={() => setOpenModal(null)}
      />
    </>
  );
}
