// import { useState } from 'react'
// import { motion } from 'framer-motion'

// const BookCard = ({ book, onClick, onAddToFavorites, onAddToCart, isFavorite }) => {
//   const volumeInfo = book.volumeInfo || {}
//   const imageLinks = volumeInfo.imageLinks || {}
//   const [isHovered, setIsHovered] = useState(false)

//   return (
//     <motion.div 
//       className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       whileHover={{ y: -5 }}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.3 }}
//     >
//       <div className="h-48 bg-gray-200 flex items-center justify-center relative">
//         {imageLinks.thumbnail ? (
//           <img
//             src={imageLinks.thumbnail.replace('http://', 'https://')}
//             alt={volumeInfo.title}
//             className="h-full object-cover"
//           />
//         ) : (
//           <span className="text-gray-500">No image available</span>
//         )}
        
//         <motion.div 
//           className="absolute top-2 right-2 flex flex-col gap-2"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 1 : 0 }}
//           transition={{ duration: 0.2 }}
//         >
//           <button 
//             onClick={(e) => {
//               e.stopPropagation()
//               onAddToFavorites(book)
//             }}
//             className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5" 
//               fill={isFavorite ? "red" : "none"} 
//               viewBox="0 0 24 24" 
//               stroke={isFavorite ? "red" : "currentColor"}
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//             </svg>
//           </button>
          
//           <button 
//             onClick={(e) => {
//               e.stopPropagation()
//               onAddToCart(book)
//             }}
//             className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
//           >
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-5 w-5" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//           </button>
//         </motion.div>
//       </div>
      
//       <div className="p-4">
//         <h3 className="font-bold text-lg mb-2 line-clamp-2">{volumeInfo.title}</h3>
//         <p className="text-gray-600 text-sm mb-2">
//           {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
//         </p>
//         {volumeInfo.averageRating && (
//           <div className="flex items-center mb-2">
//             {[...Array(5)].map((_, i) => (
//               <svg
//                 key={i}
//                 className={`h-4 w-4 ${i < Math.floor(volumeInfo.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             ))}
//             <span className="text-xs text-gray-500 ml-1">
//               ({volumeInfo.ratingsCount || 0})
//             </span>
//           </div>
//         )}
//         <p className="text-gray-500 text-xs line-clamp-3">
//           {volumeInfo.description || 'No description available'}
//         </p>
//         {volumeInfo.publishedDate && (
//           <p className="text-gray-400 text-xs mt-2">
//             Published: {volumeInfo.publishedDate}
//           </p>
//         )}
//       </div>
//     </motion.div>
//   )
// }

// export default BookCard

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaHeart, FaShoppingCart, FaStar, FaRegStar } from 'react-icons/fa';
// import { FiShoppingCart } from 'react-icons/fi';

