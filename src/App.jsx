// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import BookCard from "./components/BookCard";
// import SearchBar from "./components/SearchBar";
// import BookModal from "./components/BookModal";

// function App() {
//   const [books, setBooks] = useState([]);
//   const [popularBooks, setPopularBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [favorites, setFavorites] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [activeTab, setActiveTab] = useState("home");

//   const API_KEY = "AIzaSyBwf9vuLISlp_GBfDjuQvfilx1SVKLr2Wc";

//   useEffect(() => {
//     fetchPopularBooks();
//     const savedFavorites = localStorage.getItem("bookstoreFavorites");
//     const savedCart = localStorage.getItem("bookstoreCart");
//     if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
//     if (savedCart) setCart(JSON.parse(savedCart));
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() === "") {
//       setBooks([]);
//       return;
//     }

//     const timer = setTimeout(() => {
//       fetchBooks(searchTerm);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   useEffect(() => {
//     localStorage.setItem("bookstoreFavorites", JSON.stringify(favorites));
//     localStorage.setItem("bookstoreCart", JSON.stringify(cart));
//   }, [favorites, cart]);

//   const fetchBooks = async (query) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch books");
//       }
//       const data = await response.json();
//       setBooks(data.items || []);
//     } catch (err) {
//       setError(err.message);
//       setBooks([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPopularBooks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=best+sellers&maxResults=8&key=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch popular books");
//       }
//       const data = await response.json();
//       setPopularBooks(data.items || []);
//     } catch (err) {
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSuggestions = async (query) => {
//     if (query.trim() === "") {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${API_KEY}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch suggestions");
//       }
//       const data = await response.json();
//       const suggestions = data.items
//         ? data.items.map((item) => item.volumeInfo.title).slice(0, 5)
//         : [];
//       setSuggestions(suggestions);
//     } catch (err) {
//       console.error("Error fetching suggestions:", err);
//       setSuggestions([]);
//     }
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//     if (term.trim() === "") {
//       setActiveTab("home");
//       setSuggestions([]);
//     } else {
//       setActiveTab("search");
//       fetchSuggestions(term);
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     setSearchTerm(suggestion);
//     setSuggestions([]);
//     fetchBooks(suggestion);
//   };

//   const handleBookClick = (book) => {
//     setSelectedBook(book);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedBook(null);
//   };

//   const addToFavorites = (book) => {
//     setFavorites((prev) => {
//       const isAlreadyFavorite = prev.some((fav) => fav.id === book.id);
//       if (isAlreadyFavorite) {
//         return prev.filter((fav) => fav.id !== book.id);
//       } else {
//         return [...prev, book];
//       }
//     });
//   };

//   const addToCart = (book) => {
//     setCart((prev) => {
//       const existingItem = prev.find((item) => item.id === book.id);
//       if (existingItem) {
//         return prev.map((item) =>
//           item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         return [...prev, { ...book, quantity: 1 }];
//       }
//     });
//   };

//   const isFavorite = (book) => {
//     return favorites.some((fav) => fav.id === book.id);
//   };

//   const getCartCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <header className="bg-indigo-700 text-white shadow-md">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex justify-between items-center">
//             <motion.h1
//               className="text-3xl font-bold cursor-pointer"
//               onClick={() => setActiveTab("home")}
//               whileHover={{ scale: 1.05 }}
//             >
//               Bookstore
//             </motion.h1>
//             <div className="flex items-center gap-6">
//               <motion.button
//                 className={`px-4 py-2 rounded-lg ${
//                   activeTab === "favorites"
//                     ? "bg-white text-indigo-700"
//                     : "text-white"
//                 }`}
//                 onClick={() => setActiveTab("favorites")}
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Favorites ({favorites.length})
//               </motion.button>
//               <motion.div
//                 className="relative cursor-pointer"
//                 onClick={() => setActiveTab("cart")}
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 {cart.length > 0 && (
//                   <motion.span
//                     className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                   >
//                     {getCartCount()}
//                   </motion.span>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow container mx-auto px-4 py-8">
//         {activeTab === "home" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="text-center mb-12">
//               <motion.h2
//                 className="text-4xl font-bold text-indigo-700 mb-4"
//                 initial={{ y: -20 }}
//                 animate={{ y: 0 }}
//               >
//                 Discover Your Next Favorite Book
//               </motion.h2>
//               <motion.p
//                 className="text-lg text-gray-600 max-w-2xl mx-auto"
//                 initial={{ y: 20 }}
//                 animate={{ y: 0 }}
//               >
//                 Explore our collection of best-selling books and find your next
//                 adventure.
//               </motion.p>
//             </div>

//             <div className="mb-12">
//               <SearchBar
//                 searchTerm={searchTerm}
//                 suggestions={suggestions}
//                 onSearch={handleSearch}
//                 onSuggestionClick={handleSuggestionClick}
//               />
//             </div>

//             <section className="mb-16">
//               <h3 className="text-2xl font-bold mb-6 text-gray-800">
//                 Popular Books
//               </h3>
//               {loading && !popularBooks.length ? (
//                 <div className="text-center py-8">Loading popular books...</div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                   {popularBooks.map((book) => (
//                     <BookCard
//                       key={book.id}
//                       book={book}
//                       onClick={() => handleBookClick(book)}
//                       onAddToFavorites={addToFavorites}
//                       onAddToCart={addToCart}
//                       isFavorite={isFavorite(book)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </section>

//             <section className="mb-16">
//               <h3 className="text-2xl font-bold mb-6 text-gray-800">
//                 About Us
//               </h3>
//               <div className="bg-white rounded-lg shadow-md p-8">
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   <motion.div
//                     initial={{ x: -50, opacity: 0 }}
//                     whileInView={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     viewport={{ once: true }}
//                   >
//                     <h4 className="text-xl font-semibold mb-4 text-indigo-700">
//                       Our Story
//                     </h4>
//                     <p className="text-gray-700 mb-4">
//                       Founded in 2023, Bookstore is dedicated to bringing the
//                       joy of reading to book lovers everywhere. We believe in
//                       the power of books to inspire, educate, and entertain.
//                     </p>
//                     <p className="text-gray-700 mb-4">
//                       Our carefully curated collection features bestsellers,
//                       classics, and hidden gems across all genres. Whether
//                       you're a fan of timeless literature, thrilling mysteries,
//                       or insightful non-fiction, we have something for everyone.
//                     </p>
//                     <p className="text-gray-700 mb-4">
//                       What started as a small online shop has grown into a
//                       thriving community of readers, writers, and literary
//                       enthusiasts. We partner with independent publishers and
//                       authors to promote diverse voices and stories that deserve
//                       to be heard.
//                     </p>
//                     <p className="text-gray-700">
//                       Beyond selling books, we aim to foster a culture of
//                       lifelong learning and curiosity. Through our blog, events,
//                       and book clubs, we bring readers together to explore
//                       ideas, share perspectives, and build connections through
//                       the written word.
//                     </p>
//                   </motion.div>
//                   <motion.div
//                     initial={{ x: 50, opacity: 0 }}
//                     whileInView={{ x: 0, opacity: 1 }}
//                     transition={{ duration: 0.5 }}
//                     viewport={{ once: true }}
//                     className="bg-gray-200 h-64 rounded-lg flex items-center justify-center"
//                   >
//                     <img
//                       src="https://monsterspost.com/wp-content/uploads/2020/06/online-bookstore.jpg"
//                       alt="Online Bookstore"
//                       className="w-full h-full object-cover rounded-lg shadow-md"
//                     />
//                   </motion.div>
//                 </div>
//               </div>
//             </section>
//           </motion.div>
//         )}

//         {activeTab === "search" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className="mb-8">
//               <SearchBar
//                 searchTerm={searchTerm}
//                 suggestions={suggestions}
//                 onSearch={handleSearch}
//                 onSuggestionClick={handleSuggestionClick}
//               />
//             </div>

//             {loading && (
//               <div className="text-center py-8">Loading books...</div>
//             )}
//             {error && (
//               <div className="text-center py-8 text-red-500">{error}</div>
//             )}

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//               {books.map((book) => (
//                 <BookCard
//                   key={book.id}
//                   book={book}
//                   onClick={() => handleBookClick(book)}
//                   onAddToFavorites={addToFavorites}
//                   onAddToCart={addToCart}
//                   isFavorite={isFavorite(book)}
//                 />
//               ))}
//             </div>

//             {!loading && !error && books.length === 0 && (
//               <div className="text-center py-8 text-gray-500">
//                 No books found. Try a different search term.
//               </div>
//             )}
//           </motion.div>
//         )}

//         {activeTab === "favorites" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//               Your Favorites
//             </h2>

//             {favorites.length === 0 ? (
//               <div className="text-center py-12">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-16 w-16 mx-auto text-gray-400 mb-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                   />
//                 </svg>
//                 <h3 className="text-xl font-medium text-gray-600 mb-2">
//                   No favorites yet
//                 </h3>
//                 <p className="text-gray-500">
//                   Start adding books to your favorites by clicking the heart
//                   icon
//                 </p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {favorites.map((book) => (
//                   <BookCard
//                     key={book.id}
//                     book={book}
//                     onClick={() => handleBookClick(book)}
//                     onAddToFavorites={addToFavorites}
//                     onAddToCart={addToCart}
//                     isFavorite={isFavorite(book)}
//                   />
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}

//         {activeTab === "cart" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

//             {cart.length === 0 ? (
//               <div className="text-center py-12">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-16 w-16 mx-auto text-gray-400 mb-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <h3 className="text-xl font-medium text-gray-600 mb-2">
//                   Your cart is empty
//                 </h3>
//                 <p className="text-gray-500">
//                   Start adding books to your cart by clicking the cart icon
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <div className="divide-y divide-gray-200">
//                   {cart.map((item) => {
//                     const volumeInfo = item.volumeInfo || {};
//                     const imageLinks = volumeInfo.imageLinks || {};
//                     return (
//                       <div key={item.id} className="p-4 flex items-center">
//                         <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
//                           {imageLinks.thumbnail ? (
//                             <img
//                               src={imageLinks.thumbnail.replace(
//                                 "http://",
//                                 "https://"
//                               )}
//                               alt={volumeInfo.title}
//                               className="h-full w-full object-cover"
//                             />
//                           ) : (
//                             <div className="h-full flex items-center justify-center text-gray-500 text-xs">
//                               No image
//                             </div>
//                           )}
//                         </div>
//                         <div className="ml-4 flex-grow">
//                           <h3 className="font-medium text-gray-900 line-clamp-1">
//                             {volumeInfo.title}
//                           </h3>
//                           <p className="text-gray-500 text-sm">
//                             {volumeInfo.authors
//                               ? volumeInfo.authors.join(", ")
//                               : "Unknown Author"}
//                           </p>
//                         </div>
//                         <div className="ml-4">
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() =>
//                                 setCart((prev) =>
//                                   prev.map((cartItem) =>
//                                     cartItem.id === item.id
//                                       ? {
//                                           ...cartItem,
//                                           quantity: Math.max(
//                                             1,
//                                             cartItem.quantity - 1
//                                           ),
//                                         }
//                                       : cartItem
//                                   )
//                                 )
//                               }
//                               className="text-gray-500 hover:text-indigo-600"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </button>
//                             <span className="w-8 text-center">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 setCart((prev) =>
//                                   prev.map((cartItem) =>
//                                     cartItem.id === item.id
//                                       ? {
//                                           ...cartItem,
//                                           quantity: cartItem.quantity + 1,
//                                         }
//                                       : cartItem
//                                   )
//                                 )
//                               }
//                               className="text-gray-500 hover:text-indigo-600"
//                             >
//                               <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className="h-5 w-5"
//                                 viewBox="0 0 20 20"
//                                 fill="currentColor"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <button
//                             onClick={() =>
//                               setCart((prev) =>
//                                 prev.filter(
//                                   (cartItem) => cartItem.id !== item.id
//                                 )
//                               )
//                             }
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5"
//                               viewBox="0 0 20 20"
//                               fill="currentColor"
//                             >
//                               <path
//                                 fillRule="evenodd"
//                                 d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <div className="p-4 bg-gray-50 border-t border-gray-200">
//                   <div className="flex justify-between items-center">
//                     <h3 className="font-medium text-lg">
//                       Total: {getCartCount()} items
//                     </h3>
//                     <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//                       Checkout
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </main>

//       <footer className="bg-gray-800 text-white py-8">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Bookstore</h3>
//               <p className="text-gray-400">
//                 Your one-stop destination for all your reading needs. Discover,
//                 explore, and enjoy books from around the world.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     Home
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     Books
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-gray-400 hover:text-white transition-colors"
//                   >
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-xl font-bold mb-4">Contact Us</h3>
//               <address className="text-gray-400 not-italic">
//                 <p>123 Book Street</p>
//                 <p>Reading, RD 12345</p>
//                 <p>Email: info@bookstore.com</p>
//                 <p>Phone: (123) 456-7890</p>
//               </address>
//             </div>
//           </div>
//           <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
//             <p>
//               &copy; {new Date().getFullYear()} Bookstore. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>

//       <AnimatePresence>
//         {isModalOpen && selectedBook && (
//           <BookModal
//             book={selectedBook}
//             onClose={closeModal}
//             onAddToFavorites={addToFavorites}
//             onAddToCart={addToCart}
//             isFavorite={isFavorite(selectedBook)}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import BookModal from "./components/BookModal";
import {
  FaHeart,
  FaShoppingCart,
  FaHome,
  FaSearch,
  FaStar,
  FaRegStar,
  FaTimes,
  FaBookOpen,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import BookSlider from "./components/BookSlider";

function App() {
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  const API_KEY = "AIzaSyBwf9vuLISlp_GBfDjuQvfilx1SVKLr2Wc";

  useEffect(() => {
    fetchPopularBooks();
    const savedFavorites = localStorage.getItem("bookstoreFavorites");
    const savedCart = localStorage.getItem("bookstoreCart");
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setBooks([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchBooks(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem("bookstoreFavorites", JSON.stringify(favorites));
    localStorage.setItem("bookstoreCart", JSON.stringify(cart));
  }, [favorites, cart]);

  const fetchBooks = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=best+sellers&maxResults=8&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch popular books");
      }
      const data = await response.json();
      setPopularBooks(data.items || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await response.json();
      const suggestions = data.items
        ? data.items.map((item) => item.volumeInfo.title).slice(0, 5)
        : [];
      setSuggestions(suggestions);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() === "") {
      setActiveTab("home");
      setSuggestions([]);
    } else {
      setActiveTab("search");
      fetchSuggestions(term);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    fetchBooks(suggestion);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const addToFavorites = (book) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === book.id);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  };

  const addToCart = (book) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === book.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...book, quantity: 1 }];
      }
    });
  };

  const isFavorite = (book) => {
    return favorites.some((fav) => fav.id === book.id);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex flex-col">
      <header className="bg-gradient-to-r from-indigo-800 to-violet-800 text-white shadow-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-3xl font-bold cursor-pointer flex items-center gap-2"
              onClick={() => setActiveTab("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaBookOpen className="text-violet-200" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">Bookstore</span>
            </motion.h1>
            <div className="flex items-center gap-4">
              <motion.button
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "favorites"
                    ? "bg-white text-indigo-800 shadow-md"
                    : "text-white hover:bg-white/15"
                } transition-all duration-300`}
                onClick={() => setActiveTab("favorites")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHeart className={activeTab === "favorites" ? "text-red-500" : ""} />
                <span>Favorites</span>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              </motion.button>
              <motion.div
                className="relative cursor-pointer p-2 rounded-full hover:bg-white/15 transition-colors duration-300"
                onClick={() => setActiveTab("cart")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {activeTab === "home" && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="text-center mb-16">
              <motion.div
                className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <BookSlider />
              </motion.div>
              <motion.h2
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-violet-700 mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Discover Your Next Favorite Book
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Explore our curated collection of best-selling books and embark on your next literary adventure.
              </motion.p>
            </div>

            <div className="mb-16">
              <SearchBar
                searchTerm={searchTerm}
                suggestions={suggestions}
                onSearch={handleSearch}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>

            <motion.section 
              className="mb-20"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3 border-b border-gray-200 pb-4">
                <FaStar className="text-amber-400" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">Popular Books</span>
              </h3>
              {loading && !popularBooks.length ? (
                <div className="text-center py-12">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading popular books...</p>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                  variants={staggerItems}
                >
                  {popularBooks.map((book) => (
                    <motion.div key={book.id} variants={itemVariant}>
                      <BookCard
                        book={book}
                        onClick={() => handleBookClick(book)}
                        onAddToFavorites={addToFavorites}
                        onAddToCart={addToCart}
                        isFavorite={isFavorite(book)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.section>

            <motion.section 
              className="mb-16 border-2 border-dotted p-2 border-violet-800"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b border-gray-200 pb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">About Us</span>
              </h3>
              <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden backdrop-blur-sm bg-white/90">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-green-100 p-4 border-2 border-green-700"
                  >
                    <h4 className="text-2xl font-semibold mb-6 text-indigo-700">
                      Our Story
                    </h4>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Founded in 2023, Bookstore is dedicated to bringing the
                      joy of reading to book lovers everywhere. We believe in
                      the power of books to inspire, educate, and entertain.
                    </p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Our carefully curated collection features bestsellers,
                      classics, and hidden gems across all genres. Whether
                      you're a fan of timeless literature, thrilling mysteries,
                      or insightful non-fiction, we have something for everyone.
                    </p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      What started as a small online shop has grown into a
                      thriving community of readers, writers, and literary
                      enthusiasts. We partner with independent publishers and
                      authors to promote diverse voices and stories that deserve
                      to be heard.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Beyond selling books, we aim to foster a culture of
                      lifelong learning and curiosity. Through our blog, events,
                      and book clubs, we bring readers together to explore
                      ideas, share perspectives, and build connections through
                      the written word.
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden shadow-lg h-96 relative group"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                      alt="Online Bookstore"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent opacity-60"></div>
                  </motion.div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}

        {activeTab === "search" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <SearchBar
                searchTerm={searchTerm}
                suggestions={suggestions}
                onSearch={handleSearch}
                onSuggestionClick={handleSuggestionClick}
              />
            </div>

            {loading && (
              <div className="text-center py-16">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600">Loading books...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-12 bg-red-50 rounded-lg border border-red-200">
                <div className="text-red-500 text-lg font-medium">{error}</div>
                <p className="text-red-400 mt-2">Please try again later</p>
              </div>
            )}

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              variants={staggerItems}
              initial="hidden"
              animate="visible"
            >
              {books.map((book) => (
                <motion.div key={book.id} variants={itemVariant}>
                  <BookCard
                    book={book}
                    onClick={() => handleBookClick(book)}
                    onAddToFavorites={addToFavorites}
                    onAddToCart={addToCart}
                    isFavorite={isFavorite(book)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {!loading && !error && books.length === 0 && (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                <FaSearch className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500">Try a different search term</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "favorites" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3 border-b border-gray-200 pb-4">
              <FaHeart className="text-rose-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-rose-600">Your Favorites</span>
            </h2>

            {favorites.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                <FaHeart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500">
                  Start adding books to your favorites by clicking the heart icon
                </p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                variants={staggerItems}
                initial="hidden"
                animate="visible"
              >
                {favorites.map((book) => (
                  <motion.div key={book.id} variants={itemVariant}>
                    <BookCard
                      book={book}
                      onClick={() => handleBookClick(book)}
                      onAddToFavorites={addToFavorites}
                      onAddToCart={addToCart}
                      isFavorite={isFavorite(book)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === "cart" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3 border-b border-gray-200 pb-4">
              <FiShoppingCart className="text-indigo-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-violet-600">Your Cart</span>
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100 shadow-inner">
                <FiShoppingCart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Start adding books to your cart by clicking the cart icon
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90">
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => {
                    const volumeInfo = item.volumeInfo || {};
                    const imageLinks = volumeInfo.imageLinks || {};
                    return (
                      <motion.div
                        key={item.id}
                        className="p-6 flex items-center hover:bg-indigo-50/50 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-20 h-24 bg-gradient-to-r from-indigo-100 to-violet-100 rounded-lg flex-shrink-0 overflow-hidden shadow-md group">
                          {imageLinks.thumbnail ? (
                            <img
                              src={imageLinks.thumbnail.replace(
                                "http://",
                                "https://"
                              )}
                              alt={volumeInfo.title}
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center text-indigo-300">
                              <FaBookOpen className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="ml-6 flex-grow">
                          <h3 className="font-medium text-gray-900 line-clamp-1 text-lg">
                            {volumeInfo.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {volumeInfo.authors
                              ? volumeInfo.authors.join(", ")
                              : "Unknown Author"}
                          </p>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() =>
                                setCart((prev) =>
                                  prev.map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: Math.max(
                                            1,
                                            cartItem.quantity - 1
                                          ),
                                        }
                                      : cartItem
                                  )
                                )
                              }
                              className="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition-all"
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.button>
                            <span className="w-8 text-center font-medium text-indigo-800">
                              {item.quantity}
                            </span>
                            <motion.button
                              onClick={() =>
                                setCart((prev) =>
                                  prev.map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: cartItem.quantity + 1,
                                        }
                                      : cartItem
                                  )
                                )
                              }
                              className="text-gray-500 hover:text-indigo-600 p-2 rounded-full hover:bg-indigo-100 transition-all"
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                        <div className="ml-6">
                          <motion.button
                            onClick={() =>
                              setCart((prev) =>
                                prev.filter(
                                  (cartItem) => cartItem.id !== item.id
                                )
                              )
                            }
                            className="text-rose-500 hover:text-rose-700 p-2 rounded-full hover:bg-rose-50 transition-all"
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTimes className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="p-8 bg-gradient-to-r from-indigo-50 to-violet-50 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="font-medium text-lg text-indigo-800">
                      Total: <span className="font-bold">{getCartCount()}</span> items
                    </h3>
                    <motion.button
                      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all shadow-lg font-medium flex items-center justify-center gap-2"
                      whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiShoppingCart />
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaBookOpen className="text-indigo-300" />
                <span>Bookstore</span>
              </h3>
              <p className="text-indigo-200">
                Your one-stop destination for all your reading needs. Discover,
                explore, and enjoy books from around the world.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <motion.a
                    href="#"
                    className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <FaHome className="text-sm" />
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <FaSearch className="text-sm" />
                    Search
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <FaHeart className="text-sm" />
                    Favorites
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#"
                    className="text-indigo-200 hover:text-white transition-colors flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <FiShoppingCart className="text-sm" />
                    Cart
                  </motion.a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Fiction
                </motion.a>
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Mystery
                </motion.a>
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Romance
                </motion.a>
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Sci-Fi
                </motion.a>
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  Biography
                </motion.a>
                <motion.a
                  href="#"
                  className="text-indigo-200 hover:text-white text-sm transition-colors"
                  whileHover={{ x: 5 }}
                >
                  History
                </motion.a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <address className="text-indigo-200 not-italic">
                <p className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  123 Book Street, Reading, RD 12345
                </p>
                <p className="flex items-center gap-2 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@bookstore.com
                </p>
                <p className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (123) 456-7890
                </p>
              </address>
            </div>
          </div>
          <div className="border-t border-indigo-700 mt-8 pt-6 text-center text-indigo-300">
            <p>
              &copy; {new Date().getFullYear()} Bookstore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && selectedBook && (
          <BookModal
            book={selectedBook}
            onClose={closeModal}
            onAddToFavorites={addToFavorites}
            onAddToCart={addToCart}
            isFavorite={isFavorite(selectedBook)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
