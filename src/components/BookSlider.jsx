// import { useState, useRef, useEffect } from "react";
// import {
//     BookOpen,
//     Star,
//     TrendingUp,
//     Award,
//     Coffee,
//     Clock,
//     Brain,
//     Heart,
//     ChevronLeft,
//     ChevronRight,
//     Quote
//   } from "lucide-react";

// const leaders = [
//   {
//     name: "Dr. B.R. Ambedkar",
//     thought:
//       "Education is the most powerful weapon which you can use to change the world.",
//     image: "https://wallpapercave.com/wp/wp5767689.jpg",
//   },
//   {
//     name: "Mahatma Gandhi",
//     thought:
//       "Live as if you were to die tomorrow. Learn as if you were to live forever.",
//     image:
//       "https://i.pinimg.com/originals/1e/f6/90/1ef690fdafd104517c02ff7d8b4344ae.png",
//   },
//   {
//     name: "Rabindranath Tagore",
//     thought:
//       "Don't limit a child to your own learning, for he was born in another time.",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/8/80/Rabindranath_Tagore_unknown_location.jpg",
//   },
//   {
//     name: "Swami Vivekananda",
//     thought: "All power is within you; you can do anything and everything.",
//     image:
//       "https://religionworld.s3.amazonaws.com/uploads/bfi_thumb/swami-o1wfpwdh1owody6witbkoebk27zlt2uyke3fbw71sw.jpg",
//   },
// ];


// const features = [
//     {
//       title: "Discover Your Next Adventure",
//       description:
//         "Every book is a journey waiting to unfold - find stories that transport you to new worlds",
//       icon: <BookOpen className="h-10 w-10" />,
//       color: "from-indigo-600 to-purple-700",
//       quote: "'Reading is a discount ticket to everywhere.' — Mary Schmich",
//       background: "bg-gradient-to-r from-blue-400 to-indigo-500",
//     },
//     {
//       title: "Monthly Book Clubs",
//       description:
//         "Join our reading communities and connect with fellow book lovers in meaningful discussions",
//       icon: <Heart className="h-10 w-10" />,
//       color: "from-rose-600 to-pink-700",
//       quote:
//         "'A reader lives a thousand lives before he dies.' — George R.R. Martin",
//       background: "bg-gradient-to-r from-rose-400 to-pink-500",
//     },
//     {
//       title: "Curated Collections",
//       description:
//         "Handpicked recommendations based on your preferences and reading history",
//       icon: <Star className="h-10 w-10" />,
//       color: "from-amber-500 to-orange-600",
//       quote: "'Books are a uniquely portable magic.' — Stephen King",
//       background: "bg-gradient-to-r from-yellow-400 to-orange-500",
//     },
//     {
//       title: "Bestsellers & Trending",
//       description:
//         "Stay updated with the most talked-about titles that everyone is reading",
//       icon: <TrendingUp className="h-10 w-10" />,
//       color: "from-emerald-500 to-teal-700",
//       quote:
//         "'The more that you read, the more things you will know.' — Dr. Seuss",
//       background: "bg-gradient-to-r from-green-400 to-teal-500",
//     },
//     {
//       title: "Award Winners",
//       description:
//         "Explore literary masterpieces recognized for their excellence and cultural impact",
//       icon: <Award className="h-10 w-10" />,
//       color: "from-blue-500 to-cyan-700",
//       quote:
//         "'Reading is to the mind what exercise is to the body.' — Joseph Addison",
//       background: "bg-gradient-to-r from-cyan-400 to-blue-500",
//     },
//     {
//       title: "Cozy Reading Corners",
//       description:
//         "Visit our physical stores with comfortable spaces designed for peaceful reading",
//       icon: <Coffee className="h-10 w-10" />,
//       color: "from-yellow-500 to-amber-700",
//       quote:
//         "'Books are the quietest and most constant of friends.' — Charles W. Eliot",
//       background: "bg-gradient-to-r from-amber-400 to-yellow-500",
//     },
//     {
//       title: "15-Minute Reading Challenge",
//       description:
//         "Transform your daily routine with our guided short reading sessions",
//       icon: <Clock className="h-10 w-10" />,
//       color: "from-purple-500 to-violet-700",
//       quote: "'Reading is an exercise in empathy.' — Malorie Blackman",
//       background: "bg-gradient-to-r from-violet-400 to-purple-500",
//     },
//     {
//       title: "Expand Your Knowledge",
//       description:
//         "Discover non-fiction titles that inspire growth and deeper understanding",
//       icon: <Brain className="h-10 w-10" />,
//       color: "from-cyan-500 to-blue-700",
//       quote: "'A book is a dream you hold in your hands.' — Neil Gaiman",
//       background: "bg-gradient-to-r from-blue-400 to-cyan-500",
//     },
//   ];
  
