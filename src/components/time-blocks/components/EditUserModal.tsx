import { UserDto } from '@/assets/simulated-backend/types';
import InputField from '@/components/ui/input/InputField';
import AppLoadingOverlay from '@/components/ui/loading/AppLoadingOverlay';
import Modal from '@/components/ui/modal/Modal';
import { useEffect, useState } from 'react';
import { updateUserData } from '@/services/api/user/userRepository';
import { useTimeBlocks } from '@/context/TimeBlockContext';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: UserDto | null;
}

function EditUserModal({ isOpen, closeModal, user }: EditUserModalProps) {
  const { updateTimeBlocks } = useTimeBlocks();

  const [userData, setUserData] = useState<UserDto>({
    id: null,
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  async function editUser(): Promise<void> {
    setLoading(true);
    await updateUserData(userData);
    await updateTimeBlocks();
    setLoading(false);
    closeModal();
  }

  if (!isOpen) return null;

  return (
    <Modal title='Edit User' onClose={closeModal} fullScreen>
      <AppLoadingOverlay loading={loading} />
      <div className='flex flex-col h-[calc(100vh-4rem)]'>
        <div className='flex-1 flex flex-col gap-y-5'>
          <InputField
            label='Name'
            value={userData.name}
            onChange={(value) => setUserData({ ...userData, name: value })}
          />
          <InputField
            label='Address'
            value={userData.address}
            onChange={(value) => setUserData({ ...userData, address: value })}
          />
          <InputField
            label='Phone Number'
            value={userData.phoneNumber}
            onChange={(value) =>
              setUserData({ ...userData, phoneNumber: value })
            }
          />
          <InputField
            label='Email'
            value={userData.email}
            onChange={(value) => setUserData({ ...userData, email: value })}
          />
        </div>

        {/* Footer */}
        <div className='pb-6'>
          <button
            onClick={editUser}
            className={`h-10 w-full rounded py-2 text-sm font-bold text-black ${
              !userData.name ||
              !userData.email ||
              !userData.address ||
              !userData.phoneNumber
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-neutral-400 hover:bg-neutral-300'
            }`}
            disabled={
              !userData.name ||
              !userData.email ||
              !userData.address ||
              !userData.phoneNumber
            }
          >
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditUserModal;
