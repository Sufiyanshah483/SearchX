import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Repeat2, Eye, Bookmark, ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ViralTweets } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useMember } from '@/integrations';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';

export default function TweetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [tweet, setTweet] = useState<ViralTweets | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useMember();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const isBookmarked = tweet ? bookmarks.includes(tweet._id) : false;

  useEffect(() => {
    loadTweet();
  }, [id]);

  const loadTweet = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<ViralTweets>('viraltweets', id);
      setTweet(data);
    } catch (error) {
      console.error('Error loading tweet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBookmark = () => {
    if (!isAuthenticated || !tweet) return;
    
    if (isBookmarked) {
      removeBookmark(tweet._id);
    } else {
      addBookmark(tweet._id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="relative w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24 min-h-[800px]">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" className="rounded-xl font-paragraph">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Discover
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        ) : !tweet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[400px] text-center"
          >
            <h2 className="font-heading text-3xl font-bold text-foreground/60 mb-4">Tweet not found</h2>
            <p className="font-paragraph text-foreground/40 mb-8">The tweet you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph">
                Go to Discover
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-50" />
              
              <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12">
                {/* Author */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-foreground/10 flex-shrink-0">
                      {tweet.authorAvatar ? (
                        <Image
                          src={tweet.authorAvatar}
                          alt={tweet.authorName || 'Author'}
                          width={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground/40 font-heading font-bold text-2xl">
                          {tweet.authorName?.charAt(0) || '?'}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-heading text-xl font-bold text-foreground">
                        {tweet.authorName || 'Unknown'}
                      </p>
                      <p className="font-paragraph text-foreground/60">
                        @{tweet.authorHandle || 'unknown'}
                      </p>
                    </div>
                  </div>

                  {isAuthenticated && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleBookmark}
                      className={`p-3 rounded-xl transition-all ${
                        isBookmarked
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-foreground/5 text-foreground/60 hover:bg-primary/20 hover:text-primary'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </motion.button>
                  )}
                </div>

                {/* Content */}
                <div className="mb-8">
                  <p className="font-paragraph text-xl text-foreground leading-relaxed whitespace-pre-wrap">
                    {tweet.tweetContent}
                  </p>
                </div>

                {/* Media */}
                {tweet.mediaUrl && (
                  <div className="mb-8 rounded-2xl overflow-hidden bg-foreground/5">
                    <Image
                      src={tweet.mediaUrl}
                      alt="Tweet media"
                      width={800}
                      className="w-full max-h-[600px] object-cover"
                    />
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center gap-2 text-foreground/60 mb-6 pb-6 border-b border-foreground/10">
                  <Calendar className="w-4 h-4" />
                  <span className="font-paragraph text-sm">
                    {formatDate(tweet.publicationDate)}
                  </span>
                </div>

                {/* Engagement Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-foreground/10">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                  >
                    <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                    <p className="font-heading text-3xl font-bold text-foreground mb-1">
                      {formatNumber(tweet.likesCount)}
                    </p>
                    <p className="font-paragraph text-sm text-foreground/60">Likes</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20"
                  >
                    <Repeat2 className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <p className="font-heading text-3xl font-bold text-foreground mb-1">
                      {formatNumber(tweet.retweetsCount)}
                    </p>
                    <p className="font-paragraph text-sm text-foreground/60">Retweets</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-pastel-lavender/10 to-pastel-lavender/5 border border-pastel-lavender/20"
                  >
                    <Eye className="w-8 h-8 text-pastel-lavender mx-auto mb-3" />
                    <p className="font-heading text-3xl font-bold text-foreground mb-1">
                      {formatNumber(tweet.viewsCount)}
                    </p>
                    <p className="font-paragraph text-sm text-foreground/60">Views</p>
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-semibold h-12"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-xl border-foreground/20 hover:border-primary hover:text-primary font-paragraph h-12"
                  >
                    <Repeat2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}
