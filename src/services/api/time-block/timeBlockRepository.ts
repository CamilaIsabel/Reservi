import {
  timeBlocksWithUsers,
  addOrCreateTimeBlock,
} from '@/assets/simulated-backend/backend';
import {
  TimeBlockWithUsers,
  TimeBlock,
} from '@/services/api/time-block/models';

export async function getAllTimeBlockWithUsers(): Promise<
  TimeBlockWithUsers[]
> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timeBlocksWithUsers());
    }, 1000); // Simulated Promise
  });
}

export async function saveTimeBlockData(timeBlock: TimeBlock): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(addOrCreateTimeBlock(timeBlock));
    }, 1000); // Simulated Promise
  });
}
