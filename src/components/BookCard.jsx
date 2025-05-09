// const BookCard = ({ book }) => {
//     const volumeInfo = book.volumeInfo || {}
//     const imageLinks = volumeInfo.imageLinks || {}
    
//     return (
//       <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//         <div className="h-48 bg-gray-200 flex items-center justify-center">
//           {imageLinks.thumbnail ? (
//             <img
//               src={imageLinks.thumbnail.replace('http://', 'https://')}
//               alt={volumeInfo.title}
//               className="h-full object-cover"
//             />
//           ) : (
//             <span className="text-gray-500">No image available</span>
//           )}
//         </div>
//         <div className="p-4">
//           <h3 className="font-bold text-lg mb-2 line-clamp-2">{volumeInfo.title}</h3>
//           <p className="text-gray-600 text-sm mb-2">
//             {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
//           </p>
//           <p className="text-gray-500 text-xs line-clamp-3">
//             {volumeInfo.description || 'No description available'}
//           </p>
//           {volumeInfo.publishedDate && (
//             <p className="text-gray-400 text-xs mt-2">
//               Published: {volumeInfo.publishedDate}
//             </p>
//           )}
//         </div>
//       </div>
//     )
//   }
  
//   export default BookCard

const BookCard = ({ book, onClick }) => {
  const volumeInfo = book.volumeInfo || {}
  const imageLinks = volumeInfo.imageLinks || {}
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        {imageLinks.thumbnail ? (
          <img
            src={imageLinks.thumbnail.replace('http://', 'https://')}
            alt={volumeInfo.title}
            className="h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No image available</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{volumeInfo.title}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author'}
        </p>
        <p className="text-gray-500 text-xs line-clamp-3">
          {volumeInfo.description || 'No description available'}
        </p>
        {volumeInfo.publishedDate && (
          <p className="text-gray-400 text-xs mt-2">
            Published: {volumeInfo.publishedDate}
          </p>
        )}
      </div>
    </div>
  )
}

export default BookCard