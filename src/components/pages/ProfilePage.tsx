import { motion } from 'framer-motion';
import { User, Mail, Calendar, Bookmark, BarChart3 } from 'lucide-react';
import { useMember } from '@/integrations';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import { useBookmarkStore } from '@/stores/bookmarkStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

function ProfilePageContent() {
  const { member } = useMember();
  const { bookmarks } = useBookmarkStore();

  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
            <User className="w-5 h-5 text-primary" />
            <span className="text-sm font-paragraph text-primary font-medium">Your Profile</span>
          </div>
          
          <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12">
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-foreground/10">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  {member?.profile?.photo?.url ? (
                    <Image src={member.profile.photo.url} alt={member.profile.nickname || 'Profile'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-5xl font-heading font-black text-primary-foreground">
                      {member?.profile?.nickname?.charAt(0)?.toUpperCase() || 
                       member?.contact?.firstName?.charAt(0)?.toUpperCase() || 
                       'U'}
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-heading text-4xl font-black text-foreground mb-2">
                    {member?.profile?.nickname || 
                     `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() || 
                     'User'}
                  </h2>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-lg text-foreground/60 mb-4">
                      {member.profile.title}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Mail className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        {member?.loginEmail || 'No email'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span className="font-paragraph text-sm">
                        Joined {formatDate(member?._createdDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link to="/saved">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Bookmark className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading text-3xl font-black text-foreground">
                          {bookmarks.length}
                        </p>
                        <p className="font-paragraph text-sm text-foreground/60">Saved Tweets</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>

                <Link to="/analytics">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-heading text-3xl font-black text-foreground">
                          View
                        </p>
                        <p className="font-paragraph text-sm text-foreground/60">Analytics Dashboard</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Account Info */}
              <div className="space-y-4">
                <h3 className="font-heading text-xl font-bold text-foreground mb-4">Account Information</h3>
                
                <div className="p-4 rounded-xl bg-foreground/5">
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Email Status</p>
                  <p className="font-paragraph text-base text-foreground">
                    {member?.loginEmailVerified ? (
                      <span className="text-pastel-mint">✓ Verified</span>
                    ) : (
                      <span className="text-foreground/60">Not verified</span>
                    )}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-foreground/5">
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Account Status</p>
                  <p className="font-paragraph text-base text-foreground capitalize">
                    {member?.status?.toLowerCase() || 'Active'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-foreground/5">
                  <p className="font-paragraph text-sm text-foreground/60 mb-1">Last Login</p>
                  <p className="font-paragraph text-base text-foreground">
                    {formatDate(member?.lastLoginDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <MemberProtectedRoute>
      <ProfilePageContent />
    </MemberProtectedRoute>
  );
}
