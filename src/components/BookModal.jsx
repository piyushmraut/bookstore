import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaShoppingCart,
  FaTimes,
  FaBookOpen,
  FaCalendarAlt,
  FaBuilding,
  FaFileAlt,
  FaGlobe,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaBookmark,
} from "react-icons/fa";
import { FiExternalLink, FiShare2 } from "react-icons/fi";
import { RiSparkling2Fill } from "react-icons/ri";

const BookModal = ({
  book,
  onClose,
  onAddToFavorites,
  onAddToCart,
  isFavorite,
}) => {
  const volumeInfo = book.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};
  const saleInfo = book.saleInfo || {};
  const [showAnimation, setShowAnimation] = useState(false);
  const [pageFlip, setPageFlip] = useState(false);
  const [bookmarkColor, setBookmarkColor] = useState("#4F46E5");

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    setShowAnimation(true);

    // Randomly change bookmark color
    const colorInterval = setInterval(() => {
      const colors = ["#4F46E5", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B"];
      setBookmarkColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 3000);

    // Trigger page flip animation occasionally
    const flipInterval = setInterval(() => {
      setPageFlip(true);
      setTimeout(() => setPageFlip(false), 1000);
    }, 7000);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      clearInterval(colorInterval);
      clearInterval(flipInterval);
    };
  }, [onClose]);

  const formatPrice = (price, currency) => {
    if (!price) return "Not available for purchase";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currency || "USD",
      }).format(price);
    } catch {
      return `${currency || ""} ${price}`;
    }
  };

  const getPriceInfo = () => {
    if (saleInfo.saleability === "FREE") {
      return "Free";
    } else if (saleInfo.saleability === "NOT_FOR_SALE") {
      return "Not for sale";
    } else if (saleInfo.listPrice) {
      return formatPrice(
        saleInfo.listPrice.amount,
        saleInfo.listPrice.currencyCode
      );
    } else if (saleInfo.retailPrice) {
      return formatPrice(
        saleInfo.retailPrice.amount,
        saleInfo.retailPrice.currencyCode
      );
    } else if (book.price) {
      // Add this fallback
      return formatPrice(book.price, "USD");
    } else {
      return "Price not available";
    }
  };

  const getBuyLink = () => {
    if (saleInfo.buyLink) {
      return saleInfo.buyLink;
    }
    return null;
  };

  // Enhanced star rating component with floating animations
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div className="flex space-x-1">
        {[...Array(totalStars)].map((_, i) => {
          const isFullStar = i < fullStars;
          const isHalfStar = !isFullStar && i === fullStars && hasHalfStar;

          return (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{
                scale: 1,
                rotate: 0,
                transition: { delay: 0.1 * i, type: "spring" },
              }}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                animate={
                  isFullStar
                    ? {
                        y: [0, -3, 0],
                        transition: {
                          delay: i * 0.5,
                          duration: 1,
                          repeat: Infinity,
                          repeatDelay: 7 + i,
                        },
                      }
                    : {}
                }
              >
                {isFullStar ? (
                  <FaStar className="h-6 w-6 text-yellow-400" />
                ) : isHalfStar ? (
                  <FaStarHalfAlt className="h-6 w-6 text-yellow-400" />
                ) : (
                  <FaRegStar className="h-6 w-6 text-gray-300" />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  // Animated book cover with advanced page flip effect
  const BookCover = ({ image, title }) => {
    return (
      <motion.div
        className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl"
        initial={{ rotateY: -30, opacity: 0 }}
        animate={{
          rotateY: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 50, damping: 15 },
        }}
        whileHover={{
          rotateY: 15,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Book spine effect */}
        <div className="absolute left-0 top-0 bottom-0 w-[10px] bg-gradient-to-r from-black/20 to-transparent z-10" />

        {/* Page flip effect */}
        <AnimatePresence>
          {pageFlip && (
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-1/3 bg-white/80"
              initial={{ rotateY: 0, x: 0, opacity: 0 }}
              animate={{
                rotateY: -90,
                x: 20,
                opacity: [0, 1, 0],
                transition: { duration: 1, ease: "easeInOut" },
              }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {image ? (
          <img
            src={image.replace("http://", "https://")}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 h-full w-full flex items-center justify-center">
            <motion.div
              animate={{
                rotateY: [0, 180],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <FaBookOpen className="h-24 w-24 text-indigo-300" />
            </motion.div>
            <div className="absolute bottom-4 text-center w-full">
              <span className="text-indigo-500 font-medium tracking-wide">
                No Cover Available
              </span>
            </div>
          </div>
        )}

        {/* Top bookmark effect */}
        <motion.div
          className="absolute -top-2 right-8 w-12 h-16 z-10"
          style={{ perspective: "1000px" }}
          initial={{ y: -20 }}
          animate={{
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 0.5,
            },
          }}
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 500 },
          }}
        >
          <motion.div
            style={{ backgroundColor: bookmarkColor }}
            className="w-full h-full rounded-b-lg shadow-lg origin-top"
            animate={{
              rotateX: [0, 10, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatDelay: 5,
              },
            }}
          />
        </motion.div>

        {/* Glossy overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Bottom shadow gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />

        {/* Sparkle effects */}
        <motion.div
          className="absolute top-5 left-8 text-yellow-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatDelay: 7,
            },
          }}
        >
          <RiSparkling2Fill size={24} />
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 text-yellow-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 0],
            transition: {
              duration: 2,
              delay: 1.5,
              repeat: Infinity,
              repeatDelay: 5,
            },
          }}
        >
          <RiSparkling2Fill size={16} />
        </motion.div>
      </motion.div>
    );
  };

  // Animated confetti effect for favorites
  const Confetti = () => {
    const confettiItems = Array(20).fill(null);

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confettiItems.map((_, i) => {
          // Random properties for confetti
          const size = Math.random() * 8 + 5;
          const startX = Math.random() * 100;
          const delay = Math.random() * 0.5;
          const duration = Math.random() * 1 + 1;
          const rotation = Math.random() * 360;

          // Random color
          const colors = [
            "#4F46E5",
            "#8B5CF6",
            "#EC4899",
            "#EF4444",
            "#F59E0B",
            "#10B981",
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];

          return (
            <motion.div
              key={i}
              className="absolute rounded-md opacity-70"
              style={{
                left: `${startX}%`,
                top: "-20px",
                width: size,
                height: size,
                backgroundColor: color,
              }}
              initial={{ y: -20, rotate: 0, opacity: 0 }}
              animate={
                isFavorite
                  ? {
                      y: ["0vh", "100vh"],
                      rotate: rotation + 360,
                      opacity: [0, 1, 0],
                      transition: {
                        duration: duration,
                        delay: delay,
                        repeat: Infinity,
                        repeatDelay: 5,
                      },
                    }
                  : {}
              }
            />
          );
        })}
      </div>
    );
  };

  // Get a truncated author list for mobile views
  const getShortAuthorList = () => {
    if (!volumeInfo.authors || volumeInfo.authors.length === 0)
      return "Unknown Author";

    if (volumeInfo.authors.length === 1) return volumeInfo.authors[0];
    return `${volumeInfo.authors[0]} & others`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Floating book icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/5"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
            }}
            initial={{ opacity: 0, scale: 0, rotate: Math.random() * 180 - 90 }}
            animate={{
              opacity: 0.5,
              scale: 1,
              rotate: Math.random() * 360,
              y: [0, -15, 0],
              transition: {
                duration: 3 + i,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          >
            <FaBookOpen />
          </motion.div>
        ))}
      </div>

      {/* Confetti effect when favorited */}
      {isFavorite && <Confetti />}

      <motion.div
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-200"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 25,
            duration: 0.5,
          },
        }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20 rounded-t-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(144,97,217,0.4),transparent_70%)]" />

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          ))}
        </motion.div>

        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md z-10"
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes className="h-5 w-5" />
        </motion.button>

        <div className="p-8 pt-16">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/5">
              <motion.div
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center h-96 shadow-inner overflow-hidden p-4 border border-indigo-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  transition: { delay: 0.2 },
                }}
              >
                <BookCover
                  image={imageLinks.thumbnail || imageLinks.smallThumbnail}
                  title={volumeInfo.title}
                />
              </motion.div>

              <div className="mt-8 flex gap-3">
                <motion.button
                  onClick={() => onAddToFavorites(book)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl ${
                    isFavorite
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-700"
                  } hover:bg-gray-200 transition-colors w-full justify-center font-medium`}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={
                      isFavorite
                        ? {
                            scale: [1, 1.5, 1],
                            rotate: [0, 15, -15, 0],
                            transition: {
                              duration: 0.6,
                              repeat: Infinity,
                              repeatDelay: 3,
                            },
                          }
                        : {}
                    }
                  >
                    <FaHeart
                      className={isFavorite ? "text-red-500" : "text-gray-400"}
                    />
                  </motion.div>
                  <span>{isFavorite ? "Saved" : "Save"}</span>
                </motion.button>

                <motion.button
                  onClick={() => onAddToCart(book)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all w-full justify-center font-medium shadow-md"
                  whileHover={{
                    y: -3,
                    boxShadow: "0 12px 20px -5px rgba(79, 70, 229, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      },
                    }}
                  >
                    <FaShoppingCart />
                  </motion.div>
                  <span>Add to Cart</span>
                </motion.button>
              </div>

            </div>

            <div className="md:w-3/5">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 leading-tight relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {volumeInfo.title}
               
                <motion.span
                  className="absolute left-0 bottom-0 h-3 bg-yellow-200/50 w-full -z-10 rounded-sm"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.7 }}
                />
              </motion.h2>

              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex flex-wrap items-center gap-2 mb-6"
              >
                <span className="text-indigo-600 font-medium">
                  {volumeInfo.authors
                    ? volumeInfo.authors.join(", ")
                    : "Unknown Author"}
                </span>

                {volumeInfo.averageRating && (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    <div className="flex items-center">
                      <StarRating rating={volumeInfo.averageRating} />
                      <span className="ml-2 text-gray-700 font-medium">
                        {volumeInfo.averageRating.toFixed(1)}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({volumeInfo.ratingsCount || 0})
                      </span>
                    </div>
                  </>
                )}
              </motion.div>

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
                            repeatDelay: 5,
                          },
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaCalendarAlt />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Published
                      </h4>
                    </div>
                    <p className="font-medium">
                      {new Date(volumeInfo.publishedDate).toLocaleDateString()}
                    </p>
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
                            repeatDelay: 5,
                          },
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaBuilding />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Publisher
                      </h4>
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
                            repeatDelay: 5,
                          },
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaFileAlt />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Pages
                      </h4>
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
                            repeatDelay: 5,
                          },
                        }}
                        className="mr-2 text-indigo-500"
                      >
                        <FaGlobe />
                      </motion.div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Language
                      </h4>
                    </div>
                    <p className="font-medium">
                      {volumeInfo.language.toUpperCase()}
                    </p>
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
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">
                    Categories
                  </h4>
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
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">
                    Rating
                  </h4>
                  <div className="flex items-center">
                    <StarRating rating={volumeInfo.averageRating} />
                    <span className="ml-2 text-gray-700 font-medium">
                      {volumeInfo.averageRating.toFixed(1)} (
                      {volumeInfo.ratingsCount || 0} ratings)
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
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  Description
                </h3>
                <div className="text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-inner">
                  {volumeInfo.description || "No description available."}
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
                      boxShadow: "0 12px 20px -5px rgba(79, 70, 229, 0.4)",
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
                          repeatDelay: 2,
                        },
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
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
                          repeatDelay: 2,
                        },
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
