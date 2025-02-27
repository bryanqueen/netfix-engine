import React, { useState } from 'react';
import { useMovieContext } from '@/context/MovieContext';
import { BiSearch, BiX } from 'react-icons/bi';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const { setFilterOptions, filterOptions } = useMovieContext();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ search: e.target.value });
  };

  const toggleSearchExpand = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setFilterOptions({ search: '' });
    }
  };

  return (
    <div className="bg-netflix-black py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center">
        <h1 className="text-netflix-red hidden md:block text-3xl font-bold tracking-wider mr-10">NETFLIX ENGINE</h1>
        <h1 className="text-netflix-red text-3xl md:hidden block font-bold tracking-wider mr-10">N E</h1>
      </div>



      <div className="flex items-center space-x-4">
        <motion.div 
          className="flex items-center border-b border-gray-600"
          animate={{ width: isSearchExpanded ? 220 : 36 }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={toggleSearchExpand}
            className="text-white p-2"
          >
            {isSearchExpanded ? <BiX size={20} /> : <BiSearch size={20} />}
          </button>
          {isSearchExpanded && (
            <input
              type="text"
              placeholder="Aesthetics Search..."
              className="bg-transparent text-white border-none outline-none px-2 w-full"
              value={filterOptions.search}
              onChange={handleSearchChange}
            />
          )}
        </motion.div>

        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
            <span>JS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;