//   export default function EnhancedBookStoreSlider() {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isAnimating, setIsAnimating] = useState(false);
//     const [direction, setDirection] = useState("right");
//     const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
//     const [leaderDirection, setLeaderDirection] = useState("right");
//     const timeoutRef = useRef(null);
//     const leaderTimeoutRef = useRef(null);
  
//     const resetTimeout = () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
  
//     const resetLeaderTimeout = () => {
//       if (leaderTimeoutRef.current) {
//         clearTimeout(leaderTimeoutRef.current);
//       }
//     };
  
//     useEffect(() => {
//       resetTimeout();
//       timeoutRef.current = setTimeout(
//         () => {
//           goToNext();
//         },
//         6000 // Auto-advance every 6 seconds
//       );
  
//       return () => {
//         resetTimeout();
//       };
//     }, [currentIndex]);
  
//     useEffect(() => {
//       resetLeaderTimeout();
//       leaderTimeoutRef.current = setTimeout(
//         () => {
//           nextLeader();
//         },
//         8000 // Auto-advance leaders every 8 seconds
//       );
  
//       return () => {
//         resetLeaderTimeout();
//       };
//     }, [currentLeaderIndex]);
  
//     const goToPrev = () => {
//       if (isAnimating) return;
//       setIsAnimating(true);
//       setDirection("left");
//       setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? features.length - 1 : prevIndex - 1
//       );
//       setTimeout(() => setIsAnimating(false), 500);
//       resetTimeout();
//     };
  
//     const goToNext = () => {
//       if (isAnimating) return;
//       setIsAnimating(true);
//       setDirection("right");
//       setCurrentIndex((prevIndex) =>
//         prevIndex === features.length - 1 ? 0 : prevIndex + 1
//       );
//       setTimeout(() => setIsAnimating(false), 500);
//       resetTimeout();
//     };
  
//     const nextLeader = () => {
//       setLeaderDirection("right");
//       setCurrentLeaderIndex((prevIndex) =>
//         prevIndex === leaders.length - 1 ? 0 : prevIndex + 1
//       );
//     };
  
//     const prevLeader = () => {
//       setLeaderDirection("left");
//       setCurrentLeaderIndex((prevIndex) =>
//         prevIndex === 0 ? leaders.length - 1 : prevIndex - 1
//       );
//     };
  
//     const goToIndex = (index) => {
//       if (isAnimating || index === currentIndex) return;
//       setIsAnimating(true);
//       setDirection(index > currentIndex ? "right" : "left");
//       setCurrentIndex(index);
//       setTimeout(() => setIsAnimating(false), 500);
//       resetTimeout();
//     };
  
//     const currentFeature = features[currentIndex];
//     const currentLeader = leaders[currentLeaderIndex];
  
//     return (
//       <div className="w-full mx-auto relative overflow-hidden py-8 px-4">
//         {/* Animated background with particles */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className={`absolute inset-0 ${currentFeature.background} opacity-20 transition-all duration-1000 ease-in-out`}></div>
//           {/* Animated particles */}
//           <div className="absolute inset-0">
//             {[...Array(20)].map((_, i) => (
//               <div 
//                 key={i} 
//                 className={`absolute rounded-full opacity-20 animate-float bg-gradient-to-r ${currentFeature.color}`}
//                 style={{
//                   width: `${Math.random() * 2 + 0.5}rem`,
//                   height: `${Math.random() * 2 + 0.5}rem`,
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   animationDuration: `${Math.random() * 10 + 10}s`,
//                   animationDelay: `${Math.random() * 5}s`
//                 }}
//               ></div>
//             ))}
//           </div>
//         </div>
  
