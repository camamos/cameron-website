
import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Instagram, Youtube, Menu, X } from 'lucide-react';
import IntakeModal from './components/IntakeModal';
import VideoSlider from './components/VideoSlider';
import { UPCOMING_SHOWS, STANDUP_VIDEOS, SKIT_VIDEOS } from './constants';
import { UserIntakeData } from './types';
import { generateWelcomeMessage } from './services/geminiService';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [userData, setUserData] = useState<UserIntakeData | null>(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State to manage views ('home' or 'contact')
  const [currentView, setCurrentView] = useState<'home' | 'contact'>('home');

  const handleIntakeSubmit = async (data: UserIntakeData) => {
    setUserData(data);
    setIsModalOpen(false);
    
    // Generate AI welcome message
    try {
        const msg = await generateWelcomeMessage(data);
        setWelcomeMessage(msg);
    } catch (err) {
        console.error("Welcome generation error:", err);
        setWelcomeMessage(`Welcome to the crew, ${data.firstName}!`);
    }
  };

  // Prevent scrolling when modal is open or menu is open
  useEffect(() => {
    if (isModalOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen, isMobileMenuOpen]);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      
      if (target === 'contact') {
          setCurrentView('contact');
      } else {
          setCurrentView('home');
          // Allow time for the home view to render before scrolling
          setTimeout(() => {
            const element = document.getElementById(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
      }
  };

  // TikTok Icon Component (Outline for Nav)
  const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );

  // SLEEK FILLED ICONS (For Footer/About)
  const SleekInstagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const SleekTikTok = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.89 2.89 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );

  const SleekYouTube = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  const isContact = currentView === 'contact';
  const navTextColor = isContact ? 'text-black' : 'text-white';
  const navHoverColor = 'hover:text-[#EF5B25]';
  const navBg = isContact ? 'bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-[2px]';

  return (
    <div className={`min-h-screen ${isContact ? 'bg-white' : 'bg-black'} text-black font-sans selection:bg-[#EF5B25] selection:text-white`}>
      
      {/* Intake Modal */}
      {currentView === 'home' && (
        <IntakeModal 
            isOpen={isModalOpen} 
            onSubmit={handleIntakeSubmit}
            onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full p-8">
              <div className="flex justify-between items-center mb-16">
                  <span className="text-white text-2xl font-black tracking-tighter italic">CAM<span className="text-[#EF5B25]">AMOS</span></span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                      <X size={32} />
                  </button>
              </div>
              
              <div className="flex flex-col gap-8">
                  <a href="#shows" onClick={(e) => handleNavClick(e, 'shows')} className="text-4xl font-black text-white uppercase italic tracking-tighter hover:text-[#EF5B25]">Shows</a>
                  <a href="#standup" onClick={(e) => handleNavClick(e, 'standup')} className="text-4xl font-black text-white uppercase italic tracking-tighter hover:text-[#EF5B25]">Standup</a>
                  <a href="#sketches" onClick={(e) => handleNavClick(e, 'sketches')} className="text-4xl font-black text-white uppercase italic tracking-tighter hover:text-[#EF5B25]">Sketches</a>
                  <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-4xl font-black text-white uppercase italic tracking-tighter hover:text-[#EF5B25]">About</a>
                  <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-4xl font-black text-[#EF5B25] uppercase italic tracking-tighter">Contact</a>
              </div>

              <div className="mt-auto flex gap-6">
                  <a href="https://www.instagram.com/iamcameronamos/" className="text-white hover:text-[#EF5B25]"><SleekInstagram size={28} /></a>
                  <a href="https://www.tiktok.com/@iamcameronamos" className="text-white hover:text-[#EF5B25]"><SleekTikTok size={28} /></a>
                  <a href="https://www.youtube.com/@iamcameronamos" className="text-white hover:text-[#EF5B25]"><SleekYouTube size={28} /></a>
              </div>
          </div>
      </div>

      {/* Navigation */}
      <nav className={`absolute top-0 left-0 w-full z-[50] py-6 transition-all duration-300 ${navBg}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
            <a href="#" onClick={(e) => handleNavClick(e, 'hero')} className={`text-2xl md:text-3xl font-bold tracking-tight cursor-pointer ${isContact ? 'text-black' : 'text-white'}`}>
                Cam <span className={`${isContact ? 'text-black' : 'text-[#EF5B25]'}`}>Amos</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
                <a href="#shows" onClick={(e) => handleNavClick(e, 'shows')} className={`text-xs font-bold uppercase tracking-widest ${navHoverColor} transition-colors cursor-pointer ${isContact ? 'text-gray-500' : 'text-white'}`}>Shows</a>
                <a href="#standup" onClick={(e) => handleNavClick(e, 'standup')} className={`text-xs font-bold uppercase tracking-widest ${navHoverColor} transition-colors cursor-pointer ${isContact ? 'text-gray-500' : 'text-white'}`}>Standup</a>
                <a href="#sketches" onClick={(e) => handleNavClick(e, 'sketches')} className={`text-xs font-bold uppercase tracking-widest ${navHoverColor} transition-colors cursor-pointer ${isContact ? 'text-gray-500' : 'text-white'}`}>Sketches</a>
                <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={`text-xs font-bold uppercase tracking-widest ${navHoverColor} transition-colors cursor-pointer ${isContact ? 'text-gray-500' : 'text-white'}`}>About</a>
                <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className={`text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer ${isContact ? 'text-[#EF5B25]' : 'text-white hover:text-[#EF5B25]'}`}>Contact</a>

                <div className={`h-4 w-px mx-2 ${isContact ? 'bg-zinc-200' : 'bg-white/30'}`}></div>

                <div className="flex items-center gap-5">
                    <a href="https://www.instagram.com/iamcameronamos/" target="_blank" rel="noopener noreferrer" className={`${navTextColor} hover:text-[#EF5B25] transition-colors`}><Instagram size={18} /></a>
                    <a href="https://www.tiktok.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className={`${navTextColor} hover:text-[#EF5B25] transition-colors`}><TikTokIcon size={18} /></a>
                    <a href="https://www.youtube.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className={`${navTextColor} hover:text-[#EF5B25] transition-colors`}><Youtube size={18} /></a>
                </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
                <button onClick={(e) => handleNavClick(e, 'shows')} className={`${isContact ? 'text-black border-black hover:bg-black hover:text-white' : 'text-white border-white hover:bg-white hover:text-black'} border px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors`}>
                    Tickets
                </button>
                <button onClick={() => setIsMobileMenuOpen(true)} className={`${isContact ? 'text-black' : 'text-white'} p-1`}>
                    <Menu size={24} />
                </button>
            </div>
        </div>
      </nav>

      {currentView === 'home' ? (
        <>
            {/* Hero Section */}
            <section id="hero" className="relative h-screen flex items-end justify-center overflow-hidden pb-32 pt-40 bg-black">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#003C43] via-[#003C43]/60 to-transparent z-20 pointer-events-none"></div>
                    <img src="https://i.postimg.cc/PrgqVkyB/Screenshot-2025-11-22-at-1-46-41-PM.png" alt="Cam Amos" className="w-full h-full object-cover object-center relative z-0" />
                </div>
                <div className="container mx-auto px-6 relative z-20 text-center">
                    {welcomeMessage && (
                        <div className="max-w-2xl mx-auto backdrop-blur-md bg-black/40 border-l-4 border-[#EF5B25] p-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <p className="text-xl md:text-2xl font-bold text-white italic">"{welcomeMessage}"</p>
                            <p className="text-xs text-[#EF5B25] mt-2 uppercase tracking-widest font-black">- AI Cam</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Tour Dates */}
            <section id="shows" className="py-24 bg-[#003C43] relative">
                <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center justify-center gap-8 mb-16 border-b-4 border-white pb-12">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic text-white text-center">Upcoming Shows</h2>
                        <button onClick={() => setIsModalOpen(true)} className="mt-8 text-black uppercase tracking-widest font-black text-lg md:text-xl bg-white px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#EF5B25] hover:shadow-none transition-all hover:bg-[#EF5B25] hover:text-white">REQUEST YOUR CITY</button>
                    </div>
                    <div className="grid gap-6">
                        {UPCOMING_SHOWS.map((show) => (
                            <div key={show.id} className="group bg-white hover:bg-[#FACC15] border-4 border-black p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between transition-all duration-200 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 w-full">
                                    <div className="text-black font-black text-4xl w-32 border-r-4 border-black md:pr-8 flex flex-col uppercase leading-none">
                                        <span className="text-lg font-bold tracking-widest text-zinc-400 group-hover:text-black">2025</span>
                                        {new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-3xl md:text-4xl font-black text-black uppercase mb-1 tracking-tight">{show.city}</h3>
                                        <div className="flex items-center text-zinc-400 group-hover:text-black font-bold text-lg uppercase tracking-wider"><MapPin size={18} className="mr-2" />{show.venue}</div>
                                    </div>
                                </div>
                                {show.soldOut ? <span className="whitespace-nowrap px-6 py-3 bg-black text-white font-black text-sm tracking-widest border-2 border-black -rotate-2">SOLD OUT</span> : <a href={show.ticketLink} className="whitespace-nowrap px-10 py-4 bg-[#EF5B25] text-black border-2 border-black font-black text-sm uppercase flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Tickets <ArrowRight size={16} /></a>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Standup & Sketches */}
            <section id="standup" className="pt-24 pb-8 bg-zinc-100 bg-grain relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <VideoSlider videos={STANDUP_VIDEOS} title="Stand Up" />
                </div>
            </section>
            
            <section id="sketches" className="pt-8 pb-24 bg-zinc-100 bg-grain relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <VideoSlider videos={SKIT_VIDEOS} title="Sketches" />
                </div>
            </section>

            {/* About Me Section */}
            <section id="about" className="grid grid-cols-1 md:grid-cols-2 min-h-[85vh]">
                <div className="relative h-[75vh] md:h-auto overflow-hidden bg-black flex items-center">
                    <img 
                        src="https://i.postimg.cc/yYq3WRnC/DSC01567.jpg" 
                        alt="Cam Amos" 
                        className="block w-full h-full object-cover object-[50%_15%] md:object-[45%_50%] transition-all duration-700" 
                    />
                </div>
                <div className="bg-white p-8 md:p-16 flex flex-col justify-center items-center text-center relative">
                    <div className="max-w-lg">
                        <h2 className="text-[#EF5B25] mb-8 tracking-tighter leading-none italic">
                            <span className="text-3xl md:text-4xl font-black uppercase block mb-2 opacity-80">ABOUT</span>
                            <span className="text-6xl md:text-8xl font-black uppercase block">CAM AMOS</span>
                        </h2>
                        <div className="space-y-6 text-base md:text-lg font-bold text-[#EF5B25] leading-relaxed text-center">
                            <p>Cameron Amos, better known as Cam Amos, is a comedian, writer & actor born in Minneapolis and raised in the suburbs of the Twin Cities, where navigating different environments and perspectives helped shape his distinct comedic voice. Drawing from real-life experiences, culture, and everyday observations, Cam blends authenticity with sharp timing and storytelling.</p>
                            <p>He has amassed millions of views online and built nearly 100,000 followers across social media platforms, with viral stand-up clips and comedy sketches resonating with a wide audience. Cam performs stand-up comedy across the U.S. while continuing to grow his digital presence through original content on TikTok, Instagram, and YouTube.</p>
                        </div>
                        <div className="flex gap-8 mt-12 justify-center">
                            <a href="https://www.instagram.com/iamcameronamos/" target="_blank" rel="noopener noreferrer" className="text-[#EF5B25] hover:text-black transition-colors"><SleekInstagram size={24} /></a>
                            <a href="https://www.tiktok.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className="text-[#EF5B25] hover:text-black transition-colors"><SleekTikTok size={24} /></a>
                            <a href="https://www.youtube.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className="text-[#EF5B25] hover:text-black transition-colors"><SleekYouTube size={24} /></a>
                        </div>
                    </div>
                </div>
            </section>
        </>
      ) : (
        /* Contact View */
        <div className="min-h-screen bg-white pt-[100px] flex items-center justify-center pb-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
                    <div className="w-full lg:w-1/2 pt-8">
                        <h1 className="text-6xl md:text-8xl font-black text-black tracking-tighter mb-4 leading-none">WHATCHU <span className="text-[#EF5B25]">WANT?</span></h1>
                        <p className="text-sm text-zinc-400 font-medium mb-12 max-w-md uppercase tracking-widest">Booking inquiries or just hello?</p>
                        <div className="space-y-10">
                            <div className="grid grid-cols-2 gap-10">
                                <div className="group relative">
                                    <input type="text" className="w-full border-b border-zinc-200 py-3 text-lg font-bold text-black focus:border-[#EF5B25] outline-none transition-colors bg-transparent placeholder:text-zinc-300" placeholder="First Name" />
                                </div>
                                <div className="group relative">
                                    <input type="text" className="w-full border-b border-zinc-200 py-3 text-lg font-bold text-black focus:border-[#EF5B25] outline-none transition-colors bg-transparent placeholder:text-zinc-300" placeholder="Last Name" />
                                </div>
                            </div>
                            <div className="group relative">
                                <input type="email" className="w-full border-b border-zinc-200 py-3 text-lg font-bold text-black focus:border-[#EF5B25] outline-none transition-colors bg-transparent placeholder:text-zinc-300" placeholder="Email Address" />
                            </div>
                            <div className="relative">
                                <textarea rows={4} className="w-full border-b border-zinc-200 py-3 text-lg font-bold text-black focus:border-[#EF5B25] outline-none transition-colors bg-transparent placeholder:text-zinc-300 resize-none" placeholder="Your Message"></textarea>
                            </div>
                            <button className="bg-black text-white px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-[#EF5B25] transition-all rounded-full shadow-lg hover:shadow-[#EF5B25]/20">Send Message</button>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 relative">
                         <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl">
                             <img src="https://i.postimg.cc/MKxRdRBR/DSC02164.jpg" alt="Contact Cam" className="w-full h-full object-cover object-[45%_50%]" />
                         </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* FOOTER SECTION */}
      <footer className="bg-black text-white pt-12 pb-6">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-white/10">
                <div className="text-4xl font-black tracking-tighter italic md:flex-1 text-center md:text-left">CAM<span className="text-[#EF5B25]">AMOS</span></div>
                
                <div className="md:flex-1 flex justify-center">
                   <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="text-xs font-black uppercase tracking-[0.2em] text-[#EF5B25] hover:text-white transition-all bg-white/5 px-6 py-2.5 rounded-full border border-white/10 hover:border-[#EF5B25]">BOOKINGS & INQUIRIES</a>
                </div>

                <div className="flex items-center gap-8 md:flex-1 justify-center md:justify-end">
                    <a href="https://www.instagram.com/iamcameronamos/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EF5B25] transition-colors"><SleekInstagram size={24} /></a>
                    <a href="https://www.tiktok.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EF5B25] transition-colors"><SleekTikTok size={24} /></a>
                    <a href="https://www.youtube.com/@iamcameronamos" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#EF5B25] transition-colors"><SleekYouTube size={24} /></a>
                </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6">
                <div className="text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em]">© 2024 CAM AMOS. ALL RIGHTS RESERVED.</div>
                
                <div className="flex gap-6 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <a href="#" className="hover:text-white">Terms of Use</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
