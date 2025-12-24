import React, { useState } from 'react';
import { Image as ImageIcon, X, Download, Share2, ZoomIn, Heart, Filter, Plus } from 'lucide-react';
import { Card, Button, Badge } from './ui';

interface GalleryItem {
  id: string;
  src: string;
  category: string;
  title: string;
  likes: number;
}

// Using placeholder images with vivid colors to match aesthetic
const galleryItems: GalleryItem[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', category: 'Abstract', title: 'Liquid Oil', likes: 124 },
  { id: '2', src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', category: 'Photography', title: 'Neon City', likes: 89 },
  { id: '3', src: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop', category: 'Design', title: 'Typography', likes: 256 },
  { id: '4', src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop', category: 'Technology', title: 'Retro Computer', likes: 45 },
  { id: '5', src: 'https://images.unsplash.com/photo-1614850523060-8da1d56ae167?q=80&w=800&auto=format&fit=crop', category: 'Abstract', title: 'Cyber Fluid', likes: 167 },
  { id: '6', src: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=800&auto=format&fit=crop', category: 'Branding', title: 'Minimal Pack', likes: 92 },
];

const categories = ['All', 'Abstract', 'Photography', 'Design', 'Technology', 'Branding'];

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-neo-black pb-4 border-dashed">
        <div>
          <h1 className="text-4xl font-black text-neo-black uppercase tracking-tighter">Gallery</h1>
          <p className="text-neo-black font-mono text-sm mt-2 bg-neo-pink inline-block px-1">MEDIA ASSETS & INSPIRATION</p>
        </div>
        <Button icon={Plus}>Upload Media</Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
         {categories.map(cat => (
           <button
             key={cat}
             onClick={() => setSelectedCategory(cat)}
             className={`px-4 py-2 border-2 border-neo-black font-bold uppercase text-xs transition-all ${
                selectedCategory === cat 
                ? 'bg-neo-black text-white shadow-neo' 
                : 'bg-white hover:bg-neo-yellow hover:-translate-y-0.5'
             }`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
         {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="break-inside-avoid bg-white border-2 border-neo-black p-2 shadow-neo hover:shadow-neo-lg hover:-translate-y-1 transition-all cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
               <div className="relative overflow-hidden border-2 border-neo-black bg-gray-100">
                  <img src={item.src} alt={item.title} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-neo-black/0 group-hover:bg-neo-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                     <div className="bg-white p-2 border-2 border-neo-black shadow-neo">
                        <ZoomIn size={24} />
                     </div>
                  </div>
               </div>
               <div className="pt-3 pb-1 px-1 flex justify-between items-center">
                  <div>
                     <h3 className="font-bold uppercase text-sm leading-tight">{item.title}</h3>
                     <span className="text-xs font-mono text-gray-500">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold">
                     <Heart size={14} className="fill-neo-red text-neo-red" /> {item.likes}
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neo-black/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedImage(null)}>
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row bg-white border-4 border-neo-black shadow-[12px_12px_0px_0px_#fff]" onClick={e => e.stopPropagation()}>
               {/* Close Button */}
               <button 
                 onClick={() => setSelectedImage(null)}
                 className="absolute -top-6 -right-6 bg-neo-red text-white p-2 border-2 border-neo-black shadow-neo hover:scale-110 transition-transform z-10"
               >
                  <X size={24} strokeWidth={3} />
               </button>

               {/* Image Container */}
               <div className="flex-1 bg-neo-black flex items-center justify-center p-4 overflow-hidden border-b-4 md:border-b-0 md:border-r-4 border-neo-black">
                  <img src={selectedImage.src} alt={selectedImage.title} className="max-w-full max-h-[70vh] object-contain border-2 border-white shadow-neo" />
               </div>

               {/* Details Sidebar */}
               <div className="w-full md:w-80 p-8 flex flex-col bg-neo-bg">
                  <div className="mb-6">
                     <Badge variant="neutral" className="mb-2">{selectedImage.category}</Badge>
                     <h2 className="text-3xl font-black uppercase leading-none">{selectedImage.title}</h2>
                     <p className="font-mono text-xs text-gray-500 mt-2">Added on Oct 24, 2023</p>
                  </div>

                  <div className="space-y-4 flex-1">
                     <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                        <span className="font-bold uppercase text-sm">Dimensions</span>
                        <span className="font-mono text-sm">1920 x 1080</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                        <span className="font-bold uppercase text-sm">Size</span>
                        <span className="font-mono text-sm">2.4 MB</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-b-2 border-gray-200">
                        <span className="font-bold uppercase text-sm">Type</span>
                        <span className="font-mono text-sm">PNG</span>
                     </div>
                  </div>

                  <div className="mt-8 space-y-3">
                     <Button className="w-full" icon={Download}>Download Asset</Button>
                     <Button variant="secondary" className="w-full" icon={Share2}>Share Link</Button>
                  </div>
               </div>
            </div>
         </div>
      )}

    </div>
  );
};