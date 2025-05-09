// import { useEffect } from 'react'
// import { motion } from 'framer-motion'

// const BookModal = ({ book, onClose, onAddToFavorites, onAddToCart, isFavorite }) => {
//   const volumeInfo = book.volumeInfo || {}
//   const imageLinks = volumeInfo.imageLinks || {}
//   const saleInfo = book.saleInfo || {}

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose()
//       }
//     }
//     document.addEventListener('keydown', handleEscape)
//     return () => document.removeEventListener('keydown', handleEscape)
//   }, [onClose])

//   const formatPrice = (price, currency) => {
//     if (!price) return 'Not available for purchase'
//     try {
//       return new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: currency || 'USD'
//       }).format(price)
//     } catch {
//       return `${currency || ''} ${price}`
//     }
//   }

//   const getPriceInfo = () => {
//     if (saleInfo.saleability === 'FREE') {
//       return 'Free'
//     } else if (saleInfo.saleability === 'NOT_FOR_SALE') {
//       return 'Not for sale'
//     } else if (saleInfo.listPrice) {
//       return formatPrice(saleInfo.listPrice.amount, saleInfo.listPrice.currencyCode)
//     } else if (saleInfo.retailPrice) {
//       return formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)
//     } else {
//       return 'Price not available'
//     }
//   }

//   const getBuyLink = () => {
//     if (saleInfo.buyLink) {
//       return saleInfo.buyLink
//     }
//     return null
//   }

//   return (
//     <motion.div 
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div 
//         className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
//         onClick={(e) => e.stopPropagation()}
//         initial={{ scale: 0.9 }}
//         animate={{ scale: 1 }}
//         exit={{ scale: 0.9 }}
//       >
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
        
//         <div className="p-6">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="md:w-1/3">
//               <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
//                 {imageLinks.thumbnail ? (
//                   <img
//                     src={imageLinks.thumbnail.replace('http://', 'https://')}
//                     alt={volumeInfo.title}
//                     className="h-full object-contain"
//                   />
//                 ) : (
//                   <span className="text-gray-500">No image available</span>
//                 )}
//               </div>
              
//               <div className="mt-4 flex gap-2">
//                 <button 
//                   onClick={() => onAddToFavorites(book)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 transition-colors w-full justify-center`}
//                 >
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     fill={isFavorite ? "red" : "none"} 
//                     viewBox="0 0 24 24" 
//                     stroke={isFavorite ? "red" : "currentColor"}
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                   {isFavorite ? 'Saved' : 'Save'}
//                 </button>
                
//                 <button 
//                   onClick={() => onAddToCart(book)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors w-full justify-center"
//                 >
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                   </svg>
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
            
//             <div className="md:w-2/3">
//               <h2 className="text-2xl font-bold mb-2">{volumeInfo.title}</h2>
//               <p className="text-gray-600 mb-4">
//                 {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
//               </p>
              
//               <div className="grid grid-cols-2 gap-4 mb-4">
//                 {volumeInfo.publishedDate && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-500">Published</h4>
//                     <p>{volumeInfo.publishedDate}</p>
//                   </div>
//                 )}
//                 {volumeInfo.publisher && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-500">Publisher</h4>
//                     <p>{volumeInfo.publisher}</p>
//                   </div>
//                 )}
//                 {volumeInfo.pageCount && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-500">Pages</h4>
//                     <p>{volumeInfo.pageCount}</p>
//                   </div>
//                 )}
//                 {volumeInfo.language && (
//                   <div>
//                     <h4 className="text-sm font-semibold text-gray-500">Language</h4>
//                     <p>{volumeInfo.language.toUpperCase()}</p>
//                   </div>
//                 )}
//               </div>
              
//               <div className="mb-4">
//                 <h4 className="text-sm font-semibold text-gray-500">Price</h4>
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg font-semibold text-indigo-600">
//                     {getPriceInfo()}
//                   </span>
//                   {saleInfo.listPrice && saleInfo.retailPrice && 
//                     saleInfo.listPrice.amount !== saleInfo.retailPrice.amount && (
//                       <span className="text-sm text-gray-500 line-through">
//                         {formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)}
//                       </span>
//                   )}
//                   {saleInfo.isEbook && (
//                     <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
//                       Ebook
//                     </span>
//                   )}
//                 </div>
//               </div>
              
