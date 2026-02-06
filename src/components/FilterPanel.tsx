import { motion } from 'framer-motion';
import { TweetCategories } from '@/entities';
import { SlidersHorizontal, TrendingUp, Clock, Heart, Repeat2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterPanelProps {
  categories: TweetCategories[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortBy: 'latest' | 'likes' | 'retweets' | 'views';
  onSortChange: (sort: 'latest' | 'likes' | 'retweets' | 'views') => void;
  minLikes: number;
  onMinLikesChange: (value: number) => void;
  minRetweets: number;
  onMinRetweetsChange: (value: number) => void;
  timePeriod: 'all' | 'today' | 'week' | 'month';
  onTimePeriodChange: (period: 'all' | 'today' | 'week' | 'month') => void;
}

export default function FilterPanel({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  minLikes,
  onMinLikesChange,
  minRetweets,
  onMinRetweetsChange,
  timePeriod,
  onTimePeriodChange,
}: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-24"
    >
      <div className="relative">
        {/* Glow */}
        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
        
        {/* Panel */}
        <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-foreground/10">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-xl font-bold text-foreground">Filters</h2>
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-paragraph text-sm font-medium text-foreground/80 mb-3">
              <TrendingUp className="w-4 h-4" />
              Sort By
            </label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-full rounded-xl bg-background/60 border-foreground/20 font-paragraph">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl border-foreground/20">
                <SelectItem value="latest" className="font-paragraph">Latest</SelectItem>
                <SelectItem value="likes" className="font-paragraph">Most Liked</SelectItem>
                <SelectItem value="retweets" className="font-paragraph">Most Retweeted</SelectItem>
                <SelectItem value="views" className="font-paragraph">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Period */}
          <div className="mb-6">
            <label className="flex items-center gap-2 font-paragraph text-sm font-medium text-foreground/80 mb-3">
              <Clock className="w-4 h-4" />
              Time Period
            </label>
            <Select value={timePeriod} onValueChange={onTimePeriodChange}>
              <SelectTrigger className="w-full rounded-xl bg-background/60 border-foreground/20 font-paragraph">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-background/95 backdrop-blur-xl border-foreground/20">
                <SelectItem value="all" className="font-paragraph">All Time</SelectItem>
                <SelectItem value="today" className="font-paragraph">Today</SelectItem>
                <SelectItem value="week" className="font-paragraph">This Week</SelectItem>
                <SelectItem value="month" className="font-paragraph">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Likes */}
          <div className="mb-6">
            <label className="flex items-center justify-between font-paragraph text-sm font-medium text-foreground/80 mb-3">
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Min Likes
              </span>
              <span className="text-primary">{minLikes.toLocaleString()}</span>
            </label>
            <Slider
              value={[minLikes]}
              onValueChange={(values) => onMinLikesChange(values[0])}
              max={100000}
              step={1000}
              className="w-full"
            />
          </div>

          {/* Min Retweets */}
          <div className="mb-6">
            <label className="flex items-center justify-between font-paragraph text-sm font-medium text-foreground/80 mb-3">
              <span className="flex items-center gap-2">
                <Repeat2 className="w-4 h-4" />
                Min Retweets
              </span>
              <span className="text-secondary">{minRetweets.toLocaleString()}</span>
            </label>
            <Slider
              value={[minRetweets]}
              onValueChange={(values) => onMinRetweetsChange(values[0])}
              max={50000}
              step={500}
              className="w-full"
            />
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div>
              <label className="font-paragraph text-sm font-medium text-foreground/80 mb-3 block">
                Categories
              </label>
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCategoryChange('all')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-paragraph text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background/60 text-foreground/70 hover:bg-foreground/5'
                  }`}
                >
                  All Categories
                </motion.button>
                {categories.map((category) => (
                  <motion.button
                    key={category._id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onCategoryChange(category._id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-paragraph text-sm font-medium transition-all ${
                      selectedCategory === category._id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'bg-background/60 text-foreground/70 hover:bg-foreground/5'
                    }`}
                  >
                    {category.categoryName}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
