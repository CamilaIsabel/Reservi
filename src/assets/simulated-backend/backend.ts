import { users, timeBlocks } from '@/assets/simulated-backend/database';
import { TimeBlock, UserDto } from '@/assets/simulated-backend/types';
import { TimeBlockWithUsers } from '@/services/api/time-block/models';

export function allUsers(): UserDto[] {
  return users;
}

export function allTimeBlocks(): TimeBlock[] {
  return timeBlocks;
}

export function timeBlocksWithUsers(): TimeBlockWithUsers[] {
  return timeBlocks.map((timeBlock) => {
    const filtredUsers = users.filter((user) => {
      if (!user.id) return;
      return timeBlock.attachedUsers.includes(user.id);
    });

    return {
      id: timeBlock.id,
      color: timeBlock.color,
      startTime: timeBlock.startTime,
      endTime: timeBlock.endTime,
      users: filtredUsers,
    };
  });
}

export function saveUser(user: UserDto): void {
  user.id = Math.floor(Math.random() * 1000000);
  users.push(user);
}

export function addOrCreateTimeBlock(timeBlock: any): string {
  const { startTime, endTime, attachedUser } = timeBlock;

  for (const block of timeBlocks) {
    // If the dates completely match an existing block
    if (
      startTime.getTime() === block.startTime.getTime() &&
      endTime.getTime() === block.endTime.getTime()
    ) {
      if (!block.attachedUsers.includes(attachedUser)) {
        block.attachedUsers.push(attachedUser);
      }
      return '';
    }
    // If the dates partially overlap, a message is displayed and nothing is done.
    if (
      startTime < block.endTime &&
      endTime > block.startTime &&
      !(
        startTime.getTime() === block.startTime.getTime() &&
        endTime.getTime() === block.endTime.getTime()
      )
    ) {
      return 'The dates overlap with one of the existing time blocks';
    }
  }
  // If there is no overlap, create a new block
  timeBlocks.push({
    id: Math.floor(Math.random() * 1000000),
    startTime,
    endTime,
    attachedUsers: [timeBlock.attachedUser],
    color: getRandomColor(),
  });

  return '';
}

export function updateUser(updatedUser: UserDto): void {
  const userIndex = users.findIndex((user) => user.id === updatedUser.id);
  if (userIndex !== -1) {
    // Update the user in the array
    users[userIndex] = updatedUser;
    return;
  }
  return; // User not found
}

function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

export function deleteUserById(userId: number) {
  // Remove user from the users array
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users.splice(index, 1);
  } else {
    console.log('User not found.');
    return;
  }

  // Remove user from attachedUsers in timeBlocks
  for (let i = timeBlocks.length - 1; i >= 0; i--) {
    const block = timeBlocks[i];
    block.attachedUsers = block.attachedUsers.filter((id) => id !== userId);

    // If the timeBlock has no users left, delete it
    if (block.attachedUsers.length === 0) {
      timeBlocks.splice(i, 1);
    }
  }
}
