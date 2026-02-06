import { motion } from 'framer-motion';
import { Heart, Repeat2, Eye, Bookmark, ExternalLink } from 'lucide-react';
import { ViralTweets } from '@/entities';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMember } from '@/integrations';
import { useBookmarkStore } from '@/stores/bookmarkStore';

interface TweetCardProps {
  tweet: ViralTweets;
}

export default function TweetCard({ tweet }: TweetCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useMember();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const isBookmarked = bookmarks.includes(tweet._id);

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    
    if (isBookmarked) {
      removeBookmark(tweet._id);
    } else {
      addBookmark(tweet._id);
    }
  };

  return (
    <Link to={`/tweet/${tweet._id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative group cursor-pointer"
      >
        {/* Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-3xl blur-xl"
        />

        {/* Card */}
        <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 overflow-hidden">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent pointer-events-none" />

          {/* Author */}
          <div className="relative flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-foreground/10 flex-shrink-0">
              {tweet.authorAvatar ? (
                <Image
                  src={tweet.authorAvatar}
                  alt={tweet.authorName || 'Author'}
                  width={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-foreground/40 font-heading font-bold text-lg">
                  {tweet.authorName?.charAt(0) || '?'}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading font-bold text-foreground truncate">
                {tweet.authorName || 'Unknown'}
              </p>
              <p className="font-paragraph text-sm text-foreground/60 truncate">
                @{tweet.authorHandle || 'unknown'}
              </p>
            </div>
            <span className="font-paragraph text-xs text-foreground/40 flex-shrink-0">
              {formatDate(tweet.publicationDate)}
            </span>
          </div>

          {/* Content */}
          <div className="relative mb-4">
            <p className="font-paragraph text-base text-foreground/90 leading-relaxed line-clamp-4">
              {tweet.tweetContent}
            </p>
          </div>

          {/* Media */}
          {tweet.mediaUrl && (
            <div className="relative mb-4 rounded-xl overflow-hidden bg-foreground/5">
              <Image
                src={tweet.mediaUrl}
                alt="Tweet media"
                width={600}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Engagement Stats */}
          <div className="relative flex items-center justify-between pt-4 border-t border-foreground/10">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span className="font-paragraph text-sm font-medium">
                  {formatNumber(tweet.likesCount)}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-foreground/60 hover:text-secondary transition-colors"
              >
                <Repeat2 className="w-4 h-4" />
                <span className="font-paragraph text-sm font-medium">
                  {formatNumber(tweet.retweetsCount)}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-foreground/60 hover:text-pastel-lavender transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="font-paragraph text-sm font-medium">
                  {formatNumber(tweet.viewsCount)}
                </span>
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-primary/20 text-primary'
                      : 'bg-foreground/5 text-foreground/60 hover:text-primary'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="p-2 rounded-lg bg-foreground/5 text-foreground/60 hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </div>
          </div>

          {/* 3D Transform Effect */}
          <motion.div
            animate={{
              rotateX: isHovered ? 2 : 0,
              rotateY: isHovered ? -2 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </div>
      </motion.div>
    </Link>
  );
}
