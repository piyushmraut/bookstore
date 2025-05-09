import { useState, useEffect } from 'react'
import BookCard from './components/BookCard'
import SearchBar from './components/SearchBar'
import BookModal from './components/BookModal'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const API_KEY = 'AIzaSyBwf9vuLISlp_GBfDjuQvfilx1SVKLr2Wc'

  useEffect(() => {
    if (searchTerm.trim() === '') return

    const timer = setTimeout(() => {
      fetchBooks(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (searchTerm.length > 2) {
      const timer = setTimeout(() => {
        fetchSuggestions(searchTerm)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const fetchBooks = async (query) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${API_KEY}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch books')
      }
      const data = await response.json()
      setBooks(data.items || [])
    } catch (err) {
      setError(err.message)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${API_KEY}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch suggestions')
      }
      const data = await response.json()
      const suggestions = data.items
        ? data.items.map((item) => item.volumeInfo.title).slice(0, 5)
        : []
      setSuggestions(suggestions)
    } catch (err) {
      setSuggestions([])
    }
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion)
    setSuggestions([]) // Clear suggestions immediately
    fetchBooks(suggestion)
  }

  const handleBookClick = (book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBook(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Bookstore</h1>
        
        <SearchBar 
          searchTerm={searchTerm}
          suggestions={suggestions}
          onSearch={handleSearch}
          onSuggestionClick={handleSuggestionClick}
        />
        
        {loading && <div className="text-center py-8">Loading books...</div>}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {books.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
        
        {!loading && !error && books.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No books found. Try a different search term.
          </div>
        )}
      </div>

      {isModalOpen && selectedBook && (
        <BookModal book={selectedBook} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
