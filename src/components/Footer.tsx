import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-foreground/10 bg-background/40 backdrop-blur-xl">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-heading font-black text-xl text-primary-foreground">
                SX
              </div>
              <span className="font-heading text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SearchX
              </span>
            </div>
            <p className="font-paragraph text-sm text-foreground/60 leading-relaxed">
              Discover the universe of viral tweets with advanced 3D discovery. Premium content curation platform.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Discover
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link to="/saved" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Saved Tweets
                </Link>
              </li>
              <li>
                <Link to="/profile" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="font-paragraph text-sm text-foreground/60 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Connect</h3>
            <div className="flex gap-3">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-primary/20 border border-foreground/10 hover:border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-primary/20 border border-foreground/10 hover:border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-primary/20 border border-foreground/10 hover:border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:contact@searchx.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-foreground/5 hover:bg-primary/20 border border-foreground/10 hover:border-primary/30 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/40">
              © {currentYear} SearchX. All rights reserved. Designed by Knox.
            </p>
            <p className="font-paragraph text-sm text-foreground/40">
              Built with React, Three.js & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
