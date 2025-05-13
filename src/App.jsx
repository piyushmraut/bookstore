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
  FaLeaf,
  FaFeatherAlt,
  FaBookReader,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import BookSlider from "./components/BookSlider";
import { IoIosArrowForward } from "react-icons/io";
import { Bookmark } from "lucide-react";
import Categories from "./components/Categories";

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
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Mystery");
  const [categoryBooks, setCategoryBooks] = useState([]);

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

  useEffect(() => {
    if (activeTab === "categories") {
      fetchBooksByCategory(activeCategory);
    }
  }, [activeCategory, activeTab]);

  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=20&key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setCategoryBooks(data.items || []);
    } catch (err) {
      setError(err.message);
      setCategoryBooks([]);
    } finally {
      setLoading(false);
    }
  };

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

  // const addToCart = (book) => {
  //   setCart((prev) => {
  //     const existingItem = prev.find((item) => item.id === book.id);
  //     if (existingItem) {
  //       return prev.map((item) =>
  //         item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       return [...prev, { ...book, quantity: 1 }];
  //     }
  //   });
  // };

  // const addToCart = (book) => {
  //   // Generate a fixed price for the book if it doesn't have one
  //   const price =
  //     book.saleInfo?.retailPrice?.amount || (Math.random() * 20 + 5).toFixed(2);

  //   setCart((prev) => {
  //     const existingItem = prev.find((item) => item.id === book.id);
  //     if (existingItem) {
  //       return prev.map((item) =>
  //         item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
  //       );
  //     } else {
  //       return [
  //         ...prev,
  //         {
  //           ...book,
  //           quantity: 1,
  //           price: parseFloat(price), // Store the price as a number
  //         },
  //       ];
  //     }
  //   });
  // };
  const addToCart = (book) => {
  // Generate a fixed price for the book if it doesn't have one
  const price = book.saleInfo?.retailPrice?.amount || (Math.random() * 20 + 5).toFixed(2);
  
  // Create a copy of the book with the price if it didn't have one
  const bookWithPrice = {
    ...book,
    saleInfo: book.saleInfo?.retailPrice 
      ? book.saleInfo 
      : {
          ...book.saleInfo,
          retailPrice: {
            amount: parseFloat(price),
            currencyCode: "USD"
          }
        }
  };

  setCart((prev) => {
    const existingItem = prev.find((item) => item.id === book.id);
    if (existingItem) {
      return prev.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      return [
        ...prev,
        {
          ...bookWithPrice,
          quantity: 1,
          price: parseFloat(price),
        },
      ];
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
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const floatingBooks = {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const bookFlip = {
    rotateY: [0, 15, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-200 to-violet-250 flex flex-col overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating book shapes */}
        <motion.div
          className="absolute top-1/4 left-10 w-24 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg shadow-lg opacity-30"
          animate={floatingBooks}
          style={{ rotate: -15 }}
        />
        <motion.div
          className="absolute top-1/3 right-20 w-20 h-28 bg-gradient-to-br from-amber-100 to-rose-200 rounded-lg shadow-lg opacity-30"
          animate={floatingBooks}
          style={{ rotate: 10 }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-16 h-24 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-lg shadow-lg opacity-30"
          animate={floatingBooks}
          style={{ rotate: -5 }}
        />

        {/* Soft gradient blobs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-100/30 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-20 w-72 h-72 rounded-full bg-indigo-100/30 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-violet-100/30 blur-3xl"
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header with enhanced animations */}
      <header className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white shadow-2xl backdrop-blur-sm bg-white/10 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveTab("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHoveringLogo(true)}
              onHoverEnd={() => setIsHoveringLogo(false)}
            >
              <motion.div
                className="p-3 rounded-xl bg-white/20 backdrop-blur-sm shadow-lg"
                animate={
                  isHoveringLogo
                    ? {
                        rotateY: 180,
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
                      }
                    : {
                        rotateY: 0,
                        background:
                          "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
                      }
                }
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  animate={isHoveringLogo ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaBookOpen className="text-white text-2xl" />
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.h1
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 tracking-tight"
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  BookNest
                </motion.h1>
                <motion.p
                  className="text-xs text-blue-100 opacity-80"
                  animate={isHoveringLogo ? { x: 5 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Your literary sanctuary
                </motion.p>
              </motion.div>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Home Button */}
              <motion.button
                className={`px-5 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-sm ${
                  activeTab === "home"
                    ? "bg-white text-indigo-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                } transition-all duration-300 font-medium`}
                onClick={() => setActiveTab("home")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 15px rgba(29, 78, 216, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <motion.div
                  animate={
                    activeTab === "home"
                      ? {
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1],
                          color: "#1d4ed8",
                        }
                      : {
                          color: "#ffffff",
                        }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <FaHome className="text-xl" />
                </motion.div>
                <span>Home</span>
              </motion.button>

              {/* Categories Button */}
              <motion.button
                className={`px-5 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-sm ${
                  activeTab === "categories"
                    ? "bg-white text-indigo-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                } transition-all duration-300 font-medium`}
                onClick={() => {
                  setActiveTab("categories");
                  fetchBooksByCategory(activeCategory);
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 15px rgba(29, 78, 216, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={
                    activeTab === "categories"
                      ? {
                          rotateY: [0, 180, 360],
                          scale: [1, 1.2, 1],
                          color: "#1d4ed8",
                        }
                      : {
                          color: "#ffffff",
                        }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <FaBookOpen className="text-xl" />
                </motion.div>
                <span>Categories</span>
              </motion.button>

              {/* Favorites Button */}
              <motion.button
                className={`px-5 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-sm ${
                  activeTab === "favorites"
                    ? "bg-white text-indigo-600 shadow-lg"
                    : "text-white hover:bg-white/20"
                } transition-all duration-300 font-medium`}
                onClick={() => setActiveTab("favorites")}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 4px 15px rgba(225, 29, 72, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={
                    activeTab === "favorites"
                      ? {
                          scale: [1, 1.3, 1],
                          rotate: [0, 15, -15, 0],
                          color: "#e11d48",
                        }
                      : {
                          scale: 1,
                          color: "#ffffff",
                        }
                  }
                  transition={{ duration: 0.6 }}
                >
                  <FaHeart className="text-xl" />
                </motion.div>
                <span>Favorites</span>
                <motion.span
                  className="bg-white text-indigo-600 text-xs font-bold px-2.5 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                >
                  {favorites.length}
                </motion.span>
              </motion.button>

              {/* Cart Button */}
              <motion.div
                className="relative cursor-pointer"
                onClick={() => setActiveTab("cart")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300 shadow-lg"
                  animate={{
                    rotate: activeTab === "cart" ? [0, 15, -15, 0] : 0,
                    color: activeTab === "cart" ? "#4f46e5" : "#ffffff",
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <FiShoppingCart className="h-6 w-6" />
                </motion.div>
                {cart.length > 0 && (
                  <motion.span
                    className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 15,
                    }}
                  >
                    {getCartCount()}
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {activeTab === "categories" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-6 text-violet-800">
                {activeCategory} Books
              </h2>
              <Categories
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>

            {loading && (
              <div className="text-center py-16">
                <motion.div
                  className="inline-block h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-gray-600">
                  Loading {activeCategory} books...
                </p>
              </div>
            )}

            {error && (
              <div className="text-center py-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100 shadow-inner">
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
              {categoryBooks.map((book) => (
                <motion.div
                  key={book.id}
                  variants={itemVariant}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
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

            {!loading && !error && categoryBooks.length === 0 && (
              <motion.div
                className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaSearch className="h-16 w-16 mx-auto text-blue-300 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  No {activeCategory} books found
                </h3>
                <p className="text-gray-500">Try a different category</p>
              </motion.div>
            )}
          </motion.div>
        )}
        {activeTab === "home" && (
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            {/* Hero Section */}
            <div className="text-center mb-16 relative">
              <motion.div
                className="mb-8 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <BookSlider />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative"
              >
                <motion.div
                  className="absolute -top-10 -left-10 z-0 opacity-20"
                  animate={floatingAnimation}
                >
                  <FaFeatherAlt className="text-blue-500 text-6xl" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-10 -right-10 z-0 opacity-20"
                  animate={floatingAnimation}
                >
                  <Bookmark className="text-indigo-500 text-7xl" />
                </motion.div>

                <motion.h2
                  className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-red-600 mb-6 relative z-10"
                  animate={{
                    background: [
                      "linear-gradient(45deg, #1d4ed8, #e11d48)",
                      "linear-gradient(45deg, #e11d48, #1d4ed8)",
                    ],
                    backgroundSize: ["200% 200%", "200% 200%"],
                    backgroundPosition: ["0% 50%", "100% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                >
                  Discover Your Next Favorite Book
                </motion.h2>
                <motion.p
                  className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10"
                  animate={pulseAnimation}
                >
                  Explore our curated collection of best-selling books and
                  embark on your next literary adventure.
                </motion.p>
              </motion.div>

              <motion.div
                className="mt-12 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <SearchBar
                  searchTerm={searchTerm}
                  suggestions={suggestions}
                  onSearch={handleSearch}
                  onSuggestionClick={handleSuggestionClick}
                />
                <motion.p
                  className="text-sm text-gray-500 mt-3"
                  animate={{
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  Try searching for "fantasy", "biography", or "mystery"
                </motion.p>
              </motion.div>
            </div>

            {/* Popular Books Section */}
            <motion.section
              className="mb-20"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <motion.h3
                  className="text-2xl font-bold text-gray-800 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <FaStar className="text-amber-400 text-2xl" />
                  </motion.div>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                    Popular Books
                  </span>
                </motion.h3>
                <motion.button
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab("search")}
                >
                  View all
                  <motion.span className="group-hover:translate-x-1 transition-transform">
                    <IoIosArrowForward />
                  </motion.span>
                </motion.button>
              </div>

              {loading && !popularBooks.length ? (
                <div className="text-center py-12">
                  <motion.div
                    className="inline-block h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <p className="mt-4 text-gray-600">Loading popular books...</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                  variants={staggerItems}
                >
                  {popularBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      variants={itemVariant}
                      whileHover={{
                        y: -10,
                        scale: 1.03,
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
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

            {/* About Section */}
            <motion.section
              className="mb-16 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden relative border-2 border-violet-500 border-dotted"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-48 h-48 bg-indigo-200/30 rounded-full blur-xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="p-8 md:p-12 relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-2xl shadow-lg border border-white/50 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        className="p-3 bg-indigo-100 rounded-full"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        <FaLeaf className="text-indigo-600 text-xl" />
                      </motion.div>
                      <h4 className="text-2xl font-semibold text-indigo-700">
                        Our Story
                      </h4>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Founded in 2023, BookNest is dedicated to bringing the joy
                      of reading to book lovers everywhere. We believe in the
                      power of books to inspire, educate, and entertain.
                    </p>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      Our carefully curated collection features bestsellers,
                      classics, and hidden gems across all genres. Whether
                      you're a fan of timeless literature, thrilling mysteries,
                      or insightful non-fiction, we have something for everyone.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      What started as a small online shop has grown into a
                      thriving community of readers, writers, and literary
                      enthusiasts. We partner with independent publishers and
                      authors to promote diverse voices and stories that deserve
                      to be heard.
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <motion.h4
                        className="text-xl font-bold mb-2"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Reading is dreaming with open eyes
                      </motion.h4>
                      <motion.p
                        className="text-sm opacity-90"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        Explore our collection today
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <motion.section
              className="mb-28 py-12 relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Decorative background elements */}
              <motion.div
                className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-100/20 rounded-full blur-3xl"
                animate={{
                  x: [0, 50, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-100/20 rounded-full blur-3xl"
                animate={{
                  x: [0, -40, 0],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="container mx-auto px-4 relative z-10">
                <motion.h3
                  className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                    What Our Readers Say
                  </span>
                  <motion.div
                    className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-blue-400 mx-auto mt-4 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  />
                </motion.h3>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      quote:
                        "BookNest has transformed my reading habits. The recommendations are always spot on!",
                      author: "Sarah Johnson",
                      role: "Avid Reader",
                      color: "from-indigo-500 to-blue-500",
                    },
                    {
                      quote:
                        "I love the seamless experience and beautiful interface. It makes browsing books a joy.",
                      author: "Michael Chen",
                      role: "Book Blogger",
                      color: "from-amber-500 to-orange-500",
                    },
                    {
                      quote:
                        "The best online bookstore I've used. Fast delivery and excellent customer service.",
                      author: "Emma Rodriguez",
                      role: "Librarian",
                      color: "from-rose-500 to-pink-500",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50 relative overflow-hidden"
                      initial={{ y: 50, opacity: 0, scale: 0.95 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: index * 0.15,
                        duration: 0.6,
                        type: "spring",
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -8,
                        boxShadow:
                          "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)",
                      }}
                    >
                      {/* Floating quote icon */}
                      <motion.div
                        className="absolute -top-6 -right-6 text-gray-100/80 text-7xl z-0"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          opacity: [0.7, 0.8, 0.7],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <FaBookOpen />
                      </motion.div>

                      {/* Animated stars */}
                      <div className="flex items-center mb-4 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0.8, opacity: 0.7 }}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.8, 1, 0.8],
                              y: [0, -3, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          >
                            <FaStar className="text-amber-400 text-xl" />
                          </motion.div>
                        ))}
                      </div>

                      <motion.p
                        className="text-gray-700 italic mb-6 relative z-10 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.15 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        "{testimonial.quote}"
                      </motion.p>

                      <motion.div
                        className="flex items-center relative z-10"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 + 0.4 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className={`h-12 w-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold mr-4 shadow-md`}
                          whileHover={{
                            scale: 1.1,
                            rotate: 360,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {testimonial.author.charAt(0)}
                        </motion.div>
                        <div>
                          <motion.p
                            className="font-medium text-gray-900"
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {testimonial.author}
                          </motion.p>
                          <motion.p
                            className="text-sm text-gray-500"
                            whileHover={{ x: 3 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              delay: 0.05,
                            }}
                          >
                            {testimonial.role}
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Animated border bottom */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${testimonial.color}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: index * 0.15 + 0.2,
                        }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Floating CTA at bottom */}
                <motion.div
                  className="text-center mt-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.p
                    className="text-gray-600 mb-6 text-lg"
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    Ready to start your reading journey?
                  </motion.p>
                  <motion.button
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium group"
                    whileHover={{
                      scale: 1.05,
                      background: "linear-gradient(45deg, #4f46e5, #6366f1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab("search")}
                  >
                    <span className="flex items-center gap-2">
                      Browse Books
                      <motion.span
                        className="group-hover:translate-x-1 transition-transform"
                        animate={{
                          x: [0, 5, 0],
                          transition: { repeat: Infinity, duration: 2 },
                        }}
                      >
                        <IoIosArrowForward />
                      </motion.span>
                    </span>
                  </motion.button>
                </motion.div>
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
                <motion.div
                  className="inline-block h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-gray-600">Loading books...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-12 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg border border-red-100 shadow-inner">
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
                <motion.div
                  key={book.id}
                  variants={itemVariant}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
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

            {!loading && !error && books.length === 0 && searchTerm && (
              <motion.div
                className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaSearch className="h-16 w-16 mx-auto text-blue-300 mb-4" />
                </motion.div>
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500">Try a different search term</p>
                <motion.button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("home");
                  }}
                >
                  Browse Popular Books
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === "favorites" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-8">
              <motion.h2
                className="text-2xl font-bold text-gray-800 flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    color: ["#e11d48", "#f43f5e", "#e11d48"],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FaHeart className="text-2xl" />
                </motion.div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-rose-600">
                  Your Favorites
                </span>
              </motion.h2>
              {favorites.length > 0 && (
                <motion.button
                  className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group"
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab("search")}
                >
                  Find more books
                  <motion.span className="group-hover:translate-x-1 transition-transform">
                    <IoIosArrowForward />
                  </motion.span>
                </motion.button>
              )}
            </div>

            {favorites.length === 0 ? (
              <motion.div
                className="text-center py-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100 shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, -15, 0],
                    color: ["#fda4af", "#f43f5e", "#fda4af"],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <FaHeart className="h-16 w-16 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  No favorites yet
                </h3>
                <p className="text-gray-500">
                  Start adding books to your favorites by clicking the heart
                  icon
                </p>
                <motion.button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("home")}
                >
                  Browse Popular Books
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                variants={staggerItems}
                initial="hidden"
                animate="visible"
              >
                {favorites.map((book) => (
                  <motion.div
                    key={book.id}
                    variants={itemVariant}
                    whileHover={{
                      y: -10,
                      scale: 1.03,
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
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
            <motion.h2
              className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  x: [0, 5, -5, 0],
                  color: ["#6366f1", "#4f46e5", "#6366f1"],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FiShoppingCart className="text-2xl" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-blue-600">
                Your Cart
              </span>
              {cart.length > 0 && (
                <span className="ml-auto text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full shadow-inner">
                  {getCartCount()} items
                </span>
              )}
            </motion.h2>

            {cart.length === 0 ? (
              <motion.div
                className="text-center py-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 15, -15, 0],
                    color: ["#a5b4fc", "#818cf8", "#a5b4fc"],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <FiShoppingCart className="h-16 w-16 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-2xl font-medium text-gray-600 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500">
                  Start adding books to your cart by clicking the cart icon
                </p>
                <motion.button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab("home")}
                >
                  Browse Popular Books
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm bg-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="divide-y divide-gray-100">
                  {cart.map((item) => {
                    const volumeInfo = item.volumeInfo || {};
                    const imageLinks = volumeInfo.imageLinks || {};
                    return (
                      <motion.div
                        key={item.id}
                        className="p-6 flex items-center hover:bg-indigo-50/50 transition-colors group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{
                          backgroundColor: "rgba(238, 242, 255, 0.7)",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                        }}
                      >
                        <motion.div
                          className="w-20 h-24 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-lg flex-shrink-0 overflow-hidden shadow-md group-hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.05 }}
                        >
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
                        </motion.div>
                        <div className="ml-6 flex-grow">
                          <h3 className="font-medium text-gray-900 line-clamp-1 text-lg">
                            {volumeInfo.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {volumeInfo.authors
                              ? volumeInfo.authors.join(", ")
                              : "Unknown Author"}
                          </p>
                          <div className="mt-2">
                            <span className="text-indigo-600 font-medium">
                              {/* ${(Math.random() * 20 + 5).toFixed(2)} */}$
                              {item.price.toFixed(2)}
                            </span>
                          </div>
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
                              whileHover={{ scale: 1.1 }}
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
                            <motion.span
                              className="w-8 text-center font-medium text-indigo-800"
                              animate={{
                                scale: [1, 1.1, 1],
                                color: ["#4f46e5", "#6366f1", "#4f46e5"],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              {item.quantity}
                            </motion.span>
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
                              whileHover={{ scale: 1.1 }}
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
                            whileHover={{
                              scale: 1.2,
                              rotate: 90,
                            }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaTimes className="h-4 w-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <motion.div
                  className="p-8 bg-gradient-to-r from-indigo-50 to-blue-50 border-t border-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="font-medium text-lg text-indigo-800">
                        Total items:{" "}
                        <span className="font-bold">{getCartCount()}</span>
                      </h3>
                      {/* <h3 className="font-bold text-xl text-indigo-900 mt-1">
                        Total price:{" "}
                        <span className="text-2xl">
                          $
                          {(getCartCount() * (Math.random() * 10 + 5)).toFixed(
                            2
                          )}
                        </span>
                      </h3> */}
                      <h3 className="font-bold text-xl text-indigo-900 mt-1">
                        Total price:{" "}
                        <span className="text-2xl">
                          $
                          {cart
                            .reduce(
                              (total, item) =>
                                total + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </h3>
                    </div>
                    <motion.button
                      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg font-medium flex items-center justify-center gap-2"
                      whileHover={{
                        y: -3,
                        boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
                        background:
                          "linear-gradient(to right, #4f46e5, #6366f1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                          transition: { repeat: Infinity, duration: 2 },
                        }}
                      >
                        <FiShoppingCart />
                      </motion.div>
                      Proceed to Checkout
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      <footer className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-blue-900 text-white py-12 relative z-10 overflow-hidden">
        {/* Starry night background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating elements */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10 blur-xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated stars */}
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 0.3 + 0.1;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 3;
            const opacity = 0.5 + Math.random() * 0.5;
            const top = Math.random() * 100;
            const left = Math.random() * 100;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${size}rem`,
                  height: `${size}rem`,
                  top: `${top}%`,
                  left: `${left}%`,
                  opacity: opacity,
                }}
                animate={{
                  opacity: [opacity * 0.7, opacity, opacity * 0.7],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Shooting stars */}
          {[...Array(3)].map((_, i) => {
            const delay = 5 + Math.random() * 10;
            const duration = 1 + Math.random() * 0.5;
            const top = Math.random() * 30;
            const left = Math.random() * 100;

            return (
              <motion.div
                key={`shooting-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
                style={{
                  width: "5rem",
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: "rotate(-45deg)",
                  opacity: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  x: ["-100%", "100%"],
                  y: ["0%", "100%"],
                }}
                transition={{
                  duration: duration,
                  delay: delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          })}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.div
                className="flex items-center gap-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                  animate={{
                    rotateY: [0, 180, 360],
                    transition: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                >
                  <FaBookOpen className="text-white text-lg" />
                </motion.div>
                <h3 className="text-xl font-bold">BookNest</h3>
              </motion.div>
              <p className="text-blue-200">
                Your one-stop destination for all your reading needs. Discover,
                explore, and enjoy books from around the world.
              </p>
              <div className="mt-4 flex gap-4">
                {["twitter", "facebook", "instagram", "linkedin"].map(
                  (social, i) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      whileHover={{
                        y: -3,
                        scale: 1.1,
                        backgroundColor: "rgba(255,255,255,0.2)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="h-5 w-5 bg-white rounded-full"></div>
                    </motion.a>
                  )
                )}
              </div>
            </div>
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {[
                  { icon: <FaHome />, text: "Home" },
                  { icon: <FaSearch />, text: "Search" },
                  { icon: <FaHeart />, text: "Favorites" },
                  { icon: <FiShoppingCart />, text: "Cart" },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      delay: 0.2 + index * 0.1,
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <a
                      href="#"
                      className="text-blue-200 hover:text-white transition-colors flex items-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(link.text.toLowerCase());
                      }}
                    >
                      <motion.span whileHover={{ scale: 1.2 }}>
                        {link.icon}
                      </motion.span>
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                Categories
              </motion.h3>
              <div className="grid grid-cols-2 gap-3 ">
                {["Fiction", "Mystery", "Romance", "Biography", "History"].map(
                  (category, i) => (
                    <motion.button
                      key={category}
                      className="text-blue-200 hover:text-white text-sm transition-colors text-left cursor-pointer"
                      whileHover={{
                        x: 5,
                        color: "#ffffff",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.3 + i * 0.05,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => {
                        setActiveTab("categories");
                        setActiveCategory(category);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {category}
                    </motion.button>
                  )
                )}
              </div>
            </div>
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                Newsletter
              </motion.h3>
              <motion.p
                className="text-blue-200 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Subscribe to get updates on new arrivals and special offers.
              </motion.p>
              <motion.div
                className="flex"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-3 rounded-l-lg w-full focus:outline-none text-gray-800 focus:ring-2 focus:ring-indigo-500"
                />
                <motion.button
                  className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-r-lg hover:from-amber-600 hover:to-amber-700 transition-all flex items-center"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 15px rgba(245, 158, 11, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                      transition: { repeat: Infinity, duration: 2 },
                    }}
                  >
                    Subscribe
                  </motion.span>
                </motion.button>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="border-t border-blue-600 mt-8 pt-6 text-center text-blue-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p>
              &copy; {new Date().getFullYear()} BookNest. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Modal with enhanced animations */}
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

      {/* Floating action button for quick access */}
      <motion.div
        className="fixed bottom-8 right-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all"
          whileHover={{
            scale: 1.1,
            rotate: 360,
            background: "linear-gradient(45deg, #4f46e5, #6366f1)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FaBookReader className="text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
}

export default App;
