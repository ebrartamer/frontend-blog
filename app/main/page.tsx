"use client"
import { PlusIcon } from "lucide-react"
import Card from "@/components/ui/card"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/lib/store"
import { fetchCategories } from "@/lib/features/category/categorySlice"
import { fetchTags } from "@/lib/features/tag/tagSlice"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

const posts = [
  { id: 1, title: "The dumbest decision I ever made (and the Nobel Prize that explains it)", date: "1 Dec", author: { name: "Ebrar Tamer", image: "/assets/users/me2.jpeg" } },
  { id: 2, title: "The dumbest decision I ever made (and the Nobel Prize that explains it)", date: "2 Dec", author: { name: "Ebrar Tamer", image: "/assets/users/me2.jpeg" } },
];

const topics = [
  { name: "Self Improvement" },
  { name: "Politics" },
  { name: "Remote Work" },
  { name: "Leadership" },
  { name: "Immigration" },
  { name: "Makers" },
  { name: "Technology" },
  { name: "Programming" },
  { name: "Design" },
  { name: "Writing" },
];

export default function MainContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading } = useSelector((state: RootState) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <main className="container mx-auto mt-12 px-4 lg:px-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol Sütun (8 birim) */}
        <div className="w-full 0 md:w-2/3">
          <div className="w-full">
            <div className="container border-b border-gray-200 mx-auto flex items-center space-x-6 pb-4 px-4">
              {/* "+" Button */}
              <button className="flex items-center justify-center w-8 h-8 hover:bg-blue-100">
                <PlusIcon />
              </button>

              {/* Menu Items */}
              <ul className="flex items-center space-x-6 overflow-x-auto">
                {!isLoading && categories && categories.length > 0 && categories.map((category: any) => (
                  <li key={category.name}>
                    <a
                      href={`/category/${category.name}`}
                      className="text-m font-medium text-gray-700 hover:text-black transition-colors whitespace-nowrap"
                    >
                      {category.name}
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
        <div className="w-full md:w-1/3 space-y-8">
          {/* Popular Posts */}
          <div>
            <h2 className="text-xl font-sans text-primary font-bold mb-4">Popular Posts</h2>
            <div className="flex flex-col space-y-8 bg-white dark:bg-gray-800 p-4 rounded-lg">
              {posts.map((post) => (
                <div key={post.id} className="flex flex-col space-y-2">
                  {/* Profil Resmi ve Yazar Bilgileri */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-accent font-medium">{post.author.name}</p>
                  </div>

                  {/* Başlık */}
                  <h2 className="text-lg font-semibold text-secondary dark:text-white  transition-colors cursor-pointer">
                    {post.title}
                  </h2>

                  {/* Tarih */}
                  <div className="flex items-center text-sm text-gray-500 space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Topics */}
          <div>
            <h2 className="text-xl text-primary font-sans font-bold mb-4">Recommended Topics</h2>
            <div className="flex flex-wrap gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg">
              {topics.map((topic) => (
                <Button
                  key={topic.name}
                  variant="outline"
                  className="rounded-full font-sans text-sm hover:bg-gray-50 border-none bg-gray-100 text-secondary transition-colors"
                  size="sm"
                >
                  {topic.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}   