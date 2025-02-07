import React, { useState } from 'react';
import User from '@/components/time-blocks/components/User';
import { TimeBlockWithUsers } from '@/services/api/time-block/models';
import { formatDateTime } from '@/common/utils';
import EditUserModal from './components/EditUserModal';
import { UserDto } from '@/assets/simulated-backend/types';

type TimeBlocksProps = {
  timeBlocks: TimeBlockWithUsers[];
};

const TimeBlocks: React.FC<TimeBlocksProps> = ({ timeBlocks }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);

  const handleOpenModal = (user: UserDto) => {
    setSelectedUser(user);
    setOpenModal(true);
  };
  return (
    <>
      {timeBlocks.map((timeBlock) => (
        <div
          key={timeBlock.id}
          className='w-full flex border md:border-transparent border-gray-900 rounded overflow-hidden'
        >
          {/* Color sidebar */}
          <div
            className={`min-w-2 md:w-5 rounded-l-sm md:rounded-sm`}
            style={{ backgroundColor: `${timeBlock.color}` }}
          ></div>

          {/* Main content */}
          <div className='w-full justify-start flex flex-col py-1 gap-y-2 pl-2 md:pl-6'>
            {/* Date */}
            <span className='text-gray-400  text-xs lg:text-sm'>
              {formatDateTime(timeBlock?.startTime)} -{' '}
              {formatDateTime(timeBlock?.endTime)}
            </span>

            {/* List of users */}
            <div className='flex flex-col divide-y divide-gray-900'>
              {timeBlock.users.map((user) => (
                <User
                  key={user.id}
                  user={user}
                  onEdit={() => handleOpenModal(user)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
      {/* Modal */}
      <EditUserModal
        isOpen={openModal}
        closeModal={() => setOpenModal(false)}
        user={selectedUser}
      />
    </>
  );
};

export default TimeBlocks;
