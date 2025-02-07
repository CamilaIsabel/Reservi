// context/TimeBlockStore.ts
'use client';

import { useState, useEffect } from 'react';
import { getAllTimeBlockWithUsers } from '@/services/api/time-block/timeBlockRepository';
import { TimeBlockWithUsers } from '@/services/api/time-block/models';

let globalTimeBlocks: TimeBlockWithUsers[] = [];
let listeners: ((blocks: TimeBlockWithUsers[]) => void)[] = [];

export const useTimeBlocks = () => {
  const [timeBlocks, setTimeBlocks] = useState(globalTimeBlocks);

  useEffect(() => {
    const listener = (blocks: TimeBlockWithUsers[]) => setTimeBlocks(blocks);
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  const updateTimeBlocks = async () => {
    const newBlocks = await getAllTimeBlockWithUsers();
    globalTimeBlocks = newBlocks;
    listeners.forEach((listener) => listener(globalTimeBlocks));
  };

  useEffect(() => {
    updateTimeBlocks();
  }, []);

  return { timeBlocks, updateTimeBlocks };
};
