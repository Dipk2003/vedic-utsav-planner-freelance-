import AppImage from '@/components/ui/AppImage';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string[];
  image: string;
  alt: string;
}

const portfolioItems: PortfolioItem[] = [
{
  id: 'portfolio_royal_wedding',
  title: 'Royal Wedding in Delhi',
  category: 'Wedding',
  description: '3-day celebration with traditional ceremonies',
  stats: ['800 guests', 'Delhi NCR', '36-hour setup'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1627156b4-1766429109564.png",
  alt: 'Luxurious wedding venue with golden decorations and floral arrangements'
},
{
  id: 'portfolio_tech_annual',
  title: 'Tech Company Annual Meet',
  category: 'Corporate',
  description: 'Hybrid event with live streaming and interactive sessions',
  stats: ['1200 attendees', 'Greater Noida', '2-day conference'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_11c8db986-1766988519257.png",
  alt: 'Modern corporate conference hall with stage lighting and audience seating'
},
{
  id: 'portfolio_bollywood_birthday',
  title: 'Vintage Bollywood Birthday Bash',
  category: 'Birthday',
  description: 'Complete theme execution with retro decor',
  stats: ['250 guests', 'Delhi', 'Live band'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_12e6792a6-1765898371511.png",
  alt: 'Colorful birthday party venue with Bollywood themed decorations and stage setup'
},
{
  id: 'portfolio_product_launch',
  title: 'Luxury Car Product Launch',
  category: 'Corporate',
  description: 'Brand activation with immersive experience zones',
  stats: ['500 VIP guests', 'Delhi NCR', 'Media coverage'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9f6b8ca-1766852583977.png",
  alt: 'Elegant product launch event with luxury car display and sophisticated lighting'
},
{
  id: 'portfolio_destination_wedding',
  title: 'Ganga Riverside Wedding',
  category: 'Wedding',
  description: 'Intimate celebration with sunset ceremony',
  stats: ['150 guests', 'Varanasi', '2-day event'],
  image: "https://images.unsplash.com/photo-1684552675694-69737d7902fc",
  alt: 'Elegant outdoor wedding setup with white chairs and floral arch at sunset'
},
{
  id: 'portfolio_kids_birthday',
  title: 'Superhero Themed Kids Party',
  category: 'Birthday',
  description: 'Interactive games and entertainment zones',
  stats: ['80 kids', 'Greater Noida', 'Activity zones'],
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_15bd09b84-1767354295534.png",
  alt: 'Vibrant kids birthday party with superhero themed decorations and play areas'
}];


export default function PortfolioSection() {
  return (
    <section id="portfolio" className="w-full px-8 md:px-16 py-20 lg:py-28 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-hidden reveal">
          <span className="inline-block px-4 py-1.5 rounded-full border border-border text-xs font-semibold text-muted-foreground font-geist tracking-wide uppercase mb-6">
            Our Portfolio
          </span>
          <h2 className="text-4xl lg:text-5xl font-medium tracking-tight font-jakarta leading-[1.1] mb-6 text-foreground">
            Events That Made <br />
            <span className="text-primary">Lasting Memories</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto font-geist">
            From grand celebrations to intimate gatherings, explore our recent work across Delhi, Greater Noida, and Varanasi.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) =>
          <div
            key={item.id}
            className={`group cursor-pointer reveal-hidden reveal ${
            index % 3 === 1 ? 'lg:mt-12' : ''}`
            }>
            
              <div className="relative overflow-hidden rounded-[2rem] bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] overflow-hidden">
                  <AppImage
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover img-hover-scale" />
                
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium mb-3">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-semibold font-jakarta mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/80 font-geist mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {item.stats.map((stat, idx) =>
                  <span
                    key={`${item.id}_stat_${idx}`}
                    className="text-xs px-2 py-1 rounded bg-white/10 backdrop-blur-sm font-geist">
                    
                        {stat}
                      </span>
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center reveal-hidden reveal">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-all duration-300 cursor-hover btn-hover-lift">
            View Complete Portfolio
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>);

}
