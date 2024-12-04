import { PlusIcon } from "lucide-react"
import Card from "@/components/ui/card"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button";

const menuItems = [
    { label: "For You", href: "/for-you" },
    { label: "Following", href: "/following" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Immigration", href: "/immigration" },
    { label: "Makers", href: "/makers" },
    { label: "Remote Work", href: "/remote-work" },
    { label: "Leadership", href: "/leadership" },
  ];

  const posts = [
    { id: 1, title: "The dumbest decision I ever made (and the Nobel Prize that explains it)", date: "1 Dec", author: { name: "Ebrar Tamer", image: "/assets/users/me2.jpeg" } },
    { id: 2, title: "The dumbest decision I ever made (and the Nobel Prize that explains it)", date: "2 Dec", author: { name: "Ebrar Tamer", image: "/assets/users/me2.jpeg" } },
  ];

  const topics = [
    { label: "Self Improvement", href: "/self-improvement" },
    { label: "Politics", href: "/politics" },
    { label: "Remote Work", href: "/remote-work" },
    { label: "Leadership", href: "/leadership" },
    { label: "Immigration", href: "/immigration" },
    { label: "Makers", href: "/makers" },
  ];


export default function MainContent() {
  return (
    <main className="container font-sans mx-auto mt-12 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Sütun (8 birim) */}
        <div className="w-full md:w-2/3">
          <div className="w-full">
            <div className="container mx-auto flex items-center space-x-6 py-4 px-4">
              {/* "+" Button */}
              <button className="flex items-center justify-center w-8 h-8 hover:bg-blue-100">
                <PlusIcon />
              </button>

              {/* Menu Items */}
              <ul className="flex items-center space-x-6 overflow-x-auto">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card List */}
          <div className="mt-8">
            <Card />
          </div>
        </div>

        {/* Border */}
        <div className="hidden md:block w-px bg-border/60 mx-4"></div>

        {/* Sağ Sütun (4 birim) */}
        <div className="w-full md:w-1/3">
          <h2 className="text-xl font-sans mb-6">Popular Posts</h2>
          <div className="flex flex-col space-y-4 bg-white p-4 rounded-lg">
            {/* Profil Resmi ve Yazar Bilgileri */}
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col space-y-6">
                {/* Profil Resmi ve Yazar Bilgileri */}
                <div className="flex items-center space-x-4">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="text-green-600 font-medium">{post.author.name}</p>
                </div>

                {/* Başlık */}
                <h2 className="text-lg font-semibold text-gray-800">
                  {post.title}
                </h2>

                {/* Tarih */}
                <div className="flex items-center text-sm text-gray-500 space-x-2">
                <Calendar className="h-4 w-4" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3M3 11h18M4 21h16a2 2 0 002-2v-7H2v7a2 2 0 002 2z"
                    />
                  
                  <span>{post.date}</span>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-sans mt-4 mb-6">Recommended Topics</h2>
          <div className="flex flex-row flex-wrap gap-3 bg-white p-4  rounded-lg">
            {topics.map((topic) => (
              <Button key={topic.label} className="rounded-full bg-gray-100  hover:bg-gray-200">{topic.label}</Button>
            ))}

          </div>
        </div>
      </div>
    </main>
  );
}   