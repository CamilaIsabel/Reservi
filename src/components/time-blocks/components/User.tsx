'use client';
import React, { useState } from 'react';
import IconAvatar from '@/components/icons/IconAvatar';
import Select from '@/components/ui/select/Select';
import { UserDto } from '@/assets/simulated-backend/types';
import { removeUserById } from '@/services/api/user/userRepository';
import { useTimeBlocks } from '@/context/TimeBlockContext';
import Spinner from '@/components/ui/loading/Spinner';

interface UserProps {
  user: UserDto;
  onEdit: () => void;
}

const User: React.FC<UserProps> = ({ user, onEdit }: UserProps) => {
  const { updateTimeBlocks } = useTimeBlocks();
  const [loading, setLoading] = useState<boolean>(false);

  async function deleteUser(userId: number | null): Promise<void> {
    if (!userId) return;
    setLoading(true);
    await removeUserById(userId);
    await updateTimeBlocks();
    setLoading(false);
  }

  return (
    <div className='w-full flex py-1 justify-between'>
      <div className='flex flex-col md:flex-row w-full md:items-center md:justify-between md:gap-x-4'>
        <div className='md:flex-1 flex gap-x-2 md:gap-x-4 w-full'>
          {/* Avatar and Name */}
          <div className='flex items-center gap-x-4 md:flex-1'>
            <IconAvatar className='w-6 h-6 hidden md:flex' />
            <span className='text-gray-200 text-xs lg:text-sm font-medium truncate'>
              {user?.name}
            </span>
          </div>

          {/* Phone */}
          <span className='text-gray-400 text-xs lg:text-sm font-medium truncate md:flex-1'>
            {user?.phoneNumber}
          </span>
        </div>

        <div className='md:flex-1 flex gap-x-4 w-full'>
          {/* Email */}
          <span className='text-gray-400 text-xs lg:text-sm font-medium truncate md:flex-1'>
            {user?.email}
          </span>

          {/* Location */}
          <span className='text-gray-400 text-xs lg:text-sm font-medium truncate md:flex-1'>
            {user?.address}
          </span>
        </div>
      </div>

      {/* Action button */}
      <div className='absolute right-6 bg-black'>
        <Select iconOnly>
          <button
            className='w-full px-3 py-2 text-start hover:text-white hover:bg-white/10 rounded-sm'
            onClick={onEdit} // Este onClick abre el modal
          >
            Edit
          </button>

          <button
            onClick={() => deleteUser(user.id)}
            className='w-full px-3 py-2 text-start hover:text-white hover:bg-white/10 rounded-sm'
          >
            {loading ? (
              <div className='flex items-center gap-x-2'>
                {/* Spinner or loading animation */}
                <Spinner />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </Select>
      </div>
    </div>
  );
};

export default User;
