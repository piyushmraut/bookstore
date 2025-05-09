// src/components/SearchBar.jsx
import { motion } from 'framer-motion'

const SearchBar = ({ searchTerm, suggestions, onSearch, onSuggestionClick }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <motion.input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search for books..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        whileFocus={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      
      {suggestions.length > 0 && (
        <motion.ul 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => onSuggestionClick(suggestion)}
              whileHover={{ x: 5 }}
            >
              {suggestion}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}

export default SearchBar