// const BookCard = ({ book, onClick, onAddToFavorites, onAddToCart, isFavorite }) => {
//   const volumeInfo = book.volumeInfo || {};
//   const imageLinks = volumeInfo.imageLinks || {};
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div 
//       className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer relative border border-gray-100"
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       whileHover={{ 
//         y: -8,
//         scale: 1.02,
//         boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//       }}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="h-48 bg-gradient-to-r from-indigo-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
//         {imageLinks.thumbnail ? (
//           <motion.img
//             src={imageLinks.thumbnail.replace('http://', 'https://')}
//             alt={volumeInfo.title}
//             className="h-full object-cover"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           />
//         ) : (
//           <span className="text-gray-500">No image available</span>
//         )}
        
//         <motion.div 
//           className="absolute top-3 right-3 flex flex-col gap-3"
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ 
//             opacity: isHovered ? 1 : 0,
//             scale: isHovered ? 1 : 0.8
//           }}
//           transition={{ duration: 0.2 }}
//         >
//           <motion.button 
//             onClick={(e) => {
//               e.stopPropagation();
//               onAddToFavorites(book);
//             }}
//             className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all"
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaHeart 
//               className="h-5 w-5" 
//               fill={isFavorite ? "#ef4444" : "none"} 
//               stroke={isFavorite ? "#ef4444" : "currentColor"}
//               strokeWidth="2"
//             />
//           </motion.button>
          
//           <motion.button 
//             onClick={(e) => {
//               e.stopPropagation();
//               onAddToCart(book);
//             }}
//             className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all"
//             whileTap={{ scale: 0.9 }}
//           >
//             <FiShoppingCart className="h-5 w-5" />
//           </motion.button>
//         </motion.div>
//       </div>
      
//       <div className="p-5">
//         <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">{volumeInfo.title}</h3>
//         <p className="text-gray-600 text-sm mb-3">
//           {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
//         </p>
//         {volumeInfo.averageRating && (
//           <div className="flex items-center mb-3">
//             {[...Array(5)].map((_, i) => (
//               i < Math.floor(volumeInfo.averageRating) ? (
//                 <FaStar key={i} className="text-yellow-400 h-4 w-4" />
//               ) : (
//                 <FaRegStar key={i} className="text-gray-300 h-4 w-4" />
//               )
//             ))}
//             <span className="text-xs text-gray-500 ml-1">
//               ({volumeInfo.ratingsCount || 0})
//             </span>
//           </div>
//         )}
//         <p className="text-gray-500 text-sm line-clamp-3 mb-3">
//           {volumeInfo.description || 'No description available'}
//         </p>
//         {volumeInfo.publishedDate && (
//           <p className="text-gray-400 text-xs">
//             Published: {new Date(volumeInfo.publishedDate).getFullYear()}
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default BookCard;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { FiShoppingCart, FiInfo } from 'react-icons/fi';

const BookCard = ({ book, onClick, onAddToFavorites, onAddToCart, isFavorite }) => {
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const [isHovered, setIsHovered] = useState(false);
  
  // Format published date
  const publishedYear = volumeInfo.publishedDate 
    ? new Date(volumeInfo.publishedDate).getFullYear() 
    : null;

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden relative border border-gray-600"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.15)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 z-0" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600" />
      
      {/* Image container */}
      <div className="h-56 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          className="h-full w-full flex items-center justify-center"
          initial={{ opacity: 0.8 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {imageLinks.thumbnail ? (
            <motion.img
              src={imageLinks.thumbnail.replace('http://', 'https://')}
              alt={volumeInfo.title}
              className="h-full object-cover shadow-md rounded-md"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1,
                ease: "easeOut"
              }}
            />
          ) : (
            <div className="h-40 w-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-500 text-sm">No image available</span>
            </div>
          )}
        </motion.div>
        
        {/* Favorite and cart buttons */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              className="absolute top-3 right-3 flex flex-col gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToFavorites(book);
                }}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                whileTap={{ scale: 0.85 }}
                whileHover={{ y: -2 }}
              >
                <FaHeart 
                  size={20}
                  className={isFavorite ? "text-red-500" : "text-gray-400"}
                />
              </motion.button>
              
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(book);
                }}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                whileTap={{ scale: 0.85 }}
                whileHover={{ y: -2 }}
              >
                <FiShoppingCart size={20} className="text-gray-700" />
              </motion.button>
              
              <motion.button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all"
                whileTap={{ scale: 0.85 }}
                whileHover={{ y: -2 }}
              >
                <FiInfo size={20} className="text-gray-700" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Ribbon for new books (if published within last year) */}
        {publishedYear && publishedYear >= new Date().getFullYear() - 1 && (
          <motion.div 
            className="absolute top-4 left-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-r-full shadow-md"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            NEW
          </motion.div>
        )}
      </div>
      
      {/* Content section */}
      <div className="p-5 relative z-10">
        <motion.h3 
          className="font-bold text-lg mb-2 line-clamp-2 text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {volumeInfo.title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 text-sm mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
        </motion.p>
        
        {volumeInfo.averageRating && (
          <motion.div 
            className="flex items-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                >
                  {i < Math.floor(volumeInfo.averageRating) ? (
                    <FaStar className="text-yellow-400 h-4 w-4" />
                  ) : (
                    <FaRegStar className="text-gray-300 h-4 w-4" />
                  )}
                </motion.div>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({volumeInfo.ratingsCount || 0})
            </span>
          </motion.div>
        )}
        
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: 'auto'
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-500 text-sm line-clamp-3 mb-3">
            {volumeInfo.description || 'No description available'}
          </p>
        </motion.div>
        
        {/* Footer section */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          {publishedYear && (
            <p className="text-gray-400 text-xs">
              Published: {publishedYear}
            </p>
          )}
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm py-1 px-4 rounded-full hover:shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
      
      {/* Hover overlay effect */}
      <AnimatePresence>
  {isHovered && (
    <motion.div 
      className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    />
  )}
</AnimatePresence>

    </motion.div>
  );
};

export default BookCard;