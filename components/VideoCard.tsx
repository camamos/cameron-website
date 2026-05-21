
import React, { useState } from 'react';
import { Play, MoreVertical } from 'lucide-react';
import { Video } from '../types';

const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeId = (url?: string) => {
    if (!url) return null;
    try {
        // Handle Shorts
        if (url.includes('/shorts/')) {
            return url.split('/shorts/')[1].split('?')[0];
        }
        // Handle Standard URLs
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    } catch (e) {
        return null;
    }
  };

  const videoId = getYoutubeId(video.link);

  const handleClick = (e: React.MouseEvent) => {
      if (videoId) {
          e.preventDefault();
          setIsPlaying(true);
      }
  };

  const content = (
    <div className="relative w-full aspect-video bg-zinc-900 overflow-hidden group">
        {isPlaying && videoId ? (
             <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full z-20 border-0"
             ></iframe>
        ) : (
             <>
                {/* Thumbnail Image */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
                
                {/* Top Overlay Gradient for Text Visibility */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

                {/* Video Info Overlay (Top Left) */}
                <div className="absolute top-4 left-4 z-10 flex items-start gap-3 max-w[80%]">
                    {/* Channel Icon Placeholder */}
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/20 shrink-0 overflow-hidden">
                        <img src="https://ui-avatars.com/api/?name=Cam+Amos&background=random" alt="Channel" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white font-medium text-sm md:text-base line-clamp-2 leading-tight drop-shadow-md">
                            {video.title}
                        </h3>
                    </div>
                </div>

                {/* Menu Icon (Top Right) */}
                <div className="absolute top-4 right-2 z-10 p-2 text-white/90 hover:text-white cursor-pointer">
                    <MoreVertical size={24} />
                </div>
                
                {/* Center Play Button (YouTube Style) */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-16 h-11 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-2xl transition-transform duration-200 group-hover:scale-110">
                    <Play className="text-white fill-white ml-1" size={20} />
                  </div>
                </div>

                {/* Duration Badge (Bottom Right) */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white px-1.5 py-0.5 text-[10px] font-bold rounded-sm z-10 uppercase tracking-tighter">
                  {video.duration}
                </div>
             </>
        )}
    </div>
  );

  // Removed custom shadow utility
  const containerClasses = "block w-full overflow-hidden rounded-[2rem] transition-transform duration-300 hover:scale-[1.01] bg-black cursor-pointer shadow-sm";

  if (videoId) {
      return (
        <div onClick={handleClick} className={containerClasses}>
            {content}
        </div>
      );
  }

  return (
    <a 
      href={video.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className={containerClasses}
    >
      {content}
    </a>
  );
};

export default VideoCard;
