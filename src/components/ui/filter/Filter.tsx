import IconSearch from '@/components/icons/IconSearch';
import { useState } from 'react';

type FilterComponentProps = {
  categories: string[]; // Categories to filter by
  items: Record<string, any>[]; // Items to filter
  onCategoryChange: (category: string) => void; // Function to change the selected category
  onFilterChange: (value: string) => void; // Function to change the filter text
};

const Filter = ({
  categories,
  items,
  onCategoryChange,
  onFilterChange,
}: FilterComponentProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]); // Selected tags for filtering
  const [filterText, setFilterText] = useState(''); // Filter text for search input

  // Toggle category selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
    onCategoryChange(tag); // Call onCategoryChange every time a category is selected
  };

  // Normalize the value for correct filtering
  const normalizeValue = (value: string | number | undefined | null) => {
    if (value == null) {
      return ''; // If the value is null or undefined, return an empty string
    }

    if (typeof value === 'string') {
      return value.toLowerCase().replace(/\D/g, ''); // Remove anything that is not a digit
    }

    // If the value is numeric, convert it to a string and remove non-numeric characters
    return value.toString().replace(/\D/g, '');
  };

  // When the filter text changes, pass the new value to `onFilterChange`
  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilterText(value);
    onFilterChange(value); // Update the filter in the parent component
  };

  // Filter items based on the selected category and filter text
  const filteredItems = items.filter((item) => {
    const value = item[selectedTags[0]]; // Value based on the selected category
    const normalizedValue = normalizeValue(value);

    const normalizedFilterText = normalizeValue(filterText);

    return normalizedValue.includes(normalizedFilterText); // Compare normalized values
  });

  return (
    <div className='w-full lg:w-80'>
      <div className='relative w-full mb-4'>
        <input
          type='text'
          placeholder='Search'
          className='border border-gray-800 text-white text-xs font-normal p-2 h-8 bg-black rounded-md w-full pl-8 focus:border-gray-600 focus:outline-none'
          value={filterText}
          onChange={handleFilterTextChange}
        />
        <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
          <IconSearch />
        </div>
      </div>

      {/* Category selection buttons */}
      <div className='flex space-x-2'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => toggleTag(category)}
            className={`px-2  py-1.5 rounded-md text-xs border  font-bold ${
              selectedTags.includes(category)
                ? 'bg-neutral-300 text-black border-transparent hover:bg-neutral-100'
                : 'bg-black border-gray-800 text-white hover:bg-white/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Show filtered items */}
      <div>
        {filteredItems.map((item, index) => (
          <div key={index}>{item[selectedTags[0]]}</div> // Display the filtered value
        ))}
      </div>
    </div>
  );
};

export default Filter;
