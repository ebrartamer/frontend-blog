import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';

const SearchResults = () => {
  const { results, loading } = useSelector((state: RootState) => state.search);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (!results.length) {
    return <div>Sonuç bulunamadı.</div>;
  }

  return (
    <div className="grid gap-4">
      {results.map((result: any) => (
        <Link 
          href={`/blog/${result._id}`} 
          key={result._id}
          className="p-4 border rounded hover:shadow-lg transition"
        >
          <h3 className="text-xl font-bold">{result._source.title || "Başlık bulunamadı"}</h3>
          {result.highlight?.content && (
            <div 
              className="mt-2"
              dangerouslySetInnerHTML={{ 
                __html: '...' + result.highlight.content[0] + '...' 
              }} 
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export default SearchResults; 