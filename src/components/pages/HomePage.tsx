// HPI 1.7-G
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp, Sparkles, Activity, BarChart3, Zap, Filter, Layers, Box, Globe } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ViralTweets, TweetCategories } from '@/entities';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TweetCard from '@/components/TweetCard';
import FilterPanel from '@/components/FilterPanel';

// --- Types ---
// Re-defining locally to ensure type safety if imports miss something, 
// but primarily relying on the imported entities as per protocol.

// --- Utility Components ---

const FloatingParticle = ({ delay = 0, x = 0, y = 0, color = "#BDB2FF" }: { delay?: number, x?: number, y?: number, color?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.2, 0.5, 0.2], 
      scale: [1, 1.5, 1],
      x: [x, x + 20, x],
      y: [y, y - 20, y]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeInOut" 
    }}
    className="absolute rounded-full blur-xl pointer-events-none"
    style={{ 
      width: Math.random() * 100 + 50, 
      height: Math.random() * 100 + 50, 
      backgroundColor: color,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
  />
);

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
    {children}
  </div>
);

const ParallaxText = ({ children, speed = 1 }: { children: React.ReactNode; speed?: number }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  return <motion.div style={{ y }}>{children}</motion.div>;
};

// --- Main Component ---

export default function HomePage() {
  // --- 1. Data Fidelity Protocol: Canonical Data Sources ---
  const [tweets, setTweets] = useState<ViralTweets[]>([]);
  const [categories, setCategories] = useState<TweetCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- Filter State ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'latest' | 'likes' | 'retweets' | 'views'>('latest');
  const [minLikes, setMinLikes] = useState(0);
  const [minRetweets, setMinRetweets] = useState(0);
  const [timePeriod, setTimePeriod] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // --- Refs for Scroll Effects (Crash Prevention) ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // --- Data Fetching (Preserved) ---
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [tweetsResult, categoriesResult] = await Promise.all([
        BaseCrudService.getAll<ViralTweets>('viraltweets'),
        BaseCrudService.getAll<TweetCategories>('tweetcategories')
      ]);
      setTweets(tweetsResult.items);
      setCategories(categoriesResult.items.filter(cat => cat.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Filtering Logic (Preserved) ---
  const filteredTweets = useMemo(() => {
    const checkSearchFilter = (tweet: ViralTweets): boolean => {
      const query = searchQuery.toLowerCase();
      return !searchQuery || 
        tweet.tweetContent?.toLowerCase().includes(query) ||
        tweet.authorName?.toLowerCase().includes(query);
    };

    const checkEngagementFilters = (tweet: ViralTweets): boolean => {
      return (tweet.likesCount || 0) >= minLikes && (tweet.retweetsCount || 0) >= minRetweets;
    };

    const checkTimePeriodFilter = (tweet: ViralTweets): boolean => {
      if (!tweet.publicationDate) return timePeriod === 'all';
      
      if (timePeriod === 'all') return true;
      
      const tweetDate = new Date(tweet.publicationDate);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - tweetDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (timePeriod) {
        case 'today':
          return daysDiff <= 1;
        case 'week':
          return daysDiff <= 7;
        case 'month':
          return daysDiff <= 30;
        default:
          return true;
      }
    };

    return tweets
      .filter(tweet => 
        checkSearchFilter(tweet) &&
        checkEngagementFilters(tweet) &&
        checkTimePeriodFilter(tweet)
      )
      .sort((a, b) => {
        switch (sortBy) {
          case 'likes':
            return (b.likesCount || 0) - (a.likesCount || 0);
          case 'retweets':
            return (b.retweetsCount || 0) - (a.retweetsCount || 0);
          case 'views':
            return (b.viewsCount || 0) - (a.viewsCount || 0);
          case 'latest':
          default:
            return new Date(b.publicationDate || 0).getTime() - new Date(a.publicationDate || 0).getTime();
        }
      });
  }, [tweets, searchQuery, minLikes, minRetweets, timePeriod, sortBy, selectedCategory]);

  // --- Derived Stats for UI ---
  const totalViews = useMemo(() => tweets.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0), [tweets]);
  const totalLikes = useMemo(() => tweets.reduce((acc, curr) => acc + (curr.likesCount || 0), 0), [tweets]);

  // --- Mouse Tilt Effect for Hero ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#1A1A2E] text-foreground relative overflow-x-clip selection:bg-primary/30"
      onMouseMove={handleMouseMove}
    >
      {/* Global Styles for Custom Scrollbar & Utilities */}
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1A1A2E; }
        ::-webkit-scrollbar-thumb { background: #2D2D44; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #FF6B6B; }
        .text-glow { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
      `}</style>

      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingParticle color="#FF6B6B" delay={0} x={10} y={20} />
        <FloatingParticle color="#BDB2FF" delay={2} x={80} y={10} />
        <FloatingParticle color="#90EE90" delay={4} x={40} y={80} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] via-transparent to-[#1A1A2E]" />
      </div>

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-20 px-6 perspective-1000">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 w-full max-w-[100rem] mx-auto text-center"
        >
          {/* 3D Floating Badge */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(189,178,255,0.2)]"
          >
            <Sparkles className="w-4 h-4 text-pastel-lavender animate-pulse" />
            <span className="text-sm font-paragraph text-pastel-lavender tracking-wider uppercase">The Viral Universe Awaits</span>
          </motion.div>

          {/* Main Title with 3D Tilt */}
          <motion.div
            style={{ 
              rotateX: useTransform(mouseY, [-0.5, 0.5], [10, -10]),
              rotateY: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
            }}
            className="perspective-1000 mb-8"
          >
            <h1 className="font-heading text-8xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-2xl">
              SEARCH<span className="text-primary">X</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Dive into a multi-dimensional stream of the world's most viral conversations. 
            <span className="text-pastel-mint"> Real-time.</span> <span className="text-pastel-peach"> Curated.</span> <span className="text-pastel-lavender"> Immersive.</span>
          </motion.p>

          {/* Search Bar - Floating Glass */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative max-w-3xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-pastel-lavender to-secondary rounded-full opacity-30 blur-xl group-hover:opacity-50 transition duration-500" />
            <div className="relative flex items-center bg-[#1A1A2E]/80 backdrop-blur-xl border border-white/10 rounded-full p-2 pr-4 shadow-2xl">
              <div className="p-4 bg-white/5 rounded-full mr-4">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <input
                type="text"
                placeholder="Search for topics, authors, or viral trends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-lg font-paragraph text-white placeholder:text-white/30 h-12"
              />
              <div className="hidden md:flex items-center gap-2 text-xs text-white/30 font-mono border-l border-white/10 pl-4">
                <span className="px-2 py-1 rounded bg-white/5">CMD</span>
                <span>+</span>
                <span className="px-2 py-1 rounded bg-white/5">K</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative 3D Elements */}
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      </section>

      {/* --- STATS TICKER (Sticky) --- */}
      <section className="sticky top-0 z-40 w-full border-y border-white/5 bg-[#1A1A2E]/80 backdrop-blur-md">
        <div className="max-w-[120rem] mx-auto px-6 py-4 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 min-w-max">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-mono text-white/60 uppercase tracking-widest">System Online</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-white/80">
              <Activity className="w-4 h-4 text-pastel-lavender" />
              <span className="font-heading font-bold">{tweets.length}</span>
              <span className="text-xs text-white/40 uppercase">Active Nodes</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="w-4 h-4 text-secondary" />
              <span className="font-heading font-bold">{(totalViews / 1000000).toFixed(1)}M</span>
              <span className="text-xs text-white/40 uppercase">Global Views</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-heading font-bold">{(totalLikes / 1000).toFixed(1)}K</span>
              <span className="text-xs text-white/40 uppercase">Engagements</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
             <span className="text-xs font-mono text-white/30">V.2.0.4-BETA</span>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- LEFT: CONTROL DECK (Sticky) --- */}
          <aside className="lg:w-80 flex-shrink-0 relative z-30">
            <div className="sticky top-24 space-y-8">
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-lg font-bold text-white">Control Deck</h3>
                </div>
                
                {/* Reusing FilterPanel Logic but wrapping/styling via container context */}
                <div className="filter-panel-wrapper [&_label]:text-white/60 [&_select]:bg-[#1A1A2E] [&_select]:border-white/10 [&_select]:text-white">
                  <FilterPanel
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    minLikes={minLikes}
                    onMinLikesChange={setMinLikes}
                    minRetweets={minRetweets}
                    onMinRetweetsChange={setMinRetweets}
                    timePeriod={timePeriod}
                    onTimePeriodChange={setTimePeriod}
                  />
                </div>
              </GlassCard>

              {/* Mini Promo Card */}
              <GlassCard className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Box className="w-5 h-5 text-primary" />
                  <h4 className="font-heading font-bold text-white">Pro Analytics</h4>
                </div>
                <p className="text-sm text-white/60 mb-4">Unlock deep insights and 3D visualization tools.</p>
                <button className="w-full py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors">
                  Upgrade Now
                </button>
              </GlassCard>
            </div>
          </aside>

          {/* --- RIGHT: DISCOVERY STREAM --- */}
          <motion.div 
            style={{ y: contentY }}
            className="flex-1 min-h-[800px]"
          >
            {/* Section Header */}
            <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-heading text-4xl font-bold text-white mb-2">Discovery Stream</h2>
                <p className="text-white/40 font-paragraph">Real-time viral anomalies detected.</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 transition-colors">
                  <Layers className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-primary/20 text-primary transition-colors">
                  <Box className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-96 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
                ))}
              </div>
            ) : filteredTweets.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <AnimatePresence>
                  {filteredTweets.map((tweet, index) => (
                    <motion.div
                      key={tweet._id}
                      initial={{ opacity: 0, scale: 0.9, y: 50 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -10, scale: 1.02, zIndex: 10 }}
                      className="group perspective-1000"
                    >
                      <div className="relative h-full transform-style-3d transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl">
                        {/* Card Glow Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl opacity-0 group-hover:opacity-30 blur transition duration-500" />
                        
                        {/* Actual Card Wrapper */}
                        <div className="relative h-full bg-[#1E1E36] rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                          {/* We wrap the existing TweetCard to preserve its internal logic but enhance its container */}
                          <div className="p-1">
                             <TweetCard tweet={tweet} />
                          </div>
                          
                          {/* Overlay Actions (Hover) */}
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
                            <button className="px-6 py-2 rounded-full bg-white text-black font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                              View Analysis
                            </button>
                            <button className="p-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100 hover:bg-primary hover:border-primary">
                              <Sparkles className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 rounded-3xl border border-dashed border-white/10 bg-white/5"
              >
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <TrendingUp className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="font-heading text-3xl font-bold text-white mb-2">Void Detected</h3>
                <p className="font-paragraph text-white/40 max-w-md">
                  No viral anomalies match your current filter parameters. Adjust your sensors to expand the search.
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setTimePeriod('all');
                  }}
                  className="mt-8 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/10"
                >
                  Reset Sensors
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- IMMERSIVE FOOTER SECTION --- */}
      <section className="relative py-24 border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E] to-black" />
        <div className="relative z-10 max-w-[120rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-white/10 mb-8">
            JOIN THE <br/> REVOLUTION
          </h2>
          <div className="flex justify-center gap-6">
             <Link to="/signup" className="px-8 py-4 rounded-full bg-primary text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,107,107,0.4)]">
               Get Started Free
             </Link>
             <Link to="/demo" className="px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors">
               View Live Demo
             </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}