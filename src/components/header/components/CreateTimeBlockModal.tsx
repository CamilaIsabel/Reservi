import Modal from '@/components/ui/modal/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from '@/components/ui/select/Select';
import { useState, useEffect, useMemo } from 'react';
import { UserDto } from '@/services/api/user/models';
import { getAllUsers } from '@/services/api/user/userRepository';
import { saveTimeBlockData } from '@/services/api/time-block/timeBlockRepository';
import AppLoadingOverlay from '@/components/ui/loading/AppLoadingOverlay';
import { useTimeBlocks } from '@/context/TimeBlockContext';

interface CreateTimeBlockModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
function CreateTimeBlockModal({
  isOpen,
  closeModal,
}: CreateTimeBlockModalProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1); // Set minimum to tomorrow
  tomorrow.setHours(0, 0, 0, 0);
  const [selectedUserId, setSelectedUser] = useState<number | null>(null);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null); // Starts without date
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorLabel, setErrorLabel] = useState<string>('');
  const { updateTimeBlocks } = useTimeBlocks();

  const isDisabled = useMemo(() => {
    return !startDate || !endDate || !selectedUserId;
  }, [startDate, endDate, selectedUserId]);

  // get the users when the modal is mounted
  useEffect(() => {
    if (isOpen) {
      getAllUsers().then((data) => setUsers(data));
    }
  }, [isOpen]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (!date) return;

    // Allow changing the time freely, only modify it if it is exactly the same as the start time
    if (startDate && date.getTime() === startDate.getTime()) {
      const adjustedDate = new Date(date);
      adjustedDate.setMinutes(date.getHours());
      setEndDate(adjustedDate);
    } else {
      setEndDate(date);
    }
  };

  async function createTimeBlock(): Promise<void> {
    setLoading(true);
    const timeBlockResponse = await saveTimeBlockData({
      startTime: startDate,
      endTime: endDate,
      attachedUser: selectedUserId,
    });
    await updateTimeBlocks();
    setErrorLabel(timeBlockResponse);
    setLoading(false);
    if (timeBlockResponse) return;
    setSelectedUser(null);
    setStartDate(null);
    setEndDate(null);
    setErrorLabel('');
    closeModal();
  }

  if (!isOpen) return null;

  return (
    <Modal title='Create Time Block' onClose={closeModal} fullScreen>
      <AppLoadingOverlay loading={loading} />
      <div
        onClick={() => setErrorLabel('')}
        className='flex flex-col h-[calc(100vh-4rem)]'
      >
        <div className='flex-1 flex flex-col gap-y-8'>
          <div className='w-full'>
            <Select
              options={users}
              label='Seleccionar usuario'
              labelKey='name'
              valueKey='id'
              onChange={(value) => {
                if (value) {
                  setSelectedUser(value.id);
                }
              }}
            />
          </div>

          {/* Start Date and Time Picker */}
          <div className='flex flex-col w-full'>
            <label className='block text-xs font-normal  text-gray-300 mb-1'>
              Start Date & Time
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={tomorrow} // It can't be before tomorrow
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15} // 15 minute intervals
              dateFormat='yyyy-MM-dd HH:mm'
              className='w-full px-3 py-2 jsx  border border-gray-700 rounded-md bg-custom-gray-02 text-white text-gray-300 text-xs font-normal '
              placeholderText='Select start date'
            />
          </div>

          {/* End Date and Time Picker */}
          <div className='flex flex-col w-full gap-y-1'>
            <label className='block text-xs font-normal text-gray-300 mb-0.5'>
              End Date & Time
            </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate ?? undefined} // Avoid invalid values
              minTime={
                startDate &&
                endDate &&
                endDate.toDateString() === startDate.toDateString()
                  ? new Date(startDate.getTime() + 1 * 60 * 1000) //
                  : new Date(0, 0, 0, 0, 0) // No restriction if it is another day
              }
              maxTime={new Date(0, 0, 0, 23, 59)} // Allows until the end of the day
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15} // 15 minute intervals
              dateFormat='yyyy-MM-dd HH:mm'
              className='w-full px-3 py-2 border border-gray-700 rounded-md bg-custom-gray-02 text-white text-xs font-normal'
              placeholderText='Select end date'
            />
            <span className='text-red-500 text-sm mt-2'>{errorLabel}</span>
          </div>
        </div>

        {/* Footer */}
        <div className='pb-6'>
          <button
            onClick={() => createTimeBlock()}
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
      <style jsx global>{`
        .react-datepicker__day--selected {
          color: black !important;
          background-color: rgb(
            200,
            201,
            202
          ) !important; /* Color de selección */
        }
        .react-datepicker__month-container {
          background-color: #141516 !important;
        }
        .react-datepicker {
          background-color: #141516 !important; /* Asegura que se aplique */
        }
        .react-datepicker__header {
          background-color: #141516 !important;
          color: rgb(179, 169, 169) !important;
        }

        .react-datepicker__day-name {
          color: rgb(177, 177, 177) !important;
        }

        .react-datepicker__time-list-item.react-datepicker__time-list-item--disabled {
          color: rgb(88, 84, 84) !important;
          text-decoration-line: line-through;
          pointer-events: none;
        }

        .react-datepicker__time-list-item.react-datepicker__time-list-item--selected {
          background-color: rgb(177, 177, 177) !important;
          color: black !important;
        }

        .react-datepicker__time-list-item:hover {
          background-color: rgb(58, 54, 54) !important;
          color: white !important;
        }

        .react-datepicker__day--disabled {
          color: rgb(88, 84, 84) !important;
          text-decoration-line: line-through;
          pointer-events: none;
        }

        .react-datepicker__time {
          background-color: #141516 !important;
          color: rgb(255, 255, 255);
        }
        .react-datepicker__day {
          color: #fff; /* Color de los días */
        }
        .react-datepicker__day:hover {
          background-color: rgb(
            53,
            53,
            56
          ) !important; /* Color al pasar el cursor */
        }

        .react-datepicker__current-month {
          color: rgb(238, 238, 238) !important;
        }

        .react-datepicker__day--keyboard-selected {
          background-color: rgb(89, 93, 97) !important;
        }
        .react-datepicker-time__header {
          color: rgb(238, 238, 238) !important;
        }

        .react-datepicker__time-list {
          background-color: #141516 !important;
        }
      `}</style>
    </Modal>
  );
}

export default CreateTimeBlockModal;
