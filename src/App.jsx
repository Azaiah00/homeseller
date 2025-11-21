import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  X, 
  ArrowUp, 
  Camera, 
  Layout, 
  Calendar,
  CheckCircle,
  DollarSign,
  Mail,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Youtube
} from 'lucide-react'
import NetSheetCalculator from './components/NetSheetCalculator'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFAQ, setActiveFAQ] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index)
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* STICKY NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={scrollToTop}
              className={`text-xl md:text-2xl font-bold transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              Frederick Sales
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollToSection('roadmap')}
                className={`font-semibold transition-colors ${
                  isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-light'
                }`}
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('marketing')}
                className={`font-semibold transition-colors ${
                  isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-light'
                }`}
              >
                Marketing
              </button>
              <button
                onClick={() => scrollToSection('financials')}
                className={`font-semibold transition-colors ${
                  isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-light'
                }`}
              >
                Financials
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className={`font-semibold transition-colors ${
                  isScrolled ? 'text-navy hover:text-primary' : 'text-white hover:text-primary-light'
                }`}
              >
                Calculator
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="cta-button primary text-sm px-4 py-2"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-navy' : 'text-white'
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              <button
                onClick={() => scrollToSection('roadmap')}
                className="block w-full text-left font-semibold text-navy py-2"
              >
                Process
              </button>
              <button
                onClick={() => scrollToSection('marketing')}
                className="block w-full text-left font-semibold text-navy py-2"
              >
                Marketing
              </button>
              <button
                onClick={() => scrollToSection('financials')}
                className="block w-full text-left font-semibold text-navy py-2"
              >
                Financials
              </button>
              <button
                onClick={() => scrollToSection('calculator')}
                className="block w-full text-left font-semibold text-navy py-2"
              >
                Calculator
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="cta-button primary w-full"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy-dark to-navy pt-20">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <motion.div
          className="container relative z-10 text-center text-white py-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle className="text-primary" size={24} />
            <span className="text-sm font-semibold">Licensed in VA, DC & MD • 7+ Years Experience</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Maximize Your Home's Value
            <br />
            <span className="text-primary-light">from Day One</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
            The modern roadmap to selling your home for top dollar with less stress.
          </p>
          
          <motion.button
            onClick={() => scrollToSection('calculator')}
            className="cta-button primary text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate My Net Proceeds
          </motion.button>
        </motion.div>
      </section>

      {/* ROADMAP SECTION */}
      <section id="roadmap" className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">From Pre-Market to SOLD</h2>
            <p className="section-subtitle">
              Your step-by-step roadmap to a successful home sale
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Step 1 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Strategic Consultation</h3>
                <p className="text-gray-700 leading-relaxed">
                  We start by reviewing your goals, timeline, and conducting a comprehensive market analysis. 
                  This foundation sets the stage for everything that follows.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Property Prep & Staging</h3>
                <p className="text-gray-700 leading-relaxed">
                  Decluttering, repairs, and leveraging our "Virtual Staging Advantage" (more on this later). 
                  We transform your home into a buyer's dream before they even step foot inside.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Pricing Strategy</h3>
                <p className="text-gray-700 leading-relaxed">
                  Positioning your home to attract the maximum pool of buyers. We analyze comparable sales 
                  and market conditions to price it right from day one.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">The "Coming Soon" Launch</h3>
                <p className="text-gray-700 leading-relaxed">
                  Generating buzz before we even hit the MLS. We create anticipation and build a waiting list 
                  of qualified buyers before your home officially goes live.
                </p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Live on Market & Open Houses</h3>
                <p className="text-gray-700 leading-relaxed">
                  We don't just open doors; we collect critical feedback from every visitor to adjust our 
                  strategy in real-time. Every showing is an opportunity to refine and improve.
                </p>
              </div>
            </motion.div>

            {/* Step 6 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                6
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Reviewing Offers & Negotiations</h3>
                <p className="text-gray-700 leading-relaxed">
                  We negotiate terms, not just price. From closing dates to contingencies, we ensure every 
                  aspect of the deal works in your favor.
                </p>
              </div>
            </motion.div>

            {/* Step 7 */}
            <motion.div
              variants={fadeInUp}
              className="relative pl-12 border-l-4 border-primary"
            >
              <div className="absolute -left-6 top-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                7
              </div>
              <div className="bg-gray-50 rounded-lg p-6 ml-4">
                <h3 className="text-2xl font-bold text-navy mb-3">Escrow & Closing</h3>
                <p className="text-gray-700 leading-relaxed">
                  Managing inspections, appraisals, and paperwork until you get paid. We handle every detail 
                  so you can focus on your next chapter.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ELITE MARKETING PLAN SECTION */}
      <section id="marketing" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Elite Marketing Plan</h2>
            <p className="section-subtitle">
              Our comprehensive marketing strategy designed to maximize your home's exposure and value
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Professional Photography */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Professional Photography</h3>
              <p className="text-gray-600">
                First impressions are digital. We use HDR editorial-grade photography that makes your home 
                stand out in online listings.
              </p>
            </motion.div>

            {/* Floor Plans */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layout className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Floor Plans</h3>
              <p className="text-gray-600">
                Buyers need to visualize the flow. Included with every listing to help buyers understand 
                your home's layout and potential.
              </p>
            </motion.div>

            {/* Open House Strategy */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Open House Strategy</h3>
              <p className="text-gray-600">
                We use Open Houses to identify qualified buyers, convert lookers into offers, and perform 
                aggressive follow-up prospecting immediately after the event.
              </p>
            </motion.div>
          </motion.div>

          {/* Virtual vs Traditional Staging Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-center text-navy mb-8">
              Staging Showdown: Virtual vs. Traditional
            </h3>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
                {/* Traditional Staging */}
                <div className="p-8 bg-gray-50">
                  <h4 className="text-2xl font-bold text-navy mb-6 text-center">Traditional Staging</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>High Cost:</strong> $$$ Thousands of dollars</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Intrusive:</strong> Requires moving furniture in/out</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Risk of Damage:</strong> Potential wear and tear</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <X className="text-red-500 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Limited Options:</strong> One design style</span>
                    </li>
                  </ul>
                </div>

                {/* Virtual Staging */}
                <div className="p-8 bg-primary/5">
                  <h4 className="text-2xl font-bold text-primary mb-6 text-center">Virtual Staging (Our Method)</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Cost-effective:</strong> Included in our service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Unlimited Design Styles:</strong> Try multiple looks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Fast Turnaround:</strong> Quick and efficient</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
                      <span className="text-gray-700"><strong>Attracts Online Clicks:</strong> Modern and eye-catching</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-6 italic">
              Our Virtual Staging is the smarter, modern choice that saves you money while maximizing your home's appeal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STRATEGIC FINANCIALS SECTION */}
      <section id="financials" className="py-20 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Strategic Financials</h2>
            <h3 className="text-3xl font-bold text-center text-navy mb-6">
              The Power of Concessions: Winning Strategies in Any Market
            </h3>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <DollarSign className="text-primary mt-1 flex-shrink-0" size={32} />
                <div>
                  <h4 className="text-2xl font-bold text-navy mb-4">What Are Buyer Concessions?</h4>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4">
                    A Buyer Concession is a credit you provide at closing to cover buyer costs (rate buydowns, 
                    closing fees). Why do this? It lowers the barrier to entry, attracting a larger pool of buyers 
                    who might be cash-constrained but income-strong.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-primary/20 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-navy mb-4">The Benefit</h4>
              <p className="text-gray-700 text-lg leading-relaxed">
                By helping with upfront costs, we can often maintain a higher sale price, netting you the same 
                (or more) money while selling faster. It's a strategic move that benefits everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <h4 className="text-xl font-bold text-navy mb-3">Buyer's Market</h4>
                <p className="text-gray-700">
                  Stand out against the competition. Concessions make your home more attractive when buyers have 
                  multiple options to choose from.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                <h4 className="text-xl font-bold text-navy mb-3">Seller's Market</h4>
                <p className="text-gray-700">
                  Attract the highest quality offers, not just the highest price. Concessions help you get the 
                  most qualified buyers.
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h4 className="text-2xl font-bold text-navy mb-6">Common Questions</h4>
              <div className="space-y-4">
                <div
                  className="bg-white rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => toggleFAQ(0)}
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-navy">
                      Why should I pay the buyer's closing costs?
                    </h5>
                    <motion.div
                      animate={{ rotate: activeFAQ === 0 ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUp size={20} className="text-primary" />
                    </motion.div>
                  </div>
                  {activeFAQ === 0 && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-700 mt-4 leading-relaxed"
                    >
                      It eliminates obstacles. You aren't 'paying' for them; you are strategically structuring 
                      the deal to get your home sold. By offering concessions, we can often negotiate a higher 
                      sale price that offsets the cost, while making your home more attractive to buyers. It's 
                      about getting the best net result for you.
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NET SHEET CALCULATOR */}
      <NetSheetCalculator />

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-gradient-to-br from-navy to-navy-dark text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Let's book a consultation to discuss how we can maximize your home's value and get you the best possible outcome.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-primary" size={24} />
                <a href="mailto:fred@kerishullteam.com" className="text-lg hover:text-primary transition-colors">
                  fred@kerishullteam.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-primary" size={24} />
                <a href="tel:7033994394" className="text-lg hover:text-primary transition-colors">
                  (703) 399-4394
                </a>
              </div>
              
              <div className="pt-6 border-t border-white/20">
                <p className="text-center text-gray-200 mb-4">Connect with us</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="hover:text-primary transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <a href="#" className="hover:text-primary transition-colors">
                    <Youtube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-dark text-white py-12">
        <div className="container">
          <div className="text-center space-y-4">
            <p className="text-xl font-bold">Frederick Sales | Realtor®</p>
            <p className="text-gray-400">Licensed in VA, DC, & MD</p>
            <p className="text-sm text-gray-500">Equal Housing Opportunity</p>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-light transition-colors z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </div>
  )
}

export default App
