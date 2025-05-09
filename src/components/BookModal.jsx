import { useEffect } from 'react'
import { motion } from 'framer-motion'

const BookModal = ({ book, onClose, onAddToFavorites, onAddToCart, isFavorite }) => {
  const volumeInfo = book.volumeInfo || {}
  const imageLinks = volumeInfo.imageLinks || {}
  const saleInfo = book.saleInfo || {}

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const formatPrice = (price, currency) => {
    if (!price) return 'Not available for purchase'
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency || 'USD'
      }).format(price)
    } catch {
      return `${currency || ''} ${price}`
    }
  }

  const getPriceInfo = () => {
    if (saleInfo.saleability === 'FREE') {
      return 'Free'
    } else if (saleInfo.saleability === 'NOT_FOR_SALE') {
      return 'Not for sale'
    } else if (saleInfo.listPrice) {
      return formatPrice(saleInfo.listPrice.amount, saleInfo.listPrice.currencyCode)
    } else if (saleInfo.retailPrice) {
      return formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)
    } else {
      return 'Price not available'
    }
  }

  const getBuyLink = () => {
    if (saleInfo.buyLink) {
      return saleInfo.buyLink
    }
    return null
  }

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
                {imageLinks.thumbnail ? (
                  <img
                    src={imageLinks.thumbnail.replace('http://', 'https://')}
                    alt={volumeInfo.title}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-500">No image available</span>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <button 
                  onClick={() => onAddToFavorites(book)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 transition-colors w-full justify-center`}
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
                  {isFavorite ? 'Saved' : 'Save'}
                </button>
                
                <button 
                  onClick={() => onAddToCart(book)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors w-full justify-center"
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
                  Add to Cart
                </button>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-2">{volumeInfo.title}</h2>
              <p className="text-gray-600 mb-4">
                {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                {volumeInfo.publishedDate && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Published</h4>
                    <p>{volumeInfo.publishedDate}</p>
                  </div>
                )}
                {volumeInfo.publisher && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Publisher</h4>
                    <p>{volumeInfo.publisher}</p>
                  </div>
                )}
                {volumeInfo.pageCount && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Pages</h4>
                    <p>{volumeInfo.pageCount}</p>
                  </div>
                )}
                {volumeInfo.language && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500">Language</h4>
                    <p>{volumeInfo.language.toUpperCase()}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500">Price</h4>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-indigo-600">
                    {getPriceInfo()}
                  </span>
                  {saleInfo.listPrice && saleInfo.retailPrice && 
                    saleInfo.listPrice.amount !== saleInfo.retailPrice.amount && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(saleInfo.retailPrice.amount, saleInfo.retailPrice.currencyCode)}
                      </span>
                  )}
                  {saleInfo.isEbook && (
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                      Ebook
                    </span>
                  )}
                </div>
              </div>
              
              {volumeInfo.categories && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500">Categories</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {volumeInfo.categories.map((category, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {volumeInfo.averageRating && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-500">Rating</h4>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(volumeInfo.averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {volumeInfo.averageRating} ({volumeInfo.ratingsCount || 0} ratings)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">
              {volumeInfo.description || 'No description available.'}
            </p>
          </div>
          
          <div className="mt-6 flex gap-4">
            {getBuyLink() && (
              <a
                href={getBuyLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Buy Now
              </a>
            )}
            {volumeInfo.previewLink && (
              <a
                href={volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Preview on Google Books
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default BookModal