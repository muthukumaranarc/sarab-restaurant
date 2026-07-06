import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeMenuCategory, setActiveMenuCategory] = useState('hot')
  const [countdown, setCountdown] = useState({ hours: 8, minutes: 45, seconds: 30 })
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', guests: '', date: '', time: '', requests: ''
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  })
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTimeline, setActiveTimeline] = useState(0)
  const [activeShowcase, setActiveShowcase] = useState(0)
  const [emailInput, setEmailInput] = useState('')
  const [activeNav, setActiveNav] = useState('home')

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else {
          seconds = 59
          if (minutes > 0) minutes--
          else {
            minutes = 59
            if (hours > 0) hours--
            else { hours = 8; minutes = 45; seconds = 30 }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Section animations on scroll
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.section-animate').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          el.classList.add('visible')
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    // Trigger on load
    setTimeout(handleScroll, 100)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-based nav active detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Timeline auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTimeline(prev => (prev + 1) % timelineData.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Showcase auto-cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveShowcase(prev => (prev + 1) % showcaseItems.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const categories = [
    { id: 'all', name: 'All Items', count: 99 },
    { id: 'burgers', name: 'Burgers', count: 24 },
    { id: 'pizza', name: 'Pizza', count: 18 },
    { id: 'chicken', name: 'Fried Chicken', count: 15 },
    { id: 'wraps', name: 'Wraps', count: 12 },
    { id: 'desserts', name: 'Desserts', count: 20 }
  ]

  const menuItems = [
    { id: 1, category: 'burgers', type: 'hot', name: 'Classic Smash Burger', desc: 'Double smashed patty, cheddar, caramelized onions, pickles & special sauce', price: 14.99, oldPrice: 18.99, rating: 128, badge: 'Hot', imageSrc: '/src/assets/burger-hero.jpg', alt: 'Classic smash burger' },
    { id: 2, category: 'pizza', type: 'hot', name: 'Margherita Royale', desc: 'San Marzano tomatoes, buffalo mozzarella, basil & truffle oil on sourdough', price: 19.99, oldPrice: 24.99, rating: 95, badge: 'New', imageSrc: '/src/assets/pizza.jpg', alt: 'Margherita pizza royale' },
    { id: 3, category: 'chicken', type: 'hot', name: 'Nashville Hot Chicken', desc: 'Crispy fried chicken in fiery Nashville spice blend with honey drizzle', price: 12.99, oldPrice: 16.99, rating: 210, badge: 'Best Seller', imageSrc: '/src/assets/fried-chicken.jpg', alt: 'Nashville hot chicken' },
    { id: 4, category: 'wraps', type: 'hot', name: 'Loaded Fajita Wrap', desc: 'Grilled chicken, peppers, sour cream & guacamole in a warm tortilla', price: 10.99, oldPrice: null, rating: 74, badge: '', imageSrc: '/src/assets/wrap.jpg', alt: 'Loaded fajita wrap' },
    { id: 5, category: 'desserts', type: 'hot', name: 'Nutella Lava Cake', desc: 'Molten chocolate cake with Nutella center, vanilla ice cream & caramel', price: 8.99, oldPrice: 11.99, rating: 56, badge: 'New', imageSrc: '/src/assets/dessert-cake.jpg', alt: 'Nutella lava cake' },
    { id: 6, category: 'pizza', type: 'hot', name: 'Truffle Mushroom Pasta', desc: 'Al dente tagliatelle, wild mushrooms, black truffle, parmesan & thyme', price: 16.99, oldPrice: null, rating: 88, badge: "Chef's Pick", imageSrc: '/src/assets/pasta.jpg', alt: 'Truffle mushroom pasta' },
    { id: 7, category: 'burgers', type: 'burgers', name: 'Double Cheese Burger', desc: 'Two beef patties, double cheese, lettuce, tomato & secret sauce', price: 13.99, oldPrice: 16.99, rating: 145, badge: 'Popular', imageSrc: '/src/assets/burger-offer.jpg', alt: 'Double cheese burger' },
    { id: 8, category: 'burgers', type: 'burgers', name: 'Bacon BBQ Burger', desc: 'Smoked bacon, onion rings, BBQ sauce & cheddar on brioche bun', price: 15.99, oldPrice: null, rating: 98, badge: '', imageSrc: '/src/assets/burger-hero.jpg', alt: 'Bacon BBQ burger' },
    { id: 9, category: 'pizza', type: 'pizza', name: 'Pepperoni Supreme', desc: 'Double pepperoni, mozzarella, oregano & house tomato sauce', price: 17.99, oldPrice: 21.99, rating: 167, badge: 'Best Seller', imageSrc: '/src/assets/pizza.jpg', alt: 'Pepperoni supreme pizza' },
    { id: 10, category: 'pizza', type: 'pizza', name: 'Quattro Formaggi', desc: 'Four cheese blend: mozzarella, gorgonzola, parmesan & ricotta', price: 18.99, oldPrice: null, rating: 82, badge: '', imageSrc: '/src/assets/pizza.jpg', alt: 'Quattro formaggi pizza' },
    { id: 11, category: 'chicken', type: 'chicken', name: 'Buffalo Wings', desc: 'Crispy wings tossed in spicy buffalo sauce with blue cheese dip', price: 11.99, oldPrice: 14.99, rating: 193, badge: 'Hot', imageSrc: '/src/assets/chicken-wings.jpg', alt: 'Buffalo chicken wings' },
    { id: 12, category: 'chicken', type: 'chicken', name: 'Grilled Chicken Wrap', desc: 'Marinated grilled chicken, fresh veggies & tzatziki in whole wheat wrap', price: 10.99, oldPrice: null, rating: 76, badge: '', imageSrc: '/src/assets/wrap.jpg', alt: 'Grilled chicken wrap' },
    { id: 13, category: 'desserts', type: 'desserts', name: 'Tiramisu', desc: 'Classic Italian tiramisu with mascarpone, espresso & cocoa', price: 7.99, oldPrice: 10.99, rating: 64, badge: '', imageSrc: '/src/assets/tiramisu.jpg', alt: 'Classic tiramisu' },
    { id: 14, category: 'desserts', type: 'desserts', name: 'Ice Cream Sundae', desc: 'Triple scoop with hot fudge, caramel, nuts & whipped cream', price: 6.99, oldPrice: null, rating: 91, badge: 'New', imageSrc: '/src/assets/ice-cream.jpg', alt: 'Ice cream sundae' },
  ]

  const timelineData = [
    { year: '2012', title: 'Evolution of Restaurants', desc: 'Sarab opens its first 20-seat diner on Flavor Street. Within 3 months, lines stretch around the block every evening as word of our food spreads.' },
    { year: '2015', title: 'Fine Dining & The Concept', desc: 'Expanding the vision - we introduced our signature tasting menu and hired our first Michelin-trained chef, elevating our craft to remarkable new heights.' },
    { year: '2019', title: 'Modern Fast Food Origins', desc: 'Launched our signature fast-food line, merging gourmet quality with speed and convenience. Within 6 months we won 3 prestigious culinary awards nationally.' },
    { year: '2026', title: 'National Expansion', desc: 'Now operating in 8 cities across the US with an online delivery platform handling 10,000+ orders weekly - and growing every single day.' }
  ]

  const chefs = [
    { name: 'Alice Mortal', role: 'Head Chef', exp: '12 years experience', imageSrc: '/src/assets/chef.jpg', alt: 'Head Chef Alice Mortal' },
    { name: 'Michael Corn', role: 'Grill Master', exp: '8 years experience', imageSrc: '/src/assets/chef-2.jpg', alt: 'Grill Master Michael Corn' },
    { name: 'Faz Chowdel', role: 'Pastry Chef', exp: '10 years experience', imageSrc: '/src/assets/chef-3.jpg', alt: 'Pastry Chef Faz Chowdel' },
    { name: 'William Latnum', role: 'Pizza Artisan', exp: '9 years experience', imageSrc: '/src/assets/chef-4.jpg', alt: 'Pizza Artisan William Latnum' }
  ]

  const testimonials = [
    { quote: "Honestly the best burgers I've ever had. The smash burger is incredible - perfectly crispy edges, juicy inside, and those pickles! We come every Friday now.", name: 'Monica Wilber', role: 'Regular Customer' },
    { quote: "Ordered delivery and the food arrived hot and fresh in 22 minutes. Portions are generous. Sarab has become my go-to comfort food spot without question.", name: 'Cameron Fox', role: 'Food Blogger' },
    { quote: "The truffle pasta blew my mind. I didn't expect that quality from a fast food place. Great ambiance, super friendly staff. Highly recommended!", name: 'Priya Sharma', role: 'Food Enthusiast' },
    { quote: "Catered our office party of 50 people and everything was flawless. Fresh, delicious, on time and well presented. Nashville chicken was the absolute star!", name: 'David Park', role: 'Corporate Client' }
  ]

  const blogPosts = [
    { date: '14', month: 'Mar', category: 'Food & Health', title: 'Healthy Fast Food: A Myth or Beautiful Reality', author: 'James Writer', comments: 24, imageSrc: '/src/assets/blog-1.jpg', alt: 'Healthy food blog post' },
    { date: '28', month: 'Feb', category: 'Food Science', title: "Is Fast Food Getting Healthier? Here's What We Found", author: 'Sarah Grain', comments: 18, imageSrc: '/src/assets/blog-2.jpg', alt: 'Fast food health blog post' },
    { date: '05', month: 'Jan', category: 'Recipes', title: "Innovative Hot Chickpeas Flake Crackin' Recipe at Home", author: 'Chef Marcus', comments: 32, imageSrc: '/src/assets/blog-3.jpg', alt: 'Chickpeas recipe blog post' }
  ]

  const showcaseItems = [
    { name: 'Gourmet Burgers', imageSrc: '/src/assets/burger-hero.jpg', alt: 'Gourmet Burgers' },
    { name: 'Wood-Fired Pizza', imageSrc: '/src/assets/pizza.jpg', alt: 'Wood-Fired Pizza' },
    { name: 'Crispy Fried Chicken', imageSrc: '/src/assets/fried-chicken.jpg', alt: 'Crispy Fried Chicken' },
    { name: 'Sweet Desserts', imageSrc: '/src/assets/dessert-cake.jpg', alt: 'Sweet Desserts' },
    { name: 'Fresh Wraps & Rolls', imageSrc: '/src/assets/wrap.jpg', alt: 'Fresh Wraps & Rolls' }
  ]

  const filteredMenuItems = activeMenuCategory === 'hot'
    ? menuItems.filter(item => item.badge)
    : menuItems.filter(item => item.type === activeMenuCategory)

  const bookingTimeoutRef = useRef(null)
  const contactTimeoutRef = useRef(null)

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setBookingSubmitted(true)
    if (bookingTimeoutRef.current) clearTimeout(bookingTimeoutRef.current)
    bookingTimeoutRef.current = setTimeout(() => setBookingSubmitted(false), 4000)
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current)
    contactTimeoutRef.current = setTimeout(() => setContactSubmitted(false), 4000)
  }

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (bookingTimeoutRef.current) clearTimeout(bookingTimeoutRef.current)
      if (contactTimeoutRef.current) clearTimeout(contactTimeoutRef.current)
    }
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const getInitialsSvg = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('')
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect fill='%23ff6b35' width='400' height='400'/%3E%3Ctext x='200' y='200' text-anchor='middle' dominant-baseline='central' font-family='Poppins,sans-serif' font-size='100' font-weight='700' fill='white'%3E${encodeURIComponent(initials)}%3C/text%3E%3C/svg%3E`
  }

  const handleImgError = (e, fallbackSrc) => {
    e.target.onerror = null
    e.target.src = fallbackSrc || getInitialsSvg('Chef')
  }

  return (
    <div className="app">
      {/* Header / Nav */}
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <span className="logo-icon">🍽️</span>
            <div className="logo-text">
              <h1>Sarab</h1>
              <span>Fast Food & Restaurant</span>
            </div>
          </div>
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className={`nav-link ${activeNav === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('home'); setMobileMenuOpen(false); }}>Home</a>
            <a href="#about" className={`nav-link ${activeNav === 'about' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('about'); setMobileMenuOpen(false); }}>About</a>
            <a href="#menu" className={`nav-link ${activeNav === 'menu' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('menu'); setMobileMenuOpen(false); }}>Menu</a>
            <a href="#team" className={`nav-link ${activeNav === 'team' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('team'); setMobileMenuOpen(false); }}>Team</a>
            <a href="#blog" className={`nav-link ${activeNav === 'blog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('blog'); setMobileMenuOpen(false); }}>Blog</a>
            <a href="#contact" className={`nav-link ${activeNav === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); scrollToSection('contact'); setMobileMenuOpen(false); }}>Contact</a>
          </nav>
          <div className="header-actions">
            <button className="btn btn-primary btn-sm">Order Now</button>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section section-animate" id="home">
        {/* Animated background patterns */}
        <div className="hero-patterns" aria-hidden="true">
          <div className="pattern-circle pc-1"></div>
          <div className="pattern-circle pc-2"></div>
          <div className="pattern-circle pc-3"></div>
          <div className="pattern-ring pr-1"></div>
          <div className="pattern-ring pr-2"></div>
          <div className="pattern-dots"></div>
        </div>

        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-badge">#1 Rated in New York</span>
            <h1 className="hero-heading">
              Delicious Fast Food<br />
              <span className="highlight">for Every Moment</span>
            </h1>
            <p className="hero-desc">
              Experience bold flavors crafted from premium ingredients. From crispy burgers to gourmet pizzas — every bite is an adventure worth savoring.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg">Explore Menu</button>
              <button className="btn btn-outline btn-lg">▶ Watch Our Story</button>
            </div>
            {/* Minimal trusted badge */}
            <div className="hero-trusted">
              <div className="trusted-avatars">
                <span className="trusted-avatar" style={{background: '#ff6b35'}}>M</span>
                <span className="trusted-avatar" style={{background: '#1a1a2e'}}>C</span>
                <span className="trusted-avatar" style={{background: '#e85a26'}}>P</span>
                <span className="trusted-avatar trusted-more">+2k</span>
              </div>
              <div className="trusted-text">
                <strong>Trusted by 2,000+</strong>
                <span>happy customers weekly</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-ring"></div>
              <div className="hero-image-placeholder">
                <img src="/images/burger-hero.jpg" alt="Juicy gourmet burger" className="hero-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              </div>
              <div className="hero-badge-mini hb-1">
                <span className="hbm-icon">⭐</span>
                <span className="hbm-text">4.9/5</span>
              </div>
              <div className="hero-badge-mini hb-2">
                <span className="hbm-icon">🔥</span>
                <span className="hbm-text">Hot Deal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Strip */}
      <section className="featured-strip">
        <div className="container">
          <div className="featured-items">
            <div className="featured-item">
              <img src="/images/fried-chicken.jpg" alt="Crispy Fried Chicken" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Crispy Fried Chicken</span>
            </div>
            <div className="featured-item">
              <img src="/images/burger-hero.jpg" alt="Gourmet Burgers" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Gourmet Burgers</span>
            </div>
            <div className="featured-item">
              <img src="/images/pizza.jpg" alt="Artisan Pizzas" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Artisan Pizzas</span>
            </div>
            <div className="featured-item">
              <img src="/images/wrap.jpg" alt="Fresh Wraps & Rolls" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Fresh Wraps & Rolls</span>
            </div>
            <div className="featured-item">
              <img src="/images/fried-chicken.jpg" alt="Loaded Fries" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Loaded Fries</span>
            </div>
            <div className="featured-item">
              <img src="/images/ice-cream.jpg" alt="Ice Cream Shakes" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Ice Cream Shakes</span>
            </div>
            <div className="featured-item">
              <img src="/images/wrap.jpg" alt="Grilled Sandwiches" className="featured-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
              <span>Grilled Sandwiches</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What We Offer</span>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-desc">From sizzling burgers to exotic world cuisines - find your favourite in our menu</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="category-icon">
                  {cat.id === 'all' && <img src="/images/restaurant-interior.jpg" alt="All items" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  {cat.id === 'burgers' && <img src="/images/burger-hero.jpg" alt="Burgers" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  {cat.id === 'pizza' && <img src="/images/pizza.jpg" alt="Pizza" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  {cat.id === 'chicken' && <img src="/images/fried-chicken.jpg" alt="Fried Chicken" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  {cat.id === 'wraps' && <img src="/images/wrap.jpg" alt="Wraps" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                  {cat.id === 'desserts' && <img src="/images/dessert-cake.jpg" alt="Desserts" className="category-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />}
                </div>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">{cat.count} items</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About / Our Story Section */}
      <section className="section about-section section-animate" id="about">
        <div className="container about-grid">
          <div className="about-visual">
            <div className="about-image-placeholder">
              <span className="about-years-badge">12+<br />Years of<br />Excellence</span>
              <img src="/images/restaurant-interior.jpg" alt="Restaurant interior" className="about-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </div>
          </div>
          <div className="about-content">
            <span className="section-badge">Our Story</span>
            <h2 className="section-title left">We Invite You to Visit<br />Our Food Restaurant</h2>
            <p className="about-desc">
              Founded in 2012, Sarab began as a small corner joint with a big dream - to serve food that brings people together. Today we're proud to serve thousands of happy customers every week with the same passion that started it all.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <span className="af-icon">🥬</span>
                <div>
                  <h4>100% Fresh Ingredients</h4>
                  <p>We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="af-icon">🏆</span>
                <div>
                  <h4>Award-Winning Recipes</h4>
                  <p>Our signature recipes have won national culinary awards 5 years in a row.</p>
                </div>
              </div>
              <div className="about-feature">
                <span className="af-icon">⚡</span>
                <div>
                  <h4>Lightning-Fast Delivery</h4>
                  <p>Order online and get hot, fresh food at your door in under 25 minutes, guaranteed.</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => scrollToSection('menu')}>View Full Menu</button>
          </div>
        </div>
      </section>

      {/* Hot Deal Banner */}
      <section className="hot-deal-section">
        <div className="container">
          <div className="hot-deal-content">
            <div className="hot-deal-left">
              <span className="hot-deal-badge">🔥 Hot Deal</span>
              <h2 className="hot-deal-title">Crispy Fried Chicken</h2>
              <div className="hot-deal-tags">
                <span className="hot-deal-tag">Gourmet Burgers</span>
                <span className="hot-deal-tag">Artisan Pizzas</span>
                <span className="hot-deal-tag">Fresh Wraps & Rolls</span>
              </div>
              <div className="hot-deal-tags">
                <span className="hot-deal-tag">Loaded Fries</span>
                <span className="hot-deal-tag">Ice Cream Shakes</span>
                <span className="hot-deal-tag">Grilled Sandwiches</span>
              </div>
            </div>
            <div className="hot-deal-right">
              <span className="hot-deal-percent">30%</span>
              <span className="hot-deal-text">off today</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="section menu-section section-animate" id="menu">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What's Cooking</span>
            <h2 className="section-title">Our Delicious Menu</h2>
          </div>
          <div className="menu-tabs">
            <button className={`menu-tab ${activeMenuCategory === 'hot' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('hot')}>🔥 Hot</button>
            <button className={`menu-tab ${activeMenuCategory === 'burgers' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('burgers')}>🍔 Burgers</button>
            <button className={`menu-tab ${activeMenuCategory === 'pizza' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('pizza')}>🍕 Pizza</button>
            <button className={`menu-tab ${activeMenuCategory === 'chicken' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('chicken')}>🍗 Chicken</button>
            <button className={`menu-tab ${activeMenuCategory === 'wraps' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('wraps')}>🌯 Wraps</button>
            <button className={`menu-tab ${activeMenuCategory === 'desserts' ? 'active' : ''}`} onClick={() => setActiveMenuCategory('desserts')}>🍰 Desserts</button>
          </div>
          <div className="menu-grid">
            {filteredMenuItems.map(item => (
              <div key={item.id} className="menu-card">
                {item.badge && <span className="menu-badge">{item.badge}</span>}
                <div className="menu-card-image">                    <img src={item.imageSrc} alt={item.alt} className="menu-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                </div>
                <div className="menu-card-body">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-desc">{item.desc}</p>
                  <div className="menu-card-footer">
                    <div className="menu-pricing">
                      <span className="menu-price">${item.price.toFixed(2)}</span>
                      {item.oldPrice && <span className="menu-old-price">${item.oldPrice.toFixed(2)}</span>}
                    </div>
                    <span className="menu-rating">⭐ {item.rating}</span>
                  </div>
                  <button className="btn btn-sm btn-primary menu-add">Add to Order</button>
                </div>
              </div>
            ))}
          </div>
          <div className="menu-view-all">
            <button className="btn btn-outline btn-lg">View Full Menu →</button>
          </div>
        </div>
      </section>

      {/* Limited Time Offer */}
      <section className="limited-offer-section section-animate">
        <div className="container limited-offer-grid">
          <div className="limited-offer-visual">
            <div className="offer-image-placeholder">                <img src="/images/burger-offer.jpg" alt="Special burger offer" className="offer-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </div>
          </div>
          <div className="limited-offer-content">
            <span className="offer-badge">Limited Time Offer</span>
            <h2 className="offer-title">Get 30% Off<br />Our Signature<br />Burger Meal</h2>
            <p className="offer-desc">
              Don't miss our weekend special - grab our award-winning signature burger combo with loaded fries and a premium shake at an unbeatable price.
            </p>
            <div className="offer-timer">
              <div className="timer-block">
                <span className="timer-num">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="timer-label">Hours</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-block">
                <span className="timer-num">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="timer-label">Minutes</span>
              </div>
              <span className="timer-colon">:</span>
              <div className="timer-block">
                <span className="timer-num">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="timer-label">Seconds</span>
              </div>
            </div>
            <button className="btn btn-primary btn-lg">Grab the Deal</button>
            <div className="offer-pricing">
              <span className="offer-old-price">$24.99</span>
              <span className="offer-new-price">$17.49</span>
            </div>
          </div>
        </div>
      </section>

      {/* Food Showcase */}
      <section className="section showcase-section section-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Food Showcase</span>
            <h2 className="section-title">Let's See Our Fast Food</h2>
          </div>
          <div className="showcase-grid">
            {showcaseItems.map((item, idx) => (
              <div
                key={idx}
                className={`showcase-card ${activeShowcase === idx ? 'active' : ''}`}
                onClick={() => setActiveShowcase(idx)}
              >                  <img src={item.imageSrc} alt={item.alt} className="showcase-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                <span className="showcase-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section timeline-section section-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2 className="section-title">A History of Restaurant</h2>
            <p className="section-desc">From humble beginnings to the city's most beloved restaurant - every chapter written with passion.</p>
          </div>
          <div className="timeline">
            {timelineData.map((item, idx) => (
              <div
                key={idx}
                className={`timeline-item ${activeTimeline === idx ? 'active' : ''}`}
                onClick={() => setActiveTimeline(idx)}
              >
                <div className="timeline-dot-wrapper">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section className="section chefs-section section-animate" id="team">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">The Culinary Team</span>
            <h2 className="section-title">Meet Our Expert Chefs</h2>
          </div>
          <div className="chefs-grid">
            {chefs.map((chef, idx) => (
              <div key={idx} className="chef-card">
                <div className="chef-image">
                  <img src={chef.imageSrc} alt={chef.alt} className="chef-img" onError={(e) => handleImgError(e, getInitialsSvg(chef.name))} />
                </div>
                <h3 className="chef-name">{chef.name}</h3>
                <span className="chef-role">{chef.role}</span>
                <span className="chef-exp">{chef.exp}</span>
                <div className="chef-social">
                  <span className="social-icon">📘</span>
                  <span className="social-icon">📸</span>
                  <span className="social-icon">🐦</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours + Order Online */}
      <section className="section hours-section">
        <div className="container hours-grid">
          <div className="hours-card">
            <span className="hours-icon">🕐</span>
            <h3>Opening Hours</h3>
            <p className="hours-tagline">We're Open For You</p>
            <div className="hours-list">
              <div className="hours-row">
                <span>Monday - Tuesday</span>
                <span className="closed">Closed</span>
              </div>
              <div className="hours-row">
                <span>Wednesday - Thursday</span>
                <span>09:00 AM - 10:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Friday</span>
                <span>09:00 AM - 11:00 PM</span>
              </div>
              <div className="hours-row">
                <span>Saturday</span>
                <span>10:00 AM - 11:30 PM</span>
              </div>
              <div className="hours-row">
                <span>Sunday</span>
                <span>11:00 AM - 09:00 PM</span>
              </div>
            </div>
          </div>
          <div className="hours-card order-card">
            <span className="hours-icon">🛵</span>
            <h3>Order Online</h3>
            <p className="hours-tagline">Get hot food delivered in 25 minutes</p>
            <button className="btn btn-primary btn-lg">Order Now →</button>
            <div className="order-info">
              <div className="order-info-item">
                <span className="order-info-icon">📍</span>
                <div>
                  <span className="order-info-label">Address</span>
                  <span>42 Flavor Street, NY</span>
                </div>
              </div>
              <div className="order-info-item">
                <span className="order-info-icon">📞</span>
                <div>
                  <span className="order-info-label">Phone</span>
                  <span>+1 (800) 123-4567</span>
                </div>
              </div>
              <div className="order-info-item">
                <span className="order-info-icon">✉️</span>
                <div>
                  <span className="order-info-label">Email</span>
                  <span>hello@sarabfood.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section section-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">What People Say</span>
            <h2 className="section-title">Our Customers Feedback</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-quote">"</div>
                <p className="testimonial-text">{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <strong className="testimonial-name">{t.name}</strong>
                    <span className="testimonial-role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="section booking-section" id="blog">
        <div className="container booking-grid">
          <div className="booking-info">
            <span className="section-badge">Book a Table</span>
            <h2 className="section-title left">Make a Reservation</h2>
            <p className="booking-desc">
              Reserve your table for a memorable dining experience. We recommend booking 24 hours in advance for weekend evenings.
            </p>
            <div className="booking-contact">
              <div className="bc-item">
                <span className="bc-icon">🕐</span>
                <div>
                  <strong>Opening Hours</strong>
                  <span>Wed - Sun, 9 AM - 11 PM</span>
                </div>
              </div>
              <div className="bc-item">
                <span className="bc-icon">📞</span>
                <div>
                  <strong>Call for Booking</strong>
                  <span>+1 (800) 123-4567</span>
                </div>
              </div>
              <div className="bc-item">
                <span className="bc-icon">👥</span>
                <div>
                  <strong>Group Dining</strong>
                  <span>Special menus for 10+ guests</span>
                </div>
              </div>
              <div className="bc-item">
                <span className="bc-icon">📍</span>
                <div>
                  <strong>Location</strong>
                  <span>42 Flavor Street, NY</span>
                </div>
              </div>
            </div>
          </div>
          <form className="booking-form" onSubmit={handleBookingSubmit}>
            {bookingSubmitted ? (
              <div className="form-success">
                <span className="success-icon">✅</span>
                <h3>Table Reserved!</h3>
                <p>We'll confirm via email shortly.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Number of Guests *</label>
                    <select required value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})}>
                      <option value="">Select guests</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Date *</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Time *</label>
                    <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea placeholder="Any dietary requirements or special occasion?" rows="3" value={formData.requests} onChange={e => setFormData({...formData, requests: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-full">Book a Table</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Blog Section */}
      <section className="section blog-section section-animate">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">News & Updates</span>
            <h2 className="section-title">Our Latest Blog Posts</h2>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="blog-card">
                <div className="blog-card-image">
                  <div className="blog-date-badge">
                    <span className="blog-date-num">{post.date}</span>
                    <span className="blog-date-month">{post.month}</span>
                  </div>
                  <img src={post.imageSrc} alt={post.alt} className="blog-img" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                </div>
                <div className="blog-card-body">
                  <span className="blog-category">{post.category}</span>
                  <h3 className="blog-title">{post.title}</h3>
                  <div className="blog-meta">
                    <span>✍️ {post.author}</span>
                    <span>💬 {post.comments} Comments</span>
                  </div>
                  <a href="#" className="blog-read-more">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Stay Connected</h2>
            <h3 className="newsletter-subtitle">Subscribe & Get Exclusive Deals</h3>
            <p className="newsletter-desc">Get 15% off your first order plus early access to new menu items</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="newsletter-input"
              />
              <button className="btn btn-primary btn-lg">Subscribe</button>
            </div>
            <p className="newsletter-note">No spam, unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section" id="contact">
        <div className="container contact-grid">
          <div className="contact-info">
            <span className="section-badge">Get In Touch</span>
            <h2 className="section-title left">Contact Us</h2>
            <p className="contact-desc">
              Have a question, feedback, or want to plan a special event? We'd love to hear from you.
            </p>
            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="cd-icon">📍</span>
                <div>
                  <strong>Address</strong>
                  <p>42 Flavor Street, Manhattan,<br />New York, NY 10001</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="cd-icon">📞</span>
                <div>
                  <strong>Phone</strong>
                  <p>+1 (800) 123-4567</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="cd-icon">✉️</span>
                <div>
                  <strong>Email</strong>
                  <p>hello@sarabfood.com</p>
                </div>
              </div>
              <div className="contact-detail-item">
                <span className="cd-icon">🕐</span>
                <div>
                  <strong>Working Hours</strong>
                  <p>Wed - Sun: 9 AM - 11 PM</p>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            {contactSubmitted ? (
              <div className="form-success">
                <span className="success-icon">✅</span>
                <h3>Message Sent!</h3>
                <p>We'll reply within 2 hours.</p>
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input type="text" placeholder="John Doe" required value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input type="email" placeholder="john@example.com" required value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+1 (555) 000-0000" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select required value={contactForm.subject} onChange={e => setContactForm({...contactForm, subject: e.target.value})}>
                      <option value="">Select subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="reservation">Reservation</option>
                      <option value="catering">Catering</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Message *</label>
                  <textarea placeholder="Tell us how we can help..." rows="5" required value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-full">Send Message</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">🍽️</span>
                <div className="logo-text">
                  <h1>Sarab</h1>
                  <span>Fast Food & Restaurant</span>
                </div>
              </div>
              <p className="footer-desc">
                Serving bold flavors and creating memorable dining experiences since 2012. From our kitchen to your table - every dish tells a story.
              </p>
              <div className="footer-social">
                <span className="footer-social-icon">📘</span>
                <span className="footer-social-icon">📸</span>
                <span className="footer-social-icon">🐦</span>
                <span className="footer-social-icon">▶️</span>
                <span className="footer-social-icon">💼</span>
              </div>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <a href="#">Home</a>
              <a href="#">Menu</a>
              <a href="#">About Us</a>
              <a href="#">Our Team</a>
              <a href="#">Blog</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-links">
              <h4>Our Menu</h4>
              <a href="#">Burgers</a>
              <a href="#">Pizza</a>
              <a href="#">Fried Chicken</a>
              <a href="#">Wraps</a>
              <a href="#">Desserts</a>
              <a href="#">Beverages</a>
            </div>
            <div className="footer-contact">
              <h4>Contact Info</h4>
              <p>📞 +1 (800) 123-4567</p>
              <p>✉️ hello@sarabfood.com</p>
              <p>📍 42 Flavor Street, Manhattan, NY 10001</p>
              <p>🕐 Wed - Sun: 9 AM - 11 PM</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Sarab Restaurant. All rights reserved. | Designed with ❤️ for food lovers</p>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
