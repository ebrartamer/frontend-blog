import Link from 'next/link';
import { SearchIcon } from 'lucide-react';
const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/" className="text-lg font-bold">
        Blog
      </Link>
      {/* Arama butonu 
      <Link href="/search" className="hover:text-blue-500">
        <SearchIcon className="w-5 h-5" />
        <span>Ara</span>
      </Link>
      */}
    </div>
  );
};

export default Navbar;