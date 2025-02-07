'use client';

import { useState, useEffect } from 'react';
import TimeBlocks from '@/components/time-blocks/TimeBlocks';
import Filter from '@/components/ui/filter/Filter';
import { getAllTimeBlockWithUsers } from '@/services/api/time-block/timeBlockRepository';
import AppLoadingOverlay from '@/components/ui/loading/AppLoadingOverlay';
import { UserDto } from '@/assets/simulated-backend/types';
import { TimeBlockWithUsers } from '@/services/api/time-block/models';
import { useTimeBlocks } from '@/context/TimeBlockContext';

export default function Home() {
  const { timeBlocks } = useTimeBlocks();
  const [filteredTimeBlocks, setFilteredTimeBlocks] = useState<
    TimeBlockWithUsers[]
  >([]);

  const categories: string[] = ['name', 'address', 'phoneNumber', 'email'];

  const [filterText, setFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('name');

  // Filter time blocks by text and selected category
  useEffect(() => {
    const filtered = timeBlocks.filter((timeBlock) => {
      if (selectedCategory && filterText) {
        // We access the corresponding property of UserDto safely inside TimeBlockWithUsers
        const value = timeBlock.users?.[0]?.[selectedCategory as keyof UserDto]; // We access the first user
        if (value && typeof value === 'string') {
          return value.toLowerCase().includes(filterText.toLowerCase());
        }
        return false;
      }
      return true;
    });
    setFilteredTimeBlocks(filtered);
  }, [filterText, selectedCategory, timeBlocks]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleFilterChange = (value: string) => {
    setFilterText(value);
  };

  return (
    <main className='h-full w-full px-4 lg:px-8'>
      <AppLoadingOverlay loading={false} />
      <div className='w-full h-full gap-y-6 flex flex-col'>
        <div>
          <Filter
            categories={categories}
            items={timeBlocks}
            onCategoryChange={handleCategoryChange}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div>
          <TimeBlocks timeBlocks={filteredTimeBlocks} />
        </div>
      </div>
    </main>
  );
}
