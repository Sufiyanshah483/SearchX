import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function PrivacyPage() {
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
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-paragraph text-primary font-medium">Legal</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
                Privacy Policy
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
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Introduction</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Welcome to SearchX. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our platform and tell you about your privacy rights.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Data We Collect</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  We may collect, use, store and transfer different kinds of personal data about you:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li>Identity Data: username, profile information</li>
                  <li>Contact Data: email address</li>
                  <li>Usage Data: information about how you use our platform</li>
                  <li>Technical Data: IP address, browser type, device information</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">How We Use Your Data</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Data Security</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Your Rights</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  Under certain circumstances, you have rights under data protection laws in relation to your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at privacy@searchx.com
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