//               {volumeInfo.categories && (
//                 <div className="mb-4">
//                   <h4 className="text-sm font-semibold text-gray-500">Categories</h4>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {volumeInfo.categories.map((category, index) => (
//                       <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
//                         {category}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
              
//               {volumeInfo.averageRating && (
//                 <div className="mb-4">
//                   <h4 className="text-sm font-semibold text-gray-500">Rating</h4>
//                   <div className="flex items-center">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`h-5 w-5 ${i < Math.floor(volumeInfo.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-gray-600">
//                       {volumeInfo.averageRating} ({volumeInfo.ratingsCount || 0} ratings)
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="mt-6">
//             <h3 className="text-lg font-semibold mb-2">Description</h3>
//             <p className="text-gray-700">
//               {volumeInfo.description || 'No description available.'}
//             </p>
//           </div>
          
//           <div className="mt-6 flex gap-4">
//             {getBuyLink() && (
//               <a
//                 href={getBuyLink()}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
//               >
//                 Buy Now
//               </a>
//             )}
//             {volumeInfo.previewLink && (
//               <a
//                 href={volumeInfo.previewLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
//               >
//                 Preview on Google Books
//               </a>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   )
// }

// export default BookModal

// import { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FaHeart, FaShoppingCart, FaStar, FaRegStar, FaTimes, FaBookOpen } from 'react-icons/fa';
// import { FiExternalLink } from 'react-icons/fi';

// const BookModal = ({ book, onClose, onAddToFavorites, onAddToCart, isFavorite }) => {
//   const volumeInfo = book.volumeInfo || {};
//   const imageLinks = volumeInfo.imageLinks || {};
//   const saleInfo = book.saleInfo || {};

//   useEffect(() => {
//     const handleEscape = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };
//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, [onClose]);

//   const formatPrice = (price, currency) => {
//     if (!price) return 'Not available for purchase';
//     try {
//       return new Intl.NumberFormat(undefined, {
//         style: 'currency',
//         currency: currency || 'USD'
//       }).format(price);
//     } catch {
//       return `${currency || ''} ${price}`;
//     }
//   };

//   const getPriceInfo = () => {
//     if (saleInfo.saleability === 'FREE') {
//       return 'Free';
//     } else if (saleInfo.saleability === 'NOT_FOR_SALE') {
//       return 'Not for sale';
//     } else if (saleInfo.listPrice) {
//       return formatPrice(saleInfo.listPrice.amount, saleInfo.listPrice.currencyCode);
//     } else if (saleInfo.retailPrice) {
//       return formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode);
//     } else {
//       return 'Price not available';
//     }
//   };

//   const getBuyLink = () => {
//     if (saleInfo.buyLink) {
//       return saleInfo.buyLink;
//     }
//     return null;
//   };

//   return (
//     <motion.div 
//       className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       <motion.div 
//         className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-200"
//         onClick={(e) => e.stopPropagation()}
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ type: 'spring', damping: 25 }}
//       >
//         <motion.button 
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-white p-2 rounded-full shadow-md"
//           whileHover={{ rotate: 90 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <FaTimes className="h-5 w-5" />
//         </motion.button>
        
//         <div className="p-8">
//           <div className="flex flex-col md:flex-row gap-8">
//             <div className="md:w-2/5">
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center h-80 shadow-inner overflow-hidden">
//                 {imageLinks.thumbnail ? (
//                   <motion.img
//                     src={imageLinks.thumbnail.replace('http://', 'https://')}
//                     alt={volumeInfo.title}
//                     className="h-full object-contain"
//                     initial={{ scale: 0.9 }}
//                     animate={{ scale: 1 }}
//                     transition={{ duration: 0.5 }}
//                   />
//                 ) : (
//                   <div className="text-center p-4">
//                     <FaBookOpen className="h-16 w-16 mx-auto text-gray-400 mb-2" />
//                     <span className="text-gray-500">No image available</span>
//                   </div>
//                 )}
//               </div>
              
//               <div className="mt-6 flex gap-3">
//                 <motion.button 
//                   onClick={() => onAddToFavorites(book)}
//                   className={`flex items-center gap-2 px-5 py-3 rounded-xl ${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 transition-colors w-full justify-center font-medium`}
//                   whileHover={{ y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FaHeart 
//                     fill={isFavorite ? "#ef4444" : "none"} 
//                     stroke={isFavorite ? "#ef4444" : "currentColor"}
//                     strokeWidth="2"
//                   />
//                   {isFavorite ? 'Saved' : 'Save'}
//                 </motion.button>
                
