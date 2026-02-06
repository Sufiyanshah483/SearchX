import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ViralTweets } from '@/entities';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import TweetCard from '@/components/TweetCard';
import { Button } from '@/components/ui/button';

function SavedPageContent() {
  const [savedTweets, setSavedTweets] = useState<ViralTweets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { bookmarks, clearBookmarks } = useBookmarkStore();

  useEffect(() => {
    loadSavedTweets();
  }, [bookmarks]);

  const loadSavedTweets = async () => {
    if (bookmarks.length === 0) {
      setSavedTweets([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const allTweets = await BaseCrudService.getAll<ViralTweets>('viraltweets');
      const filtered = allTweets.items.filter(tweet => bookmarks.includes(tweet._id));
      setSavedTweets(filtered);
    } catch (error) {
      console.error('Error loading saved tweets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved tweets?')) {
      clearBookmarks();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="relative w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-6">
            <Bookmark className="w-5 h-5 text-primary" />
            <span className="text-sm font-paragraph text-primary font-medium">Your Collection</span>
          </div>
          
          <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
              Saved Tweets
            </span>
          </h1>
          
          <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Your personally curated collection of viral content
          </p>

          {savedTweets.length > 0 && (
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="rounded-xl border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive font-paragraph"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </motion.div>

        {/* Content */}
        <div className="min-h-[400px]">
          {isLoading ? null : savedTweets.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {savedTweets.map((tweet, index) => (
                <motion.div
                  key={tweet._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <TweetCard tweet={tweet} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center min-h-[400px] text-center"
            >
              <div className="w-24 h-24 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
                <Bookmark className="w-12 h-12 text-foreground/20" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground/60 mb-2">No saved tweets yet</h3>
              <p className="font-paragraph text-foreground/40 mb-8">Start bookmarking tweets to build your collection</p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function SavedPage() {
  return (
    <MemberProtectedRoute messageToSignIn="Sign in to view your saved tweets">
      <SavedPageContent />
    </MemberProtectedRoute>
  );
}
