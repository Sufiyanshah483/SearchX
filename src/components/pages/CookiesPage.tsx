import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <AnimatedBackground />
      <Header />

      <div className="relative w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-6">
              <Cookie className="w-5 h-5 text-primary" />
              <span className="text-sm font-paragraph text-primary font-medium">Legal</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
                Cookie Policy
              </span>
            </h1>
            
            <p className="font-paragraph text-lg text-foreground/60">
              Last updated: February 6, 2026
            </p>
          </div>

          {/* Content */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-30" />
            
            <div className="relative bg-background/40 backdrop-blur-xl border border-foreground/10 rounded-2xl p-8 md:p-12 space-y-8">
              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">What Are Cookies</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">How We Use Cookies</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  SearchX uses cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</li>
                  <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                  <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make and provide enhanced, more personal features.</li>
                  <li><strong>Preference Cookies:</strong> These cookies remember your settings and preferences, such as language preferences and saved tweets.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Types of Cookies We Use</h2>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-foreground/5">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Session Cookies</h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      Temporary cookies that expire when you close your browser. These are used to maintain your session while browsing.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-foreground/5">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Persistent Cookies</h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      Cookies that remain on your device for a set period or until you delete them. These help us remember your preferences and settings.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-foreground/5">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2">Local Storage</h3>
                    <p className="font-paragraph text-base text-foreground/80">
                      We use browser local storage to save your bookmarked tweets and user preferences for a better experience.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Managing Cookies</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  You can control and manage cookies in various ways. Please note that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
                </p>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Most browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Instructions for managing cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80 mt-4">
                  <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
                  <li>Firefox: Settings → Privacy & Security → Cookies and Site Data</li>
                  <li>Safari: Preferences → Privacy → Cookies and website data</li>
                  <li>Edge: Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Third-Party Cookies</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  We may use third-party services that also use cookies. These services help us analyze website traffic and improve our service. We do not control these third-party cookies and recommend reviewing their privacy policies.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Updates to This Policy</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  If you have any questions about our use of cookies, please contact us at cookies@searchx.com
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
