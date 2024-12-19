import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../lib/store';
import { searchBlogs } from '../../lib/features/search/searchSlice';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    try {
      await dispatch(searchBlogs({ 
        query: searchTerm,
        page: 1,
        limit: 10
      }));
    } catch (error) {
      console.error('Arama işlemi başarısız:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Blog ara..."
        className="px-4 py-2 border rounded-lg"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Ara
      </button>
    </form>
  );
} 