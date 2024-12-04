import { Calendar, Heart, Share2 } from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    image: string;
  };
  title: string;
  description: string;
  date: string;
  likes: number;
  shares: number;
  image: string;
}

const posts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Ebrar Tamer',
      image: 'assets/users/me.jpeg'
    },
    title: 'This new JavaScript operator is an absolute game changer',
    description: 'Say good bye to try-catch',
    date: '1 Dec',
    likes: 10000,
    shares: 10000,
    image: '/newas.png'
  },
  {
    id: '2',
    author: {
      name: 'John Doe',
      image: 'assets/users/me.jpeg'
    },
    title: 'The Future of Web Development: What to Expect in 2024',
    description: 'New trends and technologies shaping the web',
    date: '2 Dec',
    likes: 8500,
    shares: 7200,
    image: '/newas.png'
  },
  {
    id: '3',
    author: {
      name: 'Jane Smith',
      image: 'assets/users/me.jpeg'
    },
    title: 'Understanding TypeScript: A Comprehensive Guide',
    description: 'Master TypeScript from basics to advanced concepts',
    date: '3 Dec',
    likes: 12000,
    shares: 9800,
    image: '/newas.png'
  }
];

export default function Card() {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col space-y-4 items-start p-6 bg-white dark:bg-gray-800  rounded-lg mb-6 hover:shadow-xl transition-shadow duration-200">
          {/* Profil Resmi ve Yazar Bilgileri */}
          <div className="flex  items-center space-x-4 mb-4 md:mb-0 md:mr-6">
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-12 h-12 rounded-full "
            />
            <div>
              <p className="text-accent font-semibold hover:text-accent/80 transition-colors cursor-pointer font-sans">
                {post.author.name}
              </p>
            </div>
          </div>

         <div className="flex flex-row">
           {/* İçerik */}
           <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-primary transition-colors cursor-pointer font-sans">
              {post.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-secondary mt-2 font-sans">{post.description}</p>

            {/* Etkileşimler */}
            <div className="flex items-center space-x-6 text-gray-400 dark:text-gray-500 text-sm mt-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span>{post.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                <Share2 className="h-4 w-4" />
                <span>{post.shares.toLocaleString()}</span>
              </button>
            </div>
          </div>

          {/* Görsel */}
          <div className="hidden md:block ml-6">
            <img
              src={post.image}
              alt="Post Illustration"
              className="w-32 h-auto rounded-lg "
            />
          </div>
         </div>
        </div>
      ))}
    </>
  );
}