//         {/* Main content wrapper */}
//         <div className="max-w-6xl mx-auto relative z-10">
//           {/* Header with animated text */}
//           <div className="text-center mb-8 overflow-hidden">
//             <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block transform transition-all duration-700 animate-pulse">
//               Booklovers Haven
//             </h1>
//             <p className="mt-3 text-gray-600 max-w-2xl mx-auto animate-fadeIn">
//               Discover a world of stories, knowledge, and imagination
//             </p>
//           </div>
  
//           {/* Feature slider card with glassmorphism */}
//           <div className="w-full overflow-hidden rounded-2xl relative backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 shadow-xl transition-all duration-500 hover:shadow-2xl">
//             {/* Content container */}
//             <div className="flex flex-col lg:flex-row items-center p-6 md:p-8 min-h-96">
//               {/* Left content: Feature information with animations */}
//               <div className="w-full lg:w-3/5 text-center lg:text-left p-4 md:p-6 flex flex-col items-center lg:items-start">
//                 <div
//                   className={`p-4 rounded-full bg-gradient-to-r ${currentFeature.color} text-white shadow-lg transition-all duration-700 transform hover:rotate-12 hover:scale-110 group`}
//                 >
//                   <div className="transform transition-transform duration-500 group-hover:rotate-12">
//                     {currentFeature.icon}
//                   </div>
//                 </div>
  
//                 <h2
//                   className={`text-3xl md:text-4xl font-bold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r ${currentFeature.color} transform transition-all duration-700 ${
//                     isAnimating
//                       ? direction === "right" 
//                         ? "translate-x-full opacity-0" 
//                         : "-translate-x-full opacity-0"
//                       : "translate-x-0 opacity-100"
//                   }`}
//                 >
//                   {currentFeature.title}
//                 </h2>
  
//                 <div className="w-16 h-1 rounded-full mb-4 bg-gradient-to-r transition-all duration-700 transform ${currentFeature.color}"></div>
  
//                 <p
//                   className={`text-lg md:text-xl text-gray-700 mb-6 max-w-lg transition-all duration-700 ${
//                     isAnimating
//                       ? direction === "right" 
//                         ? "translate-y-8 opacity-0" 
//                         : "translate-y-8 opacity-0"
//                       : "translate-y-0 opacity-100"
//                   } delay-100`}
//                 >
//                   {currentFeature.description}
//                 </p>
  
//                 <button 
//                   className={`px-6 py-3 rounded-full bg-gradient-to-r ${currentFeature.color} text-white font-semibold shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
//                     isAnimating ? "opacity-0" : "opacity-100"
//                   }`}
//                 >
//                   Explore Now
//                 </button>
//               </div>
  
//               {/* Right content: Quote card with animations */}
//               <div className="w-full lg:w-2/5 mt-8 lg:mt-0 p-4">
//                 <div
//                   className={`bg-white rounded-2xl shadow-lg p-8 relative transition-all duration-700 transform ${
//                     isAnimating
//                       ? direction === "right"
//                         ? "translate-x-full opacity-0 rotate-6" 
//                         : "-translate-x-full opacity-0 -rotate-6"
//                       : "translate-x-0 opacity-100 rotate-0"
//                   } hover:shadow-2xl group`}
//                 >
//                   <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110">
//                     <Quote className="w-6 h-6" />
//                   </div>
                  
//                   <div className="pt-4">
//                     <p className="text-lg italic text-gray-700 relative z-10 transition-all duration-500 group-hover:scale-105">
//                       {currentFeature.quote}
//                     </p>
//                     <div
//                       className={`w-16 h-1 bg-gradient-to-r ${currentFeature.color} rounded-full my-4 transition-all duration-500 group-hover:w-24`}
//                     ></div>
//                     <p className="text-sm text-gray-500">
//                       Reading opens worlds of possibility
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
  
//             {/* Bottom navigation with enhanced design */}
//             <div className="flex items-center justify-between p-4 pb-5 border-t border-gray-100 border-opacity-30">
//               {/* Page indicators with pulse effect */}
//               <div className="flex-1 flex justify-center">
//                 <div className="flex space-x-2">
//                   {features.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => goToIndex(index)}
//                       className={`h-2 rounded-full transition-all duration-500 transform ${
//                         index === currentIndex
//                           ? `w-10 bg-gradient-to-r ${features[index].color} animate-pulse`
//                           : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-6"
//                       }`}
//                       aria-label={`Go to slide ${index + 1}`}
//                     />
//                   ))}
//                 </div>
//               </div>
  
//               {/* Navigation arrows with hover effects */}
//               <div className="flex space-x-3">
//                 <button
//                   onClick={goToPrev}
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   aria-label="Previous feature"
//                 >
//                   <ChevronLeft className="w-6 h-6 text-gray-700" />
//                 </button>
  
//                 <button
//                   onClick={goToNext}
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   aria-label="Next feature"
//                 >
//                   <ChevronRight className="w-6 h-6 text-gray-700" />
//                 </button>
//               </div>
//             </div>
//           </div>
  
//           {/* Reading awareness section with improved design */}
//           <div className="mt-10 p-6 backdrop-filter backdrop-blur-md bg-white bg-opacity-40 rounded-xl shadow-md transition-all duration-500 hover:shadow-xl border border-white border-opacity-20 transform hover:-translate-y-1">
//             <div className="flex flex-col md:flex-row items-center">
//               <div className="mb-4 md:mb-0 md:mr-6 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//                 <BookOpen className="w-8 h-8" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
//                   Why Reading Matters
//                 </h3>
//                 <p className="text-gray-600">
//                   Reading just 15 minutes a day improves cognitive function, reduces
//                   stress by 68%, and builds empathy. Join thousands of readers
//                   transforming their lives one page at a time.
//                 </p>
//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {["Focus", "Empathy", "Knowledge", "Relaxation"].map((benefit, i) => (
//                     <span 
//                       key={i} 
//                       className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
//                     >
//                       {benefit}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
  
//           {/* Leaders' thoughts section with enhanced animation */}
//           <div className="mt-10 rounded-xl overflow-hidden relative">
//             <div
//               className={`absolute inset-0 bg-gradient-to-r ${currentFeature.color} opacity-20 transition-all duration-1000 ease-in-out`}
//             ></div>
  
//             <div className="p-8 backdrop-filter backdrop-blur-sm relative">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
//                   Wisdom from Literary Leaders
//                 </h3>
                
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={prevLeader}
//                     className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all hover:scale-110"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                   </button>
//                   <button 
//                     onClick={nextLeader}
//                     className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all hover:scale-110"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="flex flex-col md:flex-row items-center overflow-hidden relative">
//                 {/* Leader image with animated border */}
//                 <div className="relative mb-6 md:mb-0 md:mr-8">
//                   <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
//                     <img
//                       src={currentLeader.image}
//                       alt={currentLeader.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow opacity-30"></div>
//                 </div>
  
//                 <div
//                   className="flex-1 transition-all duration-700 transform"
//                   style={{
//                     opacity: isAnimating ? 0 : 1,
//                     transform: isAnimating 
//                       ? `translateX(${leaderDirection === 'right' ? '100px' : '-100px'})` 
//                       : 'translateX(0)'
//                   }}
//                 >
//                   <div>
//                     <h3 className="text-2xl font-bold mb-2 text-gray-800">
//                       {currentLeader.name}
//                     </h3>
//                     <p className="text-xl italic text-gray-700">"{currentLeader.thought}"</p>
//                     <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
  
//         {/* Global CSS for animations */}
//         <style jsx global>{`
//           @keyframes float {
//             0% { transform: translateY(0px) rotate(0deg); }
//             50% { transform: translateY(-20px) rotate(5deg); }
//             100% { transform: translateY(0px) rotate(0deg); }
//           }
          
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
          
//           @keyframes pulse {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0.7; }
//           }
          
//           @keyframes spin-slow {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
          
//           .animate-float { animation: float linear infinite; }
//           .animate-fadeIn { animation: fadeIn 1s ease-out; }
//           .animate-pulse { animation: pulse 2s infinite; }
//           .animate-spin-slow { animation: spin-slow 8s linear infinite; }
//         `}</style>
//       </div>
//     );
//   }


