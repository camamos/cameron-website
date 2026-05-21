
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ArrowRight, Star, Instagram, Twitter, Youtube } from 'lucide-react';
import IntakeModal from './components/IntakeModal';
import VideoCard from './components/VideoCard';
import { UPCOMING_SHOWS, STANDUP_VIDEOS, SKIT_VIDEOS } from './constants';
import { UserIntakeData } from './types';
import { generateWelcomeMessage } from './services/geminiService';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userData, setUserData] = useState<UserIntakeData | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");

  const handleIntakeSubmit = async (data: UserIntakeData) => {
    setUserData(data);
    setIsModalOpen(false);
    
    // Generate AI welcome message
    const msg = await generateWelcomeMessage(data);
    setWelcomeMessage(msg);
  };

  // Optional: Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-black font-sans selection:bg-black selection:text-white">
      
      {/* Intake Modal */}
      <IntakeModal 
        isOpen={isModalOpen} 
        onSubmit={handleIntakeSubmit}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Marquee Banner - Optimized */}
      <div className="absolute md:fixed top-0 w-full z-50 bg-[#EF5B25] text-black overflow-hidden py-6 border-b-4 border-black shadow-xl">
        <div className="whitespace-nowrap animate-marquee flex items-center">
          {/* Increased count to ensure smooth loop on wide screens without glitches */}
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="mx-24 text-5xl md:text-6xl font-black tracking-widest italic uppercase flex items-center gap-8 select-none text-white">
                New Show Dates <Star className="fill-white text-white w-12 h-12" />
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="absolute md:fixed top-24 w-full z-40 transition-all duration-300 bg-gradient-to-b from-white/90 to-transparent pb-10 pt-4 pointer-events-none">
        <div className="container mx-auto px-6 flex items-center justify-between pointer-events-auto">
          <div className="text-3xl font-black tracking-tighter italic text-black drop-shadow-sm group cursor-pointer bg-white px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            CAM<span className="text-[#EF5B25] group-hover:text-black transition-colors">AMOS</span>
          </div>
          
          {/* Right Side Grouping */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-4 text-sm font-bold tracking-widest uppercase text-black">
                <a href="#shows" className="bg-white px-4 py-2 border-2 border-black hover:bg-[#003C43] hover:text-white transition-colors shadow-[4px_4px_0px_0px_#000]">Shows</a>
                <a href="#standup" className="bg-white px-4 py-2 border-2 border-black hover:bg-[#1E3A8A] hover:text-white transition-colors shadow-[4px_4px_0px_0px_#000]">Standup</a>
                <a href="#sketches" className="bg-white px-4 py-2 border-2 border-black hover:bg-[#059669] hover:text-white transition-colors shadow-[4px_4px_0px_0px_#000]">Sketches</a>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-none font-black hover:bg-[#EF5B25] hover:text-white transition-all text-xs tracking-widest uppercase border-2 border-transparent shadow-[4px_4px_0px_0px_#EF5B25] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                Get Tickets
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-end justify-center overflow-hidden pb-32 pt-40 border-b-4 border-black">
        <div className="absolute inset-0 z-0">
            {/* Updated gradients for light vibrant theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#003C43] via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 bg-[#EF5B25]/10 mix-blend-overlay z-10"></div>
            
            {/* 
                🔴 ACTION: Replace the src below with the URL of your main hero photo.
            */}
            <img 
                src="https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=2070&auto=format&fit=crop" 
                alt="Cam Amos on stage" 
                className="w-full h-full object-cover object-top"
            />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
            <h1 className="text-[15vw] leading-[0.8] font-black text-white mb-8 tracking-tighter uppercase drop-shadow-[8px_8px_0px_#000]">
                CAM AMOS
            </h1>
            
            {welcomeMessage && (
                <div className="max-w-2xl mx-auto bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_#EF5B25] rotate-1">
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-black italic">"{welcomeMessage}"</p>
                      <p className="text-xs text-[#EF5B25] mt-2 uppercase tracking-widest font-black">- AI Cam</p>
                    </div>
                </div>
            )}
        </div>
      </section>

      {/* Show Dates Section - DEEP TEAL */}
      <section id="shows" className="py-24 bg-[#003C43] relative border-b-4 border-black">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-16 border-b-4 border-white/20 pb-8">
                <div className="flex items-center gap-4">
                    <div className="bg-[#EF5B25] p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Calendar className="text-black" size={32} />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white drop-shadow-lg">Upcoming Shows</h2>
                </div>
                <p className="text-black uppercase tracking-widest font-bold text-sm bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_#EF5B25]">Don't see your city? Join the waitlist.</p>
            </div>

            <div className="grid gap-6">
                {UPCOMING_SHOWS.map((show) => (
                    <div key={show.id} className="group bg-white hover:bg-[#FACC15] border-4 border-black p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 mb-6 md:mb-0 w-full">
                            <div className="text-black font-black text-4xl w-32 border-r-4 border-black md:pr-8 leading-none flex flex-col">
                                <span className="text-lg font-bold tracking-widest text-gray-500 group-hover:text-black">2025</span>
                                {new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl md:text-4xl font-black text-black uppercase mb-1 tracking-tight">{show.city}</h3>
                                <div className="flex items-center text-gray-500 group-hover:text-black font-bold text-lg uppercase tracking-wider">
                                    <MapPin size={18} className="mr-2" />
                                    {show.venue}
                                </div>
                            </div>
                        </div>
                        
                        {show.soldOut ? (
                            <span className="whitespace-nowrap px-6 py-3 bg-black text-white font-black text-sm tracking-widest border-2 border-black -rotate-2">
                                SOLD OUT
                            </span>
                        ) : (
                            <a href={show.ticketLink} className="whitespace-nowrap px-10 py-4 bg-[#EF5B25] text-black border-2 border-black font-black text-sm tracking-widest hover:bg-black hover:text-white transition-colors uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                Tickets <ArrowRight size={16} />
                            </a>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-16 text-center">
                <button className="bg-transparent border-4 border-white text-white px-10 py-4 text-xl font-black uppercase tracking-widest hover:bg-white hover:text-[#003C43] transition-all shadow-[4px_4px_0px_0px_#000]">
                    View All Dates
                </button>
            </div>
        </div>
      </section>

      {/* Standup Section - DARK NAVY BLUE */}
      <section id="standup" className="py-24 bg-[#1E3A8A] relative border-b-4 border-black">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff),linear-gradient(45deg,#fff_25%,transparent_25%,transparent_75%,#fff_75%,#fff)] [background-size:20px_20px] [background-position:0_0,10px_10px]"></div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Centered Header */}
            <div className="flex items-center justify-center gap-4 mb-16">
                <div className="w-16 h-1 bg-white"></div>
                <h2 className="text-5xl md:text-7xl font-black uppercase italic text-white tracking-tighter drop-shadow-[4px_4px_0px_#000]">Stand Up</h2>
                <div className="w-16 h-1 bg-white"></div>
            </div>

            {/* Centered Flex Grid for Stand Up - Matching Sketches Layout */}
            <div className="flex flex-wrap justify-center gap-8">
                {STANDUP_VIDEOS.map((video) => (
                    <div key={video.id} className="w-full md:w-[600px]">
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Sketches Section - VIBRANT EMERALD GREEN */}
      <section id="sketches" className="py-24 bg-[#059669] relative border-b-4 border-black">
         {/* Pattern - Dots */}
         <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_2px,transparent_2px)] [background-size:24px_24px]"></div>

         <div className="container mx-auto px-6 relative z-10">
            {/* Centered Header */}
            <div className="flex items-center justify-center gap-4 mb-16">
                <h2 className="text-5xl md:text-7xl font-black uppercase italic text-white tracking-tighter drop-shadow-[4px_4px_0px_#000] text-center">Sketches</h2>
                <div className="bg-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                    <Youtube size={32} className="text-[#059669]" />
                </div>
            </div>

            {/* Centered Flex Grid for Sketches */}
            <div className="flex flex-wrap justify-center gap-8">
                {SKIT_VIDEOS.map((video) => (
                    <div key={video.id} className="w-full md:w-[600px]">
                         <VideoCard video={video} />
                    </div>
                ))}
            </div>
            
            <div className="mt-16 flex justify-center">
                <button className="bg-white text-black border-4 border-black px-8 py-3 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center gap-2">
                    <Youtube size={20} />
                    Subscribe on YouTube
                </button>
            </div>
         </div>
      </section>

      {/* About Me Section - SPLIT VIEW */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Left: Image */}
        <div className="relative h-[50vh] md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-black overflow-hidden bg-black">
            {/* 
                🔴 ACTION: Replace the src below with a portrait/headshot for the About section.
            */}
            <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop" 
                alt="Cam Amos Portrait" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 hover:grayscale"
            />
        </div>

        {/* Right: Content */}
        <div className="bg-[#EF5B25] p-8 md:p-16 flex flex-col justify-center items-center text-center relative">
             <div className="max-w-lg">
                <h2 className="text-white mb-8 tracking-tighter drop-shadow-[4px_4px_0px_#000] flex flex-col items-center leading-none">
                    <span className="text-3xl md:text-4xl font-black uppercase italic block mb-2 opacity-90">ABOUT</span>
                    <span className="text-6xl md:text-8xl font-black uppercase italic block">CAM AMOS</span>
                </h2>
                
                <div className="space-y-6 text-lg md:text-xl font-bold text-white leading-relaxed">
                    <p className="drop-shadow-md">
                        Cam Amos is a stand-up comedian, writer & actor. He can be seen just about everywhere on the internet and has collectively built a digital thumbprint of over 4 Billion views across his social media channels with a following of over 20 Million fans collectively.
                    </p>
                    <p className="drop-shadow-md">
                        He has been featured on Comedy Central, MTV, Barstool Sports, E! News, The L.A. Times, The New York Times, Ad Age, Business Insider, Men’s Health, Buzzfeed, Fox TV and Complex to name a few.
                    </p>
                    <p className="drop-shadow-md">
                        Cam was also voted as a finalist for "Best in Comedy" at the 2020 Shorty Awards.
                    </p>
                </div>

                <div className="flex gap-4 mt-10 justify-center">
                    <a href="#" className="bg-black p-3 text-white hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_#fff]">
                        <Instagram size={24} />
                    </a>
                    <a href="#" className="bg-black p-3 text-white hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_#fff]">
                        <Twitter size={24} />
                    </a>
                    <a href="#" className="bg-black p-3 text-white hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_#fff]">
                        <Youtube size={24} />
                    </a>
                </div>
             </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t-4 border-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tighter italic">
            CAM<span className="text-[#EF5B25]">AMOS</span>
          </div>
          <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
            © 2024 Cam Amos. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
