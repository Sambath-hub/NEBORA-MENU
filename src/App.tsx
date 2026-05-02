import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from './constants';
import { Scene } from './components/Scene';
import { cn } from './lib/utils';
import { MoveRight, Sparkles, Instagram, Facebook, Send, Music2 } from 'lucide-react';

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const activeProduct = useMemo(() => PRODUCTS[activeIndex], [activeIndex]);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    setActiveIndex(prev => {
      if (direction === 'next') return prev < PRODUCTS.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : PRODUCTS.length - 1;
    });
  }, []);

  const socialPlatforms = [
    { name: 'Instagram', icon: <Instagram size={14} />, href: 'https://www.instagram.com/nebora_7/?hl=en' },
    { name: 'TikTok', icon: <Music2 size={14} />, href: 'https://www.tiktok.com/@nebora01' },
    { name: 'Facebook', icon: <Facebook size={14} />, href: 'https://www.facebook.com/profile.php?id=61563570357719' },
    { name: 'Telegram', icon: <Send size={14} />, href: 'https://web.telegram.org/a/#1892919069' },
  ];

  // Wheel Scroll Navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling || showContact || showQuickLook) return;
      
      if (Math.abs(e.deltaX) > 20 || Math.abs(e.deltaY) > 20) {
        setIsScrolling(true);
        if (e.deltaX > 0 || e.deltaY > 0) navigate('next');
        else navigate('prev');

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => setIsScrolling(false), 200); // Ultra fast reset
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isScrolling, navigate, showContact, showQuickLook]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-brand-bg text-brand-text touch-none selection:bg-gold selection:text-black">
      {/* 3D Scene Background */}
      <Scene activeProduct={activeProduct} />

      {/* Nebula Glow Background */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 gold-glow opacity-80 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeProduct.color}22 0%, transparent 70%)`
        }}
      />

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col justify-between items-center h-screen pt-4 md:pt-8 p-4 md:p-12 max-w-7xl mx-auto w-full pointer-events-none">
        
        {/* Brand Header - Moved up */}
        <header className="flex flex-col items-center text-center space-y-4 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="space-y-1">
              <h1 className="text-4xl md:text-6xl font-serif font-light tracking-[0.5em] md:tracking-[0.6em] uppercase text-white brand-text-shadow leading-none">
                NEBORA
              </h1>
              <span className="text-[8px] md:text-[10px] font-sans tracking-[0.6em] md:tracking-[0.8em] opacity-50 uppercase block pt-2">
                CANDLES
              </span>
            </div>

            <div className="flex items-center gap-4 mt-4 w-32">
               <div className="h-px flex-1 bg-gold/20" />
               <span className="text-[7px] font-sans tracking-[0.6em] opacity-40 uppercase whitespace-nowrap">
                Handmade
              </span>
               <div className="h-px flex-1 bg-gold/20" />
            </div>
          </motion.div>
        </header>

        {/* Perspectice Card Container */}
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            const threshold = 70;
            const velocity = info.velocity.x;
            if (info.offset.x > threshold || velocity > 500) navigate('prev');
            else if (info.offset.x < -threshold || velocity < -500) navigate('next');
          }}
          className="relative w-full h-[320px] md:h-[400px] flex justify-center items-center perspective-[2000px] z-20 pointer-events-auto touch-none"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {PRODUCTS.map((product, index) => {
              let distance = index - activeIndex;
              
              // Infinite Loop Position Correction
              if (distance > PRODUCTS.length / 2) distance -= PRODUCTS.length;
              if (distance < -PRODUCTS.length / 2) distance += PRODUCTS.length;

              const isActive = index === activeIndex;
              const isVisible = Math.abs(distance) <= 1.5;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: distance > 0 ? 400 : -400 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.05,
                    scale: isActive ? 1 : 0.65,
                    x: distance * (windowWidth < 768 ? 240 : 320),
                    z: isActive ? 400 : -400,
                    rotateY: distance * -25,
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onClick={() => {
                    if (isActive) {
                      setShowQuickLook(true);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  className={cn(
                    "absolute w-[200px] h-[280px] md:w-[260px] md:h-[380px] rounded-[1px] overflow-hidden group cursor-pointer",
                    "bg-[#ffffff05] border backdrop-blur-2xl transition-all duration-150",
                    isActive ? "border-gold/50 shadow-[0_40px_100px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)]" : "border-gold/5"
                  )}
                >
                  {/* Product Photo Background */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={`https://picsum.photos/seed/${product.imageSeed}/600/800?grayscale&blur=2`}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-transparent to-transparent" />
                  </div>

                  <div className="relative z-10 w-full h-full p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-serif italic text-gold/40 tracking-widest leading-none uppercase">Series № 0{index + 1}</span>
                      {isActive && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <Sparkles size={10} className="text-gold/40" />
                        </motion.div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-500">
                        <h2 className="text-2xl font-serif tracking-[0.15em] uppercase text-white mb-2">
                          {product.name}
                        </h2>
                        <div className="h-px w-6 bg-gold/20 mx-auto" />
                      </div>
                      <p className="text-[8px] font-sans text-center leading-relaxed opacity-40 uppercase tracking-[0.4em]">
                        {product.notesData.join(" • ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Centered Luxury Navigation Arrows Under Product */}
        <div className="flex gap-12 items-center z-30 pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5, borderColor: '#d4af37' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('prev')}
            className="w-10 h-10 border border-gold/10 rounded-full flex items-center justify-center bg-brand-bg/40 backdrop-blur-md group transition-all hover:border-gold/40"
          >
            <MoveRight size={16} className="rotate-180 text-gold/40 group-hover:text-gold" />
          </motion.button>

          <div className="flex flex-col items-center gap-1 opacity-20">
            <div className="flex gap-1.5">
              {PRODUCTS.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "w-1 h-1 rounded-full transition-all duration-500",
                    i === activeIndex ? "bg-gold scale-150 opacity-100" : "bg-white opacity-40"
                  )} 
                />
              ))}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1, x: 5, borderColor: '#d4af37' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('next')}
            className="w-10 h-10 border border-gold/10 rounded-full flex items-center justify-center bg-brand-bg/40 backdrop-blur-md group transition-all hover:border-gold/40"
          >
            <MoveRight size={16} className="text-gold/40 group-hover:text-gold" />
          </motion.button>
        </div>

        {/* Footer */}
        <footer className="w-full flex justify-between items-end border-t border-gold/10 pt-6 md:pt-10 pb-4 md:pb-2 pointer-events-auto">
          <div className="flex gap-8 md:gap-16">
            <div className="space-y-1">
              <span className="block text-[8px] font-sans uppercase tracking-[0.4em] text-gold font-bold">Authentic</span>
              <span className="text-[10px] font-serif tracking-[0.2em] text-white">NEBORA 01/June/2025</span>
            </div>
             <div className="space-y-1">
              <span className="block text-[8px] font-sans uppercase tracking-[0.4em] text-gold font-bold">Details</span>
              <span className="text-[10px] font-serif tracking-[0.2em] text-white">80H Burn</span>
            </div>
          </div>

          <div className="flex-1 md:flex-none flex flex-col items-center gap-1">
            <span className="text-[7px] md:text-[8px] font-sans uppercase tracking-[0.6em] md:tracking-[0.8em] opacity-30">Archive Collection N°01</span>
          </div>

          <div className="flex gap-8 md:gap-12 items-center">
            <div className="text-right space-y-1">
              <motion.button 
                onClick={() => setShowContact(true)}
                className="text-[9px] md:text-[10px] font-serif tracking-[0.2em] border-b border-gold/20 pb-0.5 cursor-pointer hover:border-gold hover:text-white transition-all block text-white/80"
                whileHover={{ y: -2 }}
              >
                Contact us
              </motion.button>
            </div>
          </div>
        </footer>
      </div>

      {/* Quick Look Overlay */}
      <AnimatePresence>
        {showQuickLook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-bg/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-[#0a0a0a] border border-gold/10 p-6 md:p-12 relative grid md:grid-cols-2 gap-8 md:gap-12 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowQuickLook(false)}
                className="absolute top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 flex flex-col items-center justify-center group hover:border-gold transition-all z-20 bg-black/40 backdrop-blur-md"
              >
                <span className="text-[12px] md:text-[14px] mb-[-2px]">🕯️</span>
                <span className="text-[6px] md:text-[7px] font-sans uppercase tracking-widest opacity-40 group-hover:opacity-100">Close</span>
              </button>

              <div className="relative aspect-square bg-[#0a0a0a] border border-gold/5 flex items-center justify-center overflow-hidden">
                 <img 
                    src={`https://picsum.photos/seed/${activeProduct.imageSeed}/800/800?grayscale`}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-bg/80 to-transparent" />
              </div>

              <div className="space-y-8 flex flex-col justify-center">
                <div className="space-y-2">
                  <span className="text-[10px] font-serif italic text-gold/40 tracking-widest">№ 0{activeIndex + 1}</span>
                  <h2 className="text-5xl font-serif tracking-[0.2em] uppercase text-white">{activeProduct.name}</h2>
                  <div className="h-px w-12 bg-gold/40" />
                </div>

                <p className="text-sm font-sans tracking-wide leading-relaxed opacity-60">
                   A masterclass in olfactory architecture. {activeProduct.name} combines the raw intensity of 
                   nature with refined artisanal techniques to create a fragrance that lingers with intent.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <span className="text-[8px] font-sans uppercase tracking-[0.4em] opacity-30">Notes Profile</span>
                    <p className="text-[10px] font-sans opacity-70 leading-relaxed uppercase tracking-[0.2em]">
                      {activeProduct.notesData.join(" / ")}
                    </p>
                  </div>
                   <div className="space-y-2">
                    <span className="text-[8px] font-sans uppercase tracking-[0.4em] opacity-30">Volume</span>
                    <p className="text-[10px] font-sans opacity-70 uppercase tracking-[0.2em]">300g / 10.5 OZ</p>
                  </div>
                </div>

                <div className="pt-8 pt-4 border-t border-gold/10">
                   <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 border border-gold text-gold text-[10px] font-sans uppercase tracking-[0.4em]"
                   >
                      Find Your Nearest Boutique
                   </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Overlay */}
      <AnimatePresence>
        {showContact && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-bg/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#0a0a0a] border border-gold/10 p-6 md:p-12 relative overflow-y-auto max-h-[90vh] rounded-sm shadow-2xl"
            >
              {/* Refined Close Button */}
              <button 
                onClick={() => setShowContact(false)}
                className="absolute top-4 right-4 md:top-10 md:right-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gold/20 flex flex-col items-center justify-center group hover:border-gold transition-all z-20 bg-black/40 backdrop-blur-md"
              >
                <span className="text-[14px] mb-[-2px]">🕯️</span>
                <span className="text-[7px] font-sans uppercase tracking-widest opacity-40 group-hover:opacity-100">Exit</span>
              </button>

              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-[31px] leading-[36px] font-serif tracking-[0.2em] uppercase text-white ml-[-3px] italic p-0 text-left">Candle Information</h2>
                  <div className="space-y-4 opacity-70">
                    <p className="text-[11px] font-sans uppercase tracking-[0.3em] leading-relaxed">
                      Our scents are architectural compositions, hand-poured in Cambodia with 100% sustainable soy wax. Each candle features a lead-free cotton wick and rare botanical oils sourced globally.
                    </p>
                    <ul className="text-[9px] font-sans uppercase tracking-[0.4em] space-y-2 border-t border-gold/10 pt-4">
                      <li>• 65—80 Hours Clean Burn</li>
                      <li>• Vegan & Cruelty-Free</li>
                      <li>• Recyclable Glass Vessel</li>
                      <li>• Phthalate-Free Fragrance</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-[10px] font-sans uppercase tracking-[0.6em] opacity-30 text-center">Social Destinations</h3>
                   <div className="grid grid-cols-2 gap-4">
                      {socialPlatforms.map((platform) => (
                        <motion.a
                          key={platform.name}
                          href={platform.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderColor: 'rgba(212, 175, 55, 0.4)' }}
                          className={cn(
                            "flex items-center justify-center gap-4 py-4 border border-gold/10 text-[9px] font-sans uppercase tracking-[0.4em] text-gold/80 hover:text-gold transition-all italic",
                            platform.name === 'Facebook' && "font-bold"
                          )}
                        >
                          <span className="text-gold">{platform.icon}</span>
                          {platform.name}
                        </motion.a>
                      ))}
                   </div>
                </div>

                <div className="pt-8 border-t border-gold/10 flex justify-between items-center opacity-30">
                  <span className="text-[8px] font-sans uppercase tracking-[0.2em] italic"> Phnom Penh • Cambodia</span>
                  <Sparkles size={14} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Geometric Overlay */}
      <div className="fixed top-0 right-0 w-[40%] h-full bg-linear-to-l from-black/40 to-transparent pointer-events-none z-[5]" />
    </main>
  );
}