import { useState, useRef, useEffect } from "react";
import {
    BookOpen,
    Star,
    TrendingUp,
    Award,
    Coffee,
    Clock,
    Brain,
    Heart,
    ChevronLeft,
    ChevronRight,
    Quote
  } from "lucide-react";

const leaders = [
  {
    name: "Dr. B.R. Ambedkar",
    thought:
      "Education is the most powerful weapon which you can use to change the world.",
    image: "https://wallpapercave.com/wp/wp5767689.jpg",
  },
  {
    name: "Mahatma Gandhi",
    thought:
      "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    image:
      "https://i.pinimg.com/originals/1e/f6/90/1ef690fdafd104517c02ff7d8b4344ae.png",
  },
  {
    name: "Rabindranath Tagore",
    thought:
      "Don't limit a child to your own learning, for he was born in another time.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Rabindranath_Tagore_unknown_location.jpg",
  },
  {
    name: "Swami Vivekananda",
    thought: "All power is within you; you can do anything and everything.",
    image:
      "https://religionworld.s3.amazonaws.com/uploads/bfi_thumb/swami-o1wfpwdh1owody6witbkoebk27zlt2uyke3fbw71sw.jpg",
  },
];

const features = [
    {
      title: "Discover Your Next Adventure",
      description:
        "Every book is a journey waiting to unfold - find stories that transport you to new worlds",
      icon: <BookOpen className="h-10 w-10" />,
      color: "from-indigo-600 to-purple-700",
      quote: "'Reading is a discount ticket to everywhere.' — Mary Schmich",
      background: "bg-gradient-to-r from-blue-400 to-indigo-500",
    },
    {
      title: "Monthly Book Clubs",
      description:
        "Join our reading communities and connect with fellow book lovers in meaningful discussions",
      icon: <Heart className="h-10 w-10" />,
      color: "from-rose-600 to-pink-700",
      quote:
        "'A reader lives a thousand lives before he dies.' — George R.R. Martin",
      background: "bg-gradient-to-r from-rose-400 to-pink-500",
    },
    {
      title: "Curated Collections",
      description:
        "Handpicked recommendations based on your preferences and reading history",
      icon: <Star className="h-10 w-10" />,
      color: "from-amber-500 to-orange-600",
      quote: "'Books are a uniquely portable magic.' — Stephen King",
      background: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      title: "Bestsellers & Trending",
      description:
        "Stay updated with the most talked-about titles that everyone is reading",
      icon: <TrendingUp className="h-10 w-10" />,
      color: "from-emerald-500 to-teal-700",
      quote:
        "'The more that you read, the more things you will know.' — Dr. Seuss",
      background: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      title: "Award Winners",
      description:
        "Explore literary masterpieces recognized for their excellence and cultural impact",
      icon: <Award className="h-10 w-10" />,
      color: "from-blue-500 to-cyan-700",
      quote:
        "'Reading is to the mind what exercise is to the body.' — Joseph Addison",
      background: "bg-gradient-to-r from-cyan-400 to-blue-500",
    },
    {
      title: "Cozy Reading Corners",
      description:
        "Visit our physical stores with comfortable spaces designed for peaceful reading",
      icon: <Coffee className="h-10 w-10" />,
      color: "from-yellow-500 to-amber-700",
      quote:
        "'Books are the quietest and most constant of friends.' — Charles W. Eliot",
      background: "bg-gradient-to-r from-amber-400 to-yellow-500",
    },
    {
      title: "15-Minute Reading Challenge",
      description:
        "Transform your daily routine with our guided short reading sessions",
      icon: <Clock className="h-10 w-10" />,
      color: "from-purple-500 to-violet-700",
      quote: "'Reading is an exercise in empathy.' — Malorie Blackman",
      background: "bg-gradient-to-r from-violet-400 to-purple-500",
    },
    {
      title: "Expand Your Knowledge",
      description:
        "Discover non-fiction titles that inspire growth and deeper understanding",
      icon: <Brain className="h-10 w-10" />,
      color: "from-cyan-500 to-blue-700",
      quote: "'A book is a dream you hold in your hands.' — Neil Gaiman",
      background: "bg-gradient-to-r from-blue-400 to-cyan-500",
    },
  ];
  
  export default function BookSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [direction, setDirection] = useState("right");
    const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
    const [leaderDirection, setLeaderDirection] = useState("right");
    const timeoutRef = useRef(null);
    const leaderTimeoutRef = useRef(null);
  
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  
    const resetLeaderTimeout = () => {
      if (leaderTimeoutRef.current) {
        clearTimeout(leaderTimeoutRef.current);
      }
    };
  
    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => {
          goToNext();
        },
        1000 // Auto-advance every 1 second
      );
  
      return () => {
        resetTimeout();
      };
    }, [currentIndex]);
  
    useEffect(() => {
      resetLeaderTimeout();
      leaderTimeoutRef.current = setTimeout(
        () => {
          nextLeader();
        },
        1000 // Auto-advance every 1 second
      );
  
      return () => {
        resetLeaderTimeout();
      };
    }, [currentLeaderIndex]);
  
    const goToPrev = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection("left");
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? features.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsAnimating(false), 500);
      resetTimeout();
    };
  
    const goToNext = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection("right");
      setCurrentIndex((prevIndex) =>
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsAnimating(false), 500);
      resetTimeout();
    };
  
    const nextLeader = () => {
      setLeaderDirection("right");
      setCurrentLeaderIndex((prevIndex) =>
        prevIndex === leaders.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevLeader = () => {
      setLeaderDirection("left");
      setCurrentLeaderIndex((prevIndex) =>
        prevIndex === 0 ? leaders.length - 1 : prevIndex - 1
      );
    };
  
    const goToIndex = (index) => {
      if (isAnimating || index === currentIndex) return;
      setIsAnimating(true);
      setDirection(index > currentIndex ? "right" : "left");
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
      resetTimeout();
    };
  
    const currentFeature = features[currentIndex];
    const currentLeader = leaders[currentLeaderIndex];
  
    return (
      <div className="w-full mx-auto relative overflow-hidden py-8 px-4">
        {/* Animated background with particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute inset-0 ${currentFeature.background} opacity-20 transition-all duration-1000 ease-in-out`}></div>
          {/* Animated particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute rounded-full opacity-20 animate-float bg-gradient-to-r ${currentFeature.color}`}
                style={{
                  width: `${Math.random() * 2 + 0.5}rem`,
                  height: `${Math.random() * 2 + 0.5}rem`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
  
        {/* Main content wrapper */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header with animated text */}
          <div className="text-center mb-8 overflow-hidden">
            <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 inline-block transform transition-all duration-700 animate-pulse">
              Booklovers Haven
            </h1>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto animate-fadeIn">
              Discover a world of stories, knowledge, and imagination
            </p>
          </div>
  
          {/* Feature slider card with glassmorphism */}
          <div className="w-full overflow-hidden rounded-2xl relative backdrop-filter backdrop-blur-md bg-white bg-opacity-30 border border-white border-opacity-30 shadow-xl transition-all duration-500 hover:shadow-2xl">
            {/* Content container */}
            <div className="flex flex-col lg:flex-row items-center p-6 md:p-8 min-h-96">
              {/* Left content: Feature information with animations */}
              <div className="w-full lg:w-3/5 text-center lg:text-left p-4 md:p-6 flex flex-col items-center lg:items-start">
                <div
                  className={`p-4 rounded-full bg-gradient-to-r ${currentFeature.color} text-white shadow-lg transition-all duration-700 transform hover:rotate-12 hover:scale-110 group`}
                >
                  <div className="transform transition-transform duration-500 group-hover:rotate-12">
                    {currentFeature.icon}
                  </div>
                </div>
  
                <h2
                  className={`text-3xl md:text-4xl font-bold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r ${currentFeature.color} transform transition-all duration-700 ${
                    isAnimating
                      ? direction === "right" 
                        ? "translate-x-full opacity-0" 
                        : "-translate-x-full opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  {currentFeature.title}
                </h2>
  
                <div className="w-16 h-1 rounded-full mb-4 bg-gradient-to-r transition-all duration-700 transform ${currentFeature.color}"></div>
  
                <p
                  className={`text-lg md:text-xl text-gray-700 mb-6 max-w-lg transition-all duration-700 ${
                    isAnimating
                      ? direction === "right" 
                        ? "translate-y-8 opacity-0" 
                        : "translate-y-8 opacity-0"
                      : "translate-y-0 opacity-100"
                  } delay-100`}
                >
                  {currentFeature.description}
                </p>
  
                <button 
                  className={`px-6 py-3 rounded-full bg-gradient-to-r ${currentFeature.color} text-white font-semibold shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${
                    isAnimating ? "opacity-0" : "opacity-100"
                  }`}
                >
                  Explore Now
                </button>
              </div>
  
              {/* Right content: Quote card with animations */}
              <div className="w-full lg:w-2/5 mt-8 lg:mt-0 p-4">
                <div
                  className={`bg-white rounded-2xl shadow-lg p-8 relative transition-all duration-700 transform ${
                    isAnimating
                      ? direction === "right"
                        ? "translate-x-full opacity-0 rotate-6" 
                        : "-translate-x-full opacity-0 -rotate-6"
                      : "translate-x-0 opacity-100 rotate-0"
                  } hover:shadow-2xl group`}
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform transition-transform duration-500 group-hover:scale-110">
                    <Quote className="w-6 h-6" />
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-lg italic text-gray-700 relative z-10 transition-all duration-500 group-hover:scale-105">
                      {currentFeature.quote}
                    </p>
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${currentFeature.color} rounded-full my-4 transition-all duration-500 group-hover:w-24`}
                    ></div>
                    <p className="text-sm text-gray-500">
                      Reading opens worlds of possibility
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Bottom navigation with enhanced design */}
            <div className="flex items-center justify-between p-4 pb-5 border-t border-gray-100 border-opacity-30">
              {/* Page indicators with pulse effect */}
              <div className="flex-1 flex justify-center">
                <div className="flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`h-2 rounded-full transition-all duration-500 transform ${
                        index === currentIndex
                          ? `w-10 bg-gradient-to-r ${features[index].color} animate-pulse`
                          : "w-2 bg-gray-300 hover:bg-gray-400 hover:w-6"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
  
              {/* Navigation arrows with hover effects */}
              <div className="flex space-x-3">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Previous feature"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
  
                <button
                  onClick={goToNext}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  aria-label="Next feature"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
  
          {/* Reading awareness section with improved design */}
          <div className="mt-10 p-6 backdrop-filter backdrop-blur-md bg-white bg-opacity-40 rounded-xl shadow-md transition-all duration-500 hover:shadow-xl border border-white border-opacity-20 transform hover:-translate-y-1">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6 p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Why Reading Matters
                </h3>
                <p className="text-gray-600">
                  Reading just 15 minutes a day improves cognitive function, reduces
                  stress by 68%, and builds empathy. Join thousands of readers
                  transforming their lives one page at a time.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Focus", "Empathy", "Knowledge", "Relaxation"].map((benefit, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Leaders' thoughts section with enhanced animation */}
          <div className="mt-10 rounded-xl overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${currentFeature.color} opacity-20 transition-all duration-1000 ease-in-out`}
            ></div>
  
            <div className="p-8 backdrop-filter backdrop-blur-sm relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Wisdom from Literary Leaders
                </h3>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={prevLeader}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextLeader}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-80 shadow-md hover:shadow-lg transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center overflow-hidden relative">
                {/* Leader image with animated border */}
                <div className="relative mb-6 md:mb-0 md:mr-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10">
                    <img
                      src={currentLeader.image}
                      alt={currentLeader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow opacity-30"></div>
                </div>
  
                <div
                  className="flex-1 transition-all duration-700 transform"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: isAnimating 
                      ? `translateX(${leaderDirection === 'right' ? '100px' : '-100px'})` 
                      : 'translateX(0)'
                  }}
                >
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-800">
                      {currentLeader.name}
                    </h3>
                    <p className="text-xl italic text-gray-700">"{currentLeader.thought}"</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Global CSS for animations */}
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .animate-float { animation: float linear infinite; }
          .animate-fadeIn { animation: fadeIn 1s ease-out; }
          .animate-pulse { animation: pulse 2s infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        `}</style>
      </div>
    );
  }