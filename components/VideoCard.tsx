
import React from 'react';
import { Play } from 'lucide-react';
import { Video } from '../types';

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  return (
    <a 
      href={video.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group relative cursor-pointer bg-white p-4 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_#000] transition-all duration-300 hover:-translate-y-2 hover:rotate-1"
    >
      <div className="relative overflow-hidden aspect-video bg-black border-2 border-black">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        
        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-[#EF5B25] border-2 border-black flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="text-white fill-white ml-1" size={32} />
          </div>
        </div>

        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black text-white border border-white/20 px-2 py-1 text-xs font-black uppercase tracking-wider">
          {video.duration}
        </div>
      </div>
      
      <div className="mt-4 px-1">
        <h3 className="text-black font-black text-2xl group-hover:text-[#EF5B25] transition-colors line-clamp-1 uppercase italic tracking-tight">
            {video.title}
        </h3>
        <div className="flex justify-between items-center mt-2 border-t-2 border-gray-100 pt-2">
             <p className="text-gray-500 font-bold text-sm uppercase tracking-widest">{video.views}</p>
             <div className="text-xs font-black bg-black text-white px-2 py-0.5">WATCH</div>
        </div>
      </div>
    </a>
  );
};

export default VideoCard;