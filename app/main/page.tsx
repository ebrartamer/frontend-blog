import { PlusIcon } from "lucide-react"
import Card from "@/components/ui/card"

const menuItems = [
    { label: "For You", href: "/for-you" },
    { label: "Following", href: "/following" },
    { label: "Philosophy", href: "/philosophy" },
    { label: "Immigration", href: "/immigration" },
    { label: "Makers", href: "/makers" },
    { label: "Remote Work", href: "/remote-work" },
    { label: "Leadership", href: "/leadership" },
  ];


export default function MainContent() {
  return (
    <main className="container mx-auto mt-12 px-4 lg:px-24">
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
          <h2 className="text-xl font-sans font-bold">Popular Posts</h2>
          <div className="flex flex-col space-y-3 bg-white p-4 rounded-lg ">
      {/* Profil Resmi ve Yazar Bilgileri */}
      <div className="flex items-center space-x-4">
        <img
          src="/assets/users/me2.jpeg" // Profil resmini "public" klasöründe saklayabilirsiniz
          alt="Ebrar Tamer"
          className="w-10 h-10 rounded-full"
        />
        <p className="text-green-600 font-medium">Ebrar Tamer</p>
      </div>

      {/* Başlık */}
      <h2 className="text-lg font-semibold text-gray-800">
        The dumbest decision I ever made (and the Nobel Prize that explains it)
      </h2>

      {/* Tarih */}
      <div className="flex items-center text-sm text-gray-500 space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7V3m8 4V3M3 11h18M4 21h16a2 2 0 002-2v-7H2v7a2 2 0 002 2z"
          />
        </svg>
        <span>1 Dec</span>
      </div>
    </div>
        </div>
      </div>
    </main>
  );
}