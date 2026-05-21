
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoSliderProps {
  videos: Video[];
  title: string;
}

const VideoSlider: React.FC<VideoSliderProps> = ({ videos, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <div className="w-full">
      {/* Centered Header Section */}
      <div className="flex flex-col items-center justify-center gap-8 mb-10 relative">
        <h2 
          className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-[#EF5B25] text-center leading-none"
          style={{ 
            textShadow: '3px 3px 0px #18181b, -1px -1px 0px #18181b, 1px -1px 0px #18181b, -1px 1px 0px #18181b, 3px 0px 0px #18181b, 0px 3px 0px #18181b' 
          }}
        >
          {title}
        </h2>
        
        {/* Navigation Arrows - Solid black for light background contrast */}
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black hover:bg-[#EF5B25] text-white flex items-center justify-center transition-all border-2 border-black/10 hover:border-black shadow-xl"
            aria-label="Previous video"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-black hover:bg-[#EF5B25] text-white flex items-center justify-center transition-all border-2 border-black/10 hover:border-black shadow-xl"
            aria-label="Next video"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Slider Content */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div 
              key={video.id} 
              className="w-full shrink-0 px-2 md:w-1/2"
            >
              <div className="scale-100 md:scale-[0.98] hover:scale-100 transition-transform duration-300">
                <VideoCard video={video} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicator Bar */}
      <div className="flex justify-center gap-3 mt-10">
        {videos.map((_, i) => (
            <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${currentIndex === i ? 'w-12 bg-[#EF5B25]' : 'w-3 bg-zinc-300'}`}
            />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
