import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = 2026

  return (
    <footer className="w-full bg-dark text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold font-jakarta text-primary mb-2">VedicUtsav</h3>
            <p className="text-sm text-white/70 font-geist">
              Creating unforgettable moments in Delhi, Greater Noida, and Varanasi
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-geist">
            <a href="/homepage" className="text-white/80 hover:text-primary transition-colors cursor-hover">
              Home
            </a>
            <a href="#services" className="text-white/80 hover:text-primary transition-colors cursor-hover">
              Services
            </a>
            <a href="#portfolio" className="text-white/80 hover:text-primary transition-colors cursor-hover">
              Portfolio
            </a>
            <a href="#contact-form" className="text-white/80 hover:text-primary transition-colors cursor-hover">
              Contact
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/vedicutsav"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-all cursor-hover"
              aria-label="Instagram"
            >
              <Icon name="CameraIcon" className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://facebook.com/vedicutsav"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-all cursor-hover"
              aria-label="Facebook"
            >
              <Icon name="ShareIcon" className="w-5 h-5 text-white" />
            </a>
            <a
              href="https://wa.me/919369190920"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full glass-panel-dark flex items-center justify-center hover:bg-white/10 transition-all cursor-hover"
              aria-label="WhatsApp"
            >
              <Icon name="ChatBubbleLeftRightIcon" className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60 font-geist">
            <p>© {currentYear} VedicUtsav. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors cursor-hover">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-white transition-colors cursor-hover">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
