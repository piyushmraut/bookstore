import { useState } from 'react'
import { motion } from 'framer-motion'

const BookCard = ({ book, onClick, onAddToFavorites, onAddToCart, isFavorite }) => {
  const volumeInfo = book.volumeInfo || {}
  const imageLinks = volumeInfo.imageLinks || {}
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
        {imageLinks.thumbnail ? (
          <img
            src={imageLinks.thumbnail.replace('http://', 'https://')}
            alt={volumeInfo.title}
            className="h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No image available</span>
        )}
        
        <motion.div 
          className="absolute top-2 right-2 flex flex-col gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onAddToFavorites(book)
            }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill={isFavorite ? "red" : "none"} 
              viewBox="0 0 24 24" 
              stroke={isFavorite ? "red" : "currentColor"}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(book)
            }}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </motion.div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{volumeInfo.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
        </p>
        {volumeInfo.averageRating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${i < Math.floor(volumeInfo.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({volumeInfo.ratingsCount || 0})
            </span>
          </div>
        )}
        <p className="text-gray-500 text-xs line-clamp-3">
          {volumeInfo.description || 'No description available'}
        </p>
        {volumeInfo.publishedDate && (
          <p className="text-gray-400 text-xs mt-2">
            Published: {volumeInfo.publishedDate}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default BookCard