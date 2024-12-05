import { Heart, MessageCircle, Bookmark } from "lucide-react";

export default function BlogPage() {

        return (
          <div className="max-w-4xl font-sans mx-auto py-24 px-4">
            {/* Başlık */}
            <h1 className="text-4xl font-bold text-primary  text-center leading-tight">
              This new JavaScript operator is an absolute game changer
            </h1>
      
            {/* Yazar Bilgisi */}
            <div className="flex items-center justify-center mt-6 space-x-4 space-y-2">
              <img
                src="/assets/users/me2.jpeg"
                alt="Ebrar Tamer"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex flex-row items-center justify-between"> 
                    <p className="text-gray-800 font-semibold">Ebrar Tamer </p>
                    <button className="text-green-600 font-medium">· Follow </button>
                </div>
                <p className="text-sm text-gray-500">4 min read · Dec 01, 2024</p>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
      
    </div>
              
            </div>
      {/* Beğeni ve Yorumlar */}
      <div className="flex min-h-6  items-center justify-between border-y border-gray-200 mt-6 py-6 space-x-6 text-gray-500">
      <div className="flex  space-x-6">
          {/* Beğeni */}
          <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-primary" />
          <span className="text-sm text-secondary font-medium">10k</span>
        </div>

        {/* Yorumlar */}
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span className="text-sm text-secondary font-medium">10k</span>
        </div>
      </div>
       {/* Kaydet */}
       <div>
        <Bookmark className="h-5 w-5 text-primary" />
      </div>
      </div>

     
            {/* Görsel */}
            <div className="mt-8">
              <img
                src="/assets/blog-photo.png"
                alt="Article Visual"
                className="w-full rounded-lg"
              />
            </div>
      
            {/* İçerik */}
            <div className="mt-6 text-gray-700 space-y-4">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat
                pretium, mi sed id dui sed orci, tempor. Pellentesque egestas odio
                enim, accumsan, cursus. Fermentum in bibendum aliquet est viverra eu
                vitae in nibh.
              </p>
              <p>
                Leo, feugiat amet neque, quis. Amet, eget vulputate cursus in eu sit
                pulvinar et. Nibh at sem viverra pellentesque hac odio duis a.
              </p>
            </div>
      
            {/* Etiketler */}
            <div className="mt-6 flex space-x-2">
              <span className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-full">
                Since
              </span>
              <span className="px-3 py-1 bg-gray-200 text-sm text-gray-600 rounded-full">
                Art
              </span>
            </div>
      
            {/* Yanıtlar */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800">Responses</h3>
              <div className="mt-4">
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  placeholder="What are your thoughts?"
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg">
                  Respond
                </button>
              </div>
            </div>
      
            {/* Yanıt */}
            <div className="mt-6 flex space-x-4">
              <img
                src="/assets/users/me2.jpeg"
                alt="Ebrar Tamer"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">Ebrar Tamer</p>
                <p className="text-sm text-gray-600">26 days ago</p>
                <p className="mt-2 text-gray-700">
                  I use Node with a large medical company in the US. We use Kubernetes
                  to scale Node clusters...
                </p>
                <div className="flex items-center space-x-4 mt-2 text-gray-500 text-sm">
                  <div className="flex items-center space-x-1">
                    <span>23</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Reply</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      

