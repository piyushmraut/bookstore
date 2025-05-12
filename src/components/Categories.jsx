// src/components/Categories.jsx
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";

const Categories = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { name: "Fiction", color: "from-purple-500 to-indigo-500" },
    { name: "Mystery", color: "from-blue-500 to-teal-500" },
    { name: "Romance", color: "from-pink-500 to-rose-500" },
    { name: "Biography", color: "from-emerald-500 to-cyan-500" },
    { name: "History", color: "from-gray-500 to-slate-500" },
  ];

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <motion.button
          key={category.name}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
            activeCategory === category.name
              ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
              : "bg-white/80 text-gray-700 hover:bg-white"
          } transition-all duration-300 flex items-center gap-2`}
          onClick={() => setActiveCategory(category.name)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={
              activeCategory === category.name
                ? { rotate: 360, scale: 1.2 }
                : { rotate: 0, scale: 1 }
            }
            transition={{ duration: 0.5 }}
          >
            <FaBookOpen
              className={
                activeCategory === category.name
                  ? "text-white"
                  : "text-gray-500"
              }
            />
          </motion.div>
          {category.name}
        </motion.button>
      ))}
    </div>
  );
};

export default Categories;