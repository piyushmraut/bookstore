// // src/components/SearchBar.jsx
// import { motion } from 'framer-motion'

// const SearchBar = ({ searchTerm, suggestions, onSearch, onSuggestionClick }) => {
//   return (
//     <div className="relative max-w-2xl mx-auto">
//       <motion.input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => onSearch(e.target.value)}
//         placeholder="Search for books..."
//         className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         whileFocus={{ scale: 1.02 }}
//         transition={{ duration: 0.2 }}
//       />
      
//       {suggestions.length > 0 && (
//         <motion.ul 
//           className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//         >
//           {suggestions.map((suggestion, index) => (
//             <motion.li
//               key={index}
//               className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
//               onClick={() => onSuggestionClick(suggestion)}
//               whileHover={{ x: 5 }}
//             >
//               {suggestion}
//             </motion.li>
//           ))}
//         </motion.ul>
//       )}
//     </div>
//   )
// }

// export default SearchBar

import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ searchTerm, suggestions, onSearch, onSuggestionClick }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <motion.div 
        className="relative"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search for books..."
          className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        />
        {searchTerm && (
          <button 
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        )}
      </motion.div>
      
      {suggestions.length > 0 && (
        <motion.ul 
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              className="p-3 hover:bg-indigo-50 cursor-pointer transition-colors flex items-center gap-3"
              onClick={() => onSuggestionClick(suggestion)}
              whileHover={{ x: 5 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <FaSearch className="text-gray-400" />
              <span>{suggestion}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default SearchBar;