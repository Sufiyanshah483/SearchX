import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Repeat2, Eye, Users, BarChart3 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ViralTweets, TweetCategories } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AnalyticsPage() {
  const [tweets, setTweets] = useState<ViralTweets[]>([]);
  const [categories, setCategories] = useState<TweetCategories[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setCategories(categoriesResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate stats
  const totalTweets = tweets.length;
  const totalLikes = tweets.reduce((sum, t) => sum + (t.likesCount || 0), 0);
  const totalRetweets = tweets.reduce((sum, t) => sum + (t.retweetsCount || 0), 0);
  const totalViews = tweets.reduce((sum, t) => sum + (t.viewsCount || 0), 0);
  const avgLikes = totalTweets > 0 ? Math.round(totalLikes / totalTweets) : 0;
  const avgRetweets = totalTweets > 0 ? Math.round(totalRetweets / totalTweets) : 0;

  // Top tweets by engagement
  const topTweetsByLikes = [...tweets]
    .sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
    .slice(0, 5)
    .map(t => ({
      name: t.authorName?.substring(0, 15) || 'Unknown',
      likes: t.likesCount || 0,
    }));

  // Engagement over time (mock data based on publication dates)
  const engagementData = tweets
    .filter(t => t.publicationDate)
    .sort((a, b) => new Date(a.publicationDate!).getTime() - new Date(b.publicationDate!).getTime())
    .slice(-10)
    .map(t => ({
      date: new Date(t.publicationDate!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      likes: t.likesCount || 0,
      retweets: t.retweetsCount || 0,
    }));

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
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
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="text-sm font-paragraph text-primary font-medium">Platform Analytics</span>
          </div>
          
          <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
              Analytics Dashboard
            </span>
          </h1>
          
          <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
            Track engagement patterns, trending content, and platform performance metrics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Tweets */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="font-heading text-4xl font-black text-foreground mb-2">
                {formatNumber(totalTweets)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Total Tweets</p>
            </div>
          </div>

          {/* Total Likes */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="font-heading text-4xl font-black text-foreground mb-2">
                {formatNumber(totalLikes)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Total Likes</p>
            </div>
          </div>

          {/* Total Retweets */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Repeat2 className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <p className="font-heading text-4xl font-black text-foreground mb-2">
                {formatNumber(totalRetweets)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Total Retweets</p>
            </div>
          </div>

          {/* Total Views */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-pastel-lavender/20 to-pastel-lavender/10 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-pastel-lavender/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-pastel-lavender" />
                </div>
              </div>
              <p className="font-heading text-4xl font-black text-foreground mb-2">
                {formatNumber(totalViews)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Total Views</p>
            </div>
          </div>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Top Tweets by Likes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Top Tweets by Likes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTweetsByLikes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#E0E0E0" fontSize={12} />
                  <YAxis stroke="#E0E0E0" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 26, 46, 0.95)',
                      border: '1px solid rgba(224, 224, 224, 0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                    }}
                    labelStyle={{ color: '#E0E0E0' }}
                  />
                  <Bar dataKey="likes" fill="#FF6B6B" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Engagement Over Time */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Engagement Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" opacity={0.1} />
                  <XAxis dataKey="date" stroke="#E0E0E0" fontSize={12} />
                  <YAxis stroke="#E0E0E0" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(26, 26, 46, 0.95)',
                      border: '1px solid rgba(224, 224, 224, 0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)',
                    }}
                    labelStyle={{ color: '#E0E0E0' }}
                  />
                  <Line type="monotone" dataKey="likes" stroke="#FF6B6B" strokeWidth={3} dot={{ fill: '#FF6B6B', r: 4 }} />
                  <Line type="monotone" dataKey="retweets" stroke="#A0D2DB" strokeWidth={3} dot={{ fill: '#A0D2DB', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-black text-foreground mb-2">
                {formatNumber(avgLikes)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Avg Likes per Tweet</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-black text-foreground mb-2">
                {formatNumber(avgRetweets)}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Avg Retweets per Tweet</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-pastel-lavender/20 to-pastel-lavender/10 rounded-2xl blur-xl opacity-50" />
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-black text-foreground mb-2">
                {categories.filter(c => c.isActive).length}
              </p>
              <p className="font-paragraph text-sm text-foreground/60">Active Categories</p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