//                 <motion.button 
//                   onClick={() => onAddToCart(book)}
//                   className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all w-full justify-center font-medium shadow-md"
//                   whileHover={{ y: -2, shadow: "0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -1px rgba(79, 70, 229, 0.2)" }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <FaShoppingCart />
//                   Add to Cart
//                 </motion.button>
//               </div>

//               <div className="mt-6 bg-indigo-50 rounded-xl p-4">
//                 <h4 className="text-sm font-semibold text-indigo-800 mb-2">Price</h4>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xl font-bold text-indigo-700">
//                     {getPriceInfo()}
//                   </span>
//                   {saleInfo.listPrice && saleInfo.retailPrice && 
//                     saleInfo.listPrice.amount !== saleInfo.retailPrice.amount && (
//                       <span className="text-sm text-gray-500 line-through">
//                         {formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)}
//                       </span>
//                   )}
//                   {saleInfo.isEbook && (
//                     <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
//                       Ebook
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="md:w-3/5">
//               <motion.h2 
//                 className="text-3xl font-bold mb-3 text-gray-900"
//                 initial={{ y: -10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.1 }}
//               >
//                 {volumeInfo.title}
//               </motion.h2>
//               <motion.p 
//                 className="text-indigo-600 font-medium mb-6"
//                 initial={{ y: -10, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.15 }}
//               >
//                 {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
//               </motion.p>
              
//               <motion.div 
//                 className="grid grid-cols-2 gap-4 mb-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 {volumeInfo.publishedDate && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Published</h4>
//                     <p className="font-medium">{new Date(volumeInfo.publishedDate).toLocaleDateString()}</p>
//                   </div>
//                 )}
//                 {volumeInfo.publisher && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Publisher</h4>
//                     <p className="font-medium">{volumeInfo.publisher}</p>
//                   </div>
//                 )}
//                 {volumeInfo.pageCount && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pages</h4>
//                     <p className="font-medium">{volumeInfo.pageCount}</p>
//                   </div>
//                 )}
//                 {volumeInfo.language && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Language</h4>
//                     <p className="font-medium">{volumeInfo.language.toUpperCase()}</p>
//                   </div>
//                 )}
//               </motion.div>
              
//               {volumeInfo.categories && (
//                 <motion.div 
//                   className="mb-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.25 }}
//                 >
//                   <h4 className="text-sm font-semibold text-gray-500 mb-2">Categories</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {volumeInfo.categories.map((category, index) => (
//                       <span 
//                         key={index} 
//                         className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
//                       >
//                         {category}
//                       </span>
//                     ))}
//                   </div>
//                 </motion.div>
//               )}
              
//               {volumeInfo.averageRating && (
//                 <motion.div 
//                   className="mb-6"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   <h4 className="text-sm font-semibold text-gray-500 mb-2">Rating</h4>
//                   <div className="flex items-center">
//                     <div className="flex mr-2">
//                       {[...Array(5)].map((_, i) => (
//                         i < Math.floor(volumeInfo.averageRating) ? (
//                           <FaStar key={i} className="text-yellow-400 h-5 w-5" />
//                         ) : (
//                           <FaRegStar key={i} className="text-gray-300 h-5 w-5" />
//                         )
//                       ))}
//                     </div>
//                     <span className="text-gray-700 font-medium">
//                       {volumeInfo.averageRating.toFixed(1)} ({volumeInfo.ratingsCount || 0} ratings)
//                     </span>
//                   </div>
//                 </motion.div>
//               )}
              
//               <motion.div 
//                 className="mb-6"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.35 }}
//               >
//                 <h3 className="text-lg font-semibold mb-3 text-gray-800">Description</h3>
//                 <div className="text-gray-700 bg-gray-50 p-4 rounded-lg">
//                   {volumeInfo.description || 'No description available.'}
//                 </div>
//               </motion.div>
              
