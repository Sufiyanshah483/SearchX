import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function TermsPage() {
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
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-paragraph text-primary font-medium">Legal</span>
            </div>
            
            <h1 className="font-heading text-6xl md:text-7xl font-black mb-6 leading-none">
              <span className="bg-gradient-to-r from-primary via-pastel-lavender to-secondary bg-clip-text text-transparent">
                Terms of Service
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
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Agreement to Terms</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  By accessing and using SearchX, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Use License</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials on SearchX for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">User Accounts</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Content</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  Our platform aggregates and displays publicly available tweets. We do not claim ownership of any content displayed on our platform. All content remains the property of its original creators. Users are responsible for ensuring their use of the platform complies with applicable copyright and intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Prohibited Uses</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed mb-4">
                  You may not use SearchX:
                </p>
                <ul className="list-disc list-inside space-y-2 font-paragraph text-base text-foreground/80">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                </ul>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  In no event shall SearchX or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SearchX, even if SearchX or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Modifications</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  SearchX may revise these terms of service at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                  If you have any questions about these Terms, please contact us at legal@searchx.com
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
