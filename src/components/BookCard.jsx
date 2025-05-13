import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaStar, FaRegStar, FaBookOpen } from 'react-icons/fa';
import { FiShoppingCart, FiInfo, FiChevronDown, FiX } from 'react-icons/fi';

const BookCard = ({ book, onClick, onAddToFavorites, onAddToCart, isFavorite }) => {
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const cardRef = useRef(null);
  
  // Format published date
  const publishedYear = volumeInfo.publishedDate 
    ? new Date(volumeInfo.publishedDate).getFullYear() 
    : null;

  // Determine if book is new (published within last year)
  const isNew = publishedYear && publishedYear >= new Date().getFullYear() - 1;

  // Get a random color scheme based on book ID or title
  const colorSchemes = [
    { from: "from-blue-100", to: "to-purple-200", border: "border-purple-400", glow: "rgba(165, 180, 252, 0.7)" },
    { from: "from-emerald-100", to: "to-teal-100", border: "border-teal-400", glow: "rgba(153, 246, 228, 0.7)" },
    { from: "from-amber-100", to: "to-orange-100", border: "border-orange-400", glow: "rgba(254, 215, 170, 0.7)" },
    { from: "from-rose-100", to: "to-pink-100", border: "border-pink-400", glow: "rgba(251, 207, 232, 0.7)" },
    { from: "from-indigo-100", to: "to-sky-100", border: "border-sky-400", glow: "rgba(186, 230, 253, 0.7)" },
  ];
  
  // Create a simple hash from the book ID or title for consistent color selection
  const stringToHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash);
  };
  
  const bookId = book.id || volumeInfo.title || "";
  const colorIndex = stringToHash(bookId) % colorSchemes.length;
  const colorScheme = colorSchemes[colorIndex];

  // Handle click outside of quick view
  const handleClickOutside = (e) => {
    if (showQuickView && cardRef.current && !cardRef.current.contains(e.target)) {
      setShowQuickView(false);
    }
  };

  // Add event listener when quick view is shown
  useState(() => {
    if (showQuickView) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showQuickView]);

  // Particles animation for heart click
  const [showParticles, setShowParticles] = useState(false);
  
  const handleFavoriteClick = (book) => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 700);
    onAddToFavorites(book);
  };

  return (
    <motion.div 
      ref={cardRef}
      className={`bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col h-[450px] w-64 border-2 ${colorScheme.border}`}
      onClick={() => !showQuickView && onClick()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.2), 0 20px 20px -5px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      layout
    >
      {/* Enhanced gradient background with animated pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} z-0 overflow-hidden`}>
        <motion.div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "150px 150px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
      
      {/* Card inner glowing effect when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute inset-0 z-0 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.05, 1]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
            style={{
              background: `radial-gradient(circle at 50% 30%, ${colorScheme.glow} 0%, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Image container with parallax effect */}
      <div className="relative h-48 flex-shrink-0 p-4 flex items-center justify-center bg-gradient-to-b from-white/70 to-white/30 overflow-hidden">
        <motion.div
          className="h-full flex items-center justify-center"
          whileHover={{ 
            scale: 1.1,
            rotate: isHovered ? 2 : 0,
            y: isHovered ? -5 : 0
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {imageLinks.thumbnail ? (
            <motion.div
              className="relative"
              style={{ perspective: "1000px" }}
            >
              <motion.img
                src={imageLinks.thumbnail.replace('http://', 'https://')}
                alt={volumeInfo.title}
                className="h-full object-contain rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  rotateY: isHovered ? [0, 5, 0, -5, 0] : 0
                }}
                transition={{ 
                  opacity: { duration: 0.4 },
                  rotateY: { 
                    duration: isHovered ? 3 : 0.4,
                    repeat: isHovered ? Infinity : 0,
                    ease: "easeInOut" 
                  }
                }}
                style={{
                  boxShadow: isHovered 
                    ? '0px 20px 25px rgba(0, 0, 0, 0.3), 0px 10px 10px rgba(0, 0, 0, 0.2)'
                    : '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  transformStyle: "preserve-3d"
                }}
              />
              
              {/* Book shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rounded-lg"
                animate={isHovered ? {
                  opacity: [0, 0.5, 0],
                  left: ["-100%", "100%", "100%"],
                } : { opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: 2
                }}
              />
            </motion.div>
          ) : (
            <motion.div 
              className="h-40 w-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center"
              whileHover={{ 
                boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
                scale: 1.05
              }}
            >
              <motion.div
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaBookOpen size={30} className="text-gray-400 mb-2" />
                <span className="text-gray-500 text-sm font-medium block text-center">No image</span>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
        
        {/* New ribbon with animation */}
        {isNew && (
          <motion.div 
            className="absolute top-3 left-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-r-full shadow-md"
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              boxShadow: [
                "0px 4px 8px rgba(0, 0, 0, 0.2)",
                "0px 6px 12px rgba(0, 0, 0, 0.3)",
                "0px 4px 8px rgba(0, 0, 0, 0.2)"
              ]
            }}
            transition={{ 
              delay: 0.2, 
              duration: 0.5,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0px 0px 4px rgba(255, 255, 255, 0.5)",
                  "0px 0px 8px rgba(255, 255, 255, 0.8)",
                  "0px 0px 4px rgba(255, 255, 255, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              NEW
            </motion.span>
          </motion.div>
        )}
      </div>
      
      {/* Content section with fixed height and overflow handling */}
      <div className="p-5 flex flex-col h-[calc(450px-12rem)] relative z-10">
        <div className="flex-grow overflow-hidden">
          <motion.h3 
            className="font-bold text-gray-800 text-lg mb-1 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {volumeInfo.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 text-sm mb-2 line-clamp-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
          </motion.p>
          
          {/* Star rating with animation */}
          {volumeInfo.averageRating && (
            <motion.div 
              className="flex items-center mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, duration: 0.3, type: "spring" }}
                  >
                    {i < Math.floor(volumeInfo.averageRating) ? (
                      <motion.div
                        animate={isHovered ? { 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, 0, -5, 0],
                        } : {}}
                        transition={{ 
                          duration: 0.6,
                          delay: i * 0.1,
                          repeat: isHovered ? Infinity : 0,
                          repeatDelay: 2
                        }}
                      >
                        <FaStar className="text-yellow-400 h-4 w-4" />
                      </motion.div>
                    ) : (
                      <FaRegStar className="text-gray-300 h-4 w-4" />
                    )}
                  </motion.div>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500">
                ({volumeInfo.ratingsCount || 0})
              </span>
            </motion.div>
          )}
          
          {/* Description with animated background */}
          <motion.div
            className="mb-3 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <motion.div 
              className="text-xs text-gray-600 line-clamp-3 h-[3.6rem] p-2 rounded-md relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colorScheme.from.replace('from-', '')} 0%, white 50%, ${colorScheme.to.replace('to-', '')} 100%)`,
              }}
              whileHover={{
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
              }}
            >
              <p>{volumeInfo.description || 'No description available for this book. Check out the details to learn more about this title and its content.'}</p>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Action buttons with enhanced animations */}
        <motion.div 
          className="flex justify-between items-center pt-3 mt-auto border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {/* Favorite button with particle effects */}
          <motion.div className="relative">
            <motion.button 
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick(book);
              }}
              className={`p-2 rounded-full shadow-sm transition-all border ${
                isFavorite ? "bg-red-50 border-red-200" : "bg-white border-gray-100 hover:bg-gray-50"
              }`}
              whileHover={{ 
                scale: 1.2,
                boxShadow: isFavorite 
                  ? "0px 0px 15px rgba(239, 68, 68, 0.5)" 
                  : "0px 5px 10px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.8 }}
            >
              <motion.div
                animate={isFavorite ? { 
                  scale: [1, 1.3, 1],
                } : {}}
                transition={{ 
                  duration: 0.6,
                  repeat: isFavorite ? Infinity : 0,
                  repeatDelay: 3
                }}
              >
                <FaHeart 
                  size={16}
                  className={isFavorite ? "text-red-500" : "text-gray-300"}
                />
              </motion.div>
            </motion.button>
            
            {/* Heart particles */}
            <AnimatePresence>
              {showParticles && isFavorite && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-red-500"
                      initial={{ 
                        scale: 0, 
                        x: 0, 
                        y: 0,
                        opacity: 0.8
                      }}
                      animate={{ 
                        scale: [0, 1, 0],
                        x: [0, -20 + Math.random() * 40],
                        y: [0, -40 - Math.random() * 20],
                        opacity: [0.8, 0]
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.7 }}
                      style={{
                        left: "50%",
                        top: "50%",
                        position: "absolute",
                        zIndex: 10
                      }}
                    >
                      <FaHeart size={Math.random() * 10 + 5} />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Add to cart button with animation */}
          <motion.button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-full shadow-sm text-sm font-medium flex items-center gap-2 relative overflow-hidden"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(book);
            }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
              animate={isHovered ? {
                opacity: [0, 0.3, 0],
                left: ["-100%", "100%", "100%"],
              } : { opacity: 0 }}
              transition={{
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 2
              }}
            />
            
            <motion.div
              animate={isHovered ? {
                rotate: [0, -10, 10, -10, 0],
              } : {}}
              transition={{
                duration: 0.5,
                delay: 0.2,
                repeat: isHovered ? 1 : 0,
              }}
            >
              <FiShoppingCart size={14} />
            </motion.div>
            <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Floating action buttons with staggered animations */}
      <AnimatePresence>
        {isHovered && !showQuickView && (
          <>
            {/* Details button */}
            <motion.button 
              className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all z-20"
              initial={{ opacity: 0, scale: 0, rotate: -180, x: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              whileHover={{ 
                scale: 1.2, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f8fafc" 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FiInfo size={18} className="text-gray-700" />
            </motion.button>
            
            {/* Quick view button */}
            <motion.button 
              className="absolute top-16 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-all z-20"
              initial={{ opacity: 0, scale: 0, rotate: -180, x: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0, rotate: 180, x: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowQuickView(true);
              }}
              whileHover={{ 
                scale: 1.2, 
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f8fafc" 
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FiChevronDown size={18} className="text-gray-700" />
            </motion.button>
          </>
        )}
      </AnimatePresence>
      
      {/* Quick view popup */}
      <AnimatePresence>
        {showQuickView && (
          <motion.div
            className="absolute inset-0 bg-white rounded-xl z-30 flex flex-col shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="p-4 flex justify-between items-center border-b border-gray-100">
              <h3 className="font-bold text-gray-800">{volumeInfo.title}</h3>
              <motion.button
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => setShowQuickView(false)}
                whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={18} className="text-gray-600" />
              </motion.button>
            </div>
            
            {/* Quick view content */}
            <div className="p-4 overflow-y-auto flex-grow">
              <div className="flex mb-4">
                {/* Book image */}
                <div className="w-1/3 mr-4">
                  {imageLinks.thumbnail ? (
                    <motion.img
                      src={imageLinks.thumbnail.replace('http://', 'https://')}
                      alt={volumeInfo.title}
                      className="w-full rounded-md shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    />
                  ) : (
                    <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center">
                      <FaBookOpen size={30} className="text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Book info */}
                <div className="w-2/3">
                  <motion.p 
                    className="text-sm text-gray-600 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="font-medium">Author:</span> {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}
                  </motion.p>
                  
                  {publishedYear && (
                    <motion.p 
                      className="text-sm text-gray-600 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="font-medium">Published:</span> {publishedYear}
                    </motion.p>
                  )}
                  
                  {volumeInfo.publisher && (
                    <motion.p 
                      className="text-sm text-gray-600 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="font-medium">Publisher:</span> {volumeInfo.publisher}
                    </motion.p>
                  )}
                  
                  {volumeInfo.pageCount && (
                    <motion.p 
                      className="text-sm text-gray-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <span className="font-medium">Pages:</span> {volumeInfo.pageCount}
                    </motion.p>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md shadow-inner">
                  {volumeInfo.description || 'No description available for this book.'}
                </div>
              </motion.div>
            </div>
            
            {/* Footer with quick action buttons */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between">
                <motion.button
                  className={`flex items-center gap-2 p-2 rounded-lg ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500'} shadow-sm`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(book);
                  }}
                >
                  <FaHeart size={16} />
                  <span className="text-sm font-medium">{isFavorite ? 'Favorited' : 'Add to Favorites'}</span>
                </motion.button>
                
                <motion.button
                  className="flex items-center gap-2 p-2 rounded-lg bg-blue-500 text-white shadow-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQuickView(false);
                    onClick();
                  }}
                >
                  <FiInfo size={16} />
                  <span className="text-sm font-medium">Full Details</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Page curl effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-0 right-0 w-12 h-12 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute bottom-0 right-0"
              style={{
                width: "0px",
                height: "0px",
                borderStyle: "solid",
                borderWidth: "0 0 12px 12px",
                borderColor: `transparent transparent ${colorScheme.border.replace('border-', '')} transparent`,
                filter: "drop-shadow(-2px -2px 2px rgba(0,0,0,0.1))",
                transformOrigin: "bottom right",
                transform: "rotate(0deg)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add to cart success animation */}
      <AnimatePresence>
        {false && ( /* Toggle this with state when cart is clicked */
          <motion.div
            className="absolute inset-0 bg-green-500 bg-opacity-20 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-full p-4 shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg 
                className="w-16 h-16 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookCard;