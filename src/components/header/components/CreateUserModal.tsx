'use client';
import Modal from '@/components/ui/modal/Modal';
import InputField from '@/components/ui/input/InputField';
import { useState, useMemo } from 'react';
import { UserDto } from '@/services/api/user/models';
import { saveUserData } from '@/services/api/user/userRepository';
import AppLoadingOverlay from '@/components/ui/loading/AppLoadingOverlay';
interface CreateUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

function CreateUserModal({ isOpen, closeModal }: CreateUserModalProps) {
  const [user, setUser] = useState<UserDto>({
    id: null,
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const isDisabled = useMemo(() => {
    return !user.name || !user.email || !user.address || !user.phoneNumber;
  }, [user]);

  const handleInputChange = (field: keyof UserDto, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  async function saveUser() {
    setLoading(true);
    await saveUserData(user);
    setLoading(false);
    setUser({
      id: null,
      name: '',
      address: '',
      phoneNumber: '',
      email: '',
    });
    closeModal();
  }

  if (!isOpen) return null;

  return (
    <Modal title='Create User' onClose={closeModal} fullScreen>
      <AppLoadingOverlay loading={loading} />
      <div className='flex flex-col h-[calc(100vh-4rem)] '>
        {/* Form container */}
        <div className='flex-1 flex flex-col gap-y-5'>
          <InputField
            className='w-full'
            label='Name'
            value={user.name}
            onChange={(value) => handleInputChange('name', value)}
          />
          <InputField
            className='w-full'
            label='Address'
            value={user.address}
            onChange={(value) => handleInputChange('address', value)}
          />
          <InputField
            className='w-full'
            label='Phone Number'
            value={user.phoneNumber}
            onChange={(value) => handleInputChange('phoneNumber', value)}
          />
          <InputField
            className='w-full'
            label='Email'
            value={user.email}
            onChange={(value) => handleInputChange('email', value)}
          />
        </div>

        {/* Footer */}
        <div className=' pb-6'>
          <button
            onClick={() => saveUser()}
            className={`h-10 w-full rounded py-2 text-sm font-bold text-black ${
              isDisabled
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-neutral-400 hover:bg-neutral-300'
            }`}
            disabled={isDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateUserModal;
