import { memo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface Album {
  id: string
  title: string
  description: string | null
  category: string
  coverImage: string | null
  imageCount: number
  createdAt: string
  slug?: string
}

interface PhotographySectionProps {
  albums: Album[];
}

const PhotographySection = memo(({ albums }: PhotographySectionProps) => {
  const [filter, setFilter] = useState('Tous');
  
  const categories = Array.from(
    new Set(['Tous', ...albums.map(album => album.category)])
  );
  
  const filteredAlbums = albums.filter(album => 
    filter === 'Tous' ? true : album.category === filter
  );

  return (
    <section id="photography" className="w-[98%] sm:w-[95%] md:w-[92%] lg:w-[90%] max-w-6xl mx-auto mb-16 sm:mb-24">
      <div className="relative">
        <div className="absolute -top-6 left-4 transform -rotate-2 z-10">
          <div className="bg-[#E9B949] text-black font-bold px-4 py-2 rounded-full border-2 border-black text-sm sm:text-base">
            Photographie
          </div>
        </div>

        <div className="relative border-4 sm:border-6 border-black bg-white p-4 sm:p-6 md:p-8 rounded-xl">
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-xl -z-10"></div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 mt-4">Ma galerie photo</h2>

          {/* Filtres */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full border-2 border-black transition-colors ${
                  filter === category 
                    ? 'bg-black text-white' 
                    : category === 'Tous' 
                      ? 'bg-[#E9B949] hover:bg-gray-100'
                      : 'bg-white hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grille de photos - affichage conditionnel basé sur l'état du filtre */}
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-bold mb-2">Aucun album trouvé</h3>
              <p className="text-gray-600">Aucun album dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {filteredAlbums.slice(0, 2).map((album, index) => (
                <Link
                  key={album.id}
                  href={`/work/gallery/${album.slug || album.id}`}
                  className={`relative border-4 border-black rounded-xl overflow-hidden ${
                    index === 0 ? 'col-span-12 md:col-span-8 row-span-2' : 'col-span-12 md:col-span-4'
                  }`}
                >
                  <div className="relative aspect-[4/3]">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-black">
                    <h3 className="text-xl font-bold">{album.title}</h3>
                    <p className="text-gray-600">{album.category}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {album.imageCount} photos
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Grille supplémentaire si plus de 2 albums */}
          {filteredAlbums.length > 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredAlbums.slice(2, 5).map((album) => (
                <Link
                  key={album.id}
                  href={`/work/gallery/${album.slug || album.id}`}
                  className="relative border-4 border-black rounded-xl overflow-hidden group"
                >
                  <div className="relative aspect-[4/3]">
                    {album.coverImage ? (
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-4 border-black">
                    <h3 className="text-lg font-bold truncate">{album.title}</h3>
                    <p className="text-gray-600 text-sm">{album.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bouton Voir plus si plus de 5 albums */}
          {filteredAlbums.length > 5 && (
            <div className="mt-8 text-center">
              <Link
                href="/work/gallery"
                className="relative inline-block group"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5"></div>
                <div className="relative px-6 py-2 bg-white border-2 border-black rounded-full font-medium flex items-center transition-transform group-hover:-translate-y-0.5">
                  Voir plus de photos
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

PhotographySection.displayName = 'PhotographySection';

export default PhotographySection;