//               <motion.div 
//                 className="flex gap-4"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 {getBuyLink() && (
//                   <motion.a
//                     href={getBuyLink()}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Buy Now <FiExternalLink />
//                   </motion.a>
//                 )}
//                 {volumeInfo.previewLink && (
//                   <motion.a
//                     href={volumeInfo.previewLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
//                     whileHover={{ y: -2 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Preview <FiExternalLink />
//                   </motion.a>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default BookModal;

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaShoppingCart, FaTimes, FaBookOpen, 
  FaCalendarAlt, FaBuilding, FaFileAlt, FaGlobe 
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const BookModal = ({ book, onClose, onAddToFavorites, onAddToCart, isFavorite }) => {
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const saleInfo = book.saleInfo || {};
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    setShowAnimation(true);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const formatPrice = (price, currency) => {
    if (!price) return 'Not available for purchase';
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency || 'USD'
      }).format(price);
    } catch {
      return `${currency || ''} ${price}`;
    }
  };

  const getPriceInfo = () => {
    if (saleInfo.saleability === 'FREE') {
      return 'Free';
    } else if (saleInfo.saleability === 'NOT_FOR_SALE') {
      return 'Not for sale';
    } else if (saleInfo.listPrice) {
      return formatPrice(saleInfo.listPrice.amount, saleInfo.listPrice.currencyCode);
    } else if (saleInfo.retailPrice) {
      return formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode);
    } else {
      return 'Price not available';
    }
  };

  const getBuyLink = () => {
    if (saleInfo.buyLink) {
      return saleInfo.buyLink;
    }
    return null;
  };
  
  // Star rating component with animation
  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            transition: { delay: 0.1 * i, type: "spring" }
          }}
        >
          {i < fullStars ? (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-yellow-400"
              initial={{ scale: 1 }}
              whileHover={{ 
                scale: 1.2, 
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.3 }
              }}
            >
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </motion.svg>
          ) : (
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-5 h-5 text-gray-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </motion.svg>
          )}
        </motion.div>
      );
    }
    
    return <div className="flex space-x-1">{stars}</div>;
  };

  // Animated book cover with page flip effect
  const BookCover = ({ image, title }) => {
    return (
      <motion.div 
        className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
        initial={{ rotateY: -10 }}
        animate={{ 
          rotateY: 0,
          transition: { type: "spring", stiffness: 100 }
        }}
        whileHover={{ 
          rotateY: 10, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        {image ? (
          <img
            src={image.replace('http://', 'https://')}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-full w-full flex items-center justify-center">
            <motion.div
              animate={{ 
                rotateY: [0, 180],
                transition: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
              }}
            >
              <FaBookOpen className="h-24 w-24 text-indigo-300" />
            </motion.div>
            <div className="absolute bottom-4 text-center w-full">
              <span className="text-indigo-500 font-medium tracking-wide">No Cover Available</span>
            </div>
          </div>
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <motion.button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes className="h-5 w-5" />
        </motion.button>
        
        {/* Fancy header background with gradient */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 rounded-t-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(144,97,217,0.3),transparent_70%)]" />
        </motion.div>
        
        <div className="p-8 pt-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/5">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center h-96 shadow-inner overflow-hidden p-4 border border-indigo-100">
                <BookCover 
                  image={imageLinks.thumbnail || imageLinks.smallThumbnail} 
                  title={volumeInfo.title}
                />
              </div>
              
              <div className="mt-8 flex gap-3">
                <motion.button 
                  onClick={() => onAddToFavorites(book)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl ${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 transition-colors w-full justify-center font-medium`}
                  whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={isFavorite ? {
                      scale: [1, 1.3, 1],
                      transition: { 
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 5
                      }
                    } : {}}
                  >
                    <FaHeart 
                      className={isFavorite ? "text-red-500" : "text-gray-400"}
                    />
                  </motion.div>
                  <span>{isFavorite ? 'Saved' : 'Save'}</span>
                </motion.button>
                
                <motion.button 
                  onClick={() => onAddToCart(book)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all w-full justify-center font-medium shadow-md"
                  whileHover={{ 
                    y: -3, 
                    boxShadow: "0 12px 20px -5px rgba(79, 70, 229, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                      transition: { 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }
                    }}
                  >
                    <FaShoppingCart />
                  </motion.div>
                  <span>Add to Cart</span>
                </motion.button>
              </div>

              <motion.div 
                className="mt-8 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-100"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-sm font-semibold text-indigo-800 mb-2 flex items-center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      transition: { 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4
                      }
                    }}
                    className="mr-2"
                  >
                    💰
                  </motion.div>
                  Price
                </h4>
                <div className="flex items-center gap-2">
                  <motion.span 
                    className="text-xl font-bold text-indigo-700"
                    animate={showAnimation ? {
                      scale: [1, 1.05, 1],
                      transition: { 
                        duration: 0.6,
                        delay: 0.4
                      }
                    } : {}}
                  >
                    {getPriceInfo()}
                  </motion.span>
                  {saleInfo.listPrice && saleInfo.retailPrice && 
                    saleInfo.listPrice.amount !== saleInfo.retailPrice.amount && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)}
                      </span>
                  )}
                  {saleInfo.isEbook && (
                    <motion.span 
                      className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full border border-indigo-200"
                      animate={{
                        scale: [1, 1.05, 1],
                        transition: { 
                          duration: 0.5,
                          delay: 0.5
                        }
                      }}
                    >
                      Ebook
                    </motion.span>
                  )}
                </div>
              </motion.div>
            </div>
            
            <div className="md:w-3/5">
              <motion.h2 
                className="text-3xl font-bold mb-2 text-gray-900 leading-tight"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {volumeInfo.title}
              </motion.h2>
              <motion.p 
                className="text-indigo-600 font-medium mb-6"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {volumeInfo.publishedDate && (
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center mb-1">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { 
                            duration: 2,
                            delay: 1,
                            repeat: Infinity,
                            repeatDelay: 5
                          }
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaCalendarAlt />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Published</h4>
                    </div>
                    <p className="font-medium">{new Date(volumeInfo.publishedDate).toLocaleDateString()}</p>
                  </motion.div>
                )}
                {volumeInfo.publisher && (
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center mb-1">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { 
                            duration: 2,
                            delay: 1.5,
                            repeat: Infinity,
                            repeatDelay: 5
                          }
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaBuilding />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Publisher</h4>
                    </div>
                    <p className="font-medium">{volumeInfo.publisher}</p>
                  </motion.div>
                )}
                {volumeInfo.pageCount && (
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center mb-1">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { 
                            duration: 2,
                            delay: 2,
                            repeat: Infinity,
                            repeatDelay: 5
                          }
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaFileAlt />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pages</h4>
                    </div>
                    <p className="font-medium">{volumeInfo.pageCount}</p>
                  </motion.div>
                )}
                {volumeInfo.language && (
                  <motion.div 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center mb-1">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          transition: { 
                            duration: 2,
                            delay: 2.5,
                            repeat: Infinity,
                            repeatDelay: 5
                          }
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaGlobe />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</h4>
                    </div>
                    <p className="font-medium">{volumeInfo.language.toUpperCase()}</p>
                  </motion.div>
                )}
              </motion.div>
              
              {volumeInfo.categories && (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {volumeInfo.categories.map((category, index) => (
                      <motion.span 
                        key={index} 
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm border border-indigo-200"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, backgroundColor: "#c7d2fe" }}
                      >
                        {category}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {volumeInfo.averageRating && (
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">Rating</h4>
                  <div className="flex items-center">
                    <StarRating rating={volumeInfo.averageRating} />
                    <span className="ml-2 text-gray-700 font-medium">
                      {volumeInfo.averageRating.toFixed(1)} ({volumeInfo.ratingsCount || 0} ratings)
                    </span>
                  </div>
                </motion.div>
              )}
              
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Description</h3>
                <div className="text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-inner">
                  {volumeInfo.description || 'No description available.'}
                </div>
              </motion.div>
              
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {getBuyLink() && (
                  <motion.a
                    href={getBuyLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md"
                    whileHover={{ 
                      y: -3, 
                      boxShadow: "0 12px 20px -5px rgba(79, 70, 229, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Buy Now</span>
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                        transition: { 
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 2
                        }
                      }}
                    >
                      <FiExternalLink />
                    </motion.div>
                  </motion.a>
                )}
                {volumeInfo.previewLink && (
                  <motion.a
                    href={volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-5 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium shadow-sm"
                    whileHover={{ 
                      y: -3, 
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Preview</span>
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                        transition: { 
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 2
                        }
                      }}
                    >
                      <FiExternalLink />
                    </motion.div>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full -translate-x-1/2 translate-y-1/2 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />
        <motion.div 
          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full translate-x-1/2 -translate-y-1/2 z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default BookModal;