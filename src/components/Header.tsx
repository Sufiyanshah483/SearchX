import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X, User, BarChart3, Bookmark } from 'lucide-react';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { member, isAuthenticated, isLoading, actions } = useMember();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-foreground/10" />
      
      <nav className="relative max-w-[100rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-heading font-black text-xl text-primary-foreground">
                SX
              </div>
              <span className="font-heading text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SearchX
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors">
              Discover
            </Link>
            <Link to="/analytics" className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Link>
            {isAuthenticated && (
              <Link to="/saved" className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <Bookmark className="w-4 h-4" />
                Saved
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-foreground/10 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" className="rounded-xl font-paragraph">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="rounded-xl font-paragraph border-foreground/20 hover:border-primary hover:text-primary"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-semibold px-6"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-background/95 backdrop-blur-xl border border-foreground/10 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                Discover
              </Link>
              <Link
                to="/analytics"
                onClick={() => setMobileMenuOpen(false)}
                className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Analytics
              </Link>
              {isAuthenticated && (
                <Link
                  to="/saved"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-paragraph text-base font-medium text-foreground hover:text-primary transition-colors py-2 flex items-center gap-2"
                >
                  <Bookmark className="w-4 h-4" />
                  Saved
                </Link>
              )}
              <div className="border-t border-foreground/10 pt-4 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full mb-3"
                    >
                      <Button variant="ghost" className="w-full rounded-xl font-paragraph justify-start">
                        <User className="w-4 h-4 mr-2" />
                        {member?.profile?.nickname || 'Profile'}
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full rounded-xl font-paragraph border-foreground/20"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      actions.login();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph font-semibold"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
