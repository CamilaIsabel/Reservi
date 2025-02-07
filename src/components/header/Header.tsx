'use client';

interface HeaderProps {
  openUserModal: () => void;
  openTimeBlockModal: () => void;
}

function Header({ openUserModal, openTimeBlockModal }: HeaderProps) {
  return (
    <header className='w-full flex sticky top-0 z-50 p-4 lg:px-8 lg:pt-8 justify-between backdrop-blur-sm bg-black/90'>
      <span className='text-white font-medium text-base lg:text-xl'>
        Reservations
      </span>
      <div className='flex gap-x-2 lg:gap-x-5'>
        <button
          onClick={openUserModal}
          className='bg-custom-gray-02 text-gray-300 text-xs lg:text-sm font-bold border border-neutral-700 rounded-md px-1 lg:px-4 py-1 w-fit whitespace-nowrap'
        >
          Create user
        </button>
        <button
          onClick={openTimeBlockModal}
          className='bg-neutral-300 text-gray-900 text-xs lg:text-sm  font-bold border border-transparent rounded-md px-1 lg:px-4 py-1 w-fit whitespace-nowrap'
        >
          Create time block
        </button>
      </div>
    </header>
  );
}

export default